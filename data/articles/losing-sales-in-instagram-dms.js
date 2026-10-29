'use strict';
const { p, h2, ul, text, tldr, callout, faq, chat, block, AUDIT, A } = require('../helpers');

module.exports = A({
  slug: 'losing-sales-in-instagram-dms',
  hub: 'blog',
  template: 'explainer',
  topic: 'instagram',
  displayDate: '2026-10-29',
  readingMinutes: 7,
  reviewStatus: 'approved',
  title: 'Why am I losing sales in my Instagram DMs (and WhatsApp chats)',
  excerpt: 'Chat sales rarely vanish in one place. They leak at five points: a slow reply, no link sent, a link left unpaid, silence after the price, and a quiet buyer nobody followed up. How to spot and count each one.',
  seo: {
    metaTitle: 'Why am I losing sales in my Instagram DMs? 5 leaks',
    metaDescription: 'Five places chat sales leak in Instagram DMs and WhatsApp: slow reply, no link sent, link unpaid, quiet after price, ignored recovery. How to count each.',
  },
  body: [
    tldr('Most lost chat sales aren’t lost to price or to a rival shop. They leak at five points in the conversation: a slow reply, no link sent, a link left unpaid, silence after the price, and a quiet buyer nobody followed up. Count each leak in your own chats before you change anything, then fix the biggest one first.'),

    text(
      p('“Why am I losing sales in my Instagram DMs?” is the question most chat sellers ask the week orders dip, and the answer is usually written down in the chats themselves.'),
      p('This is for the solo seller handling 50–500 chats a day across Instagram and WhatsApp, where a buyer types “rate batao” at 11 pm and a dozen more chats arrive before you can answer.'),
    ),

    text(
      h2('Sales leakage: the five places a chat sale slips'),
      p('Sales leakage is the gap between buyers who wanted something and buyers who paid. In a chat shop it’s written in your DMs, and it slips out at five points: slow reply, no link sent, link unpaid, quiet after price and ignored recovery. Each is easy to spot and has a simple first fix.'),
    ),

    text(
      h2('Slow reply (and why lead response time matters more in chat)'),
      p('Lead response time is how long a buyer waits for your first useful answer. In chat it matters more, because the next shop is one tap away in the buyer’s feed.'),
      p('**What it looks like:** a buyer asks the price of the green kurta at 9:40 pm. You see it at 8 am, reply, and hear nothing back.'),
      p('**How to count it:** in a month of sales chats, mark every chat where a buyer’s question sat waiting for you, and note how long. Then look for the pattern: late evenings, Sundays, the day after a new Reel.'),
      p('**First fix:** stop answering in arrival order. Answer the buyers closest to paying first. That’s what SellThinker’s [Priority Today](/daily-priority-list) list is for: up to 25 chats a day, in the order Close, Protect, Business, Rescue, Reply, so a buyer asking how to pay never waits behind someone who said “hi”.'),
    ),

    text(
      h2('No link sent'),
      p('The buyer said “ok le leti hu” or “kaise pay karu?”, and the chat ended there. Maybe you meant to send the UPI ID after packing the morning orders. Maybe the chat slid under twenty new ones. Either way, a buyer who was ready to pay was left with no way to do it.'),
      p('**How to count it:** chats where the buyer picked a product and asked to buy or how to pay, and your next message had no UPI ID, no payment link and no COD confirmation.'),
      p('**First fix:** answer “how do I pay?” in the same reply, with the product, size, amount and your own UPI ID or payment link. When a buyer asks how to pay, SellThinker puts your own UPI ID or payment link into a draft reply; you check it and send it. For the rules on timing, read [when to send a payment link on WhatsApp](/resources/when-to-send-payment-link-on-whatsapp).'),
    ),

    text(
      h2('Link unpaid'),
      p('You sent the link. The buyer saw it. No payment. Sellers notice this leak least, because from your side the chat feels finished.'),
      p('A buyer who asked for the link wanted to pay a moment ago. Something got in the way: the delivery cost, a wish for COD, or just a busy evening.'),
      p('**How to count it:** links and UPI IDs you sent where no matching payment shows in your Razorpay, Stripe or bank app. SellThinker can’t see your payments, so this check is always against your own dashboard.'),
      p('**First fix:** one short reminder with the same link, then a question about the thing most likely in the way. In SellThinker, these chats show up in Recovery with the reason **Link unpaid** and one best move.'),
    ),

    text(
      h2('Quiet after price'),
      p('The buyer asked “last price?”, you answered, and the chat went silent. Everyone who sells in DMs knows this one. Usually the price wasn’t the problem on its own; a bare number simply gave the buyer nothing to say yes to.'),
    ),
    chat('whatsapp', [
      ['buyer', 'Hi, ye saree ka rate batao', '9:12 pm'],
      ['seller', '$89', '9:30 pm'],
      ['note', 'Seen at 9:31 pm. No reply since.'],
      ['seller', 'Hi! It’s $89, pure silk with a zari border, and it ships tomorrow. Want me to keep one aside for you?', 'Rewrite'],
    ], {
      title: 'A bare price, and a better one',
      caption: 'The rewrite pairs the price with one reason it’s worth it and one easy next step. No discount, no invented urgency.',
    }),
    text(
      p('**How to count it:** sales chats whose last message is your price, with no reply from the buyer.'),
      p('**First fix:** never send the price alone. For the reasons buyers go quiet and what to say to each, see [customer asked the price and stopped replying](/resources/customer-asked-price-and-stopped-replying) and [what to reply when a customer asks the price](/resources/what-to-reply-when-customer-asks-price-whatsapp). SellThinker’s Recovery list tags these chats **Price talk**.'),
    ),

    text(
      h2('Ignored recovery'),
      p('The last leak is the quietest. A buyer went silent, there was a clear reason to follow up (a date they gave you, a question you missed, a link they never paid), and nobody did. Not because you decided to let them go, but because 300 other chats came in.'),
      p('**How to count it:** quiet sales chats with an obvious reason to follow up and no message from you since.'),
      p('**First fix:** a short recovery pass once a day. SellThinker’s [Recovery](/recovery-alerts) list scans for quiet buyers and gives each one a reason with one best move:'),
      ul([
        '**Price talk**, **Missed question**, **Date passed**, **Drifted**',
        '**Link unpaid**, **Delivery worry**, **Trust doubt**, **Fit doubt**, **How to pay**',
      ]),
      p('[Customer asked the price and stopped replying](/resources/customer-asked-price-and-stopped-replying) covers what to send for each reason.'),
    ),

    block('blocks.grid-table', {
      title: 'The five leaks at a glance',
      style: 'data',
      columns: [{ label: 'What it looks like in the chat' }, { label: 'What to count' }, { label: 'First fix' }],
      rows: [
        { label: 'Slow reply', cells: [{ value: 'Buyer’s question waits overnight' }, { value: 'Chats where a buyer waited, and for how long' }, { value: 'Answer buyers closest to paying first' }] },
        { label: 'No link sent', cells: [{ value: '“Kaise pay karu?” with no answer' }, { value: 'Ready buyers who got no way to pay' }, { value: 'Send UPI ID or link in the same reply' }] },
        { label: 'Link unpaid', cells: [{ value: 'Link seen, no payment' }, { value: 'Links with no matching payment' }, { value: 'One reminder, then ask what’s in the way' }] },
        { label: 'Quiet after price', cells: [{ value: 'Your price is the last message' }, { value: 'Chats that stop at the price' }, { value: 'Price plus one reason plus one next step' }] },
        { label: 'Ignored recovery', cells: [{ value: 'Quiet buyer, clear reason, no follow-up' }, { value: 'Quiet chats with no message from you' }, { value: 'A daily recovery pass' }] },
      ],
      caption: 'Counts only. Fix the biggest count first, then count again next month.',
    }),

    text(
      h2('Sales chat audit: count before you fix'),
      p('You can’t fix five leaks at once, so don’t guess which is biggest. Count them.'),
      p('A sales chat audit isn’t a chatbot audit. A chatbot audit checks whether a bot’s flows work. A sales chat audit reads what you and your buyers actually said and marks where each sale stopped.'),
    ),
    block('blocks.checklist', {
      title: 'Audit 30 of your own chats',
      intro: 'Take 30 sales chats from last month. Not your best ones: the first 30 you find.',
      items: [
        { text: 'Slow reply', detail: 'Did a buyer’s question wait for you? Note how long.' },
        { text: 'No link sent', detail: 'Did every buyer who asked to pay get a UPI ID, a link or a COD confirmation?' },
        { text: 'Link unpaid', detail: 'Did each link you sent turn into a payment? Check your own dashboard, not the chat.' },
        { text: 'Quiet after price', detail: 'Did the chat stop right after you gave the price?' },
        { text: 'Ignored recovery', detail: 'Did a quiet buyer with a clear reason to follow up get a message from you?' },
        { text: 'Pick one leak', detail: 'Fix the biggest count first. Recount next month.' },
      ],
    }),
    text(
      p('Or send us a month of chats. In the free Sales Chat Audit, a person reads them by hand and gives you a count for each leak. Counts only: no guesses about how much money you lost.'),
    ),

    callout('note', 'What SellThinker is, and isn’t', 'SellThinker is not a chatbot, not a mass-messaging tool and not a CRM. It reads your Instagram DMs and WhatsApp Business chats in one inbox, tells you which chat needs you and why, and drafts replies in English, Hindi or Hinglish. You send every message yourself. SellThinker Signals is $49 a month.'),

    faq([
      ['How long is too long without replying?', 'There’s no single number, but a buyer asking the price or size is shopping now, so hours matter more than days. Reply to the buyers closest to paying first. If you reply through a business tool there’s also a hard limit: on the WhatsApp Business Platform, normal replies can only go out within 24 hours of the buyer’s last message (after that, only pre-approved templates), and Meta’s messaging API for Instagram sets a standard 24-hour window too.'],
      ['Is WhatsApp Business a CRM tool?', 'Not really. The WhatsApp Business app gives you a business profile, a catalogue, quick replies and labels (now called lists in newer versions of the app) to sort chats by hand. That helps you stay organised, but it won’t tell you which buyer is closest to paying, who went quiet, or why. SellThinker isn’t a CRM either: it reads the chats and tells you where to act.'],
      ['Why am I losing sales on Instagram?', 'If people are messaging you but not buying, the sales are usually leaking inside the chats: slow replies, buyers who asked how to pay and got no link, links left unpaid, chats that stop after the price, and quiet buyers nobody followed up. Count each one in a month of chats to see which is biggest.'],
    ]),

    block('blocks.sources', {
      items: [
        { title: 'Send messages: customer service windows (WhatsApp Cloud API)', publisher: 'Meta for Developers', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages' },
        { title: 'Messenger Platform and IG Messaging API Policy Overview', publisher: 'Meta for Developers', url: 'https://developers.facebook.com/docs/messenger-platform/policy/policy-overview' },
        { title: 'Instagram Messaging overview', publisher: 'Meta for Developers', url: 'https://developers.facebook.com/documentation/business-messaging/instagram-messaging/overview' },
        { title: 'How to use labels', publisher: 'WhatsApp Help Center', url: 'https://faq.whatsapp.com/smbi/chats/how-to-use-labels/?lang=en' },
        { title: 'Staying organized as a small business using Lists and quick replies on WhatsApp', publisher: 'WhatsApp Business', url: 'https://whatsappbusiness.com/resources/resource-library/staying-organized-smb-using-lists-quick-replies/' },
      ],
    }),

    block('blocks.related-links', {
      links: [
        { label: 'When (and how) to send a payment link on WhatsApp', url: '/resources/when-to-send-payment-link-on-whatsapp' },
        { label: 'Customer asked the price and stopped replying', url: '/resources/customer-asked-price-and-stopped-replying' },
        { label: 'Recovery alerts: why a buyer went quiet, and what to send', url: '/recovery-alerts' },
        { label: 'Which WhatsApp chat to reply to first', url: '/resources/which-whatsapp-chat-to-reply-to-first' },
      ],
    }),

    AUDIT,
  ],
});
