# CreatorBet - Base Mini App

CreatorBet enables creators to host instant prediction markets tied to their live content, with dynamic pricing and tokenized rewards for their audience.

## Features

- **Instant Prediction Markets**: Creators can quickly set up prediction markets linked to events within their live streams
- **Dynamic Pricing & Rewards**: Algorithm-based pricing and tokenized reward system
- **In-Stream Integration**: Seamless integration into streaming platforms
- **Creator Dashboard**: Simple interface for creators to manage markets and earnings

## Tech Stack

- Next.js 15 with App Router
- TypeScript
- Tailwind CSS
- MiniKit (Base Mini App framework)
- OnchainKit (Coinbase)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.local.example .env.local
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                 # Next.js App Router
├── components/          # React components
├── lib/                 # Utilities and types
├── public/              # Static assets
└── README.md
```

## Key Components

- **Dashboard**: Main interface showing stats, charts, and active markets
- **MarketCard**: Individual prediction market display
- **BettingModal**: Interface for placing bets
- **CreateMarketModal**: Creator interface for setting up new markets
- **DynamicPricingChart**: Real-time pricing visualization

## Environment Variables

- `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key

## Deployment

This app is designed to be deployed as a Base Mini App. Follow the Base Mini App deployment guidelines for production deployment.
