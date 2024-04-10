const SYNC_TOKEN = process.env.SYNC_TOKEN;

export const isValidBearer = (bearer: string | undefined): boolean => {
  return Boolean(SYNC_TOKEN) && bearer === SYNC_TOKEN;
};
