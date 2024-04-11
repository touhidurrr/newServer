import Redis from 'ioredis';
import { DEFAULT_REDIS_URL } from '@constants';

const REDIS_URL = process.env.REDISCLOUD_URL || process.env.REDIS_URL || DEFAULT_REDIS_URL;

const redis = new Redis(REDIS_URL);

await new Promise((resolve, reject) => {
  redis.on('connect', () => {
    console.info(`[Redis] Connected.`);
    resolve(null);
  });
  redis.on('error', reject);
  redis.on('close', reject);
});

redis.on('error', error => {
  console.error(`[Redis] Error:`, error);
});

redis.on('close', () => {
  console.error(`[Redis] Connection closed.`);
});

export const cache = redis;
