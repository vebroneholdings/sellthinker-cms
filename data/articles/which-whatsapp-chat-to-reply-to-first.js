'use strict';
const { p, h2, text, tldr, callout, faq, block, AUDIT, A } = require('../helpers');

module.exports = A({
  slug: 'which-whatsapp-chat-to-reply-to-first',
  hub: 'blog',
  template: 'explainer',
  topic: 'whatsapp',
  displayDate: '2026-10-29',
  readingMinutes: 4,
  reviewStatus: 'approved',
  title: 'Which WhatsApp chat to reply to first (when you have 200)',
  excerpt: 'Two hundred chats and one pair of thumbs. Reply to the buyer who said yes first, then a paying customer with a problem, then business enquiries, warm buyers going quiet and open questions. And why unread is not the same as unanswered.',
  seo: {
    metaTitle: 'Which WhatsApp chat to reply to first (with 200 waiting)',
    metaDescription: 'With 200 WhatsApp and Instagram chats waiting, reply in this order: Close, Protect, Business, Rescue, Reply. And why unread is not unanswered.',
  },
  body: [
    tldr('Which WhatsApp chat to reply to first when 200 are waiting? The buyer who has already said yes, then a paying customer with a problem, then everyone else in a fixed order. If you’re a solo seller handling 50–500 chats a day across WhatsApp and Instagram, this is the order that keeps the most sales: Close, Protect, Business, Rescue, Reply.'),

    text(
      h2('How to prioritize WhatsApp messages'),
      p('WhatsApp lists chats by the last message, which is the order they arrived in, not the order they matter in. A buyer who wrote “ok done, UPI ID bhejo” at 9:02 sinks below forty later “hi” messages, and the sale already made waits longest.'),
      p('Sort by what the buyer is waiting for, closest to money first. Within a group, the stronger buying signal goes first; between equals, whoever has waited longer.'),
    ),

    block('blocks.explainer', {
      title: 'Priority Today: Close → Protect → Business → Rescue → Reply',
      intro: 'Up to 25 chats, in this order. A list of 200 isn’t a priority list.',
      layout: 'flow',
      cards: [
        { icon: '1', title: 'Close', body: 'They said yes or asked how to pay. Send your UPI ID or link, or confirm the size. Asked for COD? Answer that, no link.' },
        { icon: '2', title: 'Protect', body: 'A paying customer with an unanswered complaint. Outranks a warm lead.' },
        { icon: '3', title: 'Business', body: 'Wholesale and collab enquiries, answered while warm. Never a “still interested?” nudge.' },
        { icon: '4', title: 'Rescue', body: 'Warm buyers going quiet, each with a reason (Price talk, Link unpaid…) and one best move.' },
        { icon: '5', title: 'Reply', body: 'Open questions. A fast, plain answer keeps them warm.' },
      ],
    }),

    block('blocks.grid-table', {
      title: 'One morning, 200 chats, sorted',
      style: 'data',
      columns: [{ label: 'Who' }, { label: 'What they wrote' }, { label: 'Your first move' }],
      rows: [
        { label: 'Close', cells: [{ value: 'Picked the maroon kurta, size M' }, { value: '“ok done, UPI ID bhejo”' }, { value: 'Send your UPI ID' }] },
        { label: 'Protect', cells: [{ value: 'Customer from last week' }, { value: '“Parcel abhi tak nahi aaya, 6 din ho gaye”' }, { value: 'Reply with the tracking link' }] },
        { label: 'Business', cells: [{ value: 'A boutique owner' }, { value: '“Wholesale rate milega? 40 pcs chahiye”' }, { value: 'Your wholesale price, or a time to talk' }] },
        { label: 'Rescue', cells: [{ value: 'Asked the price yesterday' }, { value: '“rate batao” → you: “$55” → silence' }, { value: 'Price plus the one thing that makes it worth it' }] },
        { label: 'Reply', cells: [{ value: 'A new buyer' }, { value: '“Size L available hai?”' }, { value: 'Yes or no, plus a photo' }] },
        { label: 'Later', cells: [{ value: 'The other 150 or so' }, { value: '“hi”, “👍”, “thank you”, a shared reel' }, { value: 'Nothing yet: there’s no question to answer' }] },
      ],
      caption: 'An example morning, not real data. Priority Today shows the top 25; the rest wait their turn.',
    }),

    text(
      h2('Unread ≠ unanswered'),
      p('WhatsApp’s Unread filter shows chats you haven’t opened (or marked unread by hand), not chats you haven’t answered. Open “COD milega?” on the bus, mean to reply at home, and the green dot is gone while the buyer still waits. And ten unread chats can be nine thumbs-ups and a thank-you, needing nothing.'),
      p('SellThinker looks at who spoke last and what they asked. An unanswered question stays at **Needs reply** until you answer, opened or not.'),
    ),

    text(
      h2('WhatsApp Business labels'),
      p('Lists and labels like “Pending order” and “Follow-up needed” are WhatsApp’s free answer. They work while you update them by hand. At 200 chats a day, the label you set at 10am is wrong by 4pm. Pinning helps with a few chats, not thirty.'),
    ),

    callout('note', 'What SellThinker does, and doesn’t', 'It reads your Instagram DMs and WhatsApp Business chats and builds Priority Today. Not a chatbot: it drafts replies in English, Hindi or Hinglish, and you press send. It never messages anyone on its own, or many buyers at once. SellThinker Signals is $49 a month.'),

    faq([
      ['Which WhatsApp chats should I reply to first?', 'Buyers who said yes or asked how to pay, then paying customers with an unanswered problem, then business enquiries, quiet warm buyers and new questions.'],
      ['How to prioritize leads?', 'By what the buyer wrote, not who they are. A named product plus “how do I pay” beats a big follower count.'],
      ['What is the 3 3 3 rule in sales?', 'There’s no single official version; it usually means a few deliberate follow-ups over a few days, then decide. In DMs the useful part is the limit: one follow-up that answers why the buyer stalled beats three “still interested?” messages.'],
      ['How to organize Instagram DMs?', 'Instagram’s professional inbox splits DMs into Primary, General and Requests. Those folders sort by who is writing, not what they want. SellThinker sorts each chat into Sales, Support, Business, Personal or Sorted out, beside your WhatsApp chats.'],
    ]),

    block('blocks.related-links', {
      title: 'Read next',
      links: [
        { label: 'Lead scoring: hot, warm and cold buyers', url: '/lead-scoring' },
        { label: 'Customer asked the price and stopped replying', url: '/resources/customer-asked-price-and-stopped-replying' },
      ],
    }),

    block('blocks.sources', {
      items: [
        { title: 'How to organize your WhatsApp Business inbox', publisher: 'WhatsApp Business (Meta)', url: 'https://whatsappbusiness.com/resources/resource-library/organize-whatsapp-inbox-meta-business-suite/' },
        { title: 'About Professional Features in Instagram Direct Professional Inbox', publisher: 'Meta Business Help Center', url: 'https://www.facebook.com/business/help/1264898753662278' },
      ],
    }),

    AUDIT,
  ],
});
