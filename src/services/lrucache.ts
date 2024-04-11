import bytes from 'bytes';
import { LRUCache } from 'lru-cache';

export const cache = new LRUCache<string, string>({
  max: 1000,
  maxSize: bytes.parse('50mb'),
  sizeCalculation: val => val.length,
});
