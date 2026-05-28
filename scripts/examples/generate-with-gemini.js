#!/usr/bin/env node

/**
 * Example: AI Article Generator (Google Gemini)
 * 
 * This script demonstrates how to generate articles using Google Gemini
 * and submit them to the automation API.
 * 
 * Prerequisites:
 * - Set GOOGLE_API_KEY environment variable
 * - Get your API key from: https://aistudio.google.com/app/apikey
 * - Install @google/generative-ai: npm install @google/generative-ai
 * 
 * Usage:
 *   GOOGLE_API_KEY=your-key node scripts/examples/generate-with-gemini.js
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');
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

  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Generate a blog article about "${topic}" for non-developers learning Claude Code.

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
- Use markdown formatting for content`;

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  try {
    // Extract JSON from response (in case there's surrounding text)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }
    const article = JSON.parse(jsonMatch[0]);
    return article;
  } catch (error) {
    console.error('Failed to parse Gemini response:', responseText);
    throw new Error('Invalid JSON response from Gemini');
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
      generatedBy: 'gemini',
      generatedAt: new Date().toISOString()
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API error: ${response.status} ${response.statusText} - ${error}`);
  }

  const result = await response.json();
  console.log('✓ Article submitted successfully');
  console.log(`  - SEO Score: ${result.seoScore}/100`);
  console.log(`  - Publishable: ${result.publishable ? 'Yes ✓' : 'No (needs optimization)'}`);
}

async function main() {
  const topics = [
    'Getting Started with Claude Code',
    'Building Your First Project with Claude Code',
    'Common Mistakes When Using Claude Code',
    'How to Debug Claude Code Projects',
    'Deploying Claude Code Projects to Production',
    'AI-Assisted Web Development Workflow',
    'Integrating Claude Code into Your Team'
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
