
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Shirt, Calendar, Heart } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-outfy-light to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-outfy-teal/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-outfy-coral/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-outfy-teal/20 rounded-full px-6 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-outfy-teal" />
            <span className="text-sm font-medium text-gray-600">AI-Powered Fashion Assistant</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Personal
            <span className="block bg-gradient-to-r from-outfy-teal to-emerald-600 bg-clip-text text-transparent">
              Style Assistant
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Never wonder what to wear again. Outfy's AI creates perfect outfits 
            tailored to your style, weather, and occasions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/signup">
              <Button size="lg" className="bg-outfy-coral hover:bg-outfy-coral/90 text-white px-8 py-4 text-lg group">
                Start Styling Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="border-outfy-teal text-outfy-teal hover:bg-outfy-teal hover:text-white px-8 py-4 text-lg">
                See How It Works
              </Button>
            </Link>
          </div>

          {/* Feature preview cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto animate-scale-in">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-outfy-teal/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Sparkles className="w-6 h-6 text-outfy-teal" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI Suggestions</h3>
              <p className="text-gray-600 text-sm">Smart outfit recommendations based on weather and occasions</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-outfy-coral/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shirt className="w-6 h-6 text-outfy-coral" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Virtual Wardrobe</h3>
              <p className="text-gray-600 text-sm">Organize and manage your clothes digitally</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 hover:scale-105 transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Calendar className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Outfit Planning</h3>
              <p className="text-gray-600 text-sm">Plan your looks for the entire week ahead</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
