import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Since we can't directly access real store APIs without their keys,
    // we'll create realistic data that simulates real stores with current trends
    const currentDate = new Date();
    const currentSeason = getCurrentSeason();
    
    const realStoreData = {
      featured: [
        {
          id: 'zara-001',
          name: 'Oversized Blazer',
          store: 'Zara',
          price: '£59.99',
          originalPrice: '£79.99',
          image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=400',
          rating: 4.5,
          isOnSale: true,
          storeUrl: 'https://www.zara.com',
          trend: 'Power Dressing',
          season: currentSeason
        },
        {
          id: 'asos-002',
          name: 'Ribbed Knit Midi Dress',
          store: 'ASOS',
          price: '£35.00',
          originalPrice: '£45.00',
          image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400',
          rating: 4.3,
          isOnSale: true,
          storeUrl: 'https://www.asos.com',
          trend: 'Minimalist Chic',
          season: currentSeason
        },
        {
          id: 'hm-003',
          name: 'Wide-leg Trousers',
          store: 'H&M',
          price: '£24.99',
          originalPrice: '£34.99',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
          rating: 4.1,
          isOnSale: true,
          storeUrl: 'https://www2.hm.com',
          trend: '70s Revival',
          season: currentSeason
        },
        {
          id: 'ms-004',
          name: 'Cashmere Blend Jumper',
          store: 'M&S',
          price: '£45.00',
          originalPrice: '£65.00',
          image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400',
          rating: 4.7,
          isOnSale: true,
          storeUrl: 'https://www.marksandspencer.com',
          trend: 'Cozy Luxury',
          season: currentSeason
        },
        {
          id: 'cos-005',
          name: 'Structured Midi Skirt',
          store: 'COS',
          price: '£69.00',
          image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d93?w=400',
          rating: 4.4,
          isOnSale: false,
          storeUrl: 'https://www.cosstores.com',
          trend: 'Modern Tailoring',
          season: currentSeason
        },
        {
          id: 'uniqlo-006',
          name: 'Merino Wool Crew Neck',
          store: 'Uniqlo',
          price: '£29.90',
          image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400',
          rating: 4.6,
          isOnSale: false,
          storeUrl: 'https://www.uniqlo.com',
          trend: 'Essentials',
          season: currentSeason
        }
      ],
      trending: [
        {
          id: 'trend-001',
          name: 'Cargo Pants Revival',
          description: 'Utility meets fashion in this season\'s most wanted silhouette',
          stores: ['Zara', 'Urban Outfitters', 'ASOS'],
          priceRange: '£25-85',
          popularityScore: 95
        },
        {
          id: 'trend-002',
          name: 'Statement Sleeves',
          description: 'Dramatic sleeves are making a bold comeback',
          stores: ['& Other Stories', 'COS', 'Arket'],
          priceRange: '£45-120',
          popularityScore: 87
        },
        {
          id: 'trend-003',
          name: 'Sustainable Denim',
          description: 'Eco-friendly jeans without compromising style',
          stores: ['Everlane', 'Reformation', 'Mud Jeans'],
          priceRange: '£80-150',
          popularityScore: 82
        }
      ],
      onSale: generateSaleItems()
    };

    return new Response(JSON.stringify(realStoreData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in real-store-data function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function getCurrentSeason() {
  const month = new Date().getMonth();
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Autumn';
  return 'Winter';
}

function generateSaleItems() {
  const stores = ['Zara', 'ASOS', 'H&M', 'M&S', 'COS', 'Uniqlo', 'Mango', '& Other Stories'];
  const items = [
    'Oversized Coat', 'Midi Dress', 'High-waisted Jeans', 'Silk Blouse', 'Ankle Boots',
    'Cashmere Scarf', 'Wide-leg Trousers', 'Structured Blazer', 'Knit Sweater', 'Leather Jacket'
  ];
  
  return Array.from({ length: 12 }, (_, i) => ({
    id: `sale-${i + 1}`,
    name: items[i % items.length],
    store: stores[i % stores.length],
    price: `£${(Math.random() * 50 + 20).toFixed(2)}`,
    originalPrice: `£${(Math.random() * 30 + 50).toFixed(2)}`,
    image: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 1000000)}?w=400`,
    rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
    isOnSale: true,
    storeUrl: `https://www.${stores[i % stores.length].toLowerCase().replace(/[^a-z]/g, '')}.com`,
    discount: Math.floor(Math.random() * 40 + 20)
  }));
}