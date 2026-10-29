'use strict';

/*
 * Snapshots the website's feature-page copy (src/site/feature-content.js
 * in sellThinker-website) into data/landing-pages.json, which `npm run seed`
 * loads into the "Feature landing page" type.
 *
 *   npm run import:features -- ../sellThinker-website/src/site/feature-content.js
 *
 * Re-run it whenever the copy in that file changes, then `npm run seed`.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = path.resolve(process.argv[2] || '../sellThinker-website/src/site/feature-content.js');
const sandbox = { window: {} };
// The file is an ES module (`export { FEATURE_CONTENT };`); run it as a plain script.
const code = fs.readFileSync(source, 'utf8').replace('export { FEATURE_CONTENT };', 'window.FEATURE_CONTENT = FEATURE_CONTENT;');
vm.runInNewContext(code, sandbox, { filename: source });
const pages = sandbox.window.FEATURE_CONTENT;
if (!pages) throw new Error(`No window.FEATURE_CONTENT in ${source}`);

const DEMO = {
  'unified-inbox': 'unified_inbox',
  'conversation-stage-analysis': 'conversation_stage',
  'daily-priority-list': 'daily_priority',
  'lead-scoring': 'lead_scoring',
  'recovery-alerts': 'recovery',
  'product-catalog': 'product_catalog',
  integrations: 'integrations',
  'pipeline-insights': 'pipeline',
};
const KNOWN = ['eyebrow', 'title', 'lede', 'demoTitle', 'pillarsLabel', 'pillars', 'steps', 'howNote', 'outcomes', 'viewsLabel', 'viewsLede', 'views', 'tieInsLabel', 'tieIns', 'faq'];

const asTitleText = (list = []) => list.map((x) => ({ title: x.title, text: x.desc || x.text || '' }));
const asText = (list = []) => list.map((x) => ({ text: typeof x === 'string' ? x : x.text || String(x) }));

const out = Object.entries(pages).map(([slug, p]) => {
  const unknown = Object.keys(p).filter((k) => !KNOWN.includes(k));
  if (unknown.length) console.warn(`${slug}: not imported (no field in the model yet): ${unknown.join(', ')}`);
  return {
    slug,
    title: p.title,
    eyebrow: p.eyebrow || '',
    lede: p.lede || '',
    demoKey: DEMO[slug] || 'none',
    demoTitle: p.demoTitle || '',
    pillarsLabel: p.pillarsLabel || '',
    pillars: asTitleText(p.pillars),
    steps: asTitleText(p.steps),
    howNote: p.howNote || '',
    outcomes: asText(p.outcomes),
    viewsLabel: p.viewsLabel || '',
    viewsLede: p.viewsLede || '',
    views: asTitleText(p.views),
    tieInsLabel: p.tieInsLabel || '',
    tieIns: asText(p.tieIns),
    faq: (p.faq || []).map((f) => ({ question: f.q, answer: f.a })),
  };
});

const target = path.join(__dirname, '..', 'data', 'landing-pages.json');
fs.writeFileSync(target, JSON.stringify(out, null, 2) + '\n');
console.log(`${out.length} feature pages written to data/landing-pages.json`);
