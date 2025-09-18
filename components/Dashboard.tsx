'use client';

import { useState } from 'react';
import { StatsOverview } from './StatsOverview';
import { DynamicPricingChart } from './DynamicPricingChart';
import { ActiveMarkets } from './ActiveMarkets';
import { CreatorLeaderboard } from './CreatorLeaderboard';
import { CreateMarketModal } from './CreateMarketModal';
import { Plus } from 'lucide-react';

export function Dashboard() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="max-w-[600px] mx-auto px-4 py-6 space-y-6">
      {/* Stats Overview */}
      <StatsOverview />
      
      {/* Dynamic Pricing Chart */}
      <DynamicPricingChart />
      
      {/* Quick Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex-1 btn-primary flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Market
        </button>
        <button className="flex-1 btn-secondary">
          Join Stream
        </button>
      </div>
      
      {/* Active Markets */}
      <ActiveMarkets />
      
      {/* Creator Leaderboard */}
      <CreatorLeaderboard />
      
      {/* Create Market Modal */}
      {showCreateModal && (
        <CreateMarketModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
