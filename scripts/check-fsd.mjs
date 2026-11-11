#!/usr/bin/env node
/**
 * Lightweight FSD guard: a file under src/features/<A>/ must not import
 * another feature via @features/<B> where A !== B.
 * Widgets/pages may compose features; features share via entities/shared.
 */
import fs from 'fs';
import path from 'path';

const FEATURES_ROOT = path.join('src', 'features');
const IMPORT_RE = /from\s+['"]@features\/([^/'"]+)/g;

function walk(dir, out = []) {
    if (!fs.existsSync(dir)) return out;
    for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const st = fs.statSync(full);
        if (st.isDirectory()) walk(full, out);
        else if (/\.(ts|tsx)$/.test(name)) out.push(full);
    }
    return out;
}

function featureOf(file) {
    const parts = file.replace(/\\/g, '/').split('/');
    const idx = parts.indexOf('features');
    return idx >= 0 ? parts[idx + 1] : null;
}

const violations = [];
for (const file of walk(FEATURES_ROOT)) {
    const own = featureOf(file);
    if (!own) continue;
    const text = fs.readFileSync(file, 'utf8');
    let m;
    IMPORT_RE.lastIndex = 0;
    while ((m = IMPORT_RE.exec(text))) {
        const imported = m[1];
        if (imported && imported !== own) {
            violations.push({
                file: file.replace(/\\/g, '/'),
                own,
                imported,
            });
        }
    }
}

if (violations.length === 0) {
    console.log('check:fsd OK (no cross-feature imports)');
    process.exit(0);
}

console.error(`check:fsd FAIL — ${violations.length} cross-feature import(s):`);
for (const v of violations) {
    console.error(`  ${v.file}: feature "${v.own}" imports @features/${v.imported}`);
}
process.exit(1);
