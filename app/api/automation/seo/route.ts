import { NextRequest, NextResponse } from 'next/server';
import { updatePostSEOScore } from '@/lib/ai-automation';
import { requireAutomationAuth } from '@/lib/automation-auth';

export async function PATCH(request: NextRequest) {
  try {
    const authError = requireAutomationAuth(request);
    if (authError) return authError;

    const body = await request.json();
    const { slug, score, directory } = body;

    if (!slug || score === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields: slug, score' },
        { status: 400 }
      );
    }

    if (score < 0 || score > 100) {
      return NextResponse.json({ error: 'Score must be between 0 and 100' }, { status: 400 });
    }

    const result = updatePostSEOScore(slug, score, directory || 'queue');

    return NextResponse.json(
      {
        message: 'SEO score updated',
        result
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update SEO score';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
