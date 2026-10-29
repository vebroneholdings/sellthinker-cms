'use strict';
const { p, h2, ul, text, tldr, callout, faq, block, AUDIT, A } = require('../helpers');

module.exports = A({
  slug: 'customer-asked-price-and-stopped-replying',
  hub: 'blog',
  template: 'explainer',
  topic: 'recovery',
  displayDate: '2026-10-29',
  readingMinutes: 7,
  reviewStatus: 'needs_fact_check',
  title: 'Customer asked the price and stopped replying: nine reasons and the one move for each',
  excerpt: 'A buyer who goes quiet after the price usually hasn’t said no. They stalled on one thing: fit, delivery, trust, how to pay. Here are the nine reasons buyers go quiet on WhatsApp and Instagram, and the one message to send for each.',
  seo: {
    metaTitle: 'Customer asked the price and stopped replying? 9 reasons',
    metaDescription: 'Why buyers go quiet after the price on WhatsApp and Instagram, the nine reasons behind it, and the one message to send for each. No discount needed.',
  },
  body: [
    tldr('When a customer asks the price and stops replying, the price is rarely the whole story. Usually one thing is still open: size, delivery, trust or how to pay. Find which one, answer it in one message, and stop there. No apology, no invented urgency, no discount by default.'),

    text(
      p('Your customer asked the price and stopped replying, and now the chat just sits there: their “rate batao?”, your “₹1,299”, two blue ticks, then nothing.'),
      p('If you’re a solo seller handling 50–500 chats a day on Instagram and WhatsApp, you’ll have dozens of these by evening, and no time to guess which ones deserve a second message.'),
      p('Most of these buyers didn’t say no. They stopped at a specific question, and the price was just the last thing on screen. Here are the nine reasons buyers go quiet and the one best move for each.'),

      h2('Why customers don’t reply after the price'),
      p('A price question is the moment a buyer starts deciding. In the same few seconds they’re wondering: will it fit, when will it arrive, is it real, can I pay by UPI or COD? If your reply answers only the price, the rest stay open, and leaving feels easier than asking again.'),
      p('Then there are the plain reasons: they were at work, your chat sank under forty others, they asked three shops. None of these is a no. Each means your next message has a job to do.'),

      h2('Customer not responding on chat? Read the last three messages first'),
      p('Before you type, read what the buyer said last, what you said last, and anything left unanswered. The reason is almost always there:'),
      ul([
        'Their last message is a question you never answered: **Missed question**.',
        'They named a day (“after the 1st”, “Sunday ko lungi”) and it has passed: **Date passed**.',
        'You sent your UPI ID or a payment link and nothing came back: **Link unpaid**.',
        'They went quiet straight after your price, or after “last price?”: **Price talk**.',
      ]),
      p('The table covers all nine.'),
    ),

    block('blocks.grid-table', {
      title: 'The nine reasons buyers go quiet, and the one best move',
      style: 'comparison',
      columns: [{ label: 'What you see in the chat' }, { label: 'The one best move', highlight: true }],
      rows: [
        { label: 'Price talk', cells: [{ value: 'Quiet right after your price' }, { value: 'The price again, with the one thing that makes it worth it.' }] },
        { label: 'Missed question', cells: [{ value: 'Their last message is a question nobody answered' }, { value: 'Answer it, fully, in the first line.' }] },
        { label: 'Date passed', cells: [{ value: '“After payday”, “Sunday ko confirm karungi”, and the day has gone' }, { value: 'Check in on that day, naming the product.' }] },
        { label: 'Drifted', cells: [{ value: 'Everything answered, no clear worry' }, { value: 'Send something new: a photo of it worn, a short video.' }] },
        { label: 'Link unpaid', cells: [{ value: 'Your UPI ID or payment link sent, no payment' }, { value: 'Check your payments, then: the link still works.' }] },
        { label: 'Delivery worry', cells: [{ value: '“Kab tak aayega?”, “COD milega?”, “Pune deliver karte ho?”' }, { value: 'Ship day, arrival day, a straight answer on COD.' }] },
        { label: 'Trust doubt', cells: [{ value: '“Original hai?”, “Same as photo?”' }, { value: 'Proof: a photo taken today, a close-up, your return rule.' }] },
        { label: 'Fit doubt', cells: [{ value: '“Size chart?”, “Mujhe M aayega?”, “Colour same hai?”' }, { value: 'Measurements, how it fits, and what size they usually wear.' }] },
        { label: 'How to pay', cells: [{ value: '“GPay chalega?”, “UPI ID bhejo”' }, { value: 'Your UPI ID or link and the total, in one message.' }] },
      ],
      caption: 'One reason, one message. If you see two, answer the question they asked first.',
    }),

    text(
      h2('Price talk: quiet after the number'),
      p('A bare “₹1,299” gives the buyer nothing to weigh it against, and nothing to reply to. Don’t drop the price or apologise for it. Send it again with the one thing that makes it worth it.'),
      p('**Send:** “Hi! The mulmul kurta is ₹1,299 with free shipping. It’s pure cotton, so it stays soft wash after wash. Shall I keep an M for you?” If they’d asked “last price?”, see [what to reply when a customer asks the price on WhatsApp](/resources/what-to-reply-when-customer-asks-price-whatsapp).'),

      h2('Missed question: they asked, nobody answered'),
      p('Somewhere above sits “blue mein hai?” with no reply under it. A follow-up that skips it tells the buyer you didn’t read their messages.'),
      p('**Send:** the answer, first. “Sorry for the wait! Yes, the blue is in stock in S and M. Shall I keep one aside?” This is the only reason where a sorry belongs, because you really did keep them waiting.'),

      h2('Date passed: “after payday” came and went'),
      p('They told you when (“1st ke baad”, “Sunday ko batati hoon”), the day passed, and nobody followed up. They’re waiting to be reminded.'),
      p('**Send:** on that day, name the product: “Hi! It’s the 1st, so checking in on the black block-print saree. Still keen?”'),

      h2('Drifted: you answered everything, and they went quiet'),
      p('No open question, no date, no link; life got in the way. Another “still interested??” gives them nothing new to reply to.'),
      p('**Send:** something they haven’t seen: the piece worn, a ten-second video in daylight, the earrings that go with it. One new reason to look, one question.'),

      h2('Link unpaid: the payment link sat there'),
      p('Before you nudge, check your own UPI app or payment dashboard: they may have paid without saying so. If not, the payment may have failed.'),
      p('**Send:** “Hi! Your link for the kurta set still works whenever you’re ready. If the payment didn’t go through, tell me and I’ll send my UPI ID instead.”'),

      h2('Delivery worry: when will it reach, and is COD there?'),
      p('“Kab tak aayega?” and “COD milega?” with a vague answer leave a buyer with a wedding next Saturday unable to say yes.'),
      p('**Send:** “It ships tomorrow and reaches Pune in 3–4 days. Yes, COD is available.” Use your courier’s real times, never a date you can’t keep.'),

      h2('Trust doubt: is it real, and is it the same as the photo?'),
      p('Common with first-time buyers from a reel or status, especially for jewellery, beauty and branded pieces. “Original hai?” is a request for proof.'),
      p('**Send:** a photo or video taken today, a close-up of the detail they’d worry about (the hallmark, the batch code, the stitching), and your return or exchange rule if you have one.'),

      h2('Fit doubt: size, colour, will it suit me'),
      p('They like it but can’t picture it on themselves. “Mujhe M aayega?” isn’t a yes yet.'),
      p('**Send:** measurements in inches, how it sits (“slightly loose at the waist”), and a question back: “What size do you usually wear in kurtas?”'),

      h2('How to pay: they wanted to pay and couldn’t see how'),
      p('The warmest quiet buyer there is. They asked “GPay chalega?” and the answer came late, or without the UPI ID.'),
      p('**Send:** your UPI ID or payment link and the total, in one message: “Total is ₹1,349 with shipping. UPI: [your UPI ID], or pay here: [your link]. Send a screenshot once done and I’ll pack it today.”'),

      h2('No response from customer: when to stop'),
      p('One follow-up per reason. If the buyer doesn’t answer a message that dealt with what stalled them, let it rest. A second nudge a few days later is fair for Date passed or Link unpaid; after that, mark the chat lost. Three “hello??” messages cost more than the sale: they cost the buyer’s next visit.'),
      p('Leave out invented urgency (“only 1 left!” when you have twenty) and a discount nobody asked for. Both teach buyers that going quiet pays. Copy-ready messages for all nine reasons are in [follow-up message to a customer who stopped replying](/resources/follow-up-message).'),
    ),

    callout('insight', 'How SellThinker finds these for you', 'SellThinker’s Recovery view scans your Instagram DMs and WhatsApp Business chats for quiet buyers, labels each with one of these nine reasons and shows the best move. It drafts the follow-up in English, Hindi or Hinglish; you send it. It is not a chatbot and never sends anything on its own.'),

    faq([
      ['Is no response a rejection?', 'Usually not. A clear “no thanks” is a rejection; silence after a price is a pause. Most often something is still unanswered (fit, delivery, trust, how to pay) or the buyer simply got busy. Send one follow-up that answers the likely reason, and only mark the chat lost if that gets no reply.'],
      ['How long is too long without replying?', 'Reply to a buying question as fast as you can: a buyer who asked three shops often goes with whoever answered first. Follow up a quiet buyer the next day for Price talk or Drifted, on the day itself for Date passed. If you reply through a WhatsApp Business Platform tool rather than the app on your phone, Meta allows free-form messages only within 24 hours of the buyer’s last message; after that, only pre-approved templates.'],
      ['How to reactivate old leads?', 'Give them a real reason, not “just checking”: their piece is back in stock, a new colour came in their size. One message about their product, ending in one question, written to that buyer alone.'],
      ['Why do customers go quiet after asking the price?', 'Because other questions arrive with the price: will it fit, when will it reach, is it genuine, how do I pay. If your reply answers only the price, the open question stalls the chat.'],
      ['Is there a tool that flags buyers who stopped replying?', 'SellThinker does this for Instagram DMs and WhatsApp Business chats. It detects when a buyer stops responding, puts the chat in Recovery with the reason and the best move, and drafts the follow-up for you to send. SellThinker Signals is $49 a month, and the Sales Chat Audit is free.'],
    ]),

    block('blocks.related-links', {
      title: 'Keep reading',
      links: [
        { label: 'Follow-up message to a customer who stopped replying', url: '/resources/follow-up-message' },
        { label: 'What to reply when a customer asks the price on WhatsApp', url: '/resources/what-to-reply-when-customer-asks-price-whatsapp' },
        { label: 'Hot, warm and cold leads for WhatsApp and Instagram sellers', url: '/resources/hot-warm-cold-leads-whatsapp-instagram' },
      ],
    }),

    block('blocks.sources', {
      items: [
        { title: 'Send messages: customer service windows (WhatsApp Cloud API)', publisher: 'Meta for Developers', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages' },
      ],
    }),

    AUDIT,
  ],
});
