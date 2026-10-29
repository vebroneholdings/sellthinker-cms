'use strict';
const { p, h2, ul, ol, text, tldr, callout, faq, chat, template, block, AUDIT, A } = require('../helpers');

const wa = (title, t, whenToUse) => template(title, t, { channel: 'whatsapp', whenToUse });

module.exports = A({
  slug: 'what-to-reply-when-customer-asks-price-whatsapp',
  hub: 'blog',
  template: 'message_templates',
  topic: 'closing',
  displayDate: '2026-10-29',
  readingMinutes: 7,
  reviewStatus: 'needs_fact_check',
  title: 'What to reply when a customer asks the price on WhatsApp',
  excerpt: 'State the price plainly, pair it with the one thing that makes it worth it, and end with one easy question. Copy-ready replies in English, Hinglish and Hindi, including what to say to “rate batao” and “last price?”.',
  seo: {
    metaTitle: 'What to reply when a customer asks the price on WhatsApp',
    metaDescription: 'Copy-ready replies for “rate batao”, “price?” and “last price?” on WhatsApp: the price, the one reason it’s worth it, one easy question. Hinglish too.',
  },
  body: [
    tldr('Say the price plainly, with shipping. Pair it with the one thing that makes it worth it. End with one question the buyer can answer in a word. Don’t hide the price behind “DM for details”, don’t open with a discount, and don’t answer “last price?” by dropping it straight away.'),

    text(
      p('Knowing what to reply when a customer asks the price on WhatsApp comes down to three lines, and most sellers send only the first.'),
      p('This is for the solo seller handling 50–500 chats a day, where “rate batao” and “price?” arrive faster than you can write a thoughtful answer to each.'),
      p('Below: the three-line reply, copy-ready templates in English, Hinglish and Hindi, replies for “last price?”, and one before-and-after rewrite.'),

      h2('How to reply to customer asking for price'),
      p('A good price reply has three parts:'),
      ol([
        '**The price, plainly.** With what’s included: “$59 with free shipping” or “$59 + $5 shipping”. No “starting from” when they asked about one piece.',
        '**The one thing that makes it worth it.** One specific fact, not three adjectives: pure cotton, 92.5 silver with a hallmark, ships tomorrow, made to your size.',
        '**One easy question.** Something they can answer in a word: “M or L?”, “Shall I keep one for you?”',
      ]),
      p('The third line matters most. A bare number gives the buyer nothing to reply to; a question gives them the next step. If they still go quiet, that’s Price talk, and [customer asked the price and stopped replying](/resources/customer-asked-price-and-stopped-replying) covers what to send next.'),
    ),

    block('blocks.before-after', {
      title: 'One rewrite',
      before: 'Price 1499/- only + shipping. Pls let me know.',
      after: 'Hi! The rose kurta set is $59 with free shipping. It’s pure cotton with a lined top, so it isn’t see-through. Which size, M or L?',
      why: 'The second reply answers the questions the buyer hadn’t asked yet (shipping, fabric) and ends with a choice they can make in one word.',
    }),

    text(
      h2('How to convince customer to buy your product: pick the one thing'),
      p('The second line does the convincing, and it only works if it’s specific and true. Pick the one fact that settles the doubt most buyers of that product have.'),
    ),

    block('blocks.spec-table', {
      title: 'The one thing, by what you sell',
      rows: [
        { label: 'Clothing', value: 'Fabric and how it washes, or how it fits (“runs a size small”).' },
        { label: 'Jewellery', value: 'The metal, the hallmark or plating, whether it tarnishes.' },
        { label: 'Beauty and skincare', value: 'Shade or skin type, and the expiry date on the batch you’re sending.' },
        { label: 'Handmade or custom', value: 'Made to order, and the day it ships.' },
        { label: 'Pre-owned or branded', value: 'Condition, and proof it’s genuine.' },
      ],
      note: 'Skip “premium quality” and “best price”: every shop says them. If you’d have to invent the fact, leave the line out.',
    }),

    text(
      h2('What should I reply to a customer?'),
      p('Start from these. Swap the {braces} for your own product, price and fact. Save the ones you use most as Quick Replies in the WhatsApp Business app so they’re a shortcut away.'),
    ),

    wa('One product, one price', 'Hi {name}! The {product} is ${price} with free shipping. {The one thing that makes it worth it}. Which {size / colour} would you like?', 'The buyer asked about one piece and the price doesn’t change by size.'),
    wa('Price depends on the variant', 'Hi! The {product} is ${price A} in {variant A} and ${price B} in {variant B}. The {variant B} has {the difference}. Which one suits you?', 'Size, metal or pack size changes the price. Give both numbers rather than asking “which one?” first.'),
    wa('“Price?” with no product named', 'Hi! Do you mean the {product} from {today’s status / the reel}? That one is ${price}, {the one thing}. Want a closer photo?', 'They replied to a status, a story or your catalogue and you can’t be sure which piece they mean. Confirm it before you quote.'),
    wa('Price and COD in the same message', 'Hi! The {product} is ${price}. Yes, COD is available (${COD fee} extra), or {free shipping} if you pay by UPI. Which works for you?', 'They asked “price and COD?” together. Answer both in one message so they don’t have to ask twice.'),

    text(
      h2('Rate batao: the Hinglish reply'),
      p('“Rate batao” and “kitne ka hai?” deserve the same three lines, in the buyer’s own language. Reply in Hinglish if they wrote in Hinglish; it reads as a person, not a price list.'),
    ),

    wa('Rate batao (Hinglish)', 'Hi! {Product} ka rate ${price} hai, shipping free. {Pure cotton hai, wash ke baad bhi soft rehta hai}. Aapko kaunsa size chahiye?', 'The buyer wrote “rate batao”, “kitne ka hai?” or “price kya hai?”.'),
    wa('Rate batao (Hindi)', 'नमस्ते! {प्रोडक्ट} की कीमत ${price} है, डिलीवरी फ़्री है। {यह शुद्ध कॉटन है, धुलने के बाद भी मुलायम रहता है}। आपको कौन सा साइज़ चाहिए?', 'The buyer wrote to you in Hindi.'),

    chat('whatsapp', [
      ['buyer', 'Hi, ye wala kurta rate batao', '10:42'],
      ['seller', 'Hi! Ye mulmul kurta $49 hai, shipping free. Pure cotton hai, wash ke baad bhi soft rehta hai. Aapko M chahiye ya L?', '10:44'],
      ['buyer', 'Last price?', '10:45'],
      ['seller', '$49 hi best price hai ji, fabric aur stitching dono achhe hain. Matching dupatta $12 mein add kar sakte hain. Ek M rakh doon?', '10:47'],
      ['buyer', 'Ok M bhej do. COD hai?', '10:51'],
      ['seller', 'Haan, COD available hai. Ya UPI se pay kar dijiye: [your UPI ID]. Total $49.', '10:52'],
      ['note', 'The price never moved. At each step the buyer got a reason, an option and a one-word question.'],
    ], { title: '“Rate batao” to a confirmed order' }),

    text(
      h2('Reply to customer asking for discount: “last price?”'),
      p('“Last price?” is often a habit as much as a question. Plenty of buyers ask it out of reflex and will still buy at your price if the answer is calm and gives them a reason. Don’t cut straight away: once you drop the price the first time, buyers learn to ask every time.'),
    ),

    wa('Holding your price', '${price} is already my best price on this one, because {reason: fabric, weight, handwork}. What I can do is free shipping, or the matching {item} at ${x}. Shall I keep one for you?', 'They asked “last price?”, “best price?” or “kuch kam hoga?”, and you want to keep your price.'),
    wa('Holding your price (Hinglish)', 'Ji, ${price} hi best price hai, kyunki {reason}. Shipping free kar sakte hain. Aapke liye ek rakh doon?', 'The same, for a buyer who wrote in Hinglish.'),
    wa('Giving a little, in exchange for something', 'If you take two, I can do both for ${price for two}. Or ${amount} off if you pay by UPI instead of COD. Which would you like?', 'Only if your margin allows it. Give the cut once, and get something that helps you in return: a bigger order, or prepaid instead of COD.'),

    text(
      h2('How to handle price objections on WhatsApp'),
      p('“Itna mehenga?” or “bahut zyada hai” is different from “last price?”. The buyer is comparing you with something. Ask what (“Which one are you comparing with?”), explain the one real difference, and if you have a cheaper piece that would suit them, offer it. Then leave the choice with them.'),
      p('What not to send when a buyer asks the price:'),
      ul([
        '“DM for price” or “check the catalogue” with no number. They already asked.',
        '“Budget kitna hai?” before you’ve told them the price.',
        'A 40-page price list when they asked about one piece.',
        '“Only 2 left!!” unless there really are only two.',
        'A discount nobody asked for. It answers a question they didn’t have.',
      ]),
    ),

    callout('insight', 'Where SellThinker fits', 'When a buyer asks “rate batao” in Instagram DMs or WhatsApp, SellThinker drafts a reply in English, Hindi or Hinglish for you to check, change and send. When they ask how to pay, the draft carries your own UPI ID or payment link, so the money goes straight to you. It doesn’t send anything on its own, it doesn’t create payment links, and it never holds money. It’s not a chatbot.'),

    faq([
      ['What should I reply to a customer?', 'Answer exactly what they asked, in the first line, then give one useful fact and one easy question. For a price question: “The {product} is ${price} with free shipping. {One fact}. Which size would you like?”'],
      ['What is the most effective way to handle a price objection?', 'Find out what they’re comparing your price with, explain the one difference that matters for that product, and offer a cheaper option only if you genuinely have one. Holding your price with a clear reason usually works better in chat than a quick discount.'],
      ['Should I give a discount when a customer asks for the last price?', 'Not by default. Hold the price and offer something small that costs you little, like free shipping. If you do give a cut, give it once and in exchange for something: two pieces instead of one, or prepaid instead of COD.'],
      ['Should I put prices in my WhatsApp catalogue?', 'Yes, if your prices are fixed. The WhatsApp Business app lets you show products with prices in a catalogue, which answers some buyers before they ask. Plenty will still ask in chat, so keep the three-line reply ready.'],
    ]),

    block('blocks.related-links', {
      title: 'Keep reading',
      links: [
        { label: 'Customer asked the price and stopped replying', url: '/resources/customer-asked-price-and-stopped-replying' },
        { label: 'Follow-up message to a customer who stopped replying', url: '/resources/follow-up-message' },
      ],
    }),

    block('blocks.sources', {
      items: [
        { title: 'Business App Features (Quick Replies, Catalog)', publisher: 'WhatsApp Business', url: 'https://whatsappbusiness.com/products/business-app-features/' },
      ],
    }),

    AUDIT,
  ],
});
