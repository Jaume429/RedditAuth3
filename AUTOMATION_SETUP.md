# Backend Setup for AI Article Automation

Your blog is now ready for automated AI-generated article publishing. Here's what has been set up:

## ✅ What's Been Done

### 1. **API Endpoints Created**
- `POST /api/automation/submit` - Receive articles from AI services
- `GET /api/automation/queue` - View queued articles
- `POST /api/automation/publish` - Publish articles to blog
- `PATCH /api/automation/seo` - Update SEO scores

### 2. **Core System Files**
- `lib/ai-automation.ts` - Core automation logic (create, queue, publish posts)
- `lib/ai-automation-config.ts` - Configuration settings
- `content/ai-queue/` - Directory for queued articles

### 3. **Scripts & Examples**
- `scripts/ai-automation-worker.js` - Background worker for processing articles
- `scripts/examples/generate-with-claude.js` - Example Claude integration

### 4. **Documentation**
- `AI_AUTOMATION_README.md` - Full API documentation with examples
- This file - Setup and next steps

## 🚀 Next Steps

### Phase 1: Basic Setup (This Week)
1. **Test the API manually**
   ```bash
   # Submit a test article
   curl -X POST http://localhost:3000/api/automation/submit \
     -H "Content-Type: application/json" \
     -d '{
       "title": "Test Article",
       "description": "A test article",
       "content": "# Test\n\nContent here",
       "slug": "test-article"
     }'

   # Check queue
   curl http://localhost:3000/api/automation/queue
   ```

2. **Verify file storage**
   - Files should appear in `content/ai-queue/`
   - Check they're properly formatted MDX

3. **Test publishing**
   ```bash
   curl -X POST http://localhost:3000/api/automation/publish \
     -H "Content-Type: application/json" \
     -d '{"slug": "test-article"}'
   ```

### Phase 2: Security (Next Week)
1. **Add API Key Authentication**
   - Update API routes to validate API key
   - Store keys in `.env.local`
   ```typescript
   const apiKey = request.headers.get('x-api-key');
   if (apiKey !== process.env.AI_AUTOMATION_API_KEY) {
     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
   }
   ```

2. **Enable Rate Limiting**
   - Add middleware to limit requests per minute
   - Use `next-rate-limit` or similar package

3. **Input Validation**
   - Validate content length, title format, etc.
   - Sanitize MDX to prevent injection

### Phase 3: AI Integration (Week 3-4)
1. **Connect Claude API**
   - Set `ANTHROPIC_API_KEY` environment variable
   - Run the example generator: `node scripts/examples/generate-with-claude.js`

2. **Set up Cron/Scheduler**
   - Use GitHub Actions for daily publishing
   - Or use a service like EasyCron

3. **Auto-Publish Setup**
   - When SEO score ≥ 80, auto-publish
   - Or schedule for specific time

### Phase 4: Advanced Features (Month 2+)
1. **Auto SEO Optimization**
   - Use keyword analysis tools
   - Readability scoring (Flesch-Kincaid, etc.)
   - Meta tag generation

2. **Social Media Integration**
   - Auto-post to Twitter/LinkedIn
   - Generate social media snippets

3. **Analytics**
   - Track AI article performance
   - A/B test different writing styles

4. **Admin Dashboard**
   - Visual queue management
   - SEO score improvements suggestions
   - Publishing schedule

## 📋 Environment Variables (for .env.local)

```env
# AI Automation API Key
AI_AUTOMATION_API_KEY=your-secret-key-here

# Claude API (when connecting)
ANTHROPIC_API_KEY=sk-ant-...

# OpenAI API (optional alternative)
OPENAI_API_KEY=sk-...

# Notifications
NOTIFICATION_EMAILS=admin@example.com,content@example.com

# Logging
LOG_LEVEL=info
```

## 🔌 Integration Patterns

### Pattern 1: Daily Batch Generation
```bash
# Schedule via cron (every day at 9 AM)
0 9 * * * node scripts/examples/generate-with-claude.js

# Then auto-publish at 5 PM
0 17 * * * node scripts/ai-automation-worker.js
```

### Pattern 2: Webhook from External Service
```javascript
// Your external AI service sends articles here:
POST /api/automation/submit
Authorization: Bearer {API_KEY}
Content-Type: application/json

{
  "title": "Generated Article",
  "description": "...",
  "content": "...",
  "slug": "url-slug",
  "tags": ["tag1", "tag2"],
  "generatedBy": "claude"
}
```

### Pattern 3: GitHub Actions Workflow
```yaml
name: Publish AI Articles
on:
  schedule:
    - cron: '0 9 * * *'  # Every day at 9 AM

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: |
          ANTHROPIC_API_KEY=${{ secrets.ANTHROPIC_API_KEY }} \
          API_URL=https://yourblog.com \
          node scripts/examples/generate-with-claude.js
```

## 📊 Current Directory Structure

```
content/
├── posts/          # Published articles (production)
└── ai-queue/       # Queued articles (staging)

lib/
├── posts.ts        # Original post loader
├── ai-automation.ts        # New: Automation logic
└── ai-automation-config.ts  # New: Configuration

app/api/automation/
├── submit.ts       # New: Submit articles
├── queue.ts        # New: List queue
├── publish.ts      # New: Publish articles
└── seo.ts          # New: Update SEO scores

scripts/
├── ai-automation-worker.js     # New: Background worker
└── examples/
    └── generate-with-claude.js # New: Claude example
```

## 🐛 Troubleshooting

**Q: Articles aren't appearing in the queue**
- Check file permissions on `content/ai-queue/`
- Verify the MDX format is correct
- Check server logs for errors

**Q: Published articles don't appear on blog**
- Ensure files are in `content/posts/`
- Run `npm run build` to regenerate static pages
- Clear Next.js cache: `rm -rf .next`

**Q: API returns 500 errors**
- Check environment variables are set
- Verify file system permissions
- Look at server console for stack traces

## 📞 Support

For issues or questions about the automation system:
1. Check `AI_AUTOMATION_README.md` for API documentation
2. Review example scripts in `scripts/examples/`
3. Check logs in `logs/ai-automation.log` (when configured)

## ⚠️ Important Notes

1. **Security**: The API has no authentication by default. Add it before production.
2. **Scalability**: For high volume, consider using a proper database instead of files.
3. **SEO**: The API creates the infrastructure, but actual SEO optimization needs implementation.
4. **Testing**: Always test with a few articles before scheduling large batches.

---

**You're all set! Your backend is ready for AI-powered article automation.** 🎉
