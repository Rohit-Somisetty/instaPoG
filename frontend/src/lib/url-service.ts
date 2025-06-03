const API_URL = 'https://insta-gen-social-spark-backend.vercel.app';

export interface ProcessedContent {
  id: string;
  title: string;
  preview: string;
  thumbnail: string;
  source: string;
  date: string;
  summary: string;
  instagramPost: string;
  link: string;
}

export async function processUrl(url: string): Promise<ProcessedContent> {
  try {
    const response = await fetch(`${API_URL}/api/process-url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to process URL');
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing URL:', error);
    throw error;
  }
}