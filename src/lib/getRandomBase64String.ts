import bytes from 'bytes';

export function getRandomBase64String(targetLength: number | string = 10): string {
  if (typeof targetLength === 'string') {
    targetLength = bytes.parse(targetLength);
  }
  const arrSize = Math.ceil((targetLength * 3) / 4);
  const randArr = crypto.getRandomValues(new Uint8Array(arrSize));
  return Buffer.from(randArr).toString('base64');
}
