
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionTier {
  name: string;
  price: number;
  features: string[];
  limits: {
    wardrobeItems: number;
    outfitPlans: number;
    aiChatsPerDay: number;
    savedLooks: number;
  };
}

export const subscriptionTiers: Record<string, SubscriptionTier> = {
  free: {
    name: 'Free',
    price: 0,
    features: ['Basic wardrobe management', '5 AI chat messages/day', 'Basic outfit suggestions'],
    limits: {
      wardrobeItems: 20,
      outfitPlans: 5,
      aiChatsPerDay: 5,
      savedLooks: 10,
    }
  },
  paid: {
    name: 'Style Pro',
    price: 25,
    features: ['Unlimited wardrobe items', 'Advanced AI styling', 'Weather integration', 'Color analysis'],
    limits: {
      wardrobeItems: -1, // unlimited
      outfitPlans: 50,
      aiChatsPerDay: 100,
      savedLooks: 100,
    }
  },
  premium: {
    name: 'Fashion Elite',
    price: 40,
    features: ['Everything in Style Pro', 'Personal stylist consultation', 'Priority support', 'Exclusive trends'],
    limits: {
      wardrobeItems: -1, // unlimited
      outfitPlans: -1, // unlimited
      aiChatsPerDay: -1, // unlimited
      savedLooks: -1, // unlimited
    }
  }
};

export const useSubscription = () => {
  const { user } = useAuth();
  const [currentTier, setCurrentTier] = useState<string>('free');
  const [usage, setUsage] = useState({
    wardrobeItems: 0,
    outfitPlans: 0,
    aiChatsToday: 0,
    savedLooks: 0,
  });

  useEffect(() => {
    if (user) {
      fetchUsage();
    }
  }, [user]);

  const fetchUsage = async () => {
    if (!user) return;

    try {
      const [wardrobeCount, outfitPlansCount, savedLooksCount] = await Promise.all([
        supabase.from('wardrobe_items').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('outfit_plans').select('id', { count: 'exact' }).eq('user_id', user.id),
        supabase.from('saved_looks').select('id', { count: 'exact' }).eq('user_id', user.id),
      ]);

      setUsage({
        wardrobeItems: wardrobeCount.count || 0,
        outfitPlans: outfitPlansCount.count || 0,
        aiChatsToday: 0, // Would need separate tracking
        savedLooks: savedLooksCount.count || 0,
      });
    } catch (error) {
      console.error('Error fetching usage:', error);
    }
  };

  const canPerformAction = (action: keyof typeof usage) => {
    const tier = subscriptionTiers[currentTier];
    const limit = tier.limits[action];
    return limit === -1 || usage[action] < limit;
  };

  const getUsagePercentage = (action: keyof typeof usage) => {
    const tier = subscriptionTiers[currentTier];
    const limit = tier.limits[action];
    if (limit === -1) return 0;
    return Math.min((usage[action] / limit) * 100, 100);
  };

  return {
    currentTier,
    setCurrentTier,
    usage,
    fetchUsage,
    canPerformAction,
    getUsagePercentage,
    tierInfo: subscriptionTiers[currentTier],
  };
};
