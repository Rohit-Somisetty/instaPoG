import type { Article, GeneratedContent } from '@/types';

export interface ContentGenerationResponse {
  success: boolean;
  data?: GeneratedContent;
  error?: string;
}

export class ContentGenerationService {
  private static instance: ContentGenerationService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  public static getInstance(): ContentGenerationService {
    if (!ContentGenerationService.instance) {
      ContentGenerationService.instance = new ContentGenerationService();
    }
    return ContentGenerationService.instance;
  }

  private async makeRequest<T>(endpoint: string, method: string, data: any): Promise<ContentGenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json() as T;
      return {
        success: true,
        data: responseData as GeneratedContent,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      };
    }
  }

  public async generateContent(article: Article): Promise<ContentGenerationResponse> {
    return this.makeRequest<GeneratedContent>('/api/generate', 'POST', article);
  }

  public async regenerateContent(article: Article): Promise<ContentGenerationResponse> {
    return this.makeRequest<GeneratedContent>('/api/regenerate', 'POST', article);
  }
}
