'use client';

import { useMiniKit } from '@coinbase/minikit';
import { Wallet, User, TrendingUp } from 'lucide-react';

export function Header() {
  const { user } = useMiniKit();

  return (
    <header className="border-b border-gray-600 bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-[600px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">CreatorBet</h1>
              <p className="text-xs text-text-muted">Predict & Earn</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-surface border border-gray-600 rounded-lg px-3 py-2">
              <Wallet className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">2,450 CBT</span>
            </div>
            
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
