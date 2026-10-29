'use strict';

/*
 * The SellThinker content model, in one place.
 *
 * `npm run model` writes every component and content-type schema under src/
 * from this file, so change the model here and regenerate rather than editing
 * the generated JSON by hand (the admin's Content-Type Builder also edits those
 * JSON files; if you use it, copy the change back here).
 *
 * Three layers:
 *   elements.*  small parts used inside blocks (a table cell, a checklist item)
 *   blocks.*    independent content blocks; ANY article or landing page can use any of them
 *   meta.*      extra fields for one kind of article (news, guide)
 * Templates are an article's `template` value: they decide the page header and
 * which blocks an editor reaches for first (see docs/CONTENT-MODEL.md), but they
 * never limit which blocks an article may use.
 */

const str = (extra = {}) => ({ type: 'string', ...extra });
const txt = (extra = {}) => ({ type: 'text', ...extra });
const req = (attr) => ({ ...attr, required: true });
const bool = (def) => ({ type: 'boolean', default: def });
const int = (extra = {}) => ({ type: 'integer', ...extra });
const media = (allowed = ['images']) => ({ type: 'media', multiple: false, required: false, allowedTypes: allowed });
const rich = () => ({ type: 'blocks' });
const enumOf = (values, def) => ({ type: 'enumeration', enum: values, ...(def ? { default: def } : {}) });
const many = (component) => ({ type: 'component', repeatable: true, component });
const one = (component) => ({ type: 'component', repeatable: false, component });

/* ---------- elements: parts used inside blocks ---------- */
const elements = {
  'text-item': { displayName: 'Text item', icon: 'bulletList', attributes: { text: req(txt()) } },
  'title-text': { displayName: 'Title and text', icon: 'layout', attributes: { title: req(str()), text: txt() } },
  'key-value': { displayName: 'Label and value', icon: 'layout', attributes: { label: req(str()), value: req(txt()) } },
  'table-column': { displayName: 'Table column', icon: 'grid', attributes: { label: req(str()), highlight: bool(false) } },
  'table-cell': {
    displayName: 'Table cell',
    icon: 'grid',
    description: 'A value, a tick/cross mark, or both.',
    attributes: { value: str(), mark: enumOf(['none', 'yes', 'no', 'partial'], 'none') },
  },
  'table-row': {
    displayName: 'Table row',
    icon: 'grid',
    attributes: { label: req(str()), cells: many('elements.table-cell') },
  },
  'check-item': { displayName: 'Checklist item', icon: 'check', attributes: { text: req(str()), detail: txt() } },
  step: {
    displayName: 'Step',
    icon: 'stack',
    attributes: { title: req(str()), body: txt(), image: media(), tip: txt() },
  },
  'ranked-item': {
    displayName: 'Ranked item',
    icon: 'star',
    attributes: { title: req(str()), body: txt(), image: media(), badge: str(), linkLabel: str(), linkUrl: str() },
  },
  stat: { displayName: 'Stat', icon: 'chartPie', attributes: { value: req(str()), label: req(str()), source: str() } },
  'faq-item': { displayName: 'FAQ item', icon: 'question', attributes: { question: req(str()), answer: req(txt()) } },
  'chat-message': {
    displayName: 'Chat message',
    icon: 'message',
    attributes: { from: enumOf(['buyer', 'seller', 'note'], 'buyer'), text: req(txt()), time: str() },
  },
  'explainer-card': {
    displayName: 'Explainer card',
    icon: 'lightbulb',
    attributes: { icon: str({ default: '✦' }), title: req(str()), body: txt() },
  },
  'timeline-event': { displayName: 'Timeline event', icon: 'clock', attributes: { when: req(str()), title: req(str()), body: txt() } },
  link: { displayName: 'Link', icon: 'link', attributes: { label: req(str()), url: req(str()), note: str() } },
  source: {
    displayName: 'Source',
    icon: 'book',
    attributes: { title: req(str()), url: str(), publisher: str(), date: { type: 'date' } },
  },
};

/* ---------- blocks: usable in any article or landing page ---------- */
const blocks = {
  'rich-text': { displayName: 'Rich text', icon: 'feather', description: 'Paragraphs, headings, lists, links.', attributes: { body: req(rich()) } },
  tldr: { displayName: 'TL;DR', icon: 'bulletList', description: 'One-paragraph summary at the top.', attributes: { text: req(txt()) } },
  'key-takeaways': {
    displayName: 'Key takeaways',
    icon: 'check',
    attributes: { title: str({ default: 'Key takeaways' }), items: many('elements.text-item') },
  },
  callout: {
    displayName: 'Callout',
    icon: 'information',
    attributes: { tone: enumOf(['tip', 'note', 'warning', 'insight'], 'note'), title: str(), body: req(txt()) },
  },
  conclusion: {
    displayName: 'Conclusion',
    icon: 'flag',
    description: 'Coloured closing block, optionally with a button.',
    attributes: {
      title: str({ default: 'The bottom line' }),
      body: req(txt()),
      tone: enumOf(['brand', 'warm', 'ink', 'sky'], 'brand'),
      buttonLabel: str(),
      buttonUrl: str(),
    },
  },
  'spec-table': {
    displayName: 'Vertical table',
    icon: 'layout',
    description: 'Two columns: a label and its value, row by row.',
    attributes: { title: str(), rows: many('elements.key-value'), note: txt() },
  },
  'grid-table': {
    displayName: 'Grid table',
    icon: 'grid',
    description: 'Columns and rows. Cells can hold text, a tick/cross mark, or both.',
    attributes: {
      title: str(),
      style: enumOf(['comparison', 'data'], 'comparison'),
      columns: many('elements.table-column'),
      rows: many('elements.table-row'),
      caption: txt(),
    },
  },
  checklist: {
    displayName: 'Checklist',
    icon: 'check',
    description: 'Readers can tick items; progress stays in their browser.',
    attributes: { title: str(), intro: txt(), items: many('elements.check-item'), saveProgress: bool(true) },
  },
  steps: {
    displayName: 'Steps',
    icon: 'stack',
    attributes: { title: str(), totalTime: str(), items: many('elements.step') },
  },
  'ranked-list': {
    displayName: 'Ranked list',
    icon: 'star',
    description: 'Numbered items for top-N lists.',
    attributes: { title: str(), numbered: bool(true), items: many('elements.ranked-item') },
  },
  'pros-cons': {
    displayName: 'Pros and cons',
    icon: 'thumbUp',
    attributes: { title: str(), prosLabel: str({ default: 'Pros' }), consLabel: str({ default: 'Cons' }), pros: many('elements.text-item'), cons: many('elements.text-item') },
  },
  stats: { displayName: 'Stats', icon: 'chartPie', attributes: { title: str(), items: many('elements.stat') } },
  quote: { displayName: 'Pull quote', icon: 'quote', attributes: { quote: req(txt()), name: str(), role: str() } },
  faq: {
    displayName: 'FAQ',
    icon: 'question',
    description: 'Also published as FAQ structured data for search.',
    attributes: { title: str({ default: 'FAQs' }), items: many('elements.faq-item') },
  },
  'chat-example': {
    displayName: 'Chat example',
    icon: 'message',
    description: 'A short Instagram or WhatsApp conversation, drawn as chat bubbles.',
    attributes: { title: str(), channel: enumOf(['instagram', 'whatsapp'], 'instagram'), messages: many('elements.chat-message'), caption: txt() },
  },
  'message-template': {
    displayName: 'Message template',
    icon: 'write',
    description: 'A reply readers can copy with one tap.',
    attributes: { title: req(str()), channel: enumOf(['instagram', 'whatsapp', 'any'], 'any'), text: req(txt()), whenToUse: txt() },
  },
  'before-after': {
    displayName: 'Before and after',
    icon: 'arrowRight',
    attributes: { title: str(), beforeLabel: str({ default: 'Before' }), afterLabel: str({ default: 'After' }), before: req(txt()), after: req(txt()), why: txt() },
  },
  explainer: {
    displayName: 'Visual explainer',
    icon: 'lightbulb',
    description: 'Cards in a grid, a flow (A → B → C) or numbered.',
    attributes: { title: str(), intro: txt(), layout: enumOf(['grid', 'flow', 'numbered'], 'grid'), cards: many('elements.explainer-card') },
  },
  definition: { displayName: 'Definition', icon: 'book', attributes: { term: req(str()), short: req(txt()), more: txt() } },
  timeline: { displayName: 'Timeline', icon: 'clock', attributes: { title: str(), events: many('elements.timeline-event') } },
  image: { displayName: 'Image', icon: 'picture', attributes: { image: media(), alt: str(), caption: str() } },
  video: { displayName: 'Video', icon: 'play', description: 'YouTube or Vimeo link.', attributes: { url: req(str()), caption: str() } },
  'html-embed': {
    displayName: 'HTML tool embed',
    icon: 'code',
    description: 'A self-contained HTML/JS tool (calculator, checker). Runs sandboxed: no access to the page, cookies or forms around it.',
    attributes: { title: str(), html: req({ type: 'text' }), height: int({ default: 480, min: 120, max: 2000 }), note: txt() },
  },
  cta: {
    displayName: 'Call to action',
    icon: 'cursor',
    attributes: {
      kind: enumOf(['early_access', 'audit', 'link'], 'early_access'),
      title: str(),
      body: txt(),
      buttonLabel: str(),
      buttonUrl: str(),
    },
  },
  'related-links': { displayName: 'Related links', icon: 'link', attributes: { title: str({ default: 'Keep reading' }), links: many('elements.link') } },
  sources: { displayName: 'Sources', icon: 'book', attributes: { title: str({ default: 'Sources' }), items: many('elements.source') } },
};

/* ---------- meta: extra fields for one kind of article ---------- */
const meta = {
  news: {
    displayName: 'News details',
    icon: 'earth',
    attributes: {
      stream: enumOf(['sellthinker', 'industry'], 'sellthinker'),
      kind: enumOf(['launch', 'improvement', 'fix', 'company', 'platform', 'policy', 'market'], 'improvement'),
      area: enumOf(['inbox', 'priority', 'recovery', 'catalog', 'insights', 'integrations', 'company', 'whatsapp', 'instagram', 'commerce', 'payments']),
      version: str(),
      source: str(),
      sourceUrl: str(),
      take: txt(),
      featureLink: str(),
    },
  },
  guide: {
    displayName: 'Guide details',
    icon: 'book',
    attributes: { stage: enumOf(['setup', 'day', 'grow'], 'setup'), stepsCount: int({ min: 0 }) },
  },
};

const BLOCK_UIDS = Object.keys(blocks).map((k) => `blocks.${k}`);

/* The article templates. Keys are what's stored; labels are what readers see. */
const TEMPLATES = {
  explainer: 'Explainer',
  opinion: 'Opinion',
  news_post: 'News',
  product_update: 'Product update',
  guide: 'Guide',
  how_to: 'How-to',
  top_list: 'Top list',
  checklist: 'Checklist',
  comparison: 'Comparison',
  case_study: 'Case study',
  tool: 'Tool',
  glossary: 'Glossary',
  faq_page: 'FAQ',
  data_report: 'Data report',
  message_templates: 'Message templates',
  myth_vs_fact: 'Myth vs fact',
  roundup: 'Roundup',
  interview: 'Interview',
};

const contentTypes = {
  article: {
    kind: 'collectionType',
    collectionName: 'articles',
    info: { singularName: 'article', pluralName: 'articles', displayName: 'Article', description: 'Every Resources piece: blog posts, news, guides and tools.' },
    options: { draftAndPublish: true },
    attributes: {
      title: req(str()),
      slug: req({ type: 'uid', targetField: 'title' }),
      excerpt: req(txt({ maxLength: 320 })),
      hub: req(enumOf(['blog', 'news', 'guides', 'tools'], 'blog')),
      template: req(enumOf(Object.keys(TEMPLATES), 'explainer')),
      featured: bool(false),
      displayDate: { type: 'date' },
      readingMinutes: int({ min: 1 }),
      reviewStatus: enumOf(['placeholder', 'needs_fact_check', 'approved'], 'placeholder'),
      cover: media(['images']),
      author: { type: 'relation', relation: 'manyToOne', target: 'api::author.author', inversedBy: 'articles' },
      category: { type: 'relation', relation: 'manyToOne', target: 'api::category.category', inversedBy: 'articles' },
      body: { type: 'dynamiczone', components: BLOCK_UIDS },
      news: one('meta.news'),
      guide: one('meta.guide'),
      seo: one('shared.seo'),
    },
  },
  'landing-page': {
    kind: 'collectionType',
    collectionName: 'landing_pages',
    info: { singularName: 'landing-page', pluralName: 'landing-pages', displayName: 'Feature landing page', description: 'The feature pages (Unified inbox, Priority Today…). Slug = the page URL.' },
    options: { draftAndPublish: true },
    attributes: {
      title: req(str()),
      slug: req({ type: 'uid', targetField: 'title' }),
      eyebrow: str(),
      lede: txt(),
      demoKey: enumOf(['unified_inbox', 'conversation_stage', 'daily_priority', 'lead_scoring', 'recovery', 'product_catalog', 'integrations', 'pipeline', 'none'], 'none'),
      demoTitle: str(),
      pillarsLabel: str(),
      pillars: many('elements.title-text'),
      steps: many('elements.title-text'),
      howNote: txt(),
      outcomes: many('elements.text-item'),
      tieInsLabel: str(),
      tieIns: many('elements.text-item'),
      faq: many('elements.faq-item'),
      extraSections: { type: 'dynamiczone', components: BLOCK_UIDS },
      seo: one('shared.seo'),
    },
  },
};

module.exports = { elements, blocks, meta, contentTypes, TEMPLATES, BLOCK_UIDS };
