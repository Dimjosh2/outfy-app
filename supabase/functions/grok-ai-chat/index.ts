import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const grokApiKey = Deno.env.get('GROK_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'No authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? "",
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? "",
      { auth: { persistSession: false } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Invalid user' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check subscription and usage limits
    const { data: subscriber } = await supabaseClient
      .from('subscribers')
      .select('subscription_tier, subscribed')
      .eq('user_id', user.id)
      .single();

    const tier = subscriber?.subscription_tier || 'free';
    const isSubscribed = subscriber?.subscribed || false;

    // Define limits based on subscription tier
    const limits = {
      free: { ai_chats: 5 },
      paid: { ai_chats: 100 },
      premium: { ai_chats: -1 } // unlimited
    };

    const userLimits = limits[tier as keyof typeof limits] || limits.free;

    // Check today's usage if not unlimited
    if (userLimits.ai_chats !== -1) {
      const today = new Date().toISOString().split('T')[0];
      const { data: usage } = await supabaseClient
        .from('usage_tracking')
        .select('count')
        .eq('user_id', user.id)
        .eq('action_type', 'ai_chat')
        .eq('usage_date', today)
        .single();

      const currentUsage = usage?.count || 0;
      if (currentUsage >= userLimits.ai_chats) {
        return new Response(JSON.stringify({ 
          error: 'Daily AI chat limit reached. Please upgrade your subscription.' 
        }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }

    const { message } = await req.json();

    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${grokApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'grok-3-latest',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert fashion stylist and personal shopping assistant. You help users with outfit suggestions, color coordination, style tips, and fashion advice. Keep responses helpful, friendly, and fashion-focused. Consider current trends, seasons, and the user\'s style preferences.'
          },
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Grok API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Track usage
    const today = new Date().toISOString().split('T')[0];
    await supabaseClient
      .from('usage_tracking')
      .upsert({
        user_id: user.id,
        action_type: 'ai_chat',
        usage_date: today,
        count: 1
      }, {
        onConflict: 'user_id,action_type,usage_date',
        ignoreDuplicates: false
      });

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in grok-ai-chat function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});