'use client';

import { MarketCard } from './MarketCard';
import { Target } from 'lucide-react';
import type { PredictionMarket } from '@/lib/types';

export function ActiveMarkets() {
  const markets: PredictionMarket[] = [
    {
      marketId: '1',
      creatorId: 'creator1',
      title: 'Will stream hit 1000 viewers?',
      outcomeOptions: ['Yes', 'No'],
      status: 'active',
      openingTime: new Date(),
      closingTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      createdAt: new Date(),
      totalPool: 1250,
      participantCount: 47,
    },
    {
      marketId: '2',
      creatorId: 'creator2',
      title: 'Next game outcome?',
      outcomeOptions: ['Win', 'Loss', 'Draw'],
      status: 'active',
      openingTime: new Date(),
      closingTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
      createdAt: new Date(),
      totalPool: 890,
      participantCount: 32,
    },
    {
      marketId: '3',
      creatorId: 'creator3',
      title: 'Stream duration prediction',
      outcomeOptions: ['< 2hrs', '2-4hrs', '> 4hrs'],
      status: 'active',
      openingTime: new Date(),
      closingTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
      createdAt: new Date(),
      totalPool: 2100,
      participantCount: 78,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Target className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-text-primary">Active Markets</h3>
        <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
          {markets.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {markets.map((market) => (
          <MarketCard key={market.marketId} market={market} />
        ))}
      </div>
    </div>
  );
}
