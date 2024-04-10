import bytes from 'bytes';

// the minimum file size should be based on _Preview files
export const MIN_FILE_SIZE = bytes.parse('10b');
export const MAX_FILE_SIZE = bytes.parse('1mb');

export const GAME_ID_REGEX = /^[\da-f]{8}-([\da-f]{4}-){3}[\da-f]{12}(_Preview)?$/;

export const DEFAULT_REDIS_URL = '0.0.0.0:6379';
