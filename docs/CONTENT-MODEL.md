# SellThinker content model

The CMS behind sellthinker.com's Resources (Blog, News, Guides, Tools) and
feature landing pages. The whole model is defined in one file,
[`scripts/content-model.js`](../scripts/content-model.js); `npm run model`
writes the Strapi schema files from it.

## How it fits together

```
Article ──┬─ template   (decides the page header and what an editor reaches for first)
          ├─ hub        (blog · news · guides · tools: which Resources page lists it)
          ├─ topic      (Category: Sales & closing, Lead follow-up, …)
          ├─ body       (any blocks, in any order)  ◄── blocks are independent
          ├─ news / guide details (only for news items / guides)
          └─ seo
Feature landing page ── hero, pillars, steps, outcomes, FAQ… + extra sections (any blocks)
```

**Blocks are not tied to templates.** A template suggests a starting set, but
any article (or landing page) can use any block. Add a checklist to a news
post or an FAQ to a tool page if it helps the reader.

## Templates (18)

| Template | Use it for | Blocks it usually starts with |
|---|---|---|
| Explainer | What something is and how it works | TL;DR, Definition, Visual explainer, Vertical table, FAQ |
| Opinion | A point of view | TL;DR, Rich text, Pull quote, Key takeaways, Conclusion |
| News | Industry news with our take | Rich text, Callout ("Our take"), Sources |
| Product update | What changed in SellThinker | Rich text, Timeline, Related links |
| Guide | Using SellThinker, step by step | Steps, Visual explainer, Callout |
| How-to | A task the reader can do today | TL;DR, Steps, Chat example, Message template |
| Top list | "Seven replies that…" | TL;DR, Ranked list, Chat example |
| Checklist | Something to tick through | Checklist, Key takeaways |
| Comparison | X vs Y | TL;DR, Grid table (ticks), Pros and cons, Conclusion |
| Case study | One seller's story | TL;DR, Stats, Timeline, Pull quote |
| Tool | A calculator or checker | HTML tool embed, Steps, Callout |
| Glossary | Terms in plain English | Definitions, Related links |
| FAQ | Questions and answers | FAQ, Conclusion |
| Data report | Numbers with meaning | Stats, Grid table (data), Sources |
| Message templates | Copy-and-paste replies | Message templates, Before and after |
| Myth vs fact | Correcting common beliefs | Before and after (labels "Myth"/"Fact"), Conclusion |
| Roundup | A month or topic in one page | Timeline, Related links |
| Interview | Q&A | Rich text, FAQ, Pull quote |

The article page adds facts to the header by template: steps and time for
guides and how-tos, the number of picks in a top list, "Interactive tool" for
tools, version and source for news.

## Blocks (26)

| Block | What it is |
|---|---|
| Rich text | Paragraphs, headings, lists, links |
| TL;DR | One-paragraph summary at the top |
| Key takeaways | Ticked list of the main points |
| Callout | Tip, note, warning or insight box |
| Conclusion | Coloured closing block (brand, warm, ink or sky), optional button |
| Vertical table | Two columns: label and value, row by row |
| Grid table | Columns and rows; each cell can hold text, a tick/cross/partial mark, or both; a column can be highlighted |
| Checklist | Items readers can tick; progress stays in their browser |
| Steps | Numbered steps with optional image and tip, plus total time |
| Ranked list | Numbered items for top-N lists, with badge, image and link |
| Pros and cons | Two columns, labels editable |
| Stats | Big numbers with labels and sources |
| Pull quote | Quote with name and role |
| FAQ | Questions and answers; also published as FAQ data for search engines |
| Chat example | An Instagram or WhatsApp conversation drawn as bubbles, with notes |
| Message template | A reply readers copy with one tap, with "when to use it" |
| Before and after | Two versions side by side (labels editable, e.g. Myth/Fact) |
| Visual explainer | Cards in a grid, a flow (A → B → C) or numbered |
| Definition | A term, a one-line definition and more detail |
| Timeline | Dated events |
| Image | Image with alt text and caption |
| Video | YouTube or Vimeo link |
| HTML tool embed | A self-contained HTML/JS tool. Runs sandboxed: it can't reach the page, cookies or forms around it |
| Call to action | Early access or free audit (opens the site's form), or a plain link |
| Related links | A short reading list |
| Sources | Numbered citations |

## Editorial status

Every article has a `reviewStatus`:

- **placeholder**: example content from the design; rewrite before launch.
- **needs_fact_check**: states facts about Meta, WhatsApp, Instagram or the market; check against the source.
- **approved**: ready.

Copy must follow the product as built: SellThinker never sends a message on its
own, never holds money, and doesn't merge buyers across channels or sync to a
CRM. Banned in customer-facing copy: broadcast, campaign, bulk, hand off,
handoff, teammate, team.

## Adding or changing a block

1. Edit `scripts/content-model.js`: add the block under `blocks` (and any small
   parts under `elements`). It's automatically allowed in every article and
   landing page.
2. Run `npm run model`, then restart `npm run develop`.
3. Add a renderer for it in the website's `public/design/js/page-article.jsx`
   (`AR_BLOCKS`). Until you do, the page skips the block rather than breaking.
4. Add an example to `data/seed-content.js` so the block has a real entry to
   design against.

## API for the website

Public, read-only, published content only. Each returns `{ data }`.

| Route | Returns |
|---|---|
| `GET /api/content/articles?hub=blog&template=how_to&topic=recovery&limit=50` | Article cards (no body), newest first |
| `GET /api/content/articles/:slug` | One article with every block filled in |
| `GET /api/content/topics` | Topics |
| `GET /api/content/landing-pages` | Landing page list |
| `GET /api/content/landing-pages/:slug` | One landing page, every section filled in |

The standard Strapi endpoints (`/api/articles`, …) are also readable without a
token; `src/index.ts` sets that on every start.

## Running it locally

```bash
npm install
npm run develop
```

Then open http://localhost:1337/admin and create your own admin account (the
first visit asks for one). To load the sample content:

```bash
npm run seed
```

The seed is safe to re-run: it matches entries by slug and updates them.

Reviewed copy flows in from the website's files. Re-run the matching import,
then the seed, whenever that copy changes:

```bash
# Resources titles and summaries (Blog, News, Guides)
npm run import:resources -- ../sellThinker-website/public/design-to-copy-adjustments/js/resources-data.js
# Feature landing pages
npm run import:features -- ../sellThinker-website/public/design/js/feature-content.js
npm run seed
```

The Resources import replaces titles and summaries only; article bodies stay as
written in `data/seed-content.js` (or as edited in the admin). Blog posts the
reviewed copy drops are kept as unpublished drafts. Of the feature pages, only
Unified inbox, Priority Today, Lead recovery and Product catalog had approved
copy at the last import; re-import once the other four are reviewed.

**Windows note.** If `npm run develop` fails with "Failed to load native
binding", `@swc/core` refused its cache folder because of its permissions. Point
it at a fresh folder for that terminal, then run develop again:

```powershell
$env:SWC_NATIVE_BINDING_CACHE = "$env:LOCALAPPDATA\swc-native-cache"
```
