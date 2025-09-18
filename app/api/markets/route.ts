import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import type { PredictionMarket } from '@/lib/types';

// GET /api/markets - Get all markets
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const creatorId = searchParams.get('creatorId');

    let markets = store.getAllMarkets();

    if (status) {
      markets = markets.filter(market => market.status === status);
    }

    if (creatorId) {
      markets = markets.filter(market => market.creatorId === creatorId);
    }

    return NextResponse.json({
      success: true,
      data: markets,
    });
  } catch (error) {
    console.error('Error fetching markets:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch markets' },
      { status: 500 }
    );
  }
}

// POST /api/markets - Create a new market
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, outcomeOptions, duration, creatorId } = body;

    if (!title || !outcomeOptions || !creatorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const creator = store.getCreator(creatorId);
    if (!creator) {
      return NextResponse.json(
        { success: false, error: 'Creator not found' },
        { status: 404 }
      );
    }

    const marketId = `market_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const closingTime = new Date(Date.now() + (duration || 60) * 60 * 1000); // Default 1 hour

    const market: PredictionMarket = {
      marketId,
      creatorId,
      title,
      outcomeOptions,
      status: 'active',
      openingTime: new Date(),
      closingTime,
      createdAt: new Date(),
      totalPool: 0,
      participantCount: 0,
    };

    store.createMarket(market);

    return NextResponse.json({
      success: true,
      data: market,
    });
  } catch (error) {
    console.error('Error creating market:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create market' },
      { status: 500 }
    );
  }
}

