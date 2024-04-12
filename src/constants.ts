import bytes from 'bytes';

// server
export const DEFAULT_PORT = '3000';
export const DEFAULT_HOST = '0.0.0.0';
export const MAX_REQUEST_BODY_SIZE = bytes.parse('1mb');

// redis
export const REDIS_DEFAULT_URL = '0.0.0.0:6379';

// cache
export const CACHE_MAX_ITEMS = 1000;
export const CACHE_MAX_SIZE = bytes.parse('100mb');
export const FILES_CACHE_MAX_ITEMS = 1000;
export const FILES_CACHE_MAX_SIZE = bytes.parse('100mb');

// files
export const MIN_FILE_SIZE = bytes.parse('10b');
export const MAX_FILE_SIZE = bytes.parse('1mb');

// auth
export const GAME_ID_REGEX = /^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}(_Preview)?$/;

// test
export const START_TEST_TIMEOUT = 30_000;
export const START_TEST_FETCH_TIMEOUT = 5_000;
export const TEST_GAME_ID = '00000000-0000-0000-0000-000000000000';
