'use client';

import { TrendingUp, Activity, DollarSign } from 'lucide-react';
import { PRICING_METRICS } from '@/lib/constants';
import { calculateDynamicPrice, formatCurrency } from '@/lib/utils';

export function DynamicPricingCard() {
  const currentPrice = calculateDynamicPrice(
    PRICING_METRICS.basePrice,
    PRICING_METRICS.currentEngagement,
    PRICING_METRICS.marketDemand
  );

  return (
    <div className="card gradient-bg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-text-primary">Dynamic Pricing</h2>
        <div className="flex items-center space-x-1 text-accent">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{formatCurrency(currentPrice)}</p>
          <p className="text-xs text-text-secondary">Current Price</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Activity className="w-5 h-5 text-accent" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{PRICING_METRICS.currentEngagement}%</p>
          <p className="text-xs text-text-secondary">Engagement</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-text-primary">{PRICING_METRICS.marketDemand}%</p>
          <p className="text-xs text-text-secondary">Demand</p>
        </div>
      </div>
      
      <div className="bg-surface-light rounded-lg p-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-text-secondary">Market Volume</span>
          <span className="text-sm font-medium text-text-primary">
            {formatCurrency(PRICING_METRICS.totalVolume)}
          </span>
        </div>
      </div>
    </div>
  );
}
