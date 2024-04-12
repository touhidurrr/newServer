export function getRandomBase64String(randomBytes: number = 10): string {
  const randArr = new Uint8Array(randomBytes);
  crypto.getRandomValues(randArr);
  return Buffer.from(randArr).toString('base64');
}
