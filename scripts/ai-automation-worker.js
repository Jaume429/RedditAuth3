#!/usr/bin/env node

/**
 * AI Automation Worker Script
 * 
 * This script can be run periodically (via cron, GitHub Actions, etc.)
 * to automatically process articles in the queue.
 * 
 * Usage:
 *   node scripts/ai-automation-worker.js
 *   
 * Or with cron:
 *   0 9 * * * cd /path/to/project && node scripts/ai-automation-worker.js
 */

const fs = require('fs');
const path = require('path');

// Import automation functions - using require to load compiled JS from .next
let getQueuedPosts, publishQueuedPost, updatePostSEOScore, AI_AUTOMATION_CONFIG;

try {
  // Try loading from lib (in Node.js environment)
  const automationModule = require('../lib/ai-automation');
  const configModule = require('../lib/ai-automation-config');
  
  getQueuedPosts = automationModule.getQueuedPosts;
  publishQueuedPost = automationModule.publishQueuedPost;
  updatePostSEOScore = automationModule.updatePostSEOScore;
  AI_AUTOMATION_CONFIG = configModule.default || configModule.AI_AUTOMATION_CONFIG;
} catch (err) {
  console.error('Error loading modules. Make sure TypeScript files are compiled or use ts-node.');
  process.exit(1);
}

const logFile = AI_AUTOMATION_CONFIG.logging.logFile;
const logsDir = path.dirname(logFile);

// Ensure logs directory exists
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

function log(level, message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level}] ${message}`;

  if (AI_AUTOMATION_CONFIG.logging.console) {
    console.log(logMessage);
  }

  if (logFile) {
    fs.appendFileSync(logFile, logMessage + '\n');
  }
}

async function processQueue() {
  try {
    log('info', 'Starting AI automation worker...');

    const queuedPosts = getQueuedPosts();
    log('info', `Found ${queuedPosts.length} posts in queue`);

    let published = 0;
    let updated = 0;

    for (const post of queuedPosts) {
      try {
        // Check if post meets SEO threshold
        if (post.seoScore >= AI_AUTOMATION_CONFIG.seo.minScoreForPublishing) {
          if (post.status === 'draft' || post.status === 'scheduled') {
            log('info', `Publishing post: ${post.slug} (SEO score: ${post.seoScore})`);
            publishQueuedPost(post.slug);
            published++;
          }
        } else if (AI_AUTOMATION_CONFIG.seo.enableAutoOptimization) {
          // Could add automatic SEO optimization here
          // For now, just log that it needs optimization
          log('warn', `Post needs SEO optimization: ${post.slug} (score: ${post.seoScore})`);
        }
      } catch (error) {
        log('error', `Failed to process post ${post.slug}: ${error.message}`);
      }
    }

    log('info', `Worker completed: ${published} published, ${updated} updated`);
    log('info', '====================================');
  } catch (error) {
    log('error', `Worker failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the worker
processQueue();
