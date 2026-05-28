import { NextRequest, NextResponse } from 'next/server';
import { createAIPost, scorePostQuality } from '@/lib/ai-automation';
import { requireAutomationAuth } from '@/lib/automation-auth';

export async function POST(request: NextRequest) {
  try {
    const authError = requireAutomationAuth(request);
    if (authError) return authError;

    const body = await request.json();
    const { title, description, content, slug, tags, coverImage, generatedBy } = body;

    if (!title || !description || !content || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, content, slug' },
        { status: 400 }
      );
    }

    const normalizedTags = Array.isArray(tags) ? tags.map(String).slice(0, 6) : [];
    const seoScore = scorePostQuality({ title, description, content, tags: normalizedTags });

    const newPost = createAIPost({
      title,
      description,
      content,
      slug,
      date: new Date().toISOString().split('T')[0],
      tags: normalizedTags,
      author: 'AI Assistant',
      coverImage,
      generatedBy: generatedBy || 'claude',
      generatedAt: new Date().toISOString(),
      seoScore,
      status: 'draft'
    });

    return NextResponse.json(
      {
        message: 'Post received and queued for review',
        seoScore,
        publishable: seoScore >= 70,
        post: newPost
      },
      { status: 201 }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to process post';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
