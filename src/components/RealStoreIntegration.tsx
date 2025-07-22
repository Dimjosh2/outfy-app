import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink, RefreshCw, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StoreItem {
  id: string;
  name: string;
  store: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  isOnSale: boolean;
  storeUrl: string;
  trend?: string;
  season?: string;
  discount?: number;
}

interface TrendingItem {
  id: string;
  name: string;
  description: string;
  stores: string[];
  priceRange: string;
  popularityScore: number;
}

const RealStoreIntegration = () => {
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);
  const [saleItems, setSaleItems] = useState<StoreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRealStoreData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('real-store-data');
      
      if (error) throw error;
      
      setStoreItems(data.featured || []);
      setTrendingItems(data.trending || []);
      setSaleItems(data.onSale || []);
    } catch (error) {
      console.error('Error fetching store data:', error);
      toast({
        title: "Error",
        description: "Failed to load store data. Please try again.",
        variant: "destructive",
      });
      
      // Fallback to demo data
      setStoreItems([
        {
          id: '1',
          name: 'Classic Wool Blazer',
          store: 'M&S',
          price: '£89',
          originalPrice: '£120',
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
          rating: 4.5,
          isOnSale: true,
          storeUrl: 'https://www.marksandspencer.com',
          trend: 'Power Dressing',
          season: 'Winter'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealStoreData();
  }, []);

  const handleStoreVisit = (item: StoreItem) => {
    console.log(`Visiting ${item.store} for ${item.name}`);
    window.open(item.storeUrl, '_blank');
  };

  const handleRefresh = () => {
    fetchRealStoreData();
    toast({
      title: "Refreshed",
      description: "Store data has been updated with the latest trends and sales.",
    });
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 animate-spin" />
          <span className="ml-2">Loading latest fashion trends...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header with Refresh Button */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Live Store Data</h1>
        <Button onClick={handleRefresh} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Live Data
        </Button>
      </div>

      {/* Trending Now */}
      {trendingItems.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold flex items-center">
              <TrendingUp className="w-8 h-8 mr-2 text-outfy-coral" />
              Trending Now
            </h2>
            <Badge variant="secondary" className="bg-outfy-coral text-white">Live Trends</Badge>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingItems.map((trend) => (
              <Card key={trend.id} className="overflow-hidden border-l-4 border-l-outfy-coral">
                <CardHeader>
                  <CardTitle className="text-xl text-outfy-coral">{trend.name}</CardTitle>
                  <CardDescription>{trend.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Price Range:</span>
                      <span className="text-sm font-bold">{trend.priceRange}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Popularity:</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {trend.popularityScore}% trending
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {trend.stores.map((store) => (
                        <Badge key={store} variant="secondary" className="text-xs">
                          {store}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Featured Items */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Featured Items</h2>
          <Badge variant="secondary">Curated Selection</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storeItems.slice(0, 6).map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.isOnSale && (
                  <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                    {item.discount ? `${item.discount}% OFF` : 'SALE'}
                  </Badge>
                )}
                {item.trend && (
                  <Badge className="absolute top-2 right-2 bg-outfy-teal text-white">
                    {item.trend}
                  </Badge>
                )}
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </div>
                <CardDescription className="text-sm text-muted-foreground">
                  {item.store} • {item.season}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-outfy-coral">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{item.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleStoreVisit(item)}
                  className="w-full bg-outfy-teal hover:bg-outfy-teal/90 text-white"
                >
                  Visit {item.store} <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Flash Sales */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-red-600">🔥 Flash Sales</h2>
          <Badge variant="destructive" className="animate-pulse">Live Deals</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {saleItems.slice(0, 8).map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow border-red-200">
              <div className="aspect-square overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse">
                  {item.discount ? `${item.discount}% OFF` : 'SALE'}
                </Badge>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{item.name}</CardTitle>
                <CardDescription className="text-xs">{item.store}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-bold text-red-600">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through ml-2">
                        {item.originalPrice}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-xs">{item.rating}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button 
                  onClick={() => handleStoreVisit(item)}
                  size="sm"
                  className="w-full bg-red-500 hover:bg-red-600 text-white"
                >
                  Shop Sale
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Store Partners */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Our Store Partners</h2>
          <Badge variant="outline">Trusted Partners</Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {['M&S', 'Zara', 'ASOS', 'H&M', 'COS', 'Uniqlo', 'Mango', '& Other Stories'].map((store) => (
            <Card key={store} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50">
              <div className="w-12 h-12 bg-gradient-to-br from-outfy-teal to-outfy-coral rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="font-bold text-white text-lg">{store.charAt(0)}</span>
              </div>
              <p className="font-medium text-sm">{store}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RealStoreIntegration;