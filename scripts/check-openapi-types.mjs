#!/usr/bin/env node
/**
 * E4: regenerate OpenAPI types to a temp file and fail if schema.d.ts drifted.
 */
import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import os from 'os';

const ROOT = process.cwd();
const committed = path.join(ROOT, 'src/shared/api/generated/schema.d.ts');
const spec = path.join(ROOT, 'openapi/openapi.json');
if (!fs.existsSync(spec)) {
    console.error('api:check FAIL: missing openapi/openapi.json (copy from backend yarn openapi:export)');
    process.exit(1);
}
if (!fs.existsSync(committed)) {
    console.error('api:check FAIL: missing generated schema.d.ts — run yarn api:gen');
    process.exit(1);
}

const tmp = path.join(os.tmpdir(), `mh-openapi-schema-${process.pid}.d.ts`);
const r = spawnSync('npx', ['openapi-typescript', spec, '-o', tmp], {
    cwd: ROOT,
    encoding: 'utf8',
    shell: true,
});
if (r.status !== 0) {
    process.stderr.write(r.stderr || r.stdout || '');
    process.exit(r.status || 1);
}
const a = fs.readFileSync(committed, 'utf8').replace(/\r\n/g, '\n');
const b = fs.readFileSync(tmp, 'utf8').replace(/\r\n/g, '\n');
fs.unlinkSync(tmp);
if (a !== b) {
    console.error('api:check FAIL — run yarn api:gen and commit schema.d.ts');
    process.exit(1);
}
console.log('api:check OK');
