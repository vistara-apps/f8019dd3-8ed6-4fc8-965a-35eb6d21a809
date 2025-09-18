import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatTokens(amount: number): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K`;
  }
  return amount.toString();
}

export function calculateDynamicPrice(
  basePrice: number,
  engagement: number,
  demand: number
): number {
  const engagementMultiplier = 1 + (engagement / 100);
  const demandMultiplier = 1 + (demand / 100);
  return basePrice * engagementMultiplier * demandMultiplier;
}

export function getTimeRemaining(endTime: Date): string {
  const now = new Date();
  const diff = endTime.getTime() - now.getTime();

  if (diff <= 0) return 'Ended';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  return `${minutes}m`;
}

// Enhanced business logic functions for CreatorBet
import { store } from './store';

/**
 * Calculate odds for each outcome in a market
 * @param marketId - The market ID
 * @returns Object with odds for each outcome
 */
export function calculateOdds(marketId: string): Record<string, number> {
  const market = store.getMarket(marketId);
  if (!market) return {};

  const bets = store.getBetsByMarket(marketId);
  const totalPool = bets.reduce((sum, bet) => sum + bet.betAmount, 0);

  if (totalPool === 0) {
    // Equal odds if no bets
    const equalOdds = 1 / market.outcomeOptions.length;
    return market.outcomeOptions.reduce((acc, option) => {
      acc[option] = equalOdds;
      return acc;
    }, {} as Record<string, number>);
  }

  // Calculate odds based on bet distribution
  const odds: Record<string, number> = {};
  market.outcomeOptions.forEach(option => {
    const optionBets = bets.filter(bet => bet.chosenOutcome === option);
    const optionPool = optionBets.reduce((sum, bet) => sum + bet.betAmount, 0);
    odds[option] = optionPool > 0 ? optionPool / totalPool : 0.1; // Minimum odds
  });

  return odds;
}

/**
 * Calculate potential payout for a bet
 * @param marketId - The market ID
 * @param outcome - The chosen outcome
 * @param betAmount - The bet amount
 * @returns Potential payout amount
 */
export function calculatePotentialPayout(marketId: string, outcome: string, betAmount: number): number {
  const odds = calculateOdds(marketId);
  const outcomeOdds = odds[outcome] || 0.1;

  // House takes 5% fee
  const houseFee = 0.05;
  const payoutMultiplier = (1 / outcomeOdds) * (1 - houseFee);

  return Math.round(betAmount * payoutMultiplier);
}

/**
 * Format tokens for display
 * @param amount - Amount to format
 * @param currency - Currency symbol (default: CBT)
 * @returns Formatted currency string
 */
export function formatTokens(amount: number, currency: string = 'CBT'): string {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M ${currency}`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)}K ${currency}`;
  }
  return `${amount} ${currency}`;
}
