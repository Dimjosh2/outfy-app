
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Bookmark, TrendingUp, Sparkles, ShoppingBag, Users } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import RealStoreIntegration from '@/components/RealStoreIntegration';

const StyleFeed = () => {
  const { user } = useAuth();
  const { canPerformAction, tierInfo } = useSubscription();
  const { toast } = useToast();

  const handleSaveLook = async (lookData: any) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to save looks",
        variant: "destructive",
      });
      return;
    }

    if (!canPerformAction('savedLooks')) {
      toast({
        title: "Limit Reached",
        description: `You can only save ${tierInfo.limits.savedLooks} looks on the ${tierInfo.name} plan. Upgrade for more!`,
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_looks')
        .insert({
          user_id: user.id,
          look_data: lookData,
        });

      if (error) throw error;

      toast({
        title: "Look Saved!",
        description: "Added to your saved looks collection",
      });
    } catch (error) {
      console.error('Error saving look:', error);
      toast({
        title: "Error",
        description: "Failed to save look",
        variant: "destructive",
      });
    }
  };

  const trendingLooks = [
    {
      id: 1,
      title: "Autumn Layering Perfection",
      image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=400&fit=crop&crop=center",
      description: "Mix textures with a cozy cardigan, silk blouse, and tailored trousers",
      likes: 234,
      category: "Trending",
      matchScore: "95%"
    },
    {
      id: 2,
      title: "Minimalist Chic",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop&crop=center",
      description: "Clean lines and neutral tones for effortless elegance",
      likes: 187,
      category: "AI Curated",
      matchScore: "87%"
    },
    {
      id: 3,
      title: "Power Professional",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop&crop=center",
      description: "Command the boardroom with this sophisticated ensemble",
      likes: 156,
      category: "Work Style",
      matchScore: "92%"
    }
  ];

  const colorTips = [
    {
      title: "Monochromatic Magic",
      tip: "Different shades of the same color create depth and sophistication",
      colors: ["#1a1a1a", "#404040", "#808080", "#d3d3d3"]
    },
    {
      title: "Complementary Contrast",
      tip: "Opposite colors on the color wheel create vibrant, eye-catching combinations",
      colors: ["#FF7043", "#26A69A", "#E91E63", "#4CAF50"]
    }
  ];

  const influencerPicks = [
    { name: "Emma Style", outfit: "Casual Weekend", image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=150&h=150&fit=crop&crop=center" },
    { name: "Fashion Forward", outfit: "Date Night", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=150&h=150&fit=crop&crop=center" },
    { name: "Minimalist Maven", outfit: "Office Chic", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=150&h=150&fit=crop&crop=center" }
  ];

  return (
    <div className="min-h-screen bg-outfy-light">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Style Feed ✨</h1>
            <p className="text-gray-600">Discover your next favorite look! Outfy's Style Feed brings you AI-curated outfits, trending styles, and inspiration from around the world—personalized just for you.</p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Feed */}
            <div className="lg:col-span-3">
              {/* Store Integration */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5 text-outfy-coral" />
                  <span>Shop the Look</span>
                </h2>
                <RealStoreIntegration />
              </div>

              {/* Trending Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-outfy-coral" />
                  <span>Trending Now</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {trendingLooks.map((look) => (
                    <Card key={look.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                      <div className="relative">
                        <img 
                          src={look.image} 
                          alt={look.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-outfy-teal">
                          {look.matchScore} match
                        </div>
                        <div className="absolute top-2 left-2 bg-outfy-coral text-white rounded-full px-2 py-1 text-xs font-medium">
                          {look.category}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{look.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{look.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Button size="sm" variant="ghost" className="p-1 h-auto">
                              <Heart className="w-4 h-4 text-gray-400 hover:text-red-500" />
                            </Button>
                            <span className="text-sm text-gray-500">{look.likes}</span>
                            <Button size="sm" variant="ghost" className="p-1 h-auto">
                              <Share2 className="w-4 h-4 text-gray-400" />
                            </Button>
                          </div>
                          <div className="flex space-x-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleSaveLook(look)}
                              disabled={!canPerformAction('savedLooks')}
                            >
                              <Bookmark className="w-3 h-3 mr-1" />
                              Save
                            </Button>
                            <Button size="sm" className="bg-outfy-teal text-white">
                              <ShoppingBag className="w-3 h-3 mr-1" />
                              Shop
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Color Tips */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span>Color & Style Tips</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {colorTips.map((tip, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                        <p className="text-sm text-gray-600 mb-4">{tip.tip}</p>
                        <div className="flex space-x-2">
                          {tip.colors.map((color, colorIndex) => (
                            <div
                              key={colorIndex}
                              className="w-8 h-8 rounded-full border-2 border-gray-200"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* AI Personalized */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Sparkles className="w-5 h-5 text-outfy-teal" />
                    <span>For You</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="w-full h-32 bg-gradient-to-br from-outfy-teal/10 to-emerald-100 rounded-lg mb-3 flex items-center justify-center">
                      <Sparkles className="w-8 h-8 text-outfy-teal" />
                    </div>
                    <h4 className="font-medium mb-1">Perfect Autumn Palette</h4>
                    <p className="text-sm text-gray-600 mb-3">Based on your color analysis</p>
                    <Button size="sm" className="bg-outfy-coral text-white w-full">
                      Explore Palette
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Community Picks */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Users className="w-5 h-5 text-emerald-600" />
                    <span>Community Picks</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {influencerPicks.map((pick, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <img 
                          src={pick.image} 
                          alt={pick.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{pick.name}</p>
                          <p className="text-xs text-gray-500">{pick.outfit}</p>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Heart className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    View All
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Saved Looks
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trending Colors
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Shopping List
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StyleFeed;
