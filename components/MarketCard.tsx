'use client';

import { useState } from 'react';
import { Clock, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { PredictionMarket } from '@/lib/types';
import { formatTokens, getTimeRemaining, calculateOdds } from '@/lib/utils';
import { BettingButton } from './BettingButton';

interface MarketCardProps {
  market: PredictionMarket;
  variant: 'active' | 'closed';
}

export function MarketCard({ market, variant }: MarketCardProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string | null>(null);
  const timeRemaining = getTimeRemaining(market.closingTime);
  const isActive = variant === 'active';
  const odds = calculateOdds(market.marketId);

  return (
    <div className={`card ${isActive ? 'border-primary/30' : 'border-gray-700'} animate-fade-in`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-text-primary mb-1">{market.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{timeRemaining}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{market.participantCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>{formatTokens(market.totalPool)}</span>
            </div>
          </div>
        </div>
        
        {!isActive && (
          <div className="flex items-center space-x-1 text-accent">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Closed</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        {market.outcomeOptions.map((outcome, index) => (
          <div key={outcome} className="flex items-center justify-between">
            <BettingButton
              variant={selectedOutcome === outcome ? 'primary' : 'secondary'}
              onClick={() => isActive && setSelectedOutcome(outcome)}
              disabled={!isActive}
              className="flex-1 mr-3"
            >
              {outcome}
            </BettingButton>
            
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">
                {(1 / (odds[outcome] || 0.1)).toFixed(2)}x
              </p>
              <p className="text-xs text-text-secondary">
                {Math.round((odds[outcome] || 0.1) * 100)}%
              </p>
            </div>
          </div>
        ))}
      </div>

      {isActive && selectedOutcome && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-text-secondary">Bet Amount</span>
            <input
              type="number"
              placeholder="0"
              className="input w-20 text-right text-sm"
              min="1"
              max="1000"
            />
          </div>
          
          <button className="btn-primary w-full">
            Place Bet on "{selectedOutcome}"
          </button>
        </div>
      )}
    </div>
  );
}
