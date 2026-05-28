#!/usr/bin/env node

/**
 * Example: AI Article Generator (Claude)
 * 
 * This script demonstrates how to generate articles using Claude
 * and submit them to the automation API.
 * 
 * Prerequisites:
 * - Set ANTHROPIC_API_KEY environment variable
 * - Install @anthropic-ai/sdk: npm install @anthropic-ai/sdk
 * 
 * Usage:
 *   ANTHROPIC_API_KEY=your-key node scripts/examples/generate-with-claude.js
 */

import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();
const API_BASE_URL = process.env.API_URL || 'http://localhost:3000';

interface GeneratedArticle {
  title: string;
  description: string;
  content: string;
  slug: string;
  tags: string[];
  coverImage?: string;
}

async function generateArticle(topic: string): Promise<GeneratedArticle> {
  console.log(`Generating article about: ${topic}`);

  const message = await client.messages.create({
    model: 'claude-3-opus-20240229',
    max_tokens: 2048,
    messages: [
      {
        role: 'user',
        content: `Generate a blog article about "${topic}" for non-developers learning Claude Code.

Respond with ONLY valid JSON (no markdown, no code blocks) in this exact format:
{
  "title": "Article Title",
  "description": "One-line summary",
  "tags": ["tag1", "tag2"],
  "content": "# Main Heading\\n\\nFirst paragraph...\\n\\n## Subheading\\n\\nMore content...",
  "slug": "url-slug-version"
}

Requirements:
- Make it practical and actionable
- Include 2-3 code/workflow examples
- Write for beginners (no jargon)
- Content should be 800-1500 words
- Make sure slug is URL-friendly (lowercase, hyphens)
- Use markdown formatting for content
`
      }
    ]
  });

  const responseText = message.content[0].type === 'text' ? message.content[0].text : '';

  try {
    const article = JSON.parse(responseText);
    return article;
  } catch (error) {
    console.error('Failed to parse Claude response:', responseText);
    throw new Error('Invalid JSON response from Claude');
  }
}

async function submitArticle(article: GeneratedArticle): Promise<void> {
  console.log(`Submitting article: ${article.title}`);

  const response = await fetch(`${API_BASE_URL}/api/automation/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...article,
      generatedBy: 'claude',
      generatedAt: new Date().toISOString()
    })
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const result = await response.json();
  console.log('✓ Article submitted successfully');
  console.log('Response:', result);
}

async function main() {
  const topics = [
    'Getting Started with Claude Code',
    'Building Your First Project with Claude Code',
    'Common Mistakes When Using Claude Code',
    'How to Debug Claude Code Projects',
    'Deploying Claude Code Projects to Production'
  ];

  // Generate articles for a few topics
  for (let i = 0; i < 2; i++) {
    try {
      const topic = topics[Math.floor(Math.random() * topics.length)];
      const article = await generateArticle(topic);
      await submitArticle(article);
      console.log('---');
    } catch (error) {
      console.error('Error:', error);
    }
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { generateArticle, submitArticle };
