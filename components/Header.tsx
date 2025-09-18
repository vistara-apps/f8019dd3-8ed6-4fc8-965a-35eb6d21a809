'use client';

import { WalletConnect } from './WalletConnect';
import { TrendingUp } from 'lucide-react';

export function Header() {
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

          <WalletConnect />
        </div>
      </div>
    </header>
  );
}
