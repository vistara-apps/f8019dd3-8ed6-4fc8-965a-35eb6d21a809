import type { Creator, PredictionMarket, MarketBet, Participant } from './types';

// In-memory data store (production-ready for database integration)
class DataStore {
  private markets: Map<string, PredictionMarket> = new Map();
  private bets: Map<string, MarketBet> = new Map();
  private participants: Map<string, Participant> = new Map();
  private creators: Map<string, Creator> = new Map();

  // Market operations
  createMarket(market: PredictionMarket): void {
    this.markets.set(market.marketId, market);
  }

  getMarket(marketId: string): PredictionMarket | undefined {
    return this.markets.get(marketId);
  }

  getAllMarkets(): PredictionMarket[] {
    return Array.from(this.markets.values());
  }

  getActiveMarkets(): PredictionMarket[] {
    return this.getAllMarkets().filter(market =>
      market.status === 'active' && market.closingTime > new Date()
    );
  }

  updateMarket(marketId: string, updates: Partial<PredictionMarket>): void {
    const market = this.markets.get(marketId);
    if (market) {
      this.markets.set(marketId, { ...market, ...updates });
    }
  }

  // Bet operations
  createBet(bet: MarketBet): void {
    this.bets.set(bet.betId, bet);
  }

  getBetsByMarket(marketId: string): MarketBet[] {
    return Array.from(this.bets.values()).filter(bet => bet.marketId === marketId);
  }

  getBetsByParticipant(participantId: string): MarketBet[] {
    return Array.from(this.bets.values()).filter(bet => bet.participantId === participantId);
  }

  // Participant operations
  createParticipant(participant: Participant): void {
    this.participants.set(participant.participantId, participant);
  }

  getParticipant(participantId: string): Participant | undefined {
    return this.participants.get(participantId);
  }

  updateParticipantBalance(participantId: string, amount: number): void {
    const participant = this.participants.get(participantId);
    if (participant) {
      participant.tokenBalance += amount;
      this.participants.set(participantId, participant);
    }
  }

  // Creator operations
  createCreator(creator: Creator): void {
    this.creators.set(creator.creatorId, creator);
  }

  getCreator(creatorId: string): Creator | undefined {
    return this.creators.get(creatorId);
  }

  // Initialize with sample data
  initializeSampleData(): void {
    // Sample creator
    const creator: Creator = {
      creatorId: 'creator1',
      platformUsername: 'creator1',
      platformId: 'platform1',
      tokenBalance: 10000,
      createdAt: new Date(),
    };
    this.createCreator(creator);

    // Sample participant
    const participant: Participant = {
      participantId: 'participant1',
      farcasterId: 'fc1',
      baseWalletAddress: '0x123...',
      createdAt: new Date(),
      tokenBalance: 1000,
    };
    this.createParticipant(participant);

    // Sample markets
    const markets: PredictionMarket[] = [
      {
        marketId: 'market1',
        creatorId: 'creator1',
        title: 'Will stream hit 1000 viewers?',
        outcomeOptions: ['Yes', 'No'],
        status: 'active',
        openingTime: new Date(),
        closingTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        createdAt: new Date(),
        totalPool: 1250,
        participantCount: 47,
      },
      {
        marketId: 'market2',
        creatorId: 'creator1',
        title: 'Next game outcome?',
        outcomeOptions: ['Win', 'Loss', 'Draw'],
        status: 'active',
        openingTime: new Date(),
        closingTime: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes
        createdAt: new Date(),
        totalPool: 890,
        participantCount: 32,
      },
    ];

    markets.forEach(market => this.createMarket(market));
  }
}

// Export singleton instance
export const store = new DataStore();

// Initialize sample data
store.initializeSampleData();

