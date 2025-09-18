'use client';

import { useMiniKit } from '@coinbase/minikit';
import { Wallet, TrendingUp } from 'lucide-react';

export function Header() {
  const { context } = useMiniKit();

  return (
    <header className="bg-surface border-b border-gray-700">
      <div className="max-w-[600px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">CreatorBet</h1>
              <p className="text-xs text-text-secondary">Predict & Earn</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">
                {context?.user?.displayName || 'Guest'}
              </p>
              <p className="text-xs text-text-secondary">1,250 CBT</p>
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Wallet className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
