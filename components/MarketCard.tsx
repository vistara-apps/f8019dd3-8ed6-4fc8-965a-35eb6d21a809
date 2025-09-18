'use client';

import { useState } from 'react';
import { Clock, Users, DollarSign, TrendingUp } from 'lucide-react';
import { calculateTimeRemaining, formatTokens } from '@/lib/utils';
import { BettingModal } from './BettingModal';
import type { PredictionMarket } from '@/lib/types';

interface MarketCardProps {
  market: PredictionMarket;
  variant?: 'active' | 'closed';
}

export function MarketCard({ market, variant = 'active' }: MarketCardProps) {
  const [showBettingModal, setShowBettingModal] = useState(false);
  const timeRemaining = calculateTimeRemaining(market.closingTime);
  const isActive = variant === 'active' && market.status === 'active';

  return (
    <>
      <div className={`card hover:bg-surface-light transition-colors duration-200 ${
        isActive ? 'border-accent/30' : ''
      }`}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-medium text-text-primary mb-1 line-clamp-2">
              {market.title}
            </h4>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{timeRemaining}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{market.participantCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>{formatTokens(market.totalPool)} CBT</span>
              </div>
            </div>
          </div>
          
          {isActive && (
            <div className="flex items-center gap-1 text-accent text-xs">
              <TrendingUp className="w-3 h-3" />
              <span>Live</span>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          {market.outcomeOptions.slice(0, 2).map((option, index) => (
            <div
              key={index}
              className="bg-gray-700/50 rounded-md p-2 text-center"
            >
              <div className="text-xs text-text-muted mb-1">{option}</div>
              <div className="text-sm font-medium text-text-primary">
                {Math.random() > 0.5 ? '2.1x' : '1.8x'}
              </div>
            </div>
          ))}
        </div>
        
        {market.outcomeOptions.length > 2 && (
          <div className="text-xs text-text-muted mb-3">
            +{market.outcomeOptions.length - 2} more options
          </div>
        )}
        
        {isActive ? (
          <button
            onClick={() => setShowBettingModal(true)}
            className="w-full btn-primary text-sm"
          >
            Place Bet
          </button>
        ) : (
          <div className="w-full bg-gray-700 text-text-muted text-sm py-2 rounded-md text-center">
            Market Closed
          </div>
        )}
      </div>
      
      {showBettingModal && (
        <BettingModal
          market={market}
          onClose={() => setShowBettingModal(false)}
        />
      )}
    </>
  );
}
