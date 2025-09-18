'use client';

import { useState } from 'react';
import { X, DollarSign, TrendingUp, Users } from 'lucide-react';
import { formatTokens } from '@/lib/utils';
import type { PredictionMarket } from '@/lib/types';

interface BettingModalProps {
  market: PredictionMarket;
  onClose: () => void;
}

export function BettingModal({ market, onClose }: BettingModalProps) {
  const [selectedOutcome, setSelectedOutcome] = useState<string>('');
  const [betAmount, setBetAmount] = useState<string>('');
  const [isPlacing, setIsPlacing] = useState(false);

  const handlePlaceBet = async () => {
    if (!selectedOutcome || !betAmount) return;
    
    setIsPlacing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPlacing(false);
    onClose();
  };

  const potentialPayout = betAmount ? parseFloat(betAmount) * 2.1 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-gray-600 rounded-lg w-full max-w-md animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <h3 className="text-lg font-semibold text-text-primary">Place Bet</h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h4 className="font-medium text-text-primary mb-2">{market.title}</h4>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <div className="flex items-center gap-1">
                <Users className="w-3 h-3" />
                <span>{market.participantCount} participants</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                <span>{formatTokens(market.totalPool)} CBT pool</span>
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Select Outcome
            </label>
            <div className="grid grid-cols-1 gap-2">
              {market.outcomeOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedOutcome(option)}
                  className={`p-3 rounded-md border transition-colors duration-200 ${
                    selectedOutcome === option
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-gray-600 bg-gray-700/50 text-text-primary hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    <div className="flex items-center gap-1 text-xs">
                      <TrendingUp className="w-3 h-3" />
                      <span>2.1x</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Bet Amount (CBT)
            </label>
            <input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              placeholder="Enter amount..."
              className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-text-primary placeholder-text-muted focus:outline-none focus:border-accent"
            />
          </div>
          
          {betAmount && selectedOutcome && (
            <div className="bg-gray-700/50 rounded-md p-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-muted">Potential Payout:</span>
                <span className="text-accent font-medium">
                  {formatTokens(potentialPayout)} CBT
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">Profit:</span>
                <span className="text-accent">
                  +{formatTokens(potentialPayout - parseFloat(betAmount))} CBT
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-600">
          <button
            onClick={handlePlaceBet}
            disabled={!selectedOutcome || !betAmount || isPlacing}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPlacing ? 'Placing Bet...' : 'Place Bet'}
          </button>
        </div>
      </div>
    </div>
  );
}
