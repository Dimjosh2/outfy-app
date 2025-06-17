
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Shirt, Search, Filter, Palette } from "lucide-react";

const Wardrobe = () => {
  const categories = [
    { name: "Tops", count: 24, icon: "👕" },
    { name: "Bottoms", count: 18, icon: "👖" },
    { name: "Dresses", count: 12, icon: "👗" },
    { name: "Suits", count: 6, icon: "🤵" },
    { name: "Outerwear", count: 8, icon: "🧥" },
    { name: "Shoes", count: 15, icon: "👠" },
    { name: "Accessories", count: 32, icon: "👜" },
  ];

  const colorCombinations = [
    { name: "Classic Monochrome", colors: ["#000000", "#FFFFFF", "#808080"], popularity: "95%" },
    { name: "Navy & Cream", colors: ["#1B263B", "#F8F4E6", "#A8DADC"], popularity: "87%" },
    { name: "Earth Tones", colors: ["#8B4513", "#D2B48C", "#228B22"], popularity: "82%" },
    { name: "Pastel Dreams", colors: ["#FFB6C1", "#E6E6FA", "#F0F8FF"], popularity: "78%" },
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

          {/* Color Combinations Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-outfy-teal" />
              <h2 className="text-xl font-semibold text-gray-900">Popular Color Combinations</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {colorCombinations.map((combo, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardContent className="p-4">
                    <div className="flex space-x-2 mb-3">
                      {combo.colors.map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className="w-8 h-8 rounded-full border-2 border-gray-200"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{combo.name}</h3>
                    <p className="text-xs text-gray-500">{combo.popularity} match rate</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
