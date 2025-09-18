'use client';

import { TrendingUp, Users, Target, Zap } from 'lucide-react';
import { formatCurrency, formatTokens } from '@/lib/utils';

export function StatsOverview() {
  const stats = [
    {
      label: 'Total Earnings',
      value: formatCurrency(67630),
      icon: TrendingUp,
      change: '+12.5%',
      positive: true,
    },
    {
      label: 'Active Markets',
      value: '12',
      icon: Target,
      change: '+3',
      positive: true,
    },
    {
      label: 'Participants',
      value: formatTokens(1847),
      icon: Users,
      change: '+156',
      positive: true,
    },
    {
      label: 'Engagement',
      value: '78.5%',
      icon: Zap,
      change: '+5.2%',
      positive: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card animate-fade-in">
          <div className="flex items-center justify-between mb-2">
            <stat.icon className="w-5 h-5 text-accent" />
            <span className={`text-xs font-medium ${
              stat.positive ? 'text-accent' : 'text-red-400'
            }`}>
              {stat.change}
            </span>
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {stat.value}
          </div>
          <div className="text-xs text-text-muted">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
