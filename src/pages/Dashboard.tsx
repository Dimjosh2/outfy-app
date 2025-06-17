
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Cloud, Calendar, TrendingUp, Heart } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-outfy-light">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, Sarah! ✨</h1>
            <p className="text-gray-600">Here's your personalized style assistant ready to help</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Today's Outfit */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-outfy-teal" />
                    <span>Today's Outfit Suggestion</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-outfy-teal/10 to-emerald-100 rounded-xl p-8">
                    <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
                      {/* Outfit Image */}
                      <div className="flex-shrink-0">
                        <div className="w-48 h-64 bg-white rounded-lg shadow-md overflow-hidden">
                          <img 
                            src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=400&fit=crop&crop=center"
                            alt="Today's outfit suggestion"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      
                      {/* Outfit Details */}
                      <div className="text-center md:text-left flex-1">
                        <h3 className="text-xl font-semibold mb-2">Casual Chic Look</h3>
                        <p className="text-gray-600 mb-4">Perfect for today's weather: 22°C and partly cloudy</p>
                        
                        {/* Outfit Items */}
                        <div className="mb-6">
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            <span className="px-3 py-1 bg-white/70 rounded-full text-sm">Cream Blouse</span>
                            <span className="px-3 py-1 bg-white/70 rounded-full text-sm">Dark Jeans</span>
                            <span className="px-3 py-1 bg-white/70 rounded-full text-sm">Brown Boots</span>
                            <span className="px-3 py-1 bg-white/70 rounded-full text-sm">Gold Necklace</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 justify-center md:justify-start">
                          <Button size="sm" className="bg-outfy-coral text-white">
                            <Heart className="w-4 h-4 mr-1" />
                            Love it!
                          </Button>
                          <Button size="sm" variant="outline">Show alternatives</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cloud className="w-5 h-5 text-blue-500" />
                    <span>Weather</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-3xl mb-2">⛅</div>
                    <p className="font-semibold">22°C</p>
                    <p className="text-sm text-gray-600">Partly cloudy</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-emerald-600" />
                    <span>Upcoming</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Dinner date</span>
                      <span className="text-sm text-gray-500">Friday</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Work presentation</span>
                      <span className="text-sm text-gray-500">Monday</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    <span>Style Trends</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">Discover autumn trends that match your style</p>
                  <Button size="sm" variant="outline" className="mt-2 w-full">
                    Explore Trends
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

export default Dashboard;
