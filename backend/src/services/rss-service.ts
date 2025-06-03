import Parser from 'rss-parser';
import { Cache } from '../lib/cache';
import { RssItem, ProcessedNewsItem, FeedConfig, FeedResponse } from '../types';
import { generateSummaryAndPost } from './ai-service';

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media:content'],
            'enclosure',
            'description',
            'guid'
        ],
    },
    timeout: 10000,
    requestOptions: {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; InstaPoG/1.0; +https://instapog.com)'
        }
    }
});

const feedCache = new Cache<FeedResponse>(900); // 15 minutes TTL

const feeds: FeedConfig[] = [
    {
        url: 'https://rss.app/feeds/tXFkiOZTazwGFNCP.xml',
        category: 'Technology',
        name: 'Technology News',
        language: 'en'
    },
    {
        url: 'https://rss.app/feeds/t2xHKPzxYXm3wK18.xml',
        category: 'Celebrities',
        name: 'Celebrity News',
        language: 'en'
    },
    {
        url: 'https://rss.app/feeds/tmj79tSVVjitj7mJ.xml',
        category: 'Health',
        name: 'Health News',
        language: 'en'
    },
    {
        url: 'https://rss.app/feeds/tPpwn7EJzxyR5XKw.xml',
        category: 'Politics',
        name: 'Political News',
        language: 'en'
    },
    {
        url: 'https://rss.app/feeds/tVmFty3sDoAYfEVt.xml',
        category: 'Sports',
        name: 'Sports News',
        language: 'en'
    },
    {
        url: 'https://rss.app/feeds/t3ZJtYIGb7yxvda7.xml',
        category: 'Environment',
        name: 'Environmental News',
        language: 'en'
    },
    {
        url: 'https://rss.app/feeds/tOQPVnMrpQYn70Ua.xml',
        category: 'Finance',
        name: 'Financial News',
        language: 'en'
    }
];

export async function fetchSingleFeed(url: string): Promise<ProcessedNewsItem[]> {
    const cacheKey = `feed:${url}`;
    const cached = feedCache.get(cacheKey);
    if (cached) return cached.items;

    try {
        const feed = await parser.parseURL(url);
        const feedCategory = getFeedCategory(url);
        
        const items: ProcessedNewsItem[] = feed.items.map(item => ({
            id: item.guid || item.link || Math.random().toString(),
            title: item.title || 'Untitled',
            description: item.contentSnippet || item.description || '',
            link: item.link || '',
            pubDate: item.pubDate || new Date().toISOString(),
            source: feed.title || url,
            image: extractImage(item),
            category: feedCategory,
            content: item.content,
            contentSnippet: item.contentSnippet
        }));

        feedCache.set(cacheKey, { items, lastUpdated: new Date().toISOString() });
        return items;
    } catch (error) {
        console.error(`Error fetching feed ${url}:`, error);
        return [];
    }
}

export async function fetchAllFeeds(): Promise<ProcessedNewsItem[]> {
    const cacheKey = 'all-feeds';
    const cached = feedCache.get(cacheKey);
    if (cached) return cached.items as ProcessedNewsItem[];

    try {
        const feedPromises = feeds.map(async (feed) => {
            const items = await fetchSingleFeed(feed.url);
            return items.map(item => ({
                ...item,
                category: feed.category
            }));
        });

        const results = await Promise.allSettled(feedPromises);
        const articles = results
            .filter((result): result is PromiseFulfilledResult<ProcessedNewsItem[]> => 
                result.status === 'fulfilled')
            .flatMap(result => result.value)
            .sort((a, b) => 
                new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
            );

        // Process with AI in batches
        const processedArticles = await processFeedBatch(articles);
        feedCache.set(cacheKey, { 
            items: processedArticles,
            lastUpdated: new Date().toISOString()
        });
        return processedArticles;
    } catch (error) {
        console.error('Error fetching all feeds:', error);
        return [];
    }
}

export async function fetchCategoryFeeds(category: string): Promise<ProcessedNewsItem[]> {
    const allFeeds = await fetchAllFeeds();
    return allFeeds.filter(feed => 
        feed.category.toLowerCase() === category.toLowerCase()
    );
}

async function processFeedBatch(articles: ProcessedNewsItem[]): Promise<ProcessedNewsItem[]> {
    const batchSize = 5;
    const processed: ProcessedNewsItem[] = [];

    for (let i = 0; i < articles.length; i += batchSize) {
        const batch = articles.slice(i, i + batchSize);
        const processPromises = batch.map(async article => {
            try {
                if (!article.summary || !article.instagramPost) {
                    const generated = await generateSummaryAndPost(
                        article,
                        article.category
                    );
                    return {
                        ...article,
                        summary: generated.summary,
                        instagramPost: generated.instagramPost
                    };
                }
                return article;
            } catch (error) {
                console.error(`Error processing article ${article.id}:`, error);
                return article;
            }
        });

        const results = await Promise.all(processPromises);
        processed.push(...results);
        
        // Rate limiting between batches
        if (i + batchSize < articles.length) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    return processed;
}

function getFeedCategory(url: string): string {
    const feed = feeds.find(f => f.url === url);
    return feed?.category || 'Uncategorized';
}

function extractImage(item: Parser.Item): string {
    // Try various RSS feed image formats
    if ((item as any)['media:content']?.$.url) {
        return (item as any)['media:content'].$.url;
    }
    
    if (item.enclosure?.url) {
        return item.enclosure.url;
    }
    
    // Extract first image from content if available
    const imgMatch = item.content?.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch?.[1]) {
        return imgMatch[1];
    }
    
    return '/placeholder.svg';
}
