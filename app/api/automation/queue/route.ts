import { NextRequest, NextResponse } from 'next/server';
import { getQueuedPosts, getQueuedPost } from '@/lib/ai-automation';
import { requireAutomationAuth } from '@/lib/automation-auth';

export async function GET(request: NextRequest) {
  try {
    const authError = requireAutomationAuth(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const status = searchParams.get('status');

    if (slug) {
      const post = getQueuedPost(slug);
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json({ post });
    }

    let posts = getQueuedPosts();

    if (status) {
      posts = posts.filter((p) => p.status === status);
    }

    return NextResponse.json({
      total: posts.length,
      posts
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch queue';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
