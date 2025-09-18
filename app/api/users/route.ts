import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import type { Participant } from '@/lib/types';

// GET /api/users - Get user by ID or create if doesn't exist
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const farcasterId = searchParams.get('farcasterId');
    const participantId = searchParams.get('participantId');

    if (!farcasterId && !participantId) {
      return NextResponse.json(
        { success: false, error: 'Either farcasterId or participantId is required' },
        { status: 400 }
      );
    }

    let participant: Participant | undefined;

    if (participantId) {
      participant = store.getParticipant(participantId);
    } else if (farcasterId) {
      // Find participant by farcasterId
      const allParticipants = Array.from(store['participants'].values());
      participant = allParticipants.find(p => p.farcasterId === farcasterId);
    }

    if (!participant) {
      return NextResponse.json(
        { success: false, error: 'Participant not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: participant,
    });
  } catch (error) {
    console.error('Error fetching participant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch participant' },
      { status: 500 }
    );
  }
}

// POST /api/users - Create or update a participant
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { farcasterId, baseWalletAddress } = body;

    if (!farcasterId || !baseWalletAddress) {
      return NextResponse.json(
        { success: false, error: 'farcasterId and baseWalletAddress are required' },
        { status: 400 }
      );
    }

    // Check if participant already exists
    const existingParticipants = Array.from(store['participants'].values());
    let participant = existingParticipants.find(p => p.farcasterId === farcasterId);

    if (participant) {
      // Update existing participant
      participant.baseWalletAddress = baseWalletAddress;
      store['participants'].set(participant.participantId, participant);
    } else {
      // Create new participant
      const participantId = `participant_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      participant = {
        participantId,
        farcasterId,
        baseWalletAddress,
        createdAt: new Date(),
        tokenBalance: 1000, // Starting balance
      };
      store.createParticipant(participant);
    }

    return NextResponse.json({
      success: true,
      data: participant,
    });
  } catch (error) {
    console.error('Error creating/updating participant:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create/update participant' },
      { status: 500 }
    );
  }
}

