import { OpenAI } from 'openai';
import { RssItem } from '../types';
import axios from 'axios';
import * as cheerio from 'cheerio';
import ollama from 'ollama';
import { Cache } from '../lib/cache';
import pLimit from 'p-limit';

const aiCache = new Cache(3600); // 1 hour TTL
const limit = pLimit(2); // Limit concurrent AI requests

interface AxiosError {
  response?: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
  };
  message: string;
}

// Initialize OpenRouter client
const openai = new OpenAI({
  apiKey: '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',
  baseURL: 'https://openrouter.ai/api/v1',
  defaultHeaders: {
    'HTTP-Referer': 'http://localhost:3000',
    'X-Title': 'InstaPoG'
  }
});

interface AIConfig {
    model: string;
    temperature: number;
    maxTokens: number;
}

const config: AIConfig = {
    model: 'llama2',  // Change this to match your installed model
    temperature: 0.7,
    maxTokens: 500
};

async function generateWithOpenRouter(prompt: string): Promise<string> {
  try {
    console.log('Generating text with prompt:', prompt);
    
    const completion = await openai.chat.completions.create({
      model: 'deepseek/deepseek-r1-0528-qwen3-8b:free',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    console.log('OpenRouter response:', completion);

    if (!completion.choices?.[0]?.message?.content) {
      throw new Error('No content in OpenRouter response');
    }

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error generating text with OpenRouter:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    throw error;
  }
}

export async function generateSummaryAndPost(item: RssItem, category: string): Promise<{ summary: string; instagramPost: string }> {
  try {
    console.log('Generating summary for:', item.title);
    
    // Generate Summary
    const summaryPrompt = `You're a senior news editor at a major outlet—produce a natural-sounding, balanced summary of the following text in 5–7 sentences. Use whatever content is available; do not ask for more text or apologize if it's brief. Output ONLY the summary.

Article Title: ${item.title}
Content: ${item.contentSnippet || item.content || ''}`;

    const summary = await generateWithOpenRouter(summaryPrompt);
    console.log('Generated summary:', summary);

    // Generate Instagram Post
    const postPrompt = `You are a professional social media strategist—create a natural, engaging Instagram caption of 2–3 sentences, incorporating emojis and relevant hashtags. Use the provided summary directly; output ONLY the caption.

Summary:
${summary}

Category: ${category}`;

    const instagramPost = await generateWithOpenRouter(postPrompt);
    console.log('Generated Instagram post:', instagramPost);

    return {
      summary: summary.trim(),
      instagramPost: instagramPost.trim()
    };
  } catch (error) {
    console.error('Error in generateSummaryAndPost:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    return {
      summary: `Error generating summary: ${error instanceof Error ? error.message : 'Unknown error'}`,
      instagramPost: 'Error generating post'
    };
  }
}

// Extract content from a URL
async function extractContentFromUrl(url: string) {
  try {
    console.log('Fetching content from URL:', url);
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5'
      },
      timeout: 10000 // 10 second timeout
    });

    console.log('Successfully fetched content, parsing HTML');
    const $ = cheerio.load(response.data);
    
    // Remove unwanted elements
    $('script, style, nav, footer, header, .ad, .advertisement, .social-share, iframe').remove();
    
    // Try multiple selectors for the title
    const title = $('h1').first().text() || 
                 $('article h1').first().text() || 
                 $('main h1').first().text() || 
                 $('title').text();

    // Try multiple selectors for the content
    const articleContent = $('article').first().text() || 
                         $('main').first().text() || 
                         $('.article-content').first().text() ||
                         $('.post-content').first().text() ||
                         $('body').text();

    const cleanContent = articleContent
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 10000);

    console.log('Successfully extracted content:', {
      titleLength: title.length,
      contentLength: cleanContent.length
    });

    return {
      title: title.trim(),
      content: cleanContent
    };
  } catch (error) {
    console.error('Error extracting content:', error);
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error('Response error:', {
        status: axiosError.response.status,
        statusText: axiosError.response.statusText,
        headers: axiosError.response.headers
      });
    }
    throw new Error(`Failed to extract content from URL: ${axiosError.message}`);
  }
}

export async function processUrlContent(url: string) {
  try {
    // Extract content from URL
    const { title, content } = await extractContentFromUrl(url);
    
    // Create a mock RSS item for content generation
    const rssItem: RssItem = {
      id: `url-${Date.now()}`,
      title,
      description: content.substring(0, 500),
      content,
      contentSnippet: content.substring(0, 500),
      link: url,
      pubDate: new Date().toISOString(),
      source: new URL(url).hostname,
      image: ''  // We could potentially extract this from the page content
    };

    // Generate content using existing function
    const { summary, instagramPost } = await generateSummaryAndPost(rssItem, 'article');
    
    return {
      id: rssItem.id,
      title,
      preview: content.substring(0, 200) + '...',
      thumbnail: '/images/article-thumbnail.png', // Default thumbnail
      source: new URL(url).hostname.replace('www.', ''),
      date: new Date().toISOString(),
      summary,
      instagramPost,
      link: url
    };
  } catch (error) {
    console.error('Error processing URL:', error);
    throw error;
  }
}

export async function processArticleContent(title: string, preview: string, source?: string): Promise<any> {
  try {
    let content = preview;    if (source) {
      try {
        const urlContent = await processUrlContent(source);
        content = urlContent.summary || preview;
      } catch (error) {
        console.warn('Failed to fetch article content, using preview:', error);
      }
    }

    const prompt = `
Please analyze this article and create:
1. A concise summary (2-3 sentences)
2. An engaging Instagram post (with appropriate hashtags)

Title: ${title}
Content: ${content}

Format the response as:
Summary: <summary>
Instagram Post: <post>`;

    const response = await generateWithOpenRouter(prompt);
    const [summary, instagramPost] = parseAIResponse(response);

    return {
      id: Date.now().toString(),
      title,
      summary,
      instagramPost,
      source,
    };
  } catch (error) {
    console.error('Error processing article content:', error);
    throw error;
  }
}

function parseAIResponse(response: string): [string, string] {
  const summaryMatch = response.match(/Summary: (.*?)(?=Instagram Post:|$)/s);
  const postMatch = response.match(/Instagram Post: (.*?)$/s);

  return [
    summaryMatch?.[1]?.trim() || 'Summary not available',
    postMatch?.[1]?.trim() || 'Post not available'
  ];
}

// Function to check if AI service is available
export async function checkAIHealth(): Promise<boolean> {
    try {
        const models = await ollama.list();
        return models.models.some(m => m.name === config.model);
    } catch (error) {
        console.error('AI health check failed:', error);
        return false;
    }
}
