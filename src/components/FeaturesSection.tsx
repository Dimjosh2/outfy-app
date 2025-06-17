
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Cloud, Users, TrendingUp, Calendar, Heart } from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Cloud,
      title: "Weather-Smart Outfits",
      description: "Get outfit suggestions that match the weather forecast, so you're always comfortable and stylish.",
      color: "bg-blue-500/10 text-blue-600"
    },
    {
      icon: Heart,
      title: "Personal Style Learning",
      description: "Our AI learns your preferences and style over time, creating increasingly personalized recommendations.",
      color: "bg-outfy-coral/10 text-outfy-coral"
    },
    {
      icon: Calendar,
      title: "Outfit Calendar",
      description: "Plan your looks for special events, work meetings, or casual days with our intuitive calendar system.",
      color: "bg-emerald-500/10 text-emerald-600"
    },
    {
      icon: TrendingUp,
      title: "Trend Insights",
      description: "Stay current with fashion trends and discover new styles that complement your existing wardrobe.",
      color: "bg-purple-500/10 text-purple-600"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Access your style assistant anywhere, anytime with our responsive mobile-optimized interface.",
      color: "bg-outfy-teal/10 text-outfy-teal"
    },
    {
      icon: Users,
      title: "Style Community",
      description: "Connect with fellow fashion enthusiasts and share outfit inspiration within the Outfy community.",
      color: "bg-orange-500/10 text-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need for
            <span className="block text-outfy-teal">Perfect Outfits</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Outfy combines cutting-edge AI with intuitive design to revolutionize how you approach daily styling
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50/50 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
