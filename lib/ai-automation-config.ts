// Configuration for AI Automation System
// Update these values as needed for your setup

export const AI_AUTOMATION_CONFIG = {
  // API Configuration
  api: {
    // Set to true to require API key authentication
    requireAuth: true,
    // API keys (in production, load from environment)
    validApiKeys: process.env.AI_AUTOMATION_API_KEYS?.split(',') || [],
    // Rate limiting
    rateLimit: {
      enabled: false,
      requestsPerMinute: 60
    }
  },

  // Publishing Configuration
  publishing: {
    // Auto-publish when SEO score reaches this threshold
    autoPublishAtScore: 80,
    // Enable scheduled publishing
    enableScheduling: false,
    // Default publish time (24-hour format)
    defaultPublishTime: '09:00'
  },

  // SEO Configuration
  seo: {
    // Enable automatic SEO optimization
    enableAutoOptimization: true,
    // Minimum required SEO score before publishing
    minScoreForPublishing: 70,
    // Keywords to check for
    targetKeywords: [
      'Claude Code',
      'AI coding',
      'non-developers',
      'software building',
      'AI-assisted development'
    ]
  },

  // Content Configuration
  content: {
    // Required minimum content length (words)
    minContentLength: 500,
    // Maximum content length (words)
    maxContentLength: 5000,
    // Supported languages
    supportedLanguages: ['en', 'es', 'fr', 'de']
  },

  // Notifications
  notifications: {
    // Send email on new article
    emailOnSubmit: false,
    // Send email on publish
    emailOnPublish: true,
    // Recipient emails
    recipients: process.env.NOTIFICATION_EMAILS?.split(',') || ['admin@example.com']
  },

  // External AI Services (optional)
  aiServices: {
    // Claude API settings
    claude: {
      enabled: false,
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      model: 'claude-3-opus-20240229'
    },
    // Google Gemini API settings
    gemini: {
      enabled: true,
      apiKey: process.env.GOOGLE_API_KEY || '',
      model: 'gemini-1.5-flash'
    },
    // OpenAI API settings
    openai: {
      enabled: false,
      apiKey: process.env.OPENAI_API_KEY || '',
      model: 'gpt-4'
    }
  },

  // Logging
  logging: {
    // Log to console
    console: true,
    // Log to file (relative path)
    logFile: 'logs/ai-automation.log',
    // Log level: 'debug', 'info', 'warn', 'error'
    level: process.env.LOG_LEVEL || 'info'
  }
};

export default AI_AUTOMATION_CONFIG;
