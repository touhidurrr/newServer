const SYNC_TOKEN = process.env.SYNC_TOKEN;
const SYNC_SERVERS = process.env.SYNC_SERVERS;

const Servers = (SYNC_SERVERS ?? '').split(/[\n\s]+/).filter(Boolean);

console.info('[Sync] Servers:', Servers);

export async function syncGame(gameId: string, body: string) {
  if (!SYNC_TOKEN || !Servers.length) return;
  Servers.forEach(api => {
    fetch(`${api}/files/${gameId}`, {
      method: 'PATCH',
      body,
      headers: {
        Authorization: `Bearer ${SYNC_TOKEN}`,
        'Accept-Encoding': 'gzip, deflate',
        'Content-Length': body.length.toString(),
      },
    })
      .then(async res => !res.ok && console.error('[Sync] Error:', await res.text()))
      .catch(err => console.error('[Sync] Error:', err));
  });
}
