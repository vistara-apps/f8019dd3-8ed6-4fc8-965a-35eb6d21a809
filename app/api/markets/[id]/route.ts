import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

// GET /api/markets/[id] - Get market by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const market = store.getMarket(params.id);

    if (!market) {
      return NextResponse.json(
        { success: false, error: 'Market not found' },
        { status: 404 }
      );
    }

    // Get bets for this market
    const bets = store.getBetsByMarket(params.id);

    return NextResponse.json({
      success: true,
      data: {
        ...market,
        bets,
      },
    });
  } catch (error) {
    console.error('Error fetching market:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch market' },
      { status: 500 }
    );
  }
}

// PUT /api/markets/[id] - Update market
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const market = store.getMarket(params.id);

    if (!market) {
      return NextResponse.json(
        { success: false, error: 'Market not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { status, totalPool, participantCount } = body;

    const updates: any = {};
    if (status) updates.status = status;
    if (totalPool !== undefined) updates.totalPool = totalPool;
    if (participantCount !== undefined) updates.participantCount = participantCount;

    store.updateMarket(params.id, updates);

    const updatedMarket = store.getMarket(params.id);

    return NextResponse.json({
      success: true,
      data: updatedMarket,
    });
  } catch (error) {
    console.error('Error updating market:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update market' },
      { status: 500 }
    );
  }
}

