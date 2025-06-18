
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);
      
      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in.",
        });
        navigate('/dashboard');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-outfy-light to-white">
      <Navigation />
      <main className="pt-24 pb-12">
        <div className="max-w-md mx-auto px-4">
          <Card className="shadow-lg border-0">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-outfy-teal to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-2xl">O</span>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900">Welcome Back</CardTitle>
              <p className="text-gray-600">Sign in to your Outfy account</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <Input 
                    type="password" 
                    placeholder="Enter your password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-outfy-coral hover:bg-outfy-coral/90 text-white"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
              <p className="text-center text-sm text-gray-600 mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="text-outfy-teal hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Login;
