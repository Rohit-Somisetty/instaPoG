import axios from 'axios';
import { config } from './config';

export interface GenerateContentResponse {
    summary: string;
    instagramPost: string;
}

export interface GenerateContentRequest {
    title: string;
    preview: string;
    source: string;
}

export const apiService = {
    async generateContent(article: GenerateContentRequest): Promise<GenerateContentResponse> {
        try {
            const response = await axios.post(
                `${config.apiUrl}/api/generate`,
                article,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: config.timeout
                }
            );

            if (!response.data) {
                throw new Error('No data received from API');
            }

            return response.data;
        } catch (error) {
            console.error('Error generating content:', error);
            throw new Error('Failed to generate content');
        }
    },

    async healthCheck(): Promise<{ status: string; aiService: string }> {
        try {
            const response = await axios.get(`${config.apiUrl}/health`);
            return response.data;
        } catch (error) {
            console.error('Health check failed:', error);
            return { status: 'error', aiService: 'unavailable' };
        }
    }
};

export const { generateContent } = apiService;
