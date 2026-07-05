import type { CvData } from '@/src/lib/cv/types';
import { normalizeCvData } from '@/src/lib/cv/defaults';

/** Share links carry the CV in the URL *fragment* (`/shared#<payload>`).
 *  Fragments are never sent to a server, so a shared CV stays between the
 *  sender and whoever receives the link.
 *
 *  Payload format: `<version>.<base64url>`
 *    1 = plain UTF-8 JSON
 *    2 = deflate-raw compressed JSON (used when CompressionStream exists) */

function toBase64Url(bytes: Uint8Array): string {
  let binary = '';
  const chunkSize = 0x8000; // avoid call-stack limits on large payloads
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
}

function fromBase64Url(encoded: string): Uint8Array {
  const base64 = encoded.replaceAll('-', '+').replaceAll('_', '/');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function pipeThrough(
  bytes: Uint8Array,
  transform: CompressionStream | DecompressionStream,
): Promise<Uint8Array> {
  const stream = new Blob([bytes as BlobPart]).stream().pipeThrough(transform);
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

export async function encodeCvToFragment(data: CvData): Promise<string> {
  const bytes = new TextEncoder().encode(JSON.stringify(data));
  if (typeof CompressionStream !== 'undefined') {
    const compressed = await pipeThrough(bytes, new CompressionStream('deflate-raw'));
    return `2.${toBase64Url(compressed)}`;
  }
  return `1.${toBase64Url(bytes)}`;
}

export async function decodeCvFromFragment(fragment: string): Promise<CvData | null> {
  try {
    const dot = fragment.indexOf('.');
    if (dot === -1) return null;
    const version = fragment.slice(0, dot);
    let bytes = fromBase64Url(fragment.slice(dot + 1));
    if (version === '2') {
      if (typeof DecompressionStream === 'undefined') return null;
      bytes = await pipeThrough(bytes, new DecompressionStream('deflate-raw'));
    } else if (version !== '1') {
      return null;
    }
    return normalizeCvData(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}
