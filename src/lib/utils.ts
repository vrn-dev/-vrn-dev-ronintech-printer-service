import { createReadStream } from 'fs';

export async function createStreamFromPath(path: string): Promise<NodeJS.ReadableStream> {
  if (path.match('^https?:\/\/.*$') !== null)
    return await getRequestStream(path);
  else
    return createReadStream(path);
}

export function getRequestStream(address: string): any {
  return new Error('NOT IMPLEMTNTED');
}