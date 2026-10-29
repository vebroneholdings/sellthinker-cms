'use strict';
const { p, h2, h3, ul, ol, text, tldr, callout, faq, chat, template, steps, block, AUDIT, A } = require('../helpers');

module.exports = A({
  slug: 'when-to-send-payment-link-on-whatsapp',
  hub: 'blog',
  template: 'how_to',
  topic: 'closing',
  displayDate: '2026-10-29',
  readingMinutes: 7,
  reviewStatus: 'approved',
  title: 'When (and how) to send a payment link on WhatsApp',
  excerpt: 'Send a payment link on WhatsApp only when the chat is ready to close, the size or colour is confirmed, and the buyer hasn’t asked for COD. How to send it, what to write with it, and what to do when it sits unpaid.',
  seo: {
    metaTitle: 'When to send a payment link on WhatsApp (and how)',
    metaDescription: 'Send a payment link on WhatsApp only when the chat is ready to close and the variant is confirmed, never after a COD question. Steps, templates, reminders.',
  },
  body: [
    tldr('Send a payment link on WhatsApp only when the chat is ready to close: the buyer has picked the product, the size or colour is confirmed, and they haven’t asked for COD. Put the product, variant and amount in the same message as the link. If it sits unpaid, send one reminder with the same link, then ask what’s in the way.'),

    text(
      p('Knowing when to send a payment link on WhatsApp matters as much as knowing how: too early and it reads like pressure, too late and the buyer has moved on.'),
      p('This guide is for the solo seller handling 50–500 chats a day, taking payment by UPI or a Razorpay or Stripe link, with buyers who ask “COD milega?” as often as “kaise pay karu?”.'),
      p('One thing first. SellThinker doesn’t create payment links and never touches your money. You make links in your own Razorpay or Stripe account, or use your own UPI ID. When a buyer asks how to pay, SellThinker puts that link or UPI ID into a draft reply, and you check it and send it.'),
    ),

    text(
      h2('When to send a payment link on WhatsApp: three rules'),
      h3('1. Only when the chat is Ready to close'),
      p('Ready to close means the buyer has chosen a product and asked to buy, or asked how to pay. “Rate batao” isn’t that. “Ok, M le leti hu. Kaise pay karu?” is. A link sent to a buyer still asking about fabric skips their question.'),
      h3('2. Only for a confirmed variant'),
      p('Size, colour, quantity, delivery city. If any of these is still open, confirm it first, in one line. A link for the wrong size either doesn’t get paid or gets paid and turns into a return.'),
      h3('3. Never when the buyer asked for COD'),
      p('If the buyer asked “COD milega?”, answer that question. If you offer COD, confirm the order and the address. If you don’t, say so plainly and offer UPI or a link as the other way. A link sent in reply to a COD question tells the buyer you didn’t read their message.'),
    ),

    chat('whatsapp', [
      ['buyer', 'Hi, ye green kurta ka rate batao', '7:02 pm'],
      ['seller', '$49. Cotton, hand block print, ships in 2 days. Which size do you wear?', '7:10 pm'],
      ['buyer', 'M. Pune delivery hoga?', '7:12 pm'],
      ['seller', 'Yes, Pune is 3–4 days. M is in stock.', '7:13 pm'],
      ['buyer', 'Ok le leti hu. Kaise pay karu?', '7:15 pm'],
      ['note', 'Ready to close: product, size and city confirmed, buyer asked how to pay, no COD question.'],
      ['seller', 'Green kurta, size M, $49 with delivery to Pune. Pay by UPI to {your UPI ID} or on this link: {your payment link}. I’ll pack it as soon as it’s in.', '7:16 pm'],
    ], {
      title: 'The right moment for the link',
      caption: 'The link goes out only after the buyer asks how to pay, and it arrives with the product, size and total so there’s nothing left to check.',
    }),

    text(h2('How to send payment link to customer')),
    steps([
      ['Confirm the order in one line', 'Product, variant, quantity and the total including delivery. Let the buyer say yes to that before anything else.', 'If the buyer asks for COD here, stop and answer that instead.'],
      ['Create the link in your own account', 'In Razorpay, create a Payment Link for the exact amount, describe the product, and set an expiry date if you want one. In Stripe, copy a link from the Payment Links page. Or skip the link and share your UPI ID.', 'Put the buyer’s name or a short order note in the description so you can match the payment later.'],
      ['Paste it with the order details', 'Link or UPI ID, product, variant, amount and what happens after they pay, in one message. A bare link is easy to ignore and hard to trust.'],
      ['Treat the chat as Payment sent, not Closed', 'The sale isn’t closed until the money is in.'],
      ['Check your dashboard, not the chat', 'Confirm the payment in Razorpay, Stripe or your bank app before you pack, screenshot or not. SellThinker can’t see your payments and never confirms them for you.'],
    ], { title: 'Five steps, about two minutes', totalTime: '2 minutes' }),

    template('Send the link (English)', 'Here’s your order: {product}, {size/colour}, {amount} including delivery to {city}. Pay by UPI to {your UPI ID} or on this link: {your payment link}. I’ll pack it as soon as it’s in.', { channel: 'whatsapp', whenToUse: 'Ready to close, variant confirmed, no COD question.' }),
    template('Send the link (Hinglish)', 'Aapka order: {product}, {size}, {amount} delivery ke saath. UPI {your UPI ID} pe ya is link pe pay kar dijiye: {your payment link}. Payment aate hi pack kar denge.', { channel: 'whatsapp', whenToUse: 'The same moment, for a buyer who has been writing in Hinglish.' }),
    template('They asked for COD', 'Yes, COD is available for {city}. Please send your full address with pin code and I’ll book it today.', { channel: 'whatsapp', whenToUse: 'The buyer asked “COD milega?”. If you don’t offer COD, say so plainly and offer UPI instead. Never reply to a COD question with a link.' }),

    text(
      h2('Payment link for small business: what you need'),
      p('You don’t need a website or a shop app. You need one of these, in your own name:'),
      ul([
        '**A UPI ID.** The simplest option for buyers in India: share it as text and they pay from any UPI app.',
        '**A Razorpay Payment Link.** Created from your Razorpay Dashboard for a set amount. Razorpay lets you set an expiry date and send automatic SMS or email reminders (if you add the buyer’s phone or email), and shows each link as created, partially paid, paid, expired or cancelled. Its UPI Payment Links work only on Android and don’t take part payments.',
        '**A Stripe payment link.** Copied from the Payment Links page in your Stripe Dashboard. One link can be reused with many buyers, so for a one-off chat order, write the product and amount in your message. You can deactivate a link when you stop selling the item. Stripe accepts new businesses in India by invite only, so most India-based sellers use Razorpay or a UPI ID.',
      ]),
      p('Whichever you use, it’s your account and your money. Check your provider’s own docs (listed below) for fees and settings.'),
    ),

    text(
      h2('Link unpaid: payment reminder message to customer'),
      p('A link that sits unpaid isn’t a no. The buyer wanted to pay when they asked; something got in the way.'),
      ol([
        '**Check it really is unpaid.** Look in your dashboard. A buyer may have paid without saying so.',
        '**Check the link still works.** If you set an expiry and it has passed, send a fresh link. No apology needed.',
        '**Send one reminder with the same link.** Short and friendly. Once.',
        '**Ask about the likely blocker.** Delivery date, fit, whether it’s genuine, or simply which way to pay.',
        '**Offer the other way to pay.** UPI if you sent a link, a link if you sent UPI, COD if you offer it.',
        '**Then let it rest.** Repeating the reminder doesn’t answer the worry. Answering the worry might.',
      ]),
      p('In SellThinker, these chats appear in [Recovery](/recovery-alerts) with the reason **Link unpaid** and one best move. If the buyer asked how to pay and never got an answer, the reason is **How to pay** instead.'),
    ),
    template('Link unpaid reminder', 'Hi {name}! Your link for the {product} still works whenever you’re ready: {your payment link}. Anything you’d like to check before you order?', { channel: 'whatsapp', whenToUse: 'Once, a few hours to a day after the link went unpaid.' }),
    template('Link unpaid reminder (Hinglish)', 'Hi {name}! {product} aapke liye rakha hai. Link abhi bhi kaam kar raha hai: {your payment link}. Kuch puchna ho toh batayiye.', { channel: 'whatsapp', whenToUse: 'The same reminder, for a buyer writing in Hinglish.' }),

    text(
      h2('How to convince customer to make payment'),
      p('You don’t, and you shouldn’t try. Pressure, fake “only 2 left” lines and surprise discounts teach buyers to wait you out. Payment is where a buyer’s last worry shows up, so answer the worry:'),
      ul([
        '**Delivery worry:** give the ship day and the arrival day for their city.',
        '**Trust doubt:** send a photo of the actual piece, taken today.',
        '**Fit doubt:** tell them how it runs and ask what they usually wear.',
        '**How to pay:** give both ways to pay in one line.',
        '**Price talk:** restate the price with the one thing that makes it worth it.',
      ]),
    ),
    block('blocks.before-after', {
      title: 'One reminder, rewritten',
      before: 'Hello?? Payment kab karoge? Offer sirf aaj tak hai!!',
      after: 'Hi! If the payment’s in tonight, the kurta ships tomorrow and reaches Pune by Saturday. Want me to hold the M for you?',
      why: 'The second one answers the likely worry (when will it arrive) with a real date and gives one easy next step. No pressure, no invented deadline.',
    }),

    faq([
      ['How do I share a payment link on WhatsApp?', 'Create the link in your payment provider (Razorpay, Stripe or similar), copy it, and paste it into the chat with the product, variant and amount in the same message. Or share your UPI ID as text. Some providers can also deliver links into WhatsApp through the WhatsApp Business Platform; check your provider’s docs for availability.'],
      ['What is the 24 hour rule for WhatsApp Business?', 'On the WhatsApp Business Platform (the API that business tools connect to), a message from a customer opens a 24-hour customer service window. Inside it, a business can send normal free-form messages; once it closes, only pre-approved template messages. Each new message from the buyer resets the clock. The practical lesson: send the link while the buyer is still talking to you.'],
      ['Does SellThinker create payment links or take payments?', 'No. SellThinker never holds or moves money, doesn’t create Razorpay or Stripe links, and doesn’t confirm payments. When a buyer asks how to pay, it puts your own UPI ID or payment link into a draft reply, and you send it.'],
    ]),

    block('blocks.sources', {
      items: [
        { title: 'Payment Links', publisher: 'Razorpay Docs', url: 'https://razorpay.com/docs/payments/payment-links/' },
        { title: 'Create Payment Links', publisher: 'Razorpay Docs', url: 'https://razorpay.com/docs/payments/payment-links/create/' },
        { title: 'Payment Links States', publisher: 'Razorpay Docs', url: 'https://razorpay.com/docs/payments/payment-links/states/' },
        { title: 'UPI Payment Links', publisher: 'Razorpay Docs', url: 'https://razorpay.com/docs/payments/payment-links/upi/' },
        { title: 'Payment Links', publisher: 'Stripe Docs', url: 'https://docs.stripe.com/payment-links' },
        { title: 'Share a payment link', publisher: 'Stripe Docs', url: 'https://docs.stripe.com/payment-links/share' },
        { title: 'Send messages: customer service windows (WhatsApp Cloud API)', publisher: 'Meta for Developers', url: 'https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages' },
      ],
    }),

    block('blocks.related-links', {
      links: [
        { label: 'Why am I losing sales in my Instagram DMs (and WhatsApp chats)', url: '/resources/losing-sales-in-instagram-dms' },
        { label: 'Customer asked the price and stopped replying', url: '/resources/customer-asked-price-and-stopped-replying' },
        { label: 'Recovery alerts: why a buyer went quiet, and what to send', url: '/recovery-alerts' },
      ],
    }),

    AUDIT,
  ],
});
