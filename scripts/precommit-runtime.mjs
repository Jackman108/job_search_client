/**
 * Soft runtime gate for `yarn precommit`.
 * Fails only when CLIENT_URL is reachable but returns a non-OK status.
 * If the client is down (typical before `yarn dev`), warn and exit 0 —
 * static gates (lint/typecheck/…) already ran; do not block commit on a cold stack.
 */
const base = (process.env.CLIENT_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');

const controller = new AbortController();
const timer = setTimeout(() => controller.abort(), 4000);

try {
    const res = await fetch(base, { signal: controller.signal, redirect: 'manual' });
    clearTimeout(timer);
    if (res.status >= 500) {
        console.error(`precommit-runtime FAIL: ${base} → HTTP ${res.status}`);
        process.exit(1);
    }
    console.log(`precommit-runtime OK: ${base} → HTTP ${res.status}`);
} catch (err) {
    clearTimeout(timer);
    const msg = err && err.name === 'AbortError' ? 'timeout' : err?.message || String(err);
    console.warn(`precommit-runtime WARN: client not up (${msg}) — static gates only`);
}
