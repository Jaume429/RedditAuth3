# GitHub Actions Configuration for Daily Article Publishing

## 📋 Required GitHub Secrets

Before the workflow can run, you need to add these secrets to your GitHub repository:

### 1. **GOOGLE_API_KEY** (Required)
- Get from: https://aistudio.google.com/app/apikey
- In GitHub:
  1. Go to **Settings → Secrets and variables → Actions**
  2. Click **New repository secret**
  3. Name: `GOOGLE_API_KEY`
  4. Value: Your Gemini API key

### 2. **API_URL** (Optional)
- If using a custom API endpoint
- Default: `http://localhost:3000`
- Use if deployed to Vercel: `https://your-domain.vercel.app`

## 🚀 How It Works

### Automatic (Daily at 9 AM UTC)
The workflow runs automatically every day at 9 AM UTC:
```yaml
schedule:
  - cron: '0 9 * * *'
```

**To change the time:**
Edit `.github/workflows/publish-daily.yml` and update the cron expression:
```yaml
- cron: '0 09 * * *'  # 9 AM UTC (24-hour format)
- cron: '0 17 * * *'  # 5 PM UTC
- cron: '30 8 * * 1'  # 8:30 AM UTC on Mondays
```

[Cron Syntax Helper](https://crontab.guru/)

### Manual Trigger
To publish an article manually:
1. Go to **Actions → Publish Daily Article with Gemini**
2. Click **Run workflow**
3. Select branch: `main`
4. Click **Run workflow**

## 📊 Workflow Steps

1. **Checkout code** - Get latest repo version
2. **Setup Node.js** - Install Node 18
3. **Install dependencies** - `npm install`
4. **Generate article** - Gemini creates new article
5. **Process queue** - Auto-publish if SEO score ≥ 70
6. **Commit & push** - Save changes to repo
7. **Notify on failure** - Alert if something goes wrong

## ✅ Success Indicators

- ✅ Article appears in `content/ai-queue/` or `content/posts/`
- ✅ Workflow shows green checkmark in **Actions** tab
- ✅ New commit appears in main branch
- ✅ Logs show: "Publishing post: [slug]"

## 🔍 Monitoring

### View Workflow Runs
1. Go to **Actions** tab
2. Click **Publish Daily Article with Gemini**
3. Check latest run status

### View Logs
1. Click on a workflow run
2. Click **Generate article with Gemini** step
3. Expand for detailed output

### Common Outputs
```
Generating article about: Getting Started with Claude Code
✓ Article submitted successfully
  - SEO Score: 82/100
  - Publishable: Yes ✓
  
[info] Publishing post: getting-started-with-claude-code
[info] Worker completed: 1 published, 0 updated
```

## 🚨 Troubleshooting

### ❌ "GOOGLE_API_KEY not found"
- Check GitHub **Settings → Secrets and variables → Actions**
- Verify secret name is exactly `GOOGLE_API_KEY`
- Ensure you've saved the secret

### ❌ "Repository rule violations found"
- Check that no secrets are in the code
- Review recent commits in `.github/workflows/`
- Never commit API keys - use GitHub Secrets only

### ❌ "Failed to push changes"
- Check that workflow has write permissions
- Go to **Settings → Actions → General → Workflow permissions**
- Select "Read and write permissions"
- Enable "Allow GitHub Actions to create and approve pull requests"

### ❌ "Article generation failed"
- Check if Gemini API key is valid
- Verify API quota not exceeded: https://aistudio.google.com/
- Check Gemini API status: https://status.google.com/

## 🔐 Security Notes

- ✅ Secrets stored securely in GitHub
- ✅ Never logged in workflow output
- ✅ Token automatically rotated by GitHub
- ✅ Only accessible to workflow runs

## 📝 Environment Variables in Workflow

Inside the workflow, these are available:

```yaml
env:
  GOOGLE_API_KEY: ${{ secrets.GOOGLE_API_KEY }}
  API_URL: ${{ secrets.API_URL }}
  NODE_ENV: production
```

## 🎯 Next Steps

1. Add `GOOGLE_API_KEY` secret to GitHub
2. Push this configuration to the repo
3. Wait for first automated run (or trigger manually)
4. Check **Actions** tab for results
5. Monitor logs to verify articles are being published

## 📚 Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Scheduling Workflows](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#onschedule)
- [Using Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Cron Syntax](https://crontab.guru/)
