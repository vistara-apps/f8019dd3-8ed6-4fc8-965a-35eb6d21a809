export const MOCK_CREATORS = [
  {
    creatorId: '1',
    platformUsername: 'StreamerOne',
    platformId: 'twitch_123',
    tokenBalance: 15420,
    createdAt: new Date('2024-01-15'),
  },
  {
    creatorId: '2',
    platformUsername: 'GamerTwo',
    platformId: 'youtube_456',
    tokenBalance: 8750,
    createdAt: new Date('2024-01-20'),
  },
];

export const MOCK_MARKETS = [
  {
    marketId: '1',
    creatorId: '1',
    title: 'Will StreamerOne hit 1000 viewers?',
    outcomeOptions: ['Yes', 'No'],
    status: 'active' as const,
    openingTime: new Date('2024-01-25T10:00:00Z'),
    closingTime: new Date('2024-01-25T14:00:00Z'),
    createdAt: new Date('2024-01-25T09:00:00Z'),
    totalPool: 2500,
    participantCount: 47,
  },
  {
    marketId: '2',
    creatorId: '1',
    title: 'Next game completion time',
    outcomeOptions: ['Under 2h', '2-4h', 'Over 4h'],
    status: 'active' as const,
    openingTime: new Date('2024-01-25T11:00:00Z'),
    closingTime: new Date('2024-01-25T15:00:00Z'),
    createdAt: new Date('2024-01-25T10:30:00Z'),
    totalPool: 1850,
    participantCount: 32,
  },
  {
    marketId: '3',
    creatorId: '2',
    title: 'Boss fight outcome',
    outcomeOptions: ['Victory', 'Defeat'],
    status: 'closed' as const,
    openingTime: new Date('2024-01-24T16:00:00Z'),
    closingTime: new Date('2024-01-24T18:00:00Z'),
    createdAt: new Date('2024-01-24T15:30:00Z'),
    totalPool: 3200,
    participantCount: 68,
  },
];

export const PRICING_METRICS = {
  basePrice: 10,
  currentEngagement: 85,
  marketDemand: 120,
  totalVolume: 67650,
};
