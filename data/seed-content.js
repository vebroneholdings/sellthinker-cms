'use strict';

/*
 * Content the seed loads into the CMS.
 *
 *  - data/articles/*.js   one file per article (the SEO articles live here)
 *  - showcase articles     below: one per template, together covering every block
 *  - guides                below: titles and summaries from the reviewed copy
 *
 * Every article has a reviewStatus: "placeholder" (example, rewrite before
 * launch), "needs_fact_check" (states facts about other companies or
 * platforms), or "approved". `publish: false` keeps an entry as a draft.
 * Product claims follow the app as built (vebroneholdings/SellThinker, dev):
 * SellThinker never sends a message on its own, never holds money, and
 * doesn't merge buyers across channels or sync to a CRM.
 */

const fs = require('fs');
const path = require('path');
const { p, h2, h3, ul, ol, text, tldr, takeaways, callout, conclusion, cta, faq, quote, chat, template, steps, PLACEHOLDER, EARLY, AUDIT, A, stub } = require('./helpers');

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
    slug: 'end-of-day-chat-checklist', hub: 'blog', template: 'checklist', topic: 'ops', displayDate: '2026-10-16', readingMinutes: 3, reviewStatus: 'approved',
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
    title: 'Follow-up message to a customer who stopped replying',
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

/* ---------- one file per article in data/articles ---------- */
const articleDir = path.join(__dirname, 'articles');
const fromFiles = fs.existsSync(articleDir)
  ? fs.readdirSync(articleDir).filter((f) => f.endsWith('.js')).sort().map((f) => require(path.join(articleDir, f)))
  : [];

/* Showcase entries that are only placeholders stay as drafts: they exist to demo blocks. */
for (const a of showcase) if (a.reviewStatus === 'placeholder') a.publish = false;

/* Guide titles and summaries come from the reviewed copy (npm run import:resources). */
const COPY = require('./resources-copy.json');
const GUIDE_ALIAS = { roles: 'team' }; // our slug -> the copy file's slug
const guideCopy = Object.fromEntries(COPY.guides.map((c) => [c.slug, c]));
const isStub = (body) => body.length === 3 && body[1] === PLACEHOLDER && body[2] === EARLY;
for (const g of guides) {
  const c = guideCopy[GUIDE_ALIAS[g.slug] || g.slug];
  if (!c) continue;
  g.title = c.title;
  g.excerpt = c.excerpt;
  if (isStub(g.body)) g.body = stub(c.excerpt);
}

/* Deleted on the next seed: the design's placeholder blog posts and news items
   (removed 2026-10-29 at the user's request), and slugs from earlier seeds. */
const DESIGN_POSTS = ['day-3-cliff', 'manychat-vs-human', 'seven-replies', 'coexistence', 'unanswered-question', 'sheets-vs-crm',
  'buyer-words', 'label-studio', 'dm-mistakes', 'payment-links', 'promo-or-scarcity', 'reply-hours', 'whatsapp-window', 'automation-myth'];
const retired = [
  ...DESIGN_POSTS,
  ...COPY.news.map((n) => n.slug),
  'follow-up-message-customer-stopped-replying',
  'one-place-for-every-chat', 'quiet-buyers-one-list', 'insights-launch', 'specs-from-questions', 'priority-faster',
  'access-waves', 'snooze-to-date', 'emoji-reactions-fold', 'whatsapp-coexistence-markets', 'instagram-7-day-window',
  'chat-first-touchpoint', 'per-message-pricing',
].filter((slug) => !fromFiles.some((a) => a.slug === slug));

const global = {
  siteName: 'SellThinker',
  siteDescription: 'Decision guidance for sellers who close in chat. Stop guessing which conversation to open first.',
  defaultSeo: { metaTitle: 'SellThinker', metaDescription: 'SellThinker reads every Instagram DM and WhatsApp chat, scores buyer intent, and tells you which chat to open first. Not a chatbot: you send every message.' },
};

module.exports = { topics, authors, articles: [...fromFiles, ...showcase, ...guides], retired, global };
