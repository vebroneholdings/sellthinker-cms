'use strict';

/*
 * Helpers for writing CMS content in code: rich text in Strapi's "blocks"
 * format, and one helper per block. Used by data/seed-content.js and every
 * file in data/articles/.
 */

/* ---------- rich-text helpers (Strapi "blocks" format) ---------- */
// "**bold**" and "[label](url)" inside a string become formatted text.
function inline(s) {
  const out = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push({ type: 'text', text: s.slice(last, m.index) });
    if (m[1]) out.push({ type: 'text', text: m[1], bold: true });
    else out.push({ type: 'link', url: m[3], children: [{ type: 'text', text: m[2] }] });
    last = re.lastIndex;
  }
  if (last < s.length) out.push({ type: 'text', text: s.slice(last) });
  return out.length ? out : [{ type: 'text', text: '' }];
}
const p = (s) => ({ type: 'paragraph', children: inline(s) });
const h2 = (s) => ({ type: 'heading', level: 2, children: inline(s) });
const h3 = (s) => ({ type: 'heading', level: 3, children: inline(s) });
const ul = (items) => ({ type: 'list', format: 'unordered', children: items.map((i) => ({ type: 'list-item', children: inline(i) })) });
const ol = (items) => ({ type: 'list', format: 'ordered', children: items.map((i) => ({ type: 'list-item', children: inline(i) })) });

/* ---------- block helpers ---------- */
const text = (...nodes) => ({ __component: 'blocks.rich-text', body: nodes });
const tldr = (t) => ({ __component: 'blocks.tldr', text: t });
const takeaways = (items, title) => ({ __component: 'blocks.key-takeaways', ...(title ? { title } : {}), items: items.map((t) => ({ text: t })) });
const callout = (tone, title, body) => ({ __component: 'blocks.callout', tone, title, body });
const conclusion = (body, opts = {}) => ({ __component: 'blocks.conclusion', body, ...opts });
const cta = (kind, title, body, extra = {}) => ({ __component: 'blocks.cta', kind, title, body, ...extra });
const faq = (items, title) => ({ __component: 'blocks.faq', ...(title ? { title } : {}), items: items.map(([question, answer]) => ({ question, answer })) });
const quote = (q, name, role) => ({ __component: 'blocks.quote', quote: q, name, role });
const chat = (channel, messages, extra = {}) => ({
  __component: 'blocks.chat-example',
  channel,
  messages: messages.map(([from, t, time]) => ({ from, text: t, time })),
  ...extra,
});
const template = (title, t, extra = {}) => ({ __component: 'blocks.message-template', title, text: t, channel: 'any', ...extra });
const steps = (items, extra = {}) => ({ __component: 'blocks.steps', items: items.map(([title, body, tip]) => ({ title, body, tip })), ...extra });

const PLACEHOLDER = callout('warning', 'Placeholder article', 'This piece is an example from the design. Replace it with real, approved copy before it goes live.');
const EARLY = cta('early_access', 'See which chat to open first', 'SellThinker reads every Instagram DM and WhatsApp chat, scores buyer intent and tells you where to act. You send every message yourself.');
const AUDIT = cta('audit', 'Find out where your chats leak', 'Send us a month of chats and we read them by hand. You get a count of every leak and the three fixes that matter most.');

/* ---------- article defaults ---------- */
const A = (o) => ({ author: 'SellThinker editors', reviewStatus: 'placeholder', featured: false, ...o });
// Short body for entries that only have a summary so far.
const stub = (excerpt) => [tldr(excerpt), PLACEHOLDER, EARLY];
// Any block not covered above: block('blocks.stats', { items: [...] }).
const block = (component, fields) => ({ __component: component, ...fields });

module.exports = { inline, p, h2, h3, ul, ol, text, tldr, takeaways, callout, conclusion, cta, faq, quote, chat, template, steps, block, PLACEHOLDER, EARLY, AUDIT, A, stub };
