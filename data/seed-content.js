'use strict';

/*
 * Sample content for the SellThinker CMS: every article template and every
 * block has at least one real example, so the website can be built and
 * reviewed against actual entries.
 *
 * Copy here is a starting point, not approved copy. Entries carry a
 * `reviewStatus`: "placeholder" (invented example, rewrite before launch),
 * "needs_fact_check" (states facts about other companies or platforms), or
 * "approved". Product claims follow the app as built (vebroneholdings/SellThinker,
 * dev): SellThinker never sends a message on its own, never holds money, and
 * doesn't merge buyers across channels or sync to a CRM.
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

/* ---------- taxonomy ---------- */
const topics = [
  { slug: 'closing', name: 'Sales & closing', description: 'Turning buying questions into paid orders.' },
  { slug: 'recovery', name: 'Lead follow-up', description: 'Bringing quiet buyers back.' },
  { slug: 'instagram', name: 'Instagram selling', description: 'Selling in Instagram DMs.' },
  { slug: 'whatsapp', name: 'WhatsApp Business', description: 'Selling on WhatsApp.' },
  { slug: 'catalog', name: 'Product catalog', description: 'Products, prices and the words buyers use.' },
  { slug: 'ops', name: 'Operations', description: 'Running a chat-led store day to day.' },
];
const authors = [{ name: 'SellThinker editors', role: 'Editorial', email: 'info@sellthinker.com', bio: 'Notes for sellers who close in chat.' }];

/* ---------- articles ---------- */
const A = (o) => ({ author: 'SellThinker editors', reviewStatus: 'placeholder', featured: false, ...o });

// Short body for list entries that only have an excerpt so far.
const stub = (excerpt) => [tldr(excerpt), PLACEHOLDER, EARLY];

const blog = [
  A({
    slug: 'day-3-cliff', hub: 'blog', template: 'opinion', topic: 'recovery', displayDate: '2026-09-30', readingMinutes: 7, featured: true,
    title: 'The day-3 cliff: why most chat sales die in silence',
    excerpt: "Buyers rarely say no. They just stop replying. Here's what the first 72 hours of quiet actually look like, and the one message that brings most of them back.",
    body: [
      tldr('Most lost chat sales are not refusals. The buyer goes quiet, the seller waits to be polite, and by day three the chat has cooled. Treat silence as a question you haven’t answered yet.'),
      text(
        p('Ask any seller who closes in DMs where their sales go and you’ll hear the same answer: nowhere. Nobody says no. A buyer asks the price, says “let me think”, and the chat stops.'),
        h2('Silence is a signal, not an answer'),
        p('When a buyer stops replying, something specific stalled them: the price, the delivery date, a doubt about the size, or simply a busy afternoon. Each of those has a different best move. Waiting is the only move that never works.'),
        h2('What changes on day three'),
        p('In the first day, a short nudge reads as service. By day three the buyer has usually decided, often somewhere else. On Instagram the window to reply is also closing: after seven days a business can no longer message freely.'),
      ),
      quote('Quiet isn’t lost. It’s a question you haven’t answered yet.'),
      takeaways([
        'Most chat sales end in silence, not in a no.',
        'Every quiet buyer stalled on something specific. Name it before you nudge.',
        'Nudge inside the first two days, and never with invented urgency.',
      ]),
      conclusion('Watch the quiet chats as closely as the busy ones. The sale you can still save is usually the one that stopped talking yesterday.', { tone: 'warm' }),
      EARLY,
    ],
  }),
  A({
    slug: 'manychat-vs-human', hub: 'blog', template: 'comparison', topic: 'instagram', displayDate: '2026-09-24', readingMinutes: 9,
    title: 'Bot first or human first? What 4,000 Instagram chats told us',
    excerpt: 'Bots answer fast. Humans close. We split real conversations by who replied first and counted what got paid.',
    body: stub('Bots answer fast. Humans close. We split real conversations by who replied first and counted what got paid.'),
  }),
  A({
    slug: 'seven-replies', hub: 'blog', template: 'top_list', topic: 'closing', displayDate: '2026-09-18', readingMinutes: 5,
    title: 'Seven replies that turn “how much?” into a paid order',
    excerpt: 'Price questions are buying signals. These openers answer the number and move the chat one step closer to the link.',
    body: [
      tldr('“How much?” is the most common buying signal in a DM. Answer the number in the first line, then give the buyer one easy next step.'),
      {
        __component: 'blocks.ranked-list',
        title: 'Seven replies, best first',
        items: [
          { title: 'Price, then the one thing that makes it worth it', body: '“It’s $128, and it’s the linen one that doesn’t crease. Want it in M?”', badge: 'Most replies' },
          { title: 'Price with the size question built in', body: '“$64. Which size do you usually take? I’ll check it’s in stock.”' },
          { title: 'Price plus delivery date', body: '“$90, and it ships tomorrow if you order today.”' },
          { title: 'Price for the bundle they were eyeing', body: '“The top is $48, or $80 with the matching skirt.”' },
          { title: 'Price and a photo of it worn', body: 'The number, plus a picture that answers “how does it fit?” before they ask.' },
          { title: 'Price and how to pay', body: '“$72. I can send you a payment link or take UPI, whichever is easier.”' },
          { title: 'Price, honestly, when it’s high', body: '“It’s $210. It’s hand-finished, so it costs more than most. Happy to show you how it’s made.”' },
        ],
      },
      chat('instagram', [
        ['buyer', 'how much is the linen blazer?', '10:12'],
        ['seller', 'It’s $128, and it’s the linen one that doesn’t crease. Want it in M?', '10:13'],
        ['buyer', 'yes M please', '10:15'],
      ], { title: 'What it looks like in a DM' }),
      callout('tip', 'Never answer with “DM for price”', 'They already did. Making a buyer ask twice is the fastest way to lose them.'),
      EARLY,
    ],
  }),
  A({
    slug: 'coexistence', hub: 'blog', template: 'how_to', topic: 'whatsapp', displayDate: '2026-09-11', readingMinutes: 6,
    title: 'Keep your WhatsApp Business app and still get one inbox',
    excerpt: 'Coexistence means you don’t have to choose between your phone and one inbox for every chat. What changes, what doesn’t, and the one setting to check.',
    reviewStatus: 'needs_fact_check',
    body: stub('Coexistence means you don’t have to choose between your phone and one inbox for every chat. What changes, what doesn’t, and the one setting to check.'),
  }),
  A({
    slug: 'unanswered-question', hub: 'blog', template: 'opinion', topic: 'closing', displayDate: '2026-09-04', readingMinutes: 4,
    title: 'The most expensive message in your inbox is the one you didn’t answer',
    excerpt: 'A missed sizing question costs more than a slow one. Why “answer first, sell second” beats every discount we’ve tested.',
    body: stub('A missed sizing question costs more than a slow one. Why “answer first, sell second” beats every discount we’ve tested.'),
  }),
  A({
    slug: 'sheets-vs-crm', hub: 'blog', template: 'comparison', topic: 'ops', displayDate: '2026-08-28', readingMinutes: 8,
    title: 'Google Sheet or CRM? What a small chat store actually needs',
    excerpt: 'Most CRMs are built for sales departments with pipelines and quotas. Most chat stores have a sheet and a founder. When to stay, when to move.',
    body: [
      tldr('A sheet records what happened. A CRM manages a pipeline. Neither tells you which of today’s 200 chats to open first, and for a chat-led store that’s the question that costs money.'),
      {
        __component: 'blocks.grid-table',
        title: 'What each one does for a chat seller',
        style: 'comparison',
        columns: [{ label: 'Google Sheet' }, { label: 'CRM' }, { label: 'SellThinker', highlight: true }],
        rows: [
          { label: 'Reads your Instagram and WhatsApp chats', cells: [{ mark: 'no' }, { mark: 'partial', value: 'With add-ons' }, { mark: 'yes' }] },
          { label: 'Says which chat to answer first', cells: [{ mark: 'no' }, { mark: 'no' }, { mark: 'yes' }] },
          { label: 'Flags buyers who went quiet', cells: [{ mark: 'no' }, { mark: 'partial', value: 'If you log them' }, { mark: 'yes' }] },
          { label: 'Pipelines, quotas, forecasts', cells: [{ mark: 'no' }, { mark: 'yes' }, { mark: 'no' }] },
          { label: 'Setup time', cells: [{ value: 'Minutes' }, { value: 'Weeks' }, { value: 'An afternoon' }] },
        ],
        caption: 'SellThinker is not a CRM and doesn’t sync to one. It reads chats and tells you what to do next.',
      },
      {
        __component: 'blocks.pros-cons',
        title: 'Staying on a sheet',
        pros: [{ text: 'Free, and everyone already knows how it works.' }, { text: 'Good for orders once they’re paid.' }],
        cons: [{ text: 'Only as current as the last time someone typed into it.' }, { text: 'Can’t tell you who’s waiting on a reply right now.' }],
      },
      conclusion('Keep the sheet for orders. Don’t buy a CRM to solve a reply-order problem.', { tone: 'ink' }),
      EARLY,
    ],
  }),
  A({
    slug: 'buyer-words', hub: 'blog', template: 'how_to', topic: 'catalog', displayDate: '2026-08-21', readingMinutes: 6,
    title: 'Your buyers don’t use your product names. Here’s how to catch up',
    excerpt: '“The blue one from your story” is a product. Building a list of the phrases buyers use cuts the back-and-forth in half.',
    body: stub('“The blue one from your story” is a product. Building a list of the phrases buyers use cuts the back-and-forth in half.'),
  }),
  A({
    slug: 'label-studio', hub: 'blog', template: 'case_study', topic: 'recovery', displayDate: '2026-08-14', readingMinutes: 7,
    title: 'How a two-person label won back quiet buyers in one week',
    excerpt: 'No new ads, no discounts on everything. Just the right nudge, at the right hour, to the buyers most worth chasing.',
    body: [
      tldr('A sample case study showing the shape of the template: the situation, what changed, and what happened, in that order.'),
      PLACEHOLDER,
      {
        __component: 'blocks.timeline',
        title: 'The week',
        events: [
          { when: 'Monday', title: 'Eleven quiet buyers on the list', body: 'Sorted by who was worth chasing first.' },
          { when: 'Tuesday', title: 'Five nudges, each tied to why the buyer stalled', body: 'Price questions got the value line. Size doubts got the fit answer.' },
          { when: 'Friday', title: 'Three came back', body: 'Two paid the same day.' },
        ],
      },
      EARLY,
    ],
  }),
  A({
    slug: 'dm-mistakes', hub: 'blog', template: 'top_list', topic: 'instagram', displayDate: '2026-08-07', readingMinutes: 5,
    title: 'Five DM habits quietly costing you sales',
    excerpt: 'Voice notes, “DM for price”, and replying at midnight. The small habits buyers notice before you do.',
    body: stub('Voice notes, “DM for price”, and replying at midnight. The small habits buyers notice before you do.'),
  }),
  A({
    slug: 'payment-links', hub: 'blog', template: 'how_to', topic: 'closing', displayDate: '2026-07-31', readingMinutes: 5,
    title: 'Send the payment link before they ask for it',
    excerpt: 'The moment a buyer confirms a size is the moment to close. How to spot it, and what to send so the link lands right.',
    body: [
      tldr('Send your payment link the moment a buyer confirms the product and the variant. Not before, and never when they’ve asked for cash on delivery.'),
      steps([
        ['Confirm the exact item', 'Size, colour and quantity. If there are two blue shirts, ask which one before anything else.', 'Ambiguous? Ask. Guessing the product is the costliest mistake in chat selling.'],
        ['Check it’s in stock', 'Say so in the same message: “The M is in stock.”'],
        ['Send the link with the total', '“Here’s your link for the Linen Blazer, $128 all-in. Ships once it’s paid.”'],
        ['Follow up once if it sits unpaid', 'A day later: “Your link still works if you’d like it.” No pressure, no invented deadline.'],
      ], { title: 'Four steps', totalTime: '2 minutes' }),
      chat('whatsapp', [
        ['buyer', 'ok I’ll take the M', '14:02'],
        ['seller', 'The M is in stock. Here’s your link for the Linen Blazer, $128 all-in: your-store.com/pay', '14:03'],
        ['note', 'The buyer confirmed size, so this is the moment to send the link.', ''],
      ]),
      callout('warning', 'Cash on delivery?', 'If a buyer asked for COD, don’t send a payment link. Confirm the address and the delivery date instead.'),
      template('The unpaid-link follow-up', 'Hi! Your link for the {product} still works whenever you’re ready. Anything I can help with first?', { whenToUse: 'A day after a link was sent and not paid.' }),
      EARLY,
    ],
  }),
  A({
    slug: 'promo-or-scarcity', hub: 'blog', template: 'comparison', topic: 'recovery', displayDate: '2026-07-24', readingMinutes: 6,
    title: 'Discount or scarcity: which brings a quiet buyer back?',
    excerpt: 'We compared “10% off” against “only 3 left in your size” in recovery nudges. One of them wins by a lot, and it isn’t the cheaper one.',
    body: stub('We compared “10% off” against “only 3 left in your size” in recovery nudges. One of them wins by a lot, and it isn’t the cheaper one.'),
  }),
  A({
    slug: 'reply-hours', hub: 'blog', template: 'top_list', topic: 'ops', displayDate: '2026-07-17', readingMinutes: 4,
    title: 'Six numbers every chat seller should check on Monday',
    excerpt: 'Chats in, chats closed, chats that went quiet, first-reply time by day. Six numbers, one minute, and you know where the week went.',
    body: stub('Chats in, chats closed, chats that went quiet, first-reply time by day. Six numbers, one minute, and you know where the week went.'),
  }),
  A({
    slug: 'whatsapp-window', hub: 'blog', template: 'explainer', topic: 'whatsapp', displayDate: '2026-07-10', readingMinutes: 5,
    title: 'The 24-hour window: what you can still send after a buyer goes quiet',
    excerpt: 'WhatsApp and Instagram both close the door after a while. What the rules are, and how to stay inside them without sounding like a bot.',
    reviewStatus: 'needs_fact_check',
    body: [
      tldr('WhatsApp lets a business reply freely for 24 hours after the buyer’s last message; after that, only pre-approved templates. Instagram’s window is seven days. Follow up inside the window.'),
      {
        __component: 'blocks.spec-table',
        title: 'The windows at a glance',
        rows: [
          { label: 'WhatsApp', value: '24 hours after the buyer’s last message. After that, approved templates only.' },
          { label: 'Instagram', value: '7 days after the buyer’s last message. After that, no new messages.' },
          { label: 'What resets it', value: 'The buyer sending you a new message.' },
        ],
        note: 'Check Meta’s current rules before publishing; they change.',
      },
      callout('insight', 'Why this matters for follow-ups', 'A nudge on day two lands inside both windows. A nudge on day eight can’t be sent on Instagram at all.'),
      { __component: 'blocks.sources', items: [{ title: 'WhatsApp Business Platform: messaging windows', publisher: 'Meta', url: 'https://developers.facebook.com/docs/whatsapp' }] },
      EARLY,
    ],
  }),
  A({
    slug: 'automation-myth', hub: 'blog', template: 'opinion', topic: 'ops', displayDate: '2026-07-03', readingMinutes: 6,
    title: 'Automate the sorting, not the selling',
    excerpt: 'Every tool promises to reply for you. We think the reply is the part worth keeping. Here’s what we automate instead.',
    body: stub('Every tool promises to reply for you. We think the reply is the part worth keeping. Here’s what we automate instead.'),
  }),
];

/* Showcase articles: one per remaining template, together covering every block. */
const CALCULATOR = `<!doctype html><html><head><meta charset="utf-8"><style>
body{font-family:Sora,system-ui,sans-serif;margin:0;padding:20px;color:#1d1d1b;background:#faf8f5}
label{display:block;font-size:14px;font-weight:600;margin:14px 0 6px}
input{width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid #d9d4cc;border-radius:12px;font:inherit;font-size:15px}
.out{margin-top:20px;padding:16px;border-radius:14px;background:#e6f4ee}
.big{font-size:28px;font-weight:600}
</style></head><body>
<label for="c">Chats you get in a day</label><input id="c" type="number" value="120" min="0">
<label for="m">Minutes a good reply takes you</label><input id="m" type="number" value="3" min="1">
<label for="h">Hours you can spend in your inbox</label><input id="h" type="number" value="3" min="0" step="0.5">
<div class="out"><div class="big" id="r"></div><div id="s"></div></div>
<script>
function calc(){var c=+document.getElementById('c').value||0,m=+document.getElementById('m').value||1,h=+document.getElementById('h').value||0;
var can=Math.floor(h*60/m),left=Math.max(0,c-can);
document.getElementById('r').textContent=can>=c?'You can answer all '+c:'You can answer '+can+' of '+c;
document.getElementById('s').textContent=left?left+' chats will wait. Answer the ones closest to buying first.':'Every chat gets a reply today.';}
document.querySelectorAll('input').forEach(function(i){i.addEventListener('input',calc)});calc();
</script></body></html>`;

const showcase = [
  A({
    slug: 'hot-warm-cold-leads-whatsapp-instagram', hub: 'blog', template: 'explainer', topic: 'closing', displayDate: '2026-10-20', readingMinutes: 6, reviewStatus: 'approved',
    title: 'Hot, warm and cold leads for WhatsApp and Instagram sellers',
    excerpt: 'What hot, warm and cold mean when your leads are chats, not form fills, and how a score from 0 to 100 decides which chat you open first.',
    body: [
      tldr('Every sales chat gets a score from 0 to 100. Hot is 70 and above, warm is 40 to 69, cold is below 40. The score comes from what the buyer actually said, not from guesswork.'),
      { __component: 'blocks.definition', term: 'Hot lead', short: 'A buyer whose chat scores 70 or more: they’ve named a product and asked to buy, or said so in two messages.', more: 'One question on its own can’t make a chat hot. It takes a clear ask, like “send me the link”.' },
      {
        __component: 'blocks.explainer',
        title: 'The three bands',
        layout: 'flow',
        cards: [
          { icon: '❄', title: 'Cold · below 40', body: 'Browsing, saying hi, a broad question. Every chat starts here.' },
          { icon: '◐', title: 'Warm · 40 to 69', body: 'Picked a product, asking about size, price or delivery.' },
          { icon: '●', title: 'Hot · 70 and up', body: 'Ready to pay. Send the link, confirm the variant, finish the sale.' },
        ],
      },
      {
        __component: 'blocks.spec-table',
        title: 'What moves the score',
        rows: [
          { label: 'Buying language', value: 'Price, size, stock, “how do I pay”, “I’ll take it”.' },
          { label: 'Product focus', value: 'A specific product you sell, in stock.' },
          { label: 'Purchase history', value: 'They’ve bought from you before.' },
          { label: 'Recency', value: 'Heat cools the longer a chat sits quiet.' },
        ],
      },
      callout('insight', 'Why a single question stays warm', 'A buyer asking “how much?” once is interested, not ready. The score holds a single question below hot so your list doesn’t fill with tyre-kickers.'),
      faq([
        ['What are hot leads and cold leads?', 'A hot lead is ready to buy now; a cold lead is browsing. For chat sellers the difference shows up in the words the buyer uses.'],
        ['How do I know which WhatsApp leads are ready to buy?', 'Look for a named product plus a buying phrase: “I’ll take the M”, “send the link”. Those are the chats to open first.'],
      ]),
      conclusion('Score the chat, not the person’s follower count. The buyer’s own words are the best signal you have.', { tone: 'sky' }),
      EARLY,
    ],
  }),
  A({
    slug: 'end-of-day-chat-checklist', hub: 'blog', template: 'checklist', topic: 'ops', displayDate: '2026-10-16', readingMinutes: 3,
    title: 'The end-of-day checklist for chat sellers',
    excerpt: 'Eight things to check before you put the phone down, so nobody ready to pay waits until tomorrow.',
    body: [
      {
        __component: 'blocks.checklist',
        title: 'Before you put the phone down',
        intro: 'Tick as you go. Your progress stays on this device.',
        items: [
          { text: 'Every buyer who asked to pay has a link', detail: 'Search for “link”, “pay”, “UPI”.' },
          { text: 'No unanswered size or stock question' },
          { text: 'Unpaid links from yesterday got one follow-up' },
          { text: 'Complaints got a reply, even a short one', detail: 'A paying customer waiting on an answer comes before new sales.' },
          { text: 'Wholesale and collab asks have a reply or a time' },
          { text: 'Quiet buyers from the last two days: nudge or let go' },
          { text: 'Tomorrow’s first three chats are clear' },
          { text: 'Phone on charge' },
        ],
      },
      takeaways(['Payment links and unanswered questions first.', 'One follow-up per unpaid link, not three.', 'Decide on quiet buyers today, not next week.']),
      EARLY,
    ],
  }),
  A({
    slug: 'chat-capacity-calculator', hub: 'blog', template: 'tool', topic: 'ops', displayDate: '2026-10-14', readingMinutes: 2, reviewStatus: 'approved',
    title: 'How many chats can you answer today? A capacity calculator',
    excerpt: 'Put in your daily chats, minutes per reply and hours in the inbox. See how many will wait, and why reply order matters more than speed.',
    body: [
      { __component: 'blocks.html-embed', title: 'Chat capacity calculator', html: CALCULATOR, height: 460, note: 'Runs in your browser. Nothing you type is sent anywhere.' },
      steps([
        ['Count a normal day’s chats', 'Use yesterday’s number if you’re not sure.'],
        ['Time one good reply', 'Including checking stock and finding the photo.'],
        ['Be honest about inbox hours', 'Hours you actually spend replying, not hours the phone is on.'],
      ], { title: 'How to use it' }),
      callout('tip', 'When the number doesn’t fit', 'If more chats arrive than you can answer, the order you answer them in decides how many sales you keep.'),
      EARLY,
    ],
  }),
  A({
    slug: 'chat-selling-glossary', hub: 'blog', template: 'glossary', topic: 'ops', displayDate: '2026-10-10', readingMinutes: 4, reviewStatus: 'approved',
    title: 'Glossary: the words SellThinker uses, in plain English',
    excerpt: 'Priority Today, quiet buyers, recovery windows and the noise shelf, each in one sentence.',
    body: [
      { __component: 'blocks.definition', term: 'Priority Today', short: 'Your list of up to 25 chats to work through, in the order they matter: Close, Protect, Business, Rescue, Reply.' },
      { __component: 'blocks.definition', term: 'Quiet buyer', short: 'Someone who was warm or hot and stopped replying.', more: 'Recovery shows them with the reason they stalled and the one best move.' },
      { __component: 'blocks.definition', term: 'Recovery window', short: 'How long you still have to follow up before a quiet buyer usually goes cold.' },
      { __component: 'blocks.definition', term: 'Payment sent', short: 'The stage after you’ve sent a buyer your payment link and before they’ve paid.' },
      { __component: 'blocks.definition', term: 'Noise shelf', short: 'Where spam and emoji-only reactions are folded away. Nothing is deleted; one tap moves a chat back.' },
      { __component: 'blocks.related-links', links: [{ label: 'Hot, warm and cold leads explained', url: 'article.html?slug=hot-warm-cold-leads-whatsapp-instagram' }, { label: 'Daily priority list', url: 'daily-priority-list.html' }] },
    ],
  }),
  A({
    slug: 'sellthinker-faq', hub: 'blog', template: 'faq_page', topic: 'ops', displayDate: '2026-10-08', readingMinutes: 4, reviewStatus: 'approved',
    title: 'SellThinker FAQs: what it does, and what it never does',
    excerpt: 'Straight answers on channels, pricing, sending, payments and your buyers’ data.',
    body: [
      faq([
        ['Which chats does SellThinker read?', 'Instagram DMs and WhatsApp Business chats, in one inbox.'],
        ['Does it reply to buyers for me?', 'No. It drafts replies you can use, change or ignore. Every message is sent by you.'],
        ['Is it a chatbot?', 'No. It sits beside your chats and tells you which one to open, why, and what to say. Bots like ManyChat can keep running.'],
        ['Does it handle payments?', 'It puts your own payment link or UPI ID into a draft when a buyer asks how to pay. The money goes straight to you; SellThinker never holds it.'],
        ['Does it merge one buyer’s Instagram and WhatsApp chats?', 'No. Two handles stay two buyers, because a wrong match would mix up two strangers’ chats.'],
        ['What does it cost?', '$49 a month for SellThinker Signals. The sales chat audit is free.'],
      ]),
      conclusion('If something here doesn’t answer your question, email info@sellthinker.com and a person will reply.', { tone: 'brand', buttonLabel: 'Email us', buttonUrl: 'mailto:info@sellthinker.com' }),
    ],
  }),
  A({
    slug: 'what-a-weekly-report-counts', hub: 'blog', template: 'data_report', topic: 'ops', displayDate: '2026-10-06', readingMinutes: 5,
    title: 'What a weekly chat report should count (with a sample week)',
    excerpt: 'Chats in, chats closed, buyers recovered, first-reply time. A sample week, and what each number tells you to do.',
    body: [
      tldr('A useful weekly report counts things you can act on: chats closed, buyers who came back, and how long buyers waited. The numbers below are a sample, not real data.'),
      { __component: 'blocks.stats', title: 'A sample week', items: [{ value: '1,240', label: 'Chats read', source: 'Sample' }, { value: '86', label: 'Closed', source: 'Sample' }, { value: '14', label: 'Quiet buyers came back', source: 'Sample' }, { value: '38 min', label: 'Median first reply', source: 'Sample' }] },
      {
        __component: 'blocks.grid-table',
        title: 'First reply by day (sample)',
        style: 'data',
        columns: [{ label: 'Mon' }, { label: 'Tue' }, { label: 'Wed' }, { label: 'Thu' }, { label: 'Fri' }],
        rows: [{ label: 'Median first reply', cells: [{ value: '22 min' }, { value: '31 min' }, { value: '4.2 h' }, { value: '40 min' }, { value: '28 min' }] }],
        caption: 'Wednesday is the outlier: that’s where to look first.',
      },
      PLACEHOLDER,
    ],
  }),
  A({
    slug: 'follow-up-message', hub: 'blog', template: 'message_templates', topic: 'recovery', displayDate: '2026-10-22', readingMinutes: 7, reviewStatus: 'approved',
    title: 'Follow-up messages for a customer who stopped replying',
    excerpt: 'Nine follow-ups, one for each reason a buyer goes quiet. Copy, change the product, send.',
    body: [
      tldr('Don’t send the same nudge to every quiet buyer. Find why they stalled and answer that. No apologies, no invented urgency, no discount by default.'),
      template('They went quiet after the price', 'Hi! The {product} is {price}, and it’s {the one thing that makes it worth it}. Want me to hold one in your size?', { whenToUse: 'Price talk' }),
      template('Worried about delivery', 'Hi! The {product} ships {day} and reaches {city} in {days}. Want me to get it out tomorrow?', { whenToUse: 'Delivery worry' }),
      template('Not sure it’s genuine', 'Hi! Here’s a photo of the {product} taken today, and the {material} up close. Happy to answer anything else.', { whenToUse: 'Trust doubt' }),
      template('Not sure about the fit', 'Hi! The {product} runs {fit}. Most people take their usual size. What do you usually wear?', { whenToUse: 'Fit doubt' }),
      template('Asked how to pay', 'Hi! You can pay by UPI to {upi id} or with this link: {link}. Whichever is easier.', { whenToUse: 'How to pay' }),
      template('Link sent, not paid', 'Hi! Your link for the {product} still works whenever you’re ready.', { whenToUse: 'Link unpaid' }),
      template('Said “after payday”', 'Hi! It’s {day}, so just checking in on the {product}. Still keen?', { whenToUse: 'Date passed' }),
      template('Drifted after you replied', 'Hi! Did the {product} still catch your eye? I can send a couple of photos of it worn.', { whenToUse: 'Drifted' }),
      template('Their question never got an answer', 'Hi, sorry for the wait! The {product} is {answer}. Want me to set one aside?', { whenToUse: 'Missed question' }),
      { __component: 'blocks.before-after', title: 'One rewrite', before: 'Hey!! Just checking if you’re still interested?? Only a few left!!', after: 'Hi! The linen blazer is $128 and it’s the one that doesn’t crease. Want me to hold an M?', why: 'The second one answers what stalled her (the price) and gives one easy next step.' },
      AUDIT,
    ],
  }),
  A({
    slug: 'dm-reply-myths', hub: 'blog', template: 'myth_vs_fact', topic: 'closing', displayDate: '2026-10-02', readingMinutes: 4, reviewStatus: 'approved',
    title: 'Four myths about replying to DMs',
    excerpt: 'Faster is always better, a bot reply counts, discounts bring buyers back. What actually happens in the chat.',
    body: [
      { __component: 'blocks.before-after', beforeLabel: 'Myth', afterLabel: 'Fact', before: 'Reply to everyone in the order they arrived.', after: 'Reply to the buyers closest to paying first. Arrival order hides the people holding money.' },
      { __component: 'blocks.before-after', beforeLabel: 'Myth', afterLabel: 'Fact', before: 'A bot’s instant reply means the buyer has been answered.', after: 'A bot answered. The buyer who asked “can I pay now?” is still waiting for you.' },
      { __component: 'blocks.before-after', beforeLabel: 'Myth', afterLabel: 'Fact', before: 'A discount is the best way to bring a quiet buyer back.', after: 'Answer what stalled them first. Most quiet buyers stalled on a question, not the price.' },
      { __component: 'blocks.before-after', beforeLabel: 'Myth', afterLabel: 'Fact', before: 'Three follow-ups show you care.', after: 'One good follow-up, tied to the reason they stalled, beats three generic ones.' },
      conclusion('Reply in the order that matters, answer what stalled the buyer, and stop at one good nudge.', { tone: 'warm' }),
    ],
  }),
  A({
    slug: 'whats-new-october', hub: 'blog', template: 'roundup', topic: 'ops', displayDate: '2026-10-28', readingMinutes: 4, reviewStatus: 'approved',
    title: 'What’s new in SellThinker this October',
    excerpt: 'Drafts ready when you open a chat, Hindi and Hinglish drafts, buyer photos read, and a fairer Priority Today.',
    body: [
      {
        __component: 'blocks.timeline',
        title: 'October',
        events: [
          { when: 'Oct 26', title: 'Drafts are ready when you open the chat', body: 'A reply is drafted about a minute after the buyer’s message settles, so you’re not waiting on it.' },
          { when: 'Oct 26', title: 'A “yes” that went cold moves to Rescue', body: 'Close now only holds buyers still ready to pay.' },
          { when: 'Oct 27', title: 'Buyer photos are read', body: 'When a buyer sends a screenshot or photo, it counts towards understanding the chat.' },
          { when: 'October', title: 'Drafts in English, Hindi and Hinglish', body: 'With tone options: shorter, friendlier, more formal.' },
        ],
      },
      { __component: 'blocks.related-links', links: [{ label: 'Daily priority list', url: 'daily-priority-list.html' }, { label: 'Lead recovery', url: 'recovery-alerts.html' }] },
    ],
  }),
  A({
    slug: 'why-sellthinker-never-sends-for-you', hub: 'blog', template: 'interview', topic: 'ops', displayDate: '2026-09-28', readingMinutes: 5, reviewStatus: 'approved',
    title: 'Q&A: why SellThinker never sends a message for you',
    excerpt: 'Five questions about the one rule we won’t bend: a person presses send.',
    body: [
      text(p('Questions we hear most about how SellThinker works, answered in our own words.')),
      faq([
        ['Wouldn’t auto-replies be faster?', 'Faster, yes. But the reply is where the sale happens. We draft it so it takes seconds; you decide if it goes.'],
        ['What does SellThinker do on its own, then?', 'It reads, sorts, scores and drafts. It never sends, never holds money and never messages a buyer you’ve let go.'],
        ['Can I send the same message to everyone?', 'No. SellThinker doesn’t send messages in batches. Every message goes to one buyer, from you.'],
      ], 'The questions'),
      quote('We draft the reply. You press send. That rule doesn’t change.', 'SellThinker'),
      EARLY,
    ],
  }),
  A({
    slug: 'instagram-video-walkthrough', hub: 'blog', template: 'explainer', topic: 'instagram', displayDate: '2026-09-20', readingMinutes: 3,
    title: 'A two-minute tour of one chat, start to finish',
    excerpt: 'From the first DM to the paid order: where SellThinker shows up, and where it stays out of the way.',
    body: [
      { __component: 'blocks.video', url: 'https://www.youtube.com/watch?v=REPLACE_WITH_REAL_VIDEO', caption: 'Placeholder video link. Replace with the real walkthrough.' },
      { __component: 'blocks.image', alt: 'Inbox screenshot placeholder', caption: 'Add a screenshot of the inbox here.' },
      PLACEHOLDER,
    ],
  }),
];

/* ---------- news: titles and summaries from the reviewed copy (data/resources-copy.json) ---------- */
const COPY = require('./resources-copy.json');
const news = COPY.news.map((n) =>
  A({
    slug: n.slug,
    hub: 'news',
    template: n.stream === 'sellthinker' ? 'product_update' : 'news_post',
    topic: n.area === 'whatsapp' ? 'whatsapp' : n.area === 'instagram' ? 'instagram' : 'ops',
    displayDate: n.date,
    readingMinutes: 1,
    reviewStatus: n.stream === 'sellthinker' ? 'placeholder' : 'needs_fact_check',
    title: n.title || n.area,
    excerpt: n.excerpt,
    news: { stream: n.stream, kind: n.kind, area: n.area, version: n.version, source: n.source, take: n.take, featureLink: n.featureLink },
    body: [text(p(n.excerpt)), ...(n.take ? [callout('insight', 'Our take', n.take)] : [])],
  })
);

/* ---------- guides ---------- */
const guide = (o) => A({ hub: 'guides', template: 'guide', topic: 'ops', ...o });
const guides = [
  guide({ slug: 'connect', displayDate: '2026-10-01', readingMinutes: 5, guide: { stage: 'setup', stepsCount: 4 }, title: 'Connect Instagram and WhatsApp', excerpt: 'Official Meta login for Instagram, coexistence for WhatsApp. Your phone keeps working.', reviewStatus: 'needs_fact_check', body: stub('Official Meta login for Instagram, coexistence for WhatsApp. Your phone keeps working.') }),
  guide({ slug: 'store', topic: 'catalog', displayDate: '2026-10-01', readingMinutes: 4, guide: { stage: 'setup', stepsCount: 3 }, title: 'Bring in your catalog', excerpt: 'Shopify, WooCommerce, a CSV, or products added by hand. Prices and stock sync in.', body: stub('Shopify, WooCommerce, a CSV, or products added by hand. Prices and stock sync in.') }),
  guide({ slug: 'roles', displayDate: '2026-10-01', readingMinutes: 3, guide: { stage: 'setup', stepsCount: 3 }, title: 'Choose who can see what', excerpt: 'Owner, admin and member roles, and what each one can open.', body: stub('Owner, admin and member roles, and what each one can open.') }),
  guide({
    slug: 'first-run', displayDate: '2026-10-01', readingMinutes: 6, reviewStatus: 'approved', guide: { stage: 'day', stepsCount: 5 },
    title: 'Work your first priority run', excerpt: 'Up to 25 stops, one pass. How to use the why-line, drafts and skips.',
    body: [
      tldr('Open Priority Today, press Start the run, and work one chat at a time from the top. Skip what you can’t answer yet; it comes back later.'),
      steps([
        ['Open Priority Today', 'Your list is built fresh at 6am, up to 25 chats, closest to money first.'],
        ['Read the why-line', 'Each stop says why it’s there: a buyer said yes, a complaint is waiting, a warm buyer is going quiet.'],
        ['Use the draft, or don’t', 'The reply is already drafted. Use it, change it, or write your own. You press send.'],
        ['Skip when you need to', 'Not sure which product they meant? Skip it. Skipped chats come back for a second pass.'],
        ['Finish the run', 'The run ends with what’s closed, what’s waiting on the buyer, and what comes back.'],
      ], { totalTime: '15–30 minutes' }),
      { __component: 'blocks.explainer', title: 'The order of the run', layout: 'numbered', cards: [
        { title: 'Close', body: 'They said yes or paid: finish the sale.' },
        { title: 'Protect', body: 'A paying customer, still unanswered.' },
        { title: 'Business', body: 'Wholesale and collab: answer while they’re warm.' },
        { title: 'Rescue', body: 'Warm money going quiet.' },
        { title: 'Reply', body: 'Fast answers keep them warm.' },
      ] },
      callout('tip', 'Change the order', 'Settings → Priority order lets you move the groups around. Protect always stays in the top two.'),
    ],
  }),
  guide({ slug: 'recovery', topic: 'recovery', displayDate: '2026-10-01', readingMinutes: 7, guide: { stage: 'day', stepsCount: 5 }, title: 'Run a recovery pass in ten minutes', excerpt: 'Who to chase, who to snooze, who to let go. And what to say.', body: stub('Who to chase, who to snooze, who to let go. And what to say.') }),
  guide({ slug: 'drafts', topic: 'closing', displayDate: '2026-10-01', readingMinutes: 4, guide: { stage: 'day', stepsCount: 4 }, title: 'Make drafts sound like you', excerpt: 'Tone, sign-offs and the phrases you never use.', body: stub('Tone, sign-offs and the phrases you never use.') }),
  guide({ slug: 'phrases', topic: 'catalog', displayDate: '2026-10-01', readingMinutes: 5, guide: { stage: 'grow', stepsCount: 4 }, title: 'Teach the catalog your buyers’ words', excerpt: 'Confirm phrases, accept specs, and push answerable past 90%.', body: stub('Confirm phrases, accept specs, and push answerable past 90%.') }),
  guide({ slug: 'promos', topic: 'recovery', displayDate: '2026-10-01', readingMinutes: 6, guide: { stage: 'grow', stepsCount: 4 }, title: 'Use promos without training buyers to wait', excerpt: 'When a code helps, when scarcity works better, and how to scope it.', body: stub('When a code helps, when scarcity works better, and how to scope it.') }),
  guide({ slug: 'monday', displayDate: '2026-10-01', readingMinutes: 5, guide: { stage: 'grow', stepsCount: 3 }, title: 'Read your Monday numbers', excerpt: 'A few counts, one leak, one thing to try. Then check it worked.', body: stub('A few counts, one leak, one thing to try. Then check it worked.') }),
];

const global = {
  siteName: 'SellThinker',
  siteDescription: 'Decision guidance for sellers who close in chat. Stop guessing which conversation to open first.',
  defaultSeo: { metaTitle: 'SellThinker', metaDescription: 'SellThinker reads every Instagram DM and WhatsApp chat, scores buyer intent, and tells you which chat to open first. Not a chatbot: you send every message.' },
};

/* Reviewed copy wins: titles and summaries come from data/resources-copy.json.
   Blog posts the reviewed copy dropped stay in the CMS as unpublished drafts. */
const isStub = (body) => body.length === 3 && body[1] === PLACEHOLDER && body[2] === EARLY;
const postCopy = Object.fromEntries(COPY.posts.map((c) => [c.slug, c]));
for (const a of [...blog, ...showcase]) {
  const c = postCopy[a.slug];
  if (!c) {
    if (blog.includes(a)) a.publish = false;
    continue;
  }
  a.title = c.title;
  a.excerpt = c.excerpt;
  a.featured = c.featured;
  if (isStub(a.body)) a.body = stub(c.excerpt);
}
const GUIDE_ALIAS = { roles: 'team' }; // our slug -> the copy file's slug
const guideCopy = Object.fromEntries(COPY.guides.map((c) => [c.slug, c]));
for (const g of guides) {
  const c = guideCopy[GUIDE_ALIAS[g.slug] || g.slug];
  if (!c) continue;
  g.title = c.title;
  g.excerpt = c.excerpt;
  if (isStub(g.body)) g.body = stub(c.excerpt);
}

// Slugs from earlier seeds that no longer exist; the seed deletes them.
const retired = [
  'follow-up-message-customer-stopped-replying',
  'one-place-for-every-chat', 'quiet-buyers-one-list', 'insights-launch', 'specs-from-questions', 'priority-faster',
  'access-waves', 'snooze-to-date', 'emoji-reactions-fold', 'whatsapp-coexistence-markets', 'instagram-7-day-window',
  'chat-first-touchpoint', 'per-message-pricing',
];

module.exports = { topics, authors, articles: [...blog, ...showcase, ...news, ...guides], retired, global };
