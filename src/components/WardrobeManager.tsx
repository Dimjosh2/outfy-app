
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Upload, Search, Filter, Shirt } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface WardrobeItem {
  id: string;
  name: string;
  category: string;
  color: string;
  season: string;
  image_url: string;
  tags: string[];
}

const WardrobeManager = () => {
  const { user } = useAuth();
  const { canPerformAction, usage, tierInfo } = useSubscription();
  const { toast } = useToast();
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'tops',
    color: '',
    season: 'all',
    tags: [] as string[],
  });

  const categories = ['all', 'tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories'];
  const seasons = ['all', 'spring', 'summer', 'autumn', 'winter'];

  useEffect(() => {
    if (user) {
      fetchWardrobeItems();
    }
  }, [user]);

  const fetchWardrobeItems = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('wardrobe_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error('Error fetching wardrobe items:', error);
      toast({
        title: "Error",
        description: "Failed to load wardrobe items",
        variant: "destructive",
      });
    }
  };

  const handleAddItem = async () => {
    if (!user) return;

    if (!canPerformAction('wardrobeItems')) {
      toast({
        title: "Limit Reached",
        description: `You can only have ${tierInfo.limits.wardrobeItems} items on the ${tierInfo.name} plan. Upgrade to add more!`,
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('wardrobe_items')
        .insert({
          user_id: user.id,
          name: newItem.name,
          category: newItem.category,
          color: newItem.color,
          season: newItem.season,
          tags: newItem.tags,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Item added to wardrobe!",
      });

      setNewItem({ name: '', category: 'tops', color: '', season: 'all', tags: [] });
      setShowAddForm(false);
      fetchWardrobeItems();
    } catch (error) {
      console.error('Error adding item:', error);
      toast({
        title: "Error",
        description: "Failed to add item",
        variant: "destructive",
      });
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Usage Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Wardrobe Usage</span>
            <Badge variant="outline">
              {usage.wardrobeItems} / {tierInfo.limits.wardrobeItems === -1 ? '∞' : tierInfo.limits.wardrobeItems}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-outfy-teal h-2 rounded-full transition-all"
              style={{ width: `${tierInfo.limits.wardrobeItems === -1 ? 0 : Math.min((usage.wardrobeItems / tierInfo.limits.wardrobeItems) * 100, 100)}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Add Item Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Item</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Item name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
              <select
                value={newItem.category}
                onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
              <Input
                placeholder="Color"
                value={newItem.color}
                onChange={(e) => setNewItem({ ...newItem, color: e.target.value })}
              />
              <select
                value={newItem.season}
                onChange={(e) => setNewItem({ ...newItem, season: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                {seasons.map(season => (
                  <option key={season} value={season}>{season.charAt(0).toUpperCase() + season.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleAddItem}>Add Item</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search wardrobe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        <Button 
          onClick={() => setShowAddForm(true)}
          disabled={!canPerformAction('wardrobeItems')}
          className="bg-outfy-coral hover:bg-outfy-coral/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Items Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="w-full h-32 bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <Shirt className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <h4 className="font-medium mb-1">{item.name}</h4>
              <div className="flex flex-wrap gap-1 mb-2">
                <Badge variant="outline" className="text-xs">{item.category}</Badge>
                {item.color && <Badge variant="outline" className="text-xs">{item.color}</Badge>}
                {item.season !== 'all' && <Badge variant="outline" className="text-xs">{item.season}</Badge>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card className="text-center py-16">
          <CardContent>
            <Shirt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              {items.length === 0 
                ? "Start building your digital wardrobe by adding your first item!"
                : "Try adjusting your search or filters to find items."
              }
            </p>
            {items.length === 0 && (
              <Button 
                onClick={() => setShowAddForm(true)}
                disabled={!canPerformAction('wardrobeItems')}
                className="bg-outfy-teal hover:bg-outfy-teal/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Item
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WardrobeManager;
