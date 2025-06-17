
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, Tag } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TrendingItem {
  id: string;
  name: string;
  store: string;
  price: string;
  originalPrice?: string;
  image: string;
  rating: number;
  isOnSale: boolean;
  weatherMatch: boolean;
}

const TrendingWears = () => {
  const trendingItems: TrendingItem[] = [
    {
      id: '1',
      name: 'Classic Wool Blazer',
      store: 'M&S',
      price: '£89',
      originalPrice: '£120',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=300&h=400&fit=crop',
      rating: 4.5,
      isOnSale: true,
      weatherMatch: true
    },
    {
      id: '2',
      name: 'Satin Midi Dress',
      store: 'Zara',
      price: '£49.99',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=300&h=400&fit=crop',
      rating: 4.3,
      isOnSale: false,
      weatherMatch: false
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
      weatherMatch: true
    },
    {
      id: '4',
      name: 'Luxury Handbag',
      store: 'Gucci',
      price: '£1,200',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=400&fit=crop',
      rating: 4.8,
      isOnSale: false,
      weatherMatch: false
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
      weatherMatch: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trending Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Trending Now</h2>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        
        <Carousel className="w-full">
          <CarouselContent>
            {trendingItems.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                      {item.isOnSale && (
                        <Badge className="bg-red-500 text-white">
                          <Tag className="w-3 h-3 mr-1" />
                          Sale
                        </Badge>
                      )}
                      {item.weatherMatch && (
                        <Badge className="bg-blue-500 text-white text-xs">
                          Perfect for today
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
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{item.name}</h3>
                    
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
                      <Button size="sm" className="bg-outfy-coral hover:bg-outfy-coral/90 text-white">
                        <ShoppingBag className="w-4 h-4 mr-1" />
                        Shop
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* On Sale Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <Tag className="w-6 h-6 text-red-500" />
            <span>On Sale Now</span>
          </h2>
          <Button variant="outline" size="sm">View All Sales</Button>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingItems.filter(item => item.isOnSale).map((item) => (
            <Card key={`sale-${item.id}`} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover"
                />
                <div className="p-3 flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    <Badge className="bg-red-500 text-white text-xs ml-2">Sale</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{item.store}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-outfy-coral">{item.price}</span>
                      <span className="text-xs text-gray-500 line-through ml-1">{item.originalPrice}</span>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs px-2 py-1">
                      Shop
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingWears;
