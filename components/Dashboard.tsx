'use client';

import { useState } from 'react';
import { DynamicPricingCard } from './DynamicPricingCard';
import { MarketCard } from './MarketCard';
import { CreatorProfileHeader } from './CreatorProfileHeader';
import { StreamIntegrationFrame } from './StreamIntegrationFrame';
import { MOCK_MARKETS, MOCK_CREATORS } from '@/lib/constants';
import { Plus, BarChart3, Users } from 'lucide-react';

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<'markets' | 'create' | 'analytics'>('markets');
  const activeMarkets = MOCK_MARKETS.filter(market => market.status === 'active');
  const closedMarkets = MOCK_MARKETS.filter(market => market.status === 'closed');

  return (
    <div className="max-w-[600px] mx-auto px-4 py-6 space-y-6">
      {/* Creator Profile */}
      <CreatorProfileHeader creator={MOCK_CREATORS[0]} />
      
      {/* Dynamic Pricing Overview */}
      <DynamicPricingCard />
      
      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-surface rounded-lg p-1">
        <button
          onClick={() => setActiveTab('markets')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'markets'
              ? 'bg-primary text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Markets</span>
        </button>
        <button
          onClick={() => setActiveTab('create')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'create'
              ? 'bg-primary text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Create</span>
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'analytics'
              ? 'bg-primary text-white'
              : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Analytics</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'markets' && (
        <div className="space-y-6">
          {/* Active Markets */}
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-4">Active Markets</h2>
            <div className="space-y-4">
              {activeMarkets.map((market) => (
                <MarketCard key={market.marketId} market={market} variant="active" />
              ))}
            </div>
          </div>

          {/* Recent Markets */}
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Markets</h2>
            <div className="space-y-4">
              {closedMarkets.map((market) => (
                <MarketCard key={market.marketId} market={market} variant="closed" />
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'create' && (
        <div className="space-y-6">
          <StreamIntegrationFrame />
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="card">
          <h2 className="text-lg font-semibold text-text-primary mb-4">Analytics Dashboard</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-secondary text-sm">Total Volume</p>
              <p className="text-2xl font-bold text-text-primary">$67,650</p>
            </div>
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-secondary text-sm">Active Bets</p>
              <p className="text-2xl font-bold text-text-primary">79</p>
            </div>
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-secondary text-sm">Win Rate</p>
              <p className="text-2xl font-bold text-accent">68%</p>
            </div>
            <div className="bg-surface-light rounded-lg p-4">
              <p className="text-text-secondary text-sm">Followers</p>
              <p className="text-2xl font-bold text-text-primary">2.4K</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
