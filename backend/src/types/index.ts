export interface FeedConfig {
    url: string;
    category: string;
    name: string;
    language: string;
}

export interface RssItem {
    id: string;
    title: string;
    description: string;
    link: string;
    pubDate: string;
    source: string;
    image: string;
    content?: string;
    contentSnippet?: string;
    category?: string;
}

export interface ProcessedNewsItem extends RssItem {
    category: string;
    summary?: string;
    instagramPost?: string;
}

export interface FeedResponse {
    items: ProcessedNewsItem[];
    lastUpdated: string;
}

export interface AIResponse {
    summary: string;
    instagramPost: string;
}

// Other existing types...
