
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { User, Shirt, Palette, Bell, Shield, HelpCircle, Moon, Trash2 } from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen bg-outfy-light">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings ⚙️</h1>
            <p className="text-gray-600">Customize Outfy to fit your lifestyle. Update your style profile, manage your wardrobe, and set notifications so you never miss a style update.</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-outfy-teal" />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-outfy-teal to-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">S</span>
                  </div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Sarah Johnson" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="sarah@example.com" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Personalization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-outfy-coral" />
                  <span>AI Personalization</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bodyType">Body Type</Label>
                    <select id="bodyType" className="w-full p-2 border border-gray-200 rounded-lg">
                      <option>Select body type</option>
                      <option>Hourglass</option>
                      <option>Pear</option>
                      <option>Apple</option>
                      <option>Rectangle</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="colorSeason">Color Season</Label>
                    <select id="colorSeason" className="w-full p-2 border border-gray-200 rounded-lg">
                      <option>Select color season</option>
                      <option>Spring</option>
                      <option>Summer</option>
                      <option>Autumn</option>
                      <option>Winter</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="styleGoals">Style Goals</Label>
                  <Input id="styleGoals" placeholder="e.g., Professional, Casual, Trendy" />
                </div>

                <div>
                  <Label htmlFor="preferredColors">Preferred Colors</Label>
                  <div className="flex space-x-2 mt-2">
                    {["#000000", "#FFFFFF", "#26A69A", "#FF7043", "#E91E63", "#3F51B5"].map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer"
                        style={{ backgroundColor: color }}
                      ></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Wardrobe Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shirt className="w-5 h-5 text-emerald-600" />
                  <span>Wardrobe Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Total Items</p>
                    <p className="text-sm text-gray-600">115 pieces in your wardrobe</p>
                  </div>
                  <Button variant="outline">Manage Items</Button>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Auto-categorize new items</p>
                    <p className="text-sm text-gray-600">Let AI organize your uploads</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  <span>Notifications</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: "Daily outfit suggestions", desc: "Get morning outfit recommendations" },
                  { label: "Weather alerts", desc: "Outfit adjustments for weather changes" },
                  { label: "Style feed updates", desc: "New trends and inspiration" },
                  { label: "Outfit reminders", desc: "Prepare outfits the night before" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                    <Switch />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Theme & Privacy */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Moon className="w-5 h-5 text-gray-600" />
                    <span>Theme</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Dark mode</span>
                    <Switch />
                  </div>
                  <div>
                    <Label>Accent Color</Label>
                    <div className="flex space-x-2 mt-2">
                      {["#26A69A", "#FF7043", "#E91E63", "#9C27B0"].map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full border-2 border-gray-200 cursor-pointer"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-red-500" />
                    <span>Privacy & Security</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Data & Privacy
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    Help & Support
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Account
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

export default Settings;
