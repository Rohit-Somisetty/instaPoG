# Backend - InstaPoG (Instagram Post Generator)

This is the backend service for the InstaPoG application, which generates Instagram-ready posts from articles and RSS feeds.

## Features

1. RSS Feed Processing
   - Fetch and parse RSS feeds from multiple sources
   - Extract article metadata and content

2. Content Generation
   - Process article URLs and extract content
   - Generate AI-powered summaries
   - Create Instagram-ready post content

## Technologies

- Node.js + TypeScript
- Express.js
- OpenAI integration for content generation
- RSS Parser for feed processing

## Project Structure

```
src/
├── services/           # Core services
│   ├── ai-service.ts   # AI content generation
│   └── rss-service.ts  # RSS feed processing
├── types/             # TypeScript type definitions
└── index.ts          # Main application entry point
```

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /api/feeds` - Get all configured RSS feeds
- `GET /api/rss` - Fetch content from a specific RSS feed
- `POST /api/process-article` - Generate Instagram content from article data
- `POST /api/process-url` - Generate Instagram content from a URL

## Setup and Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env` file with:

```
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

## Deployment

This backend is deployed on Vercel. See `vercel.json` for configuration details.

## Error Handling

The API implements proper error handling for:
- Invalid URLs
- Missing required fields
- API rate limits
- Network timeouts
