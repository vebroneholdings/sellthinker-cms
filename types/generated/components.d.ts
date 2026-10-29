import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksBeforeAfter extends Struct.ComponentSchema {
  collectionName: 'components_blocks_before_afters';
  info: {
    description: '';
    displayName: 'Before and after';
    icon: 'arrowRight';
  };
  attributes: {
    after: Schema.Attribute.Text & Schema.Attribute.Required;
    afterLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'After'>;
    before: Schema.Attribute.Text & Schema.Attribute.Required;
    beforeLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Before'>;
    title: Schema.Attribute.String;
    why: Schema.Attribute.Text;
  };
}

export interface BlocksCallout extends Struct.ComponentSchema {
  collectionName: 'components_blocks_callouts';
  info: {
    description: '';
    displayName: 'Callout';
    icon: 'information';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String;
    tone: Schema.Attribute.Enumeration<['tip', 'note', 'warning', 'insight']> &
      Schema.Attribute.DefaultTo<'note'>;
  };
}

export interface BlocksChatExample extends Struct.ComponentSchema {
  collectionName: 'components_blocks_chat_examples';
  info: {
    description: 'A short Instagram or WhatsApp conversation, drawn as chat bubbles.';
    displayName: 'Chat example';
    icon: 'message';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    channel: Schema.Attribute.Enumeration<['instagram', 'whatsapp']> &
      Schema.Attribute.DefaultTo<'instagram'>;
    messages: Schema.Attribute.Component<'elements.chat-message', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksChecklist extends Struct.ComponentSchema {
  collectionName: 'components_blocks_checklists';
  info: {
    description: 'Readers can tick items; progress stays in their browser.';
    displayName: 'Checklist';
    icon: 'check';
  };
  attributes: {
    intro: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'elements.check-item', true>;
    saveProgress: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksConclusion extends Struct.ComponentSchema {
  collectionName: 'components_blocks_conclusions';
  info: {
    description: 'Coloured closing block, optionally with a button.';
    displayName: 'Conclusion';
    icon: 'flag';
  };
  attributes: {
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    buttonLabel: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'The bottom line'>;
    tone: Schema.Attribute.Enumeration<['brand', 'warm', 'ink', 'sky']> &
      Schema.Attribute.DefaultTo<'brand'>;
  };
}

export interface BlocksCta extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ctas';
  info: {
    description: '';
    displayName: 'Call to action';
    icon: 'cursor';
  };
  attributes: {
    body: Schema.Attribute.Text;
    buttonLabel: Schema.Attribute.String;
    buttonUrl: Schema.Attribute.String;
    kind: Schema.Attribute.Enumeration<['early_access', 'audit', 'link']> &
      Schema.Attribute.DefaultTo<'early_access'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksDefinition extends Struct.ComponentSchema {
  collectionName: 'components_blocks_definitions';
  info: {
    description: '';
    displayName: 'Definition';
    icon: 'book';
  };
  attributes: {
    more: Schema.Attribute.Text;
    short: Schema.Attribute.Text & Schema.Attribute.Required;
    term: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksExplainer extends Struct.ComponentSchema {
  collectionName: 'components_blocks_explainers';
  info: {
    description: 'Cards in a grid, a flow (A \u2192 B \u2192 C) or numbered.';
    displayName: 'Visual explainer';
    icon: 'lightbulb';
  };
  attributes: {
    cards: Schema.Attribute.Component<'elements.explainer-card', true>;
    intro: Schema.Attribute.Text;
    layout: Schema.Attribute.Enumeration<['grid', 'flow', 'numbered']> &
      Schema.Attribute.DefaultTo<'grid'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    description: 'Also published as FAQ structured data for search.';
    displayName: 'FAQ';
    icon: 'question';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.faq-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQs'>;
  };
}

export interface BlocksGridTable extends Struct.ComponentSchema {
  collectionName: 'components_blocks_grid_tables';
  info: {
    description: 'Columns and rows. Cells can hold text, a tick/cross mark, or both.';
    displayName: 'Grid table';
    icon: 'grid';
  };
  attributes: {
    caption: Schema.Attribute.Text;
    columns: Schema.Attribute.Component<'elements.table-column', true>;
    rows: Schema.Attribute.Component<'elements.table-row', true>;
    style: Schema.Attribute.Enumeration<['comparison', 'data']> &
      Schema.Attribute.DefaultTo<'comparison'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksHtmlEmbed extends Struct.ComponentSchema {
  collectionName: 'components_blocks_html_embeds';
  info: {
    description: 'A self-contained HTML/JS tool (calculator, checker). Runs sandboxed: no access to the page, cookies or forms around it.';
    displayName: 'HTML tool embed';
    icon: 'code';
  };
  attributes: {
    height: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 2000;
          min: 120;
        },
        number
      > &
      Schema.Attribute.DefaultTo<480>;
    html: Schema.Attribute.Text & Schema.Attribute.Required;
    note: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksImage extends Struct.ComponentSchema {
  collectionName: 'components_blocks_images';
  info: {
    description: '';
    displayName: 'Image';
    icon: 'picture';
  };
  attributes: {
    alt: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface BlocksKeyTakeaways extends Struct.ComponentSchema {
  collectionName: 'components_blocks_key_takeawayss';
  info: {
    description: '';
    displayName: 'Key takeaways';
    icon: 'check';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.text-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Key takeaways'>;
  };
}

export interface BlocksMessageTemplate extends Struct.ComponentSchema {
  collectionName: 'components_blocks_message_templates';
  info: {
    description: 'A reply readers can copy with one tap.';
    displayName: 'Message template';
    icon: 'write';
  };
  attributes: {
    channel: Schema.Attribute.Enumeration<['instagram', 'whatsapp', 'any']> &
      Schema.Attribute.DefaultTo<'any'>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    whenToUse: Schema.Attribute.Text;
  };
}

export interface BlocksProsCons extends Struct.ComponentSchema {
  collectionName: 'components_blocks_pros_conss';
  info: {
    description: '';
    displayName: 'Pros and cons';
    icon: 'thumbUp';
  };
  attributes: {
    cons: Schema.Attribute.Component<'elements.text-item', true>;
    consLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Cons'>;
    pros: Schema.Attribute.Component<'elements.text-item', true>;
    prosLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Pros'>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksQuote extends Struct.ComponentSchema {
  collectionName: 'components_blocks_quotes';
  info: {
    description: '';
    displayName: 'Pull quote';
    icon: 'quote';
  };
  attributes: {
    name: Schema.Attribute.String;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String;
  };
}

export interface BlocksRankedList extends Struct.ComponentSchema {
  collectionName: 'components_blocks_ranked_lists';
  info: {
    description: 'Numbered items for top-N lists.';
    displayName: 'Ranked list';
    icon: 'star';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.ranked-item', true>;
    numbered: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksRelatedLinks extends Struct.ComponentSchema {
  collectionName: 'components_blocks_related_linkss';
  info: {
    description: '';
    displayName: 'Related links';
    icon: 'link';
  };
  attributes: {
    links: Schema.Attribute.Component<'elements.link', true>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Keep reading'>;
  };
}

export interface BlocksRichText extends Struct.ComponentSchema {
  collectionName: 'components_blocks_rich_texts';
  info: {
    description: 'Paragraphs, headings, lists, links.';
    displayName: 'Rich text';
    icon: 'feather';
  };
  attributes: {
    body: Schema.Attribute.Blocks & Schema.Attribute.Required;
  };
}

export interface BlocksSources extends Struct.ComponentSchema {
  collectionName: 'components_blocks_sourcess';
  info: {
    description: '';
    displayName: 'Sources';
    icon: 'book';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.source', true>;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Sources'>;
  };
}

export interface BlocksSpecTable extends Struct.ComponentSchema {
  collectionName: 'components_blocks_spec_tables';
  info: {
    description: 'Two columns: a label and its value, row by row.';
    displayName: 'Vertical table';
    icon: 'layout';
  };
  attributes: {
    note: Schema.Attribute.Text;
    rows: Schema.Attribute.Component<'elements.key-value', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksStats extends Struct.ComponentSchema {
  collectionName: 'components_blocks_statss';
  info: {
    description: '';
    displayName: 'Stats';
    icon: 'chartPie';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.stat', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksSteps extends Struct.ComponentSchema {
  collectionName: 'components_blocks_stepss';
  info: {
    description: '';
    displayName: 'Steps';
    icon: 'stack';
  };
  attributes: {
    items: Schema.Attribute.Component<'elements.step', true>;
    title: Schema.Attribute.String;
    totalTime: Schema.Attribute.String;
  };
}

export interface BlocksTimeline extends Struct.ComponentSchema {
  collectionName: 'components_blocks_timelines';
  info: {
    description: '';
    displayName: 'Timeline';
    icon: 'clock';
  };
  attributes: {
    events: Schema.Attribute.Component<'elements.timeline-event', true>;
    title: Schema.Attribute.String;
  };
}

export interface BlocksTldr extends Struct.ComponentSchema {
  collectionName: 'components_blocks_tldrs';
  info: {
    description: 'One-paragraph summary at the top.';
    displayName: 'TL;DR';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface BlocksVideo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_videos';
  info: {
    description: 'YouTube or Vimeo link.';
    displayName: 'Video';
    icon: 'play';
  };
  attributes: {
    caption: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsChatMessage extends Struct.ComponentSchema {
  collectionName: 'components_elements_chat_messages';
  info: {
    description: '';
    displayName: 'Chat message';
    icon: 'message';
  };
  attributes: {
    from: Schema.Attribute.Enumeration<['buyer', 'seller', 'note']> &
      Schema.Attribute.DefaultTo<'buyer'>;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
    time: Schema.Attribute.String;
  };
}

export interface ElementsCheckItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_check_items';
  info: {
    description: '';
    displayName: 'Checklist item';
    icon: 'check';
  };
  attributes: {
    detail: Schema.Attribute.Text;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsExplainerCard extends Struct.ComponentSchema {
  collectionName: 'components_elements_explainer_cards';
  info: {
    description: '';
    displayName: 'Explainer card';
    icon: 'lightbulb';
  };
  attributes: {
    body: Schema.Attribute.Text;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'\u2726'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_faq_items';
  info: {
    description: '';
    displayName: 'FAQ item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsKeyValue extends Struct.ComponentSchema {
  collectionName: 'components_elements_key_values';
  info: {
    description: '';
    displayName: 'Label and value';
    icon: 'layout';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ElementsLink extends Struct.ComponentSchema {
  collectionName: 'components_elements_links';
  info: {
    description: '';
    displayName: 'Link';
    icon: 'link';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    note: Schema.Attribute.String;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsRankedItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_ranked_items';
  info: {
    description: '';
    displayName: 'Ranked item';
    icon: 'star';
  };
  attributes: {
    badge: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    linkLabel: Schema.Attribute.String;
    linkUrl: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsSource extends Struct.ComponentSchema {
  collectionName: 'components_elements_sources';
  info: {
    description: '';
    displayName: 'Source';
    icon: 'book';
  };
  attributes: {
    date: Schema.Attribute.Date;
    publisher: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
  };
}

export interface ElementsStat extends Struct.ComponentSchema {
  collectionName: 'components_elements_stats';
  info: {
    description: '';
    displayName: 'Stat';
    icon: 'chartPie';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    source: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsStep extends Struct.ComponentSchema {
  collectionName: 'components_elements_steps';
  info: {
    description: '';
    displayName: 'Step';
    icon: 'stack';
  };
  attributes: {
    body: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images'>;
    tip: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTableCell extends Struct.ComponentSchema {
  collectionName: 'components_elements_table_cells';
  info: {
    description: 'A value, a tick/cross mark, or both.';
    displayName: 'Table cell';
    icon: 'grid';
  };
  attributes: {
    mark: Schema.Attribute.Enumeration<['none', 'yes', 'no', 'partial']> &
      Schema.Attribute.DefaultTo<'none'>;
    value: Schema.Attribute.String;
  };
}

export interface ElementsTableColumn extends Struct.ComponentSchema {
  collectionName: 'components_elements_table_columns';
  info: {
    description: '';
    displayName: 'Table column';
    icon: 'grid';
  };
  attributes: {
    highlight: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTableRow extends Struct.ComponentSchema {
  collectionName: 'components_elements_table_rows';
  info: {
    description: '';
    displayName: 'Table row';
    icon: 'grid';
  };
  attributes: {
    cells: Schema.Attribute.Component<'elements.table-cell', true>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTextItem extends Struct.ComponentSchema {
  collectionName: 'components_elements_text_items';
  info: {
    description: '';
    displayName: 'Text item';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ElementsTimelineEvent extends Struct.ComponentSchema {
  collectionName: 'components_elements_timeline_events';
  info: {
    description: '';
    displayName: 'Timeline event';
    icon: 'clock';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    when: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ElementsTitleText extends Struct.ComponentSchema {
  collectionName: 'components_elements_title_texts';
  info: {
    description: '';
    displayName: 'Title and text';
    icon: 'layout';
  };
  attributes: {
    text: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MetaGuide extends Struct.ComponentSchema {
  collectionName: 'components_meta_guides';
  info: {
    description: '';
    displayName: 'Guide details';
    icon: 'book';
  };
  attributes: {
    stage: Schema.Attribute.Enumeration<['setup', 'day', 'grow']> &
      Schema.Attribute.DefaultTo<'setup'>;
    stepsCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface MetaNews extends Struct.ComponentSchema {
  collectionName: 'components_meta_newss';
  info: {
    description: '';
    displayName: 'News details';
    icon: 'earth';
  };
  attributes: {
    area: Schema.Attribute.Enumeration<
      [
        'inbox',
        'priority',
        'recovery',
        'catalog',
        'insights',
        'integrations',
        'company',
        'whatsapp',
        'instagram',
        'commerce',
        'payments',
      ]
    >;
    featureLink: Schema.Attribute.String;
    kind: Schema.Attribute.Enumeration<
      [
        'launch',
        'improvement',
        'fix',
        'company',
        'platform',
        'policy',
        'market',
      ]
    > &
      Schema.Attribute.DefaultTo<'improvement'>;
    source: Schema.Attribute.String;
    sourceUrl: Schema.Attribute.String;
    stream: Schema.Attribute.Enumeration<['sellthinker', 'industry']> &
      Schema.Attribute.DefaultTo<'sellthinker'>;
    take: Schema.Attribute.Text;
    version: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blocks.before-after': BlocksBeforeAfter;
      'blocks.callout': BlocksCallout;
      'blocks.chat-example': BlocksChatExample;
      'blocks.checklist': BlocksChecklist;
      'blocks.conclusion': BlocksConclusion;
      'blocks.cta': BlocksCta;
      'blocks.definition': BlocksDefinition;
      'blocks.explainer': BlocksExplainer;
      'blocks.faq': BlocksFaq;
      'blocks.grid-table': BlocksGridTable;
      'blocks.html-embed': BlocksHtmlEmbed;
      'blocks.image': BlocksImage;
      'blocks.key-takeaways': BlocksKeyTakeaways;
      'blocks.message-template': BlocksMessageTemplate;
      'blocks.pros-cons': BlocksProsCons;
      'blocks.quote': BlocksQuote;
      'blocks.ranked-list': BlocksRankedList;
      'blocks.related-links': BlocksRelatedLinks;
      'blocks.rich-text': BlocksRichText;
      'blocks.sources': BlocksSources;
      'blocks.spec-table': BlocksSpecTable;
      'blocks.stats': BlocksStats;
      'blocks.steps': BlocksSteps;
      'blocks.timeline': BlocksTimeline;
      'blocks.tldr': BlocksTldr;
      'blocks.video': BlocksVideo;
      'elements.chat-message': ElementsChatMessage;
      'elements.check-item': ElementsCheckItem;
      'elements.explainer-card': ElementsExplainerCard;
      'elements.faq-item': ElementsFaqItem;
      'elements.key-value': ElementsKeyValue;
      'elements.link': ElementsLink;
      'elements.ranked-item': ElementsRankedItem;
      'elements.source': ElementsSource;
      'elements.stat': ElementsStat;
      'elements.step': ElementsStep;
      'elements.table-cell': ElementsTableCell;
      'elements.table-column': ElementsTableColumn;
      'elements.table-row': ElementsTableRow;
      'elements.text-item': ElementsTextItem;
      'elements.timeline-event': ElementsTimelineEvent;
      'elements.title-text': ElementsTitleText;
      'meta.guide': MetaGuide;
      'meta.news': MetaNews;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
