import NodeCache from 'node-cache';

export class Cache<T> {
    private cache: NodeCache;
    
    constructor(ttlSeconds: number = 900) { // Default 15 minutes
        this.cache = new NodeCache({
            stdTTL: ttlSeconds,
            checkperiod: ttlSeconds * 0.2,
            useClones: false
        });
    }

    get(key: string): T | undefined {
        return this.cache.get(key);
    }

    set(key: string, value: T, ttl?: number): boolean {
        if (ttl !== undefined) {
            return this.cache.set(key, value, ttl);
        }
        return this.cache.set(key, value);
    }

    del(key: string): number {
        return this.cache.del(key);
    }

    flush(): void {
        this.cache.flushAll();
    }

    stats() {
        return this.cache.getStats();
    }
}
