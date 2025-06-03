// Base URL for the backend API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const config = {
    apiUrl: API_URL,
    maxRetries: 3,
    timeout: 10000, // 10 seconds
    batchSize: 5,
    categories: [
        'Technology',
        'Business',
        'Science',
        'Health'
    ]
} as const;

export type Category = typeof config.categories[number];
