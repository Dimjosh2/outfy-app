
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, Tag, ExternalLink } from "lucide-react";

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
}

const StoreIntegration = () => {
  // Mock data - in a real app, this would come from store APIs
  const storeItems: StoreItem[] = [
    {
      id: '1',
      name: 'Classic Wool Blazer',
      store: 'M&S',
      price: '£89',
      originalPrice: '£120',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      rating: 4.5,
      isOnSale: true,
      storeUrl: 'https://www.marksandspencer.com'
    },
    {
      id: '2',
      name: 'Satin Midi Dress',
      store: 'Zara',
      price: '£49.99',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      rating: 4.3,
      isOnSale: false,
      storeUrl: 'https://www.zara.com'
    },
    {
      id: '3',
      name: 'Denim Jacket',
      store: 'Primark',
      price: '£18',
      originalPrice: '£25',
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5d?w=300&h=400&fit=crop',
      rating: 4.0,
      isOnSale: true,
      storeUrl: 'https://www.primark.com'
    },
    {
      id: '4',
      name: 'Luxury Handbag',
      store: 'Gucci',
      price: '£1,200',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      rating: 4.8,
      isOnSale: false,
      storeUrl: 'https://www.gucci.com'
    },
    {
      id: '5',
      name: 'Cashmere Sweater',
      store: 'M&S',
      price: '£65',
      originalPrice: '£85',
      image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=400&fit=crop',
      rating: 4.6,
      isOnSale: true,
      storeUrl: 'https://www.marksandspencer.com'
    }
  ];

  const handleStoreVisit = (item: StoreItem) => {
    // Track click for analytics
    console.log(`User clicked on ${item.name} from ${item.store}`);
    window.open(item.storeUrl, '_blank');
  };

  const saleItems = storeItems.filter(item => item.isOnSale);

  return (
    <div className="space-y-6">
      {/* Featured Items */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Featured Items</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {storeItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  {item.isOnSale && (
                    <Badge className="bg-red-500 text-white">
                      <Tag className="w-3 h-3 mr-1" />
                      Sale
                    </Badge>
                  )}
                </div>
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90">
                    {item.store}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-4">
                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h4>
                
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{item.rating}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-gray-900">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-outfy-coral hover:bg-outfy-coral/90 text-white"
                    onClick={() => handleStoreVisit(item)}
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Shop
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Sale Items */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Tag className="w-5 h-5 text-red-500 mr-2" />
          On Sale Now
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {saleItems.map((item) => (
            <Card key={`sale-${item.id}`} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="p-3 flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-medium text-sm line-clamp-2">{item.name}</h5>
                    <Badge className="bg-red-500 text-white text-xs ml-2">Sale</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{item.store}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-outfy-coral">{item.price}</span>
                      <span className="text-xs text-gray-500 line-through ml-1">{item.originalPrice}</span>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-xs px-2 py-1"
                      onClick={() => handleStoreVisit(item)}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Shop
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Store Partners */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Our Store Partners</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['M&S', 'Zara', 'Primark', 'Gucci'].map((store) => (
            <Card key={store} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
              <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="font-bold text-gray-600">{store.charAt(0)}</span>
              </div>
              <p className="font-medium">{store}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreIntegration;
