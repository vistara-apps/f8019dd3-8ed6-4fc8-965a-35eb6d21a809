'use client';

import { BarChart3, TrendingUp } from 'lucide-react';

export function DynamicPricingChart() {
  const priceData = [
    { time: '12:00', price: 1850.30, volume: 45 },
    { time: '13:00', price: 1920.60, volume: 62 },
    { time: '14:00', price: 1875.20, volume: 38 },
    { time: '15:00', price: 2100.80, volume: 78 },
    { time: '16:00', price: 2250.40, volume: 95 },
  ];

  const maxPrice = Math.max(...priceData.map(d => d.price));
  const maxVolume = Math.max(...priceData.map(d => d.volume));

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-semibold text-text-primary">Dynamic Pricing</h3>
        </div>
        <div className="flex items-center gap-1 text-accent text-sm">
          <TrendingUp className="w-4 h-4" />
          <span>+15.2%</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-text-muted">Current Rate</span>
          <span className="text-text-primary font-medium">$2,250.40</span>
        </div>
        
        <div className="h-32 flex items-end justify-between gap-2">
          {priceData.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-gray-700 rounded-sm overflow-hidden">
                <div
                  className="chart-gradient rounded-sm transition-all duration-300"
                  style={{
                    height: `${(data.volume / maxVolume) * 80}px`,
                  }}
                />
              </div>
              <span className="text-xs text-text-muted">{data.time}</span>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-gray-600">
          <div className="text-center">
            <div className="text-sm font-medium text-text-primary">$1,850</div>
            <div className="text-xs text-text-muted">Low</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-text-primary">$2,250</div>
            <div className="text-xs text-text-muted">Current</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-text-primary">$2,400</div>
            <div className="text-xs text-text-muted">High</div>
          </div>
        </div>
      </div>
    </div>
  );
}
