export interface Creator {
  creatorId: string;
  platformUsername: string;
  platformId: string;
  tokenBalance: number;
  createdAt: Date;
}

export interface PredictionMarket {
  marketId: string;
  creatorId: string;
  title: string;
  outcomeOptions: string[];
  status: 'active' | 'closed' | 'pending';
  openingTime: Date;
  closingTime: Date;
  createdAt: Date;
  totalPool: number;
  participantCount: number;
}

export interface MarketBet {
  betId: string;
  marketId: string;
  participantId: string;
  chosenOutcome: string;
  betAmount: number;
  payout?: number;
  createdAt: Date;
}

export interface Participant {
  participantId: string;
  farcasterId: string;
  baseWalletAddress: string;
  createdAt: Date;
  tokenBalance: number;
}

export interface DynamicPricing {
  basePrice: number;
  multiplier: number;
  engagement: number;
  demand: number;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Frame types for Farcaster integration
export interface FrameData {
  version: string;
  imageUrl: string;
  button?: {
    title: string;
    action: {
      type: string;
      name: string;
      url: string;
      splashImageUrl: string;
      splashBackgroundColor: string;
    };
  };
  buttons?: Array<{
    label: string;
    action: string;
    target: string;
  }>;
}
