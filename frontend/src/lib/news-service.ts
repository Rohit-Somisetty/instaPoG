import { GenerateContentResponse } from './api-service';

export interface RssItem {
  title: string;
  link?: string;
  pubDate?: string;
  content?: string;
  contentSnippet?: string;
  isoDate?: string;
}

export type FeedCategory = 'technology' | 'celebrities' | 'environment' | 'finance' | 'health' | 'politics' | 'sports';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchAllRssFeeds(): Promise<Record<FeedCategory, RssItem[]>> {
  try {
    const response = await fetch(`${API_URL}/api/feeds`);
    if (!response.ok) {
      throw new Error('Failed to fetch RSS feeds');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching RSS feeds:', error);
    return {} as Record<FeedCategory, RssItem[]>;
  }
}

export async function fetchCategoryFeeds(category: FeedCategory): Promise<RssItem[]> {
  try {
    const response = await fetch(`${API_URL}/api/feeds/${category}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${category} feeds`);
    }
    const data = await response.json();
    return data[category] || [];
  } catch (error) {
    console.error(`Error fetching ${category} feeds:`, error);
    return [];
  }
}

export async function generateContent(article: RssItem): Promise<GenerateContentResponse> {
  try {
    const response = await fetch(`${API_URL}/api/process-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: article.title,
        preview: article.contentSnippet || article.content || '',
        source: article.link || '',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate content');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export async function generateFromUrl(url: string): Promise<GenerateContentResponse> {
  try {
    const response = await fetch(`${API_URL}/api/process-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate content from URL');
    }

    return await response.json();
  } catch (error) {
    console.error('Error generating content from URL:', error);
    throw error;
  }
}
