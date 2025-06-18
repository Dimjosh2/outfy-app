
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye, Sparkles, Share2, Bookmark } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeaturedOutfit {
  id: string;
  title: string;
  description: string;
  image: string;
  colors: string[];
  occasion: string;
  weather: string;
  likes: number;
  isLiked?: boolean;
  isSaved?: boolean;
}

const FeaturedOutfits = () => {
  const { toast } = useToast();
  const [outfits, setOutfits] = useState<FeaturedOutfit[]>([
    {
      id: '1',
      title: 'Modern Professional',
      description: 'Perfect for today\'s board meeting. The navy blazer paired with crisp white creates a confident, trustworthy look.',
      image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=400&fit=crop',
      colors: ['#1B263B', '#FFFFFF', '#8B4513'],
      occasion: 'Work',
      weather: '22°C',
      likes: 145,
      isLiked: false,
      isSaved: false
    },
    {
      id: '2',
      title: 'Casual Weekend Vibes',
      description: 'Comfortable yet stylish for your Saturday plans. Denim and earth tones create a relaxed, approachable style.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop',
      colors: ['#4682B4', '#D2B48C', '#FFFFFF'],
      occasion: 'Casual',
      weather: '25°C',
      likes: 98,
      isLiked: false,
      isSaved: false
    },
    {
      id: '3',
      title: 'Evening Elegance',
      description: 'Sophisticated and chic for tonight\'s dinner. The monochrome palette with a pop of gold creates timeless elegance.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop',
      colors: ['#000000', '#FFFFFF', '#FFD700'],
      occasion: 'Dinner',
      weather: '18°C',
      likes: 203,
      isLiked: false,
      isSaved: false
    }
  ]);

  const handleLike = (outfitId: string) => {
    setOutfits(prev => prev.map(outfit => {
      if (outfit.id === outfitId) {
        const newLiked = !outfit.isLiked;
        const newLikes = newLiked ? outfit.likes + 1 : outfit.likes - 1;
        
        toast({
          title: newLiked ? "Outfit Liked! ❤️" : "Like Removed",
          description: newLiked ? "Added to your favorites" : "Removed from favorites",
        });
        
        return { ...outfit, isLiked: newLiked, likes: newLikes };
      }
      return outfit;
    }));
  };

  const handleSave = (outfitId: string) => {
    setOutfits(prev => prev.map(outfit => {
      if (outfit.id === outfitId) {
        const newSaved = !outfit.isSaved;
        
        toast({
          title: newSaved ? "Outfit Saved! 📌" : "Outfit Unsaved",
          description: newSaved ? "Added to your wardrobe collection" : "Removed from collection",
        });
        
        return { ...outfit, isSaved: newSaved };
      }
      return outfit;
    }));
  };

  const handleTryOn = (outfit: FeaturedOutfit) => {
    toast({
      title: "Virtual Try-On! 👗",
      description: `Opening AR view for "${outfit.title}"...`,
    });
    // Here you would implement actual try-on functionality
  };

  const handleShare = (outfit: FeaturedOutfit) => {
    if (navigator.share) {
      navigator.share({
        title: `Check out this outfit: ${outfit.title}`,
        text: outfit.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied! 🔗",
        description: "Outfit link copied to clipboard",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-outfy-teal" />
          <span>Featured Outfits for Today</span>
        </h2>
        <Button variant="outline" size="sm" className="hover:bg-outfy-teal hover:text-white">
          View All
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit) => (
          <Card key={outfit.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group border-2 hover:border-outfy-teal/30">
            <div className="relative">
              <img
                src={outfit.image}
                alt={outfit.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3">
                <Badge className="bg-outfy-teal text-white shadow-md">
                  {outfit.occasion}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-white/90 shadow-md">
                  {outfit.weather}
                </Badge>
              </div>
              <div className="absolute bottom-3 right-3">
                <Button 
                  size="sm" 
                  variant="secondary" 
                  className={`bg-white/90 hover:bg-white shadow-md transition-colors ${
                    outfit.isLiked ? 'text-red-500' : 'text-gray-600'
                  }`}
                  onClick={() => handleLike(outfit.id)}
                >
                  <Heart className={`w-4 h-4 mr-1 ${outfit.isLiked ? 'fill-current' : ''}`} />
                  {outfit.likes}
                </Button>
              </div>
              <div className="absolute bottom-3 left-3">
                <Button
                  size="sm"
                  onClick={() => handleShare(outfit)}
                  className="bg-white/90 hover:bg-white text-gray-600 hover:text-outfy-teal shadow-md"
                  variant="secondary"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">{outfit.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{outfit.description}</p>
              
              {/* Color Palette */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xs text-gray-500 font-medium">Colors:</span>
                <div className="flex space-x-1">
                  {outfit.colors.map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full border-2 border-gray-200 shadow-sm hover:scale-110 transition-transform cursor-pointer"
                      style={{ backgroundColor: color }}
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  className="flex-1 bg-outfy-coral hover:bg-outfy-coral/90 text-white"
                  onClick={() => handleTryOn(outfit)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  Try On
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`flex-1 hover:bg-outfy-teal hover:text-white ${
                    outfit.isSaved ? 'bg-outfy-teal text-white' : ''
                  }`}
                  onClick={() => handleSave(outfit.id)}
                >
                  <Bookmark className={`w-4 h-4 mr-1 ${outfit.isSaved ? 'fill-current' : ''}`} />
                  {outfit.isSaved ? 'Saved' : 'Save'}
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
