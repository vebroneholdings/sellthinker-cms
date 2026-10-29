'use strict';

/*
 * Snapshots the reviewed Resources copy (a resources-data.js from the website)
 * into data/resources-copy.json. `npm run seed` then uses its titles and
 * summaries for Blog posts, News items and Guides, so copy edits made on the
 * website side flow into the CMS.
 *
 *   npm run import:resources -- ../sellThinker-website/public/design-to-copy-adjustments/js/resources-data.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const source = path.resolve(process.argv[2] || '../sellThinker-website/public/design/js/resources-data.js');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(source, 'utf8'), sandbox, { filename: source });
const w = sandbox.window;
if (!w.RES_POSTS) throw new Error(`No window.RES_POSTS in ${source}`);

const slugify = (s) => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

const out = {
  source: path.relative(path.join(__dirname, '..'), source),
  posts: w.RES_POSTS.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.ex, featured: !!p.featured, type: p.type, topic: p.topic, date: p.date, min: p.min })),
  news: (w.RES_NEWS || []).map((n) => ({
    slug: slugify(`${n.date}-${n.title || n.area}`),
    stream: n.stream, date: n.date, kind: n.kind, area: n.area, version: n.ver || '',
    title: n.title || '', excerpt: n.sum, source: n.source || '', take: n.take || '', featureLink: n.href || '',
  })),
  guides: (w.RES_GUIDES || []).map((g) => ({ slug: g.slug, stage: g.stage, min: g.min, steps: g.steps, title: g.title, excerpt: g.ex })),
};

fs.writeFileSync(path.join(__dirname, '..', 'data', 'resources-copy.json'), JSON.stringify(out, null, 2) + '\n');
console.log(`resources copy: ${out.posts.length} posts, ${out.news.length} news, ${out.guides.length} guides (from ${out.source})`);
