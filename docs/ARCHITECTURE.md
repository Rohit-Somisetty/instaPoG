# InstaPoG Architecture

## Project Overview
InstaPoG (Instagram Post Generator) is a full-stack application that generates Instagram-ready posts from RSS feeds and articles using AI. The project is split into frontend and backend services, each with their own responsibilities.

## Directory Structure

```
├── backend/                  # Express.js + TypeScript backend
│   ├── src/                 # Backend source code
│   │   ├── services/        # Core backend services
│   │   │   ├── ai-service.ts     # AI content generation
│   │   │   └── rss-service.ts    # RSS feed processing
│   │   └── types/          # TypeScript type definitions
│   ├── package.json        # Backend dependencies
│   └── tsconfig.json      # TypeScript configuration
│
├── frontend/               # React + Vite frontend
│   ├── src/               # Frontend source code
│   │   ├── components/    # React components
│   │   │   ├── features/  # Feature-specific components
│   │   │   │   ├── ArticleModal.tsx
│   │   │   │   ├── ContentGeneration.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   └── NewsGrid.tsx
│   │   │   ├── ui/       # Reusable UI components (shadcn)
│   │   │   └── Navbar.tsx
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions and services
│   │   ├── types/        # TypeScript type definitions
│   │   └── pages/        # Page components
│   └── package.json      # Frontend dependencies
│
└── docs/                 # Project documentation
    ├── API.md           # API documentation
    └── ARCHITECTURE.md  # This file

```

## Key Technologies

- **Frontend**:
  - React + Vite
  - TypeScript
  - shadcn-ui components
  - Tailwind CSS
  - Custom hooks for mobile responsiveness and notifications

- **Backend**:
  - Express.js
  - TypeScript
  - AI integration services
  - RSS feed processing

## API Services

The backend provides several key API endpoints:

- `/api/feeds` - Get all configured RSS feeds
- `/api/rss` - Fetch content from a specific RSS feed
- `/api/process-article` - Generate Instagram content from article data
- `/api/process-url` - Generate Instagram content from a URL

## Development Setup

1. Backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

2. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## Deployment

The application is deployed on Vercel:
- Frontend: https://insta-gen-social-spark.vercel.app
- Backend: https://backend-ceus70rf4-rohit-somisettys-projects.vercel.app

## Best Practices

1. **Component Organization**:
   - Feature components in `components/features/`
   - Reusable UI components in `components/ui/`
   - Common layouts and navigation in root components folder

2. **State Management**:
   - Custom hooks for shared state
   - Props for component-specific state
   - Context for global state when needed

3. **Code Style**:
   - TypeScript for type safety
   - ESLint for code quality
   - Prettier for consistent formatting
