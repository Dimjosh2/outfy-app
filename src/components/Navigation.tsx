
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles, User, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Wardrobe', path: '/wardrobe' },
    { name: 'Planner', path: '/planner' },
    { name: 'Style Feed', path: '/feed' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-outfy-teal to-emerald-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 group-hover:text-outfy-teal transition-colors">
              Outfy
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? 'bg-outfy-teal text-white shadow-sm'
                    : 'text-gray-600 hover:text-outfy-teal hover:bg-outfy-teal/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-outfy-teal text-outfy-teal hover:bg-outfy-teal hover:text-white">
                    <User className="w-4 h-4 mr-2" />
                    Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="border-outfy-teal text-outfy-teal hover:bg-outfy-teal hover:text-white">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-outfy-coral hover:bg-outfy-coral/90 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="text-gray-600 hover:text-outfy-teal"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.path)
                      ? 'bg-outfy-teal text-white'
                      : 'text-gray-600 hover:text-outfy-teal hover:bg-outfy-teal/10'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                {user ? (
                  <>
                    <Link
                      to="/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button variant="outline" size="sm" className="w-full border-outfy-teal text-outfy-teal hover:bg-outfy-teal hover:text-white">
                        Settings
                      </Button>
                    </Link>
                    <Button 
                      onClick={() => {
                        handleSignOut();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="outline" 
                      size="sm" 
                      className="w-full border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button variant="outline" size="sm" className="w-full border-outfy-teal text-outfy-teal hover:bg-outfy-teal hover:text-white">
                        Sign In
                      </Button>
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full"
                    >
                      <Button size="sm" className="w-full bg-outfy-coral hover:bg-outfy-coral/90 text-white">
                        Get Started
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
