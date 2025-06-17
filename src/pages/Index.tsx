
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import TrendingWears from "@/components/TrendingWears";
import FeaturedOutfits from "@/components/FeaturedOutfits";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Shirt, TrendingUp } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <HeroSection />
        
        {/* AI Chat Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Chat with Your AI Stylist
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Ask questions, get outfit suggestions, or record a voice note. 
                Your personal fashion assistant is here to help 24/7.
              </p>
            </div>
            <AIChat />
          </div>
        </section>

        {/* Trending Wears Section */}
        <section className="py-16 bg-outfy-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trending from Your Favorite Stores
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover the latest trends from M&S, Zara, Primark, Gucci, and more. 
                Updated daily with weather-matched recommendations and exclusive deals.
              </p>
            </div>
            <TrendingWears />
          </div>
        </section>

        {/* Featured Outfits Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturedOutfits />
          </div>
        </section>

        {/* Quick Access Links */}
        <section className="py-16 bg-gradient-to-br from-outfy-teal/10 to-outfy-coral/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Quick Access
              </h2>
              <p className="text-lg text-gray-600">
                Jump into your fashion journey with these popular features
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Link to="/planner">
                <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="w-16 h-16 bg-outfy-teal/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Calendar className="w-8 h-8 text-outfy-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Plan My Week</h3>
                  <p className="text-gray-600 mb-4">Organize your outfits for the entire week ahead</p>
                  <Button className="bg-outfy-teal hover:bg-outfy-teal/90 text-white">
                    Start Planning
                  </Button>
                </div>
              </Link>

              <Link to="/wardrobe">
                <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="w-16 h-16 bg-outfy-coral/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <Shirt className="w-8 h-8 text-outfy-coral" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Update My Wardrobe</h3>
                  <p className="text-gray-600 mb-4">Add new items and organize your digital closet</p>
                  <Button className="bg-outfy-coral hover:bg-outfy-coral/90 text-white">
                    Manage Wardrobe
                  </Button>
                </div>
              </Link>

              <Link to="/feed">
                <div className="bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">See Style Feed</h3>
                  <p className="text-gray-600 mb-4">Explore personalized trends and inspiration</p>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Browse Feed
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </section>

        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
