import { LRUCache } from 'lru-cache';
import { FILES_CACHE_MAX_ITEMS, FILES_CACHE_MAX_SIZE } from '@constants';

export const cache = new LRUCache<string, string>({
  max: FILES_CACHE_MAX_ITEMS,
  maxSize: FILES_CACHE_MAX_SIZE,
  sizeCalculation: val => val.length,
});
