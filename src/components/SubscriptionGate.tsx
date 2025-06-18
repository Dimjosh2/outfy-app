
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Zap, Star } from "lucide-react";
import { subscriptionTiers } from '@/hooks/useSubscription';

interface SubscriptionGateProps {
  currentTier: string;
  onUpgrade: (tier: string) => void;
}

const SubscriptionGate = ({ currentTier, onUpgrade }: SubscriptionGateProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
      {Object.entries(subscriptionTiers).map(([tierKey, tier]) => (
        <Card key={tierKey} className={`relative ${currentTier === tierKey ? 'ring-2 ring-outfy-teal' : ''}`}>
          {tierKey === 'premium' && (
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Most Popular
              </Badge>
            </div>
          )}
          
          <CardHeader className="text-center">
            <div className="flex justify-center mb-2">
              {tierKey === 'free' && <Star className="w-8 h-8 text-gray-500" />}
              {tierKey === 'paid' && <Zap className="w-8 h-8 text-outfy-coral" />}
              {tierKey === 'premium' && <Crown className="w-8 h-8 text-purple-600" />}
            </div>
            <CardTitle className="text-xl">{tier.name}</CardTitle>
            <div className="text-3xl font-bold">
              £{tier.price}
              {tier.price > 0 && <span className="text-sm font-normal text-gray-500">/month</span>}
            </div>
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-2 mb-6">
              {tier.features.map((feature, index) => (
                <li key={index} className="flex items-center text-sm">
                  <span className="w-2 h-2 bg-outfy-teal rounded-full mr-2"></span>
                  {feature}
                </li>
              ))}
            </ul>
            
            {currentTier === tierKey ? (
              <Badge className="w-full justify-center bg-outfy-teal text-white">
                Current Plan
              </Badge>
            ) : (
              <Button 
                className="w-full" 
                onClick={() => onUpgrade(tierKey)}
                variant={tierKey === 'premium' ? 'default' : 'outline'}
              >
                {tierKey === 'free' ? 'Downgrade' : 'Upgrade'}
              </Button>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionGate;
