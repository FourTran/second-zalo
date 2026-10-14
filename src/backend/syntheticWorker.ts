/**
 * M1 backend foundation — synthetic events only.
 * Deployment is NOT authorized. All real Zalo integrations are out of scope.
 * The write route is explicitly development-only and OFF by default.
 */

interface D1WriteStatement {
  bind(...values: (string | number)[]): { run(): Promise<{ success: boolean }> };
}
interface D1WriteDatabase {
  prepare(sql: string): D1WriteStatement;
}
export type SyntheticWorkerEnvironment = {
  ENVIRONMENT?: string;
  SYNTHETIC_EVENTS_ENABLED?: string;
  DEV_TEST_TOKEN?: string;
  DB?: D1WriteDatabase;
};
type DemoEvent = { eventId: string; accountId: string; kind: 'synthetic_message' };

function parseDemoEvent(input: unknown): DemoEvent | null {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const record = input as Record<string, unknown>;
  const keys = Object.keys(record);
  if (keys.length !== 3 || !keys.every(key => ['eventId', 'accountId', 'kind'].includes(key))) return null;
  if (record.kind !== 'synthetic_message') return null;
  if (typeof record.eventId !== 'string' || !/^[a-zA-Z0-9_-]{8,64}$/.test(record.eventId)) return null;
  if (typeof record.accountId !== 'string' || !/^demo-[B-Z]$/.test(record.accountId)) return null;
  return { eventId: record.eventId, accountId: record.accountId, kind: 'synthetic_message' };
}

function reply(data: object, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export default {
  async fetch(request: Request, env: SyntheticWorkerEnvironment): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'GET' && url.pathname === '/health') {
      return reply({ ok: true, liveZaloConnected: false, realNotificationsEnabled: false }, 200);
    }
    if (url.pathname !== '/v1/dev/synthetic-events' || request.method !== 'POST') {
      return reply({ error: 'not_found' }, 404);
    }

    // A production environment can NEVER enable this development route.
    if (env.ENVIRONMENT !== 'development' || env.SYNTHETIC_EVENTS_ENABLED !== 'true') {
      return reply({ error: 'disabled' }, 403);
    }
    if (!env.DEV_TEST_TOKEN || env.DEV_TEST_TOKEN.length < 32 || request.headers.get('Authorization') !== `Bearer ${env.DEV_TEST_TOKEN}`) {
      return reply({ error: 'unauthorized' }, 401);
    }
    if (request.headers.get('Content-Type')?.split(';')[0]?.trim().toLowerCase() !== 'application/json') {
      return reply({ error: 'unsupported_media_type' }, 415);
    }
    const length = Number(request.headers.get('Content-Length'));
    if (Number.isFinite(length) && length > 1024) return reply({ error: 'too_large' }, 413);

    let incoming: unknown;
    try {
      const body = await request.text();
      if (body.length > 1024) return reply({ error: 'too_large' }, 413);
      incoming = JSON.parse(body);
    } catch {
      return reply({ error: 'invalid_json' }, 400);
    }
    const event = parseDemoEvent(incoming);
    if (!event) return reply({ error: 'invalid_synthetic_event' }, 400);
    if (!env.DB) return reply({ error: 'storage_unavailable' }, 503);

    try {
      await env.DB.prepare(
        "INSERT OR IGNORE INTO synthetic_events (event_id, account_id, event_kind) VALUES (?, ?, ?)"
      ).bind(event.eventId, event.accountId, event.kind).run();
    } catch {
      return reply({ error: 'storage_unavailable' }, 503);
    }
    return reply({ accepted: true, synthetic: true }, 202);
  },
};
