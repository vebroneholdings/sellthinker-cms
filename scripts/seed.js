'use strict';

/*
 * Loads the sample content into the CMS: topics, authors, every article in
 * data/seed-content.js and the feature landing pages in data/landing-pages.json.
 *
 *   npm run seed
 *
 * Safe to re-run: entries are matched by slug (or name) and updated in place,
 * then published. Entries you've added in the admin are left alone. Stop
 * `npm run develop` first if you're on SQLite.
 */

const { topics, authors, articles, retired = [], global } = require('../data/seed-content');
const landingPages = require('../data/landing-pages.json');

const uid = (name) => `api::${name}.${name}`;

async function upsert(name, where, data, { publish = true } = {}) {
  const docs = strapi.documents(uid(name));
  const existing = await docs.findFirst({ filters: where });
  const status = publish ? { status: 'published' } : {};
  if (existing) {
    await docs.update({ documentId: existing.documentId, data, ...status });
    return { documentId: existing.documentId, created: false };
  }
  const made = await docs.create({ data, ...status });
  return { documentId: made.documentId, created: true };
}

async function seed() {
  const topicIds = {};
  for (const t of topics) topicIds[t.slug] = (await upsert('category', { slug: t.slug }, t, { publish: false })).documentId;

  const authorIds = {};
  for (const a of authors) authorIds[a.name] = (await upsert('author', { name: a.name }, a, { publish: false })).documentId;

  let created = 0;
  const drafts = [];
  const failed = [];
  for (const { topic, author, publish = true, ...article } of articles) {
    const data = { ...article, category: topicIds[topic] || null, author: authorIds[author] || null };
    let result;
    try {
      result = await upsert('article', { slug: article.slug }, data, { publish });
    } catch (error) {
      // Report which entry and which fields, then carry on with the rest.
      const details = (error.details && error.details.errors) || [];
      failed.push(article.slug);
      console.error(`✗ ${article.slug}: ${error.message}`);
      for (const e of details) console.error(`    ${(e.path || []).join('.')}: ${e.message}`);
      continue;
    }
    if (result.created) created += 1;
    // Kept as a draft: take down any version published by an earlier seed.
    if (!publish) {
      drafts.push(article.slug);
      await strapi.documents(uid('article')).unpublish({ documentId: result.documentId }).catch(() => {});
    }
  }
  console.log(`articles: ${articles.length} (${created} new; unpublished: ${drafts.join(', ') || 'none'})`);
  if (failed.length) console.log(`articles that failed (fix and re-run): ${failed.join(', ')}`);

  let removed = 0;
  for (const slug of retired) {
    const doc = await strapi.documents(uid('article')).findFirst({ filters: { slug } });
    if (doc) {
      await strapi.documents(uid('article')).delete({ documentId: doc.documentId });
      removed += 1;
    }
  }
  if (removed) console.log(`retired articles deleted: ${removed}`);

  for (const page of landingPages) await upsert('landing-page', { slug: page.slug }, page);
  console.log(`feature landing pages: ${landingPages.length}`);

  const g = strapi.documents(uid('global'));
  const current = await g.findFirst();
  if (current) await g.update({ documentId: current.documentId, data: global });
  else await g.create({ data: global });
  console.log(`topics: ${topics.length}, authors: ${authors.length}, global settings: done`);
}

async function main() {
  const { createStrapi, compileStrapi } = require('@strapi/strapi');
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';
  try {
    await seed();
  } finally {
    await app.destroy();
  }
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
