import { NextRequest, NextResponse } from 'next/server';
import { publishQueuedPost } from '@/lib/ai-automation';
import { requireAutomationAuth } from '@/lib/automation-auth';

export async function POST(request: NextRequest) {
  try {
    const authError = requireAutomationAuth(request);
    if (authError) return authError;

    const body = await request.json();
    const { slug } = body;

    if (!slug) {
      return NextResponse.json({ error: 'Missing required field: slug' }, { status: 400 });
    }

    const result = publishQueuedPost(slug);

    return NextResponse.json(
      {
        message: 'Post published successfully',
        result
      },
      { status: 200 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to publish post';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
