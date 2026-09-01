import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';

function secretsMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return (
    receivedBuffer.length === expectedBuffer.length &&
    timingSafeEqual(receivedBuffer, expectedBuffer)
  );
}

export async function POST(request: Request) {
  const expected = process.env.WORDPRESS_REVALIDATE_SECRET;
  if (!expected)
    return Response.json(
      { ok: false, error: 'Revalidation is not configured.' },
      { status: 503 },
    );
  const received = request.headers.get('x-ailooma-secret') || '';
  if (!secretsMatch(received, expected))
    return Response.json(
      { ok: false, error: 'Unauthorized.' },
      { status: 401 },
    );
  revalidateTag('wordpress', 'max');
  return Response.json({
    ok: true,
    revalidated: true,
    timestamp: new Date().toISOString(),
  });
}
