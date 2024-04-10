const { SYNC_TOKEN, SYNC_SERVERS } = process.env;

const Servers = (SYNC_SERVERS ?? '').split(/[\n\s]+/);

export async function syncGame(gameId: string, body: string) {
  if (!SYNC_TOKEN || !Servers.length) return;
  Servers.forEach(api => {
    fetch(`${api}/files/${gameId}`, {
      method: 'PATCH',
      body,
      headers: {
        Authorization: `Bearer ${SYNC_TOKEN}`,
        'Content-Type': 'text/plain',
      },
    }).catch(console.error);
  });
}
