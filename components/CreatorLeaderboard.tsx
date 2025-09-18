'use client';

import { Crown, TrendingUp, Users } from 'lucide-react';
import { formatTokens } from '@/lib/utils';

export function CreatorLeaderboard() {
  const creators = [
    {
      id: '1',
      username: 'StreamerAlpha',
      avatar: '🎮',
      earnings: 12450,
      markets: 8,
      participants: 234,
      rank: 1,
    },
    {
      id: '2',
      username: 'CryptoGamer',
      avatar: '🚀',
      earnings: 9870,
      markets: 6,
      participants: 189,
      rank: 2,
    },
    {
      id: '3',
      username: 'TechStreamer',
      avatar: '💻',
      earnings: 7650,
      markets: 5,
      participants: 156,
      rank: 3,
    },
    {
      id: '4',
      username: 'ArtistLive',
      avatar: '🎨',
      earnings: 6420,
      markets: 4,
      participants: 123,
      rank: 4,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Crown className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-text-primary">Creator Leaderboard</h3>
      </div>
      
      <div className="space-y-2">
        {creators.map((creator) => (
          <div
            key={creator.id}
            className="card hover:bg-surface-light transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  creator.rank === 1 ? 'bg-yellow-500 text-black' :
                  creator.rank === 2 ? 'bg-gray-400 text-black' :
                  creator.rank === 3 ? 'bg-amber-600 text-black' :
                  'bg-gray-600 text-white'
                }`}>
                  {creator.rank}
                </div>
                <div className="text-lg">{creator.avatar}</div>
              </div>
              
              <div className="flex-1">
                <div className="font-medium text-text-primary">
                  {creator.username}
                </div>
                <div className="flex items-center gap-3 text-xs text-text-muted">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{formatTokens(creator.earnings)} CBT</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    <span>{creator.participants}</span>
                  </div>
                  <span>{creator.markets} markets</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-accent">
                  {formatTokens(creator.earnings)}
                </div>
                <div className="text-xs text-text-muted">CBT earned</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
