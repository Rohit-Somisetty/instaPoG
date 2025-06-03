# API Documentation

## Base URL

Production: `https://backend-giupnqc8c-rohit-somisettys-projects.vercel.app`
Development: `http://localhost:3000`

## Endpoints

### Health Check

```http
GET /health
```

Returns the health status of the API.

**Response**
```json
{
  "status": "ok"
}
```

### Get All RSS Feeds

```http
GET /api/feeds
```

Returns a list of all RSS feeds from predefined categories.

**Response**
```json
{
  "technology": [...],
  "celebrities": [...],
  "environment": [...],
  "finance": [...],
  "politics": [...],
  "sports": [...],
  "science": [...]
}
```

### Get RSS Feed by URL

```http
GET /api/rss?url={url}
```

Fetches and parses an RSS feed from the provided URL.

**Parameters**
- `url` (required): The URL of the RSS feed to fetch

**Response**
```json
[
  {
    "title": "Article Title",
    "link": "https://...",
    "pubDate": "2025-06-02T...",
    "content": "Article content...",
    "contentSnippet": "Short preview...",
    "isoDate": "2025-06-02T..."
  }
]
```

### Process Article

```http
POST /api/process-article
```

Processes an article's content and generates an AI-powered summary and Instagram post.

**Request Body**
```json
{
  "title": "Article Title",
  "preview": "Article preview or content",
  "source": "Optional source URL"
}
```

**Response**
```json
{
  "id": "unique-id",
  "title": "Article Title",
  "summary": "AI-generated summary",
  "instagramPost": "Instagram post content with hashtags"
}
```

### Process URL

```http
POST /api/process-url
```

Fetches content from a URL and generates an AI-powered summary and Instagram post.

**Request Body**
```json
{
  "url": "https://example.com/article"
}
```

**Response**
```json
{
  "id": "unique-id",
  "title": "Extracted Title",
  "summary": "AI-generated summary",
  "instagramPost": "Instagram post content with hashtags"
}
```

## Error Handling

All endpoints follow a consistent error response format:

```json
{
  "error": "Error message",
  "details": "Additional error details (only in development)"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (missing or invalid parameters)
- `404`: Not Found
- `500`: Internal Server Error

## Rate Limiting

- All endpoints are rate-limited to prevent abuse
- RSS feed responses are cached for 1 hour to improve performance

## CORS

The API allows requests from:
- `http://localhost:5173` (development)
- `https://insta-gen-social-spark.vercel.app` (production)
- `https://backend-ceus70rf4-rohit-somisettys-projects.vercel.app` (backend domain)
