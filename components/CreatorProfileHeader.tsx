'use client';

import { Creator } from '@/lib/types';
import { formatTokens } from '@/lib/utils';
import { Star, Users, TrendingUp } from 'lucide-react';

interface CreatorProfileHeaderProps {
  creator: Creator;
}

export function CreatorProfileHeader({ creator }: CreatorProfileHeaderProps) {
  return (
    <div className="card">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-white">
            {creator.platformUsername.charAt(0)}
          </span>
        </div>
        
        <div className="flex-1">
          <h2 className="text-xl font-bold text-text-primary">{creator.platformUsername}</h2>
          <p className="text-text-secondary text-sm mb-2">Creator • Live Now</p>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1 text-accent">
              <Star className="w-4 h-4" />
              <span>{formatTokens(creator.tokenBalance)} CBT</span>
            </div>
            <div className="flex items-center space-x-1 text-text-secondary">
              <Users className="w-4 h-4" />
              <span>2.4K followers</span>
            </div>
            <div className="flex items-center space-x-1 text-text-secondary">
              <TrendingUp className="w-4 h-4" />
              <span>850 viewers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
