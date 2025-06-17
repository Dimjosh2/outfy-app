
import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Shirt, Search, Filter } from "lucide-react";

const Wardrobe = () => {
  const categories = [
    { name: "Tops", count: 24, icon: "👕" },
    { name: "Bottoms", count: 18, icon: "👖" },
    { name: "Dresses", count: 12, icon: "👗" },
    { name: "Outerwear", count: 8, icon: "🧥" },
    { name: "Shoes", count: 15, icon: "👠" },
    { name: "Accessories", count: 32, icon: "👜" },
  ];

  return (
    <div className="min-h-screen bg-outfy-light">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wardrobe</h1>
              <p className="text-gray-600">Organize and manage your clothing collection</p>
            </div>
            <Button className="bg-outfy-coral hover:bg-outfy-coral/90 text-white mt-4 md:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search your wardrobe..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-outfy-teal"
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </Button>
          </div>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{category.icon}</span>
                      <div>
                        <h3 className="font-semibold text-gray-900 group-hover:text-outfy-teal transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-500">{category.count} items</p>
                      </div>
                    </div>
                    <Shirt className="w-5 h-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          <Card className="text-center py-16">
            <CardContent>
              <div className="text-6xl mb-4">👗</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Building Your Digital Wardrobe</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Upload photos of your clothes to get personalized outfit suggestions from our AI
              </p>
              <Button className="bg-outfy-teal hover:bg-outfy-teal/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Item
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Wardrobe;
