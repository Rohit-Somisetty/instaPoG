import axios, { AxiosError } from 'axios';
import { config } from '@/lib/config';

export interface RssItem {
    id: string;
    title: string;
    description: string;
    link: string;
    pubDate: string;
    source: string;
    image?: string;
    category?: string;
    summary?: string;
    instagramPost?: string;
}

export interface FeedResponse {
    items: RssItem[];
    lastUpdated: string;
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function retryRequest<T>(fn: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0 && error instanceof AxiosError) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return retryRequest(fn, retries - 1);
        }
        throw error;
    }
}

export async function fetchAllRssFeeds(): Promise<RssItem[]> {
    try {
        const response = await retryRequest(() => 
            axios.get<FeedResponse>(`${config.apiUrl}/api/feeds`)
        );
        return response.data.items;
    } catch (error) {
        console.error('Error fetching RSS feeds:', error);
        if (error instanceof AxiosError) {
            throw new Error(`Failed to fetch RSS feeds: ${error.response?.data?.error || error.message}`);
        }
        return [];
    }
}

export async function fetchCategoryFeeds(category: string): Promise<RssItem[]> {
    try {
        const response = await retryRequest(() =>
            axios.get<FeedResponse>(`${config.apiUrl}/api/feeds/${category}`)
        );
        return response.data.items;
    } catch (error) {
        console.error(`Error fetching ${category} feeds:`, error);
        if (error instanceof AxiosError) {
            throw new Error(`Failed to fetch ${category} feeds: ${error.response?.data?.error || error.message}`);
        }
        return [];
    }
}

export async function fetchSingleFeed(url: string): Promise<RssItem[]> {
    try {
        const response = await retryRequest(() =>
            axios.get<FeedResponse>(`${config.apiUrl}/api/rss?url=${encodeURIComponent(url)}`)
        );
        return response.data.items;
    } catch (error) {
        console.error('Error fetching single feed:', error);
        if (error instanceof AxiosError) {
            throw new Error(`Failed to fetch feed: ${error.response?.data?.error || error.message}`);
        }
        return [];
    }
}

// Utility function to format relative time
export function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
        const interval = Math.floor(diffInSeconds / seconds);
        if (interval >= 1) {
            return interval === 1 ? `1 ${unit} ago` : `${interval} ${unit}s ago`;
        }
    }

    return 'just now';
}