
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Sparkles } from "lucide-react";

interface FeaturedOutfit {
  id: string;
  title: string;
  description: string;
  image: string;
  colors: string[];
  occasion: string;
  weather: string;
  likes: number;
}

const FeaturedOutfits = () => {
  const featuredOutfits: FeaturedOutfit[] = [
    {
      id: '1',
      title: 'Modern Professional',
      description: 'Perfect for today\'s board meeting. The navy blazer paired with crisp white creates a confident, trustworthy look.',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=400&fit=crop',
      colors: ['#1B263B', '#FFFFFF', '#8B4513'],
      occasion: 'Work',
      weather: '22°C',
      likes: 145
    },
    {
      id: '2',
      title: 'Casual Weekend Vibes',
      description: 'Comfortable yet stylish for your Saturday plans. Denim and earth tones create a relaxed, approachable style.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop',
      colors: ['#4682B4', '#D2B48C', '#FFFFFF'],
      occasion: 'Casual',
      weather: '25°C',
      likes: 98
    },
    {
      id: '3',
      title: 'Evening Elegance',
      description: 'Sophisticated and chic for tonight\'s dinner. The monochrome palette with a pop of gold creates timeless elegance.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop',
      colors: ['#000000', '#FFFFFF', '#FFD700'],
      occasion: 'Dinner',
      weather: '18°C',
      likes: 203
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-outfy-teal" />
          <span>Featured Outfits for Today</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredOutfits.map((outfit) => (
          <Card key={outfit.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={outfit.image}
                alt={outfit.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-outfy-teal text-white">
                  {outfit.occasion}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90">
                  {outfit.weather}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3">
                <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                  <Heart className="w-4 h-4 mr-1" />
                  {outfit.likes}
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{outfit.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{outfit.description}</p>
              
              {/* Color Palette */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs text-gray-500">Colors:</span>
                <div className="flex space-x-1">
                  {outfit.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm" className="flex-1 bg-outfy-coral hover:bg-outfy-coral/90 text-white">
                  <Eye className="w-4 h-4 mr-1" />
                  Try On
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturedOutfits;
