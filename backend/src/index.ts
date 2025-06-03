import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fetchAllFeeds, fetchSingleFeed } from './services/rss-service';
import { generateSummaryAndPost, checkAIHealth } from './services/ai-service';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Configure CORS
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://insta-gen-social-spark.vercel.app'
    ],
    credentials: true
}));

app.use(express.json());

// Health check endpoint
app.get('/health', (_req, res) => {
    checkAIHealth().then(aiStatus => {
        res.json({ 
            status: 'ok',
            aiService: aiStatus ? 'available' : 'unavailable'
        });
    });
});

// RSS feed endpoints
app.get('/api/feeds', (_req, res, next) => {
    fetchAllFeeds()
        .then(feeds => {
            res.json({
                items: feeds,
                lastUpdated: new Date().toISOString()
            });
        })
        .catch(next);
});

app.get('/api/feeds/:category', (req, res, next) => {
    const { category } = req.params;
    fetchAllFeeds()
        .then(feeds => {
            const filtered = feeds.filter(feed => 
                feed.category.toLowerCase() === category.toLowerCase()
            );
            res.json({
                items: filtered,
                lastUpdated: new Date().toISOString()
            });
        })
        .catch(next);
});

app.get('/api/rss', (req, res, next) => {
    const { url } = req.query;
    if (!url || typeof url !== 'string') {
        res.status(400).json({ error: 'URL query parameter is required' });
        return;
    }

    fetchSingleFeed(url)
        .then(feed => {
            res.json({
                items: feed,
                lastUpdated: new Date().toISOString()
            });
        })
        .catch(next);
});

// AI content generation endpoint
app.post('/api/generate', (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ error: 'Title and content are required' });
        return;
    }

    generateSummaryAndPost(title, content)
        .then(result => {
            res.json(result);
        })
        .catch(next);
});

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;
