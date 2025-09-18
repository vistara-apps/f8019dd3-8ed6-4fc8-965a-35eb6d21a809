# CreatorBet

**Predict, Engage, and Earn on Creator Streams**

CreatorBet is a tokenized prediction market platform that enables creators to host instant prediction markets tied to their live content. Built with Next.js, TypeScript, and integrated with the Base blockchain network.

## 🚀 Features

### Core Functionality
- **Instant Prediction Markets**: Creators can quickly set up prediction markets linked to events within their live streams
- **Dynamic Pricing & Rewards**: Algorithm-based pricing that adjusts based on real-time engagement, creator performance, and market demand
- **In-Stream Integration**: Seamless integration into popular streaming platforms for direct participation
- **Creator Onboarding Dashboard**: Simple interface for creators to manage their profiles and markets
- **Tokenized Rewards**: Participants earn tokens for correct predictions with automated payouts

### Technical Features
- **Base Network Integration**: Full blockchain integration for secure token transfers and on-chain settlements
- **Real-time Updates**: Live market data and pricing updates
- **Wallet Integration**: Support for Base-compatible wallets
- **Farcaster Identity**: Social graph integration for seamless user experience
- **Production Ready**: Error handling, logging, rate limiting, and security middleware

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base Network, Wagmi, Viem
- **Database**: Prisma ORM with SQLite (development) / PostgreSQL (production)
- **State Management**: TanStack Query for server state
- **Icons**: Lucide React
- **Validation**: Zod for type-safe validation

## 📁 Project Structure

```
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── analytics/           # Analytics endpoints
│   │   ├── bets/                # Bet management
│   │   ├── markets/             # Market management
│   │   └── users/               # User management
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── providers.tsx            # Context providers
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── ActiveMarkets.tsx        # Active markets display
│   ├── BettingModal.tsx         # Bet placement interface
│   ├── CreateMarketModal.tsx    # Market creation form
│   ├── CreatorLeaderboard.tsx   # Creator rankings
│   ├── Dashboard.tsx            # Creator dashboard
│   ├── DynamicPricingChart.tsx  # Pricing visualization
│   ├── Header.tsx               # App header with wallet
│   ├── MarketCard.tsx           # Market display card
│   ├── StatsOverview.tsx        # Statistics dashboard
│   └── WalletConnect.tsx        # Wallet connection component
├── lib/                         # Utility libraries
│   ├── hooks/                   # Custom React hooks
│   │   ├── useDynamicPricing.ts # Pricing calculations
│   │   ├── useRealtimeUpdates.ts# Real-time data
│   │   └── useWallet.ts         # Wallet management
│   ├── repositories/            # Data access layer
│   │   ├── betRepository.ts     # Bet operations
│   │   └── marketRepository.ts  # Market operations
│   ├── services/                # Business logic
│   │   ├── betService.ts        # Bet management
│   │   ├── marketService.ts     # Market operations
│   │   ├── pricingService.ts    # Dynamic pricing
│   │   ├── rewardService.ts     # Token rewards
│   │   └── tokenService.ts      # Token operations
│   ├── db.ts                    # Database connection
│   ├── errorHandler.ts          # Error handling utilities
│   ├── logger.ts                # Logging system
│   ├── types.ts                 # TypeScript definitions
│   └── utils.ts                 # Utility functions
├── prisma/                      # Database schema
│   └── schema.prisma            # Prisma schema
├── middleware.ts                # Next.js middleware
├── tailwind.config.js           # Tailwind configuration
└── package.json                 # Dependencies and scripts
```

## 🗄️ Database Schema

### Entities

#### Creator
- `creatorId`: Unique identifier
- `platformUsername`: Streaming platform username
- `platformId`: Platform-specific ID
- `tokenBalance`: Current token balance
- `createdAt`: Account creation timestamp

#### PredictionMarket
- `marketId`: Unique market identifier
- `creatorId`: Creator who created the market
- `title`: Market title/description
- `outcomeOptions`: Array of possible outcomes
- `status`: Market status (active, closed, resolved)
- `openingTime`: When betting opens
- `closingTime`: When betting closes
- `totalPool`: Total tokens in the pool
- `participantCount`: Number of participants

#### MarketBet
- `betId`: Unique bet identifier
- `marketId`: Associated market
- `participantId`: User who placed the bet
- `chosenOutcome`: Selected outcome
- `betAmount`: Tokens bet
- `payout`: Final payout amount (null if unresolved)

#### Participant
- `participantId`: Unique user identifier
- `farcasterId`: Farcaster identity
- `baseWalletAddress`: Base wallet address
- `tokenBalance`: Current token balance

## 🔧 Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd creatorbet
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma db push
   ```

4. **Configure environment variables**
   Create a `.env` file with:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` (or the port shown in the terminal)

## 🎨 Design System

### Colors
- **Primary**: `hsl(240, 80%, 60%)` - Main brand color
- **Accent**: `hsl(160, 100%, 50%)` - Success/highlight color
- **Background**: `hsl(220, 25%, 12%)` - Dark background
- **Surface**: `hsl(220, 25%, 18%)` - Card/component backgrounds

### Typography
- **Display**: `text-4xl font-bold` - Headlines
- **Body**: `text-base font-normal` - Regular text

### Spacing & Layout
- **Grid**: 12-column fluid grid with 16px gutter
- **Container**: `max-w-[600px] mx-auto px-4`
- **Spacing Scale**: 8px, 12px, 20px increments

## 🔐 Security Features

- **Rate Limiting**: API endpoints protected with configurable rate limits
- **Input Validation**: Comprehensive validation using Zod schemas
- **Error Handling**: Centralized error handling with user-friendly messages
- **Logging**: Structured logging for monitoring and debugging
- **CORS**: Configured CORS policies for API security
- **Security Headers**: XSS protection, content type sniffing prevention

## 🚀 API Endpoints

### Markets
- `GET /api/markets` - List active markets
- `POST /api/markets` - Create new market
- `GET /api/markets/[marketId]` - Get market details
- `PUT /api/markets/[marketId]` - Update market (resolve/close)

### Bets
- `GET /api/bets` - List bets (by market or participant)
- `POST /api/bets` - Place new bet

### Users
- `GET /api/users` - Get user profile and stats
- `POST /api/users` - Register/update user

### Analytics
- `GET /api/analytics` - Get platform analytics

## 🎯 Dynamic Pricing Algorithm

The platform uses a sophisticated algorithm to calculate market access prices:

**Factors:**
- **Engagement**: Based on participant count and activity
- **Demand**: Recent betting activity and market momentum
- **Creator Performance**: Historical success rate and audience metrics
- **Time Pressure**: Higher prices as market closing approaches
- **Market Volatility**: Price adjustments based on outcome distribution

**Formula:**
```
Price = Base Price × (1 + Weighted Factors)
```

Where factors are weighted: Engagement (30%), Demand (30%), Performance (20%), Time (10%), Volatility (10%)

## 🏆 Token Economics

- **Betting**: Users stake tokens on market outcomes
- **Rewards**: Winners receive proportional payouts from the total pool
- **Creator Incentives**: Creators earn from platform fees and successful markets
- **Token Utility**: Used for betting, governance, and premium features

## 🔄 Real-time Features

- **Live Pricing**: Dynamic price updates every 30 seconds
- **Market Updates**: Real-time participant counts and pool sizes
- **Bet Confirmations**: Instant feedback on bet placements
- **Resolution Notifications**: Automatic reward distribution on market close

## 📱 User Flows

### Creator Onboarding
1. Connect wallet and verify Farcaster identity
2. Complete creator profile setup
3. Access dashboard for market creation

### Market Creation
1. Define market title and possible outcomes
2. Set opening and closing times
3. Link to live stream (optional)
4. Publish market to audience

### Audience Participation
1. View active markets in stream or app
2. Review market details and current odds
3. Place bet using wallet connection
4. Track bets and receive rewards

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deployment

### Environment Variables
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID="your-project-id"
```

### Build Commands
```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built on the Base network for fast, low-cost transactions
- Inspired by prediction markets and creator economy platforms
- Thanks to the Farcaster community for identity primitives

---

**CreatorBet** - Revolutionizing creator monetization through predictive engagement! 🎯

