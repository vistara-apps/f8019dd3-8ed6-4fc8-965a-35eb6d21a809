'use client';

import { useState, useEffect } from 'react';
import { MarketCard } from './MarketCard';
import { Target, Loader2, RefreshCw } from 'lucide-react';
import type { PredictionMarket } from '@/lib/types';

export function ActiveMarkets() {
  const [markets, setMarkets] = useState<PredictionMarket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarkets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/markets?status=active');
      const data = await response.json();

      if (data.success) {
        setMarkets(data.data);
      } else {
        setError(data.error || 'Failed to fetch markets');
      }
    } catch (err) {
      console.error('Error fetching markets:', err);
      setError('Failed to load markets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarkets();
  }, []);

  const handleRefresh = () => {
    fetchMarkets();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-text-primary">Active Markets</h3>
          {!loading && !error && (
            <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded-full">
              {markets.length}
            </span>
          )}
        </div>

        <button
          onClick={handleRefresh}
          disabled={loading}
          className="p-2 text-muted-foreground hover:text-text-primary disabled:opacity-50"
          title="Refresh markets"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-accent" />
          <span className="ml-2 text-muted-foreground">Loading markets...</span>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/90"
          >
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && markets.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No active markets available.</p>
          <p className="text-sm text-muted-foreground mt-2">
            Check back later for new prediction markets!
          </p>
        </div>
      )}

      {!loading && !error && markets.length > 0 && (
        <div className="space-y-3">
          {markets.map((market) => (
            <MarketCard key={market.marketId} market={market} />
          ))}
        </div>
      )}
    </div>
  );
}
