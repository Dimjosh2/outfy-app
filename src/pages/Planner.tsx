
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Plus, Bell, Cloud, Calendar as CalendarIcon, Eye, History } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface OutfitPlan {
  id: string;
  planned_date: string;
  weather_temp: number;
  weather_condition: string;
  notes: string;
  outfit_id: string;
}

const Planner = () => {
  const { user } = useAuth();
  const { canPerformAction, usage, tierInfo } = useSubscription();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedView, setSelectedView] = useState<"week" | "month">("week");
  const [outfitPlans, setOutfitPlans] = useState<OutfitPlan[]>([]);

  useEffect(() => {
    if (user) {
      fetchOutfitPlans();
    }
  }, [user]);

  const fetchOutfitPlans = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('outfit_plans')
        .select('*')
        .eq('user_id', user.id)
        .order('planned_date', { ascending: true });

      if (error) throw error;
      setOutfitPlans(data || []);
    } catch (error) {
      console.error('Error fetching outfit plans:', error);
    }
  };

  const handleAddPlan = async () => {
    if (!user) return;

    if (!canPerformAction('outfitPlans')) {
      toast({
        title: "Limit Reached",
        description: `You can only have ${tierInfo.limits.outfitPlans} outfit plans on the ${tierInfo.name} plan. Upgrade for more!`,
        variant: "destructive",
      });
      return;
    }

    // Add outfit plan logic here
    toast({
      title: "Coming Soon",
      description: "Outfit planning feature will be available soon!",
    });
  };

  const plannedOutfits = [
    { date: "2024-06-18", outfit: "Business Casual", image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=300&h=400&fit=crop&crop=center", event: "Work Meeting" },
    { date: "2024-06-19", outfit: "Casual Chic", image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=400&fit=crop&crop=center", event: "Lunch Date" },
    { date: "2024-06-20", outfit: "Evening Elegant", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=400&fit=crop&crop=center", event: "Dinner Party" },
  ];

  const upcomingEvents = [
    { name: "Work Presentation", date: "Monday", weather: "22°C", icon: "💼" },
    { name: "Dinner Date", date: "Friday", weather: "18°C", icon: "🍽️" },
    { name: "Weekend Brunch", date: "Saturday", weather: "25°C", icon: "🥂" },
  ];

  return (
    <div className="min-h-screen bg-outfy-light">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Outfit Planner ✨</h1>
              <p className="text-gray-600">Plan your week in style! Assign outfits to each day, get AI-powered suggestions for your calendar, and always look your best—rain or shine.</p>
            </div>
            <Button 
              className="bg-outfy-coral hover:bg-outfy-coral/90 text-white mt-4 md:mt-0"
              onClick={handleAddPlan}
              disabled={!canPerformAction('outfitPlans')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Outfit
            </Button>
          </div>

          {/* Usage Stats */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Planning Usage</span>
                <Badge variant="outline">
                  {usage.outfitPlans} / {tierInfo.limits.outfitPlans === -1 ? '∞' : tierInfo.limits.outfitPlans}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-outfy-teal h-2 rounded-full transition-all"
                  style={{ width: `${tierInfo.limits.outfitPlans === -1 ? 0 : Math.min((usage.outfitPlans / tierInfo.limits.outfitPlans) * 100, 100)}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar Section */}
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center space-x-2">
                      <CalendarIcon className="w-5 h-5 text-outfy-teal" />
                      <span>Your Style Calendar</span>
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant={selectedView === "week" ? "default" : "outline"}
                        onClick={() => setSelectedView("week")}
                        className={selectedView === "week" ? "bg-outfy-teal text-white" : ""}
                      >
                        Week
                      </Button>
                      <Button 
                        size="sm" 
                        variant={selectedView === "month" ? "default" : "outline"}
                        onClick={() => setSelectedView("month")}
                        className={selectedView === "month" ? "bg-outfy-teal text-white" : ""}
                      >
                        Month
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full"
                  />
                </CardContent>
              </Card>

              {/* Planned Outfits */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Eye className="w-5 h-5 text-emerald-600" />
                    <span>This Week's Planned Outfits</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {plannedOutfits.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="w-full h-40 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.outfit}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium text-gray-900">{item.outfit}</h4>
                        <p className="text-sm text-gray-600">{item.event}</p>
                        <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Weather Sync */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Cloud className="w-5 h-5 text-blue-500" />
                    <span>Weather Sync</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-2xl mb-2">⛅</div>
                    <p className="font-semibold">22°C Today</p>
                    <p className="text-sm text-gray-600">Perfect for light layers</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">
                    Get Weather Suggestions
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CalendarIcon className="w-5 h-5 text-emerald-600" />
                    <span>Upcoming Events</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                        <div className="flex items-center space-x-3">
                          <span className="text-xl">{event.icon}</span>
                          <div>
                            <p className="text-sm font-medium">{event.name}</p>
                            <p className="text-xs text-gray-500">{event.date} • {event.weather}</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={handleAddPlan}
                          disabled={!canPerformAction('outfitPlans')}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5 text-purple-600" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <History className="w-4 h-4 mr-2" />
                    View Outfit History
                  </Button>
                  <Button size="sm" variant="outline" className="w-full justify-start">
                    <Bell className="w-4 h-4 mr-2" />
                    Set Reminders
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

export default Planner;
