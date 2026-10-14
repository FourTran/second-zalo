/**
 * Offline, domain-only navigation guard for the M2 diagnostic WebView.
 * Never exposes the path, query, fragment, credentials or page content.
 * This does NOT establish Zalo authentication or cookie isolation.
 */
export type NavigationResult =
  | { kind: 'official-site'; hostname: string; allow: true }
  | { kind: 'store-redirect'; hostname: string; allow: false }
  | { kind: 'external-site'; hostname: string; allow: false }
  | { kind: 'blocked-scheme'; hostname: null; allow: false }
  | { kind: 'invalid-url'; hostname: null; allow: false };

const STORE_HOSTS = new Set(['apps.apple.com', 'itunes.apple.com', 'play.google.com']);

export function classifyWebNavigation(rawUrl: string): NavigationResult {
  let parsed: URL;
  try {
    parsed = new URL(rawUrl);
  } catch {
    return { kind: 'invalid-url', hostname: null, allow: false };
  }

  if (parsed.protocol !== 'https:' || parsed.username || parsed.password || (parsed.port && parsed.port !== '443')) {
    return { kind: 'blocked-scheme', hostname: null, allow: false };
  }
  const hostname = parsed.hostname.toLowerCase();
  if (STORE_HOSTS.has(hostname)) {
    return { kind: 'store-redirect', hostname, allow: false };
  }
  if (hostname === 'zalo.me' || hostname.endsWith('.zalo.me')) {
    return { kind: 'official-site', hostname, allow: true };
  }
  return { kind: 'external-site', hostname, allow: false };
}
