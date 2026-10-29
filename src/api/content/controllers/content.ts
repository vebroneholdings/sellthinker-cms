import type { Core } from '@strapi/strapi';
import type { Context } from 'koa';
import { deepPopulate } from '../../../utils/populate';

// `as any`: these routes are typed loosely so they compile before Strapi has
// generated types for a newly added content type.
const ARTICLE = 'api::article.article' as any;
const LANDING = 'api::landing-page.landing-page' as any;

// What a list card needs: no body.
const CARD_FIELDS = ['title', 'slug', 'excerpt', 'hub', 'template', 'featured', 'displayDate', 'readingMinutes'];
const CARD_POPULATE = {
  category: { fields: ['name', 'slug'] },
  author: { fields: ['name', 'role'] },
  cover: true,
  news: true,
  guide: true,
};

const oneOf = (value: unknown) => (typeof value === 'string' && value ? value : undefined);

export default ({ strapi }: { strapi: Core.Strapi }) => ({
  // GET /api/content/articles?hub=blog&template=how_to&topic=recovery&limit=50
  async listArticles(ctx: Context) {
    const { hub, template, topic, limit } = ctx.query;
    const filters: Record<string, unknown> = {};
    if (oneOf(hub)) filters.hub = { $eq: hub };
    if (oneOf(template)) filters.template = { $eq: template };
    if (oneOf(topic)) filters.category = { slug: { $eq: topic } };

    const data = await strapi.documents(ARTICLE).findMany({
      filters: filters as any,
      status: 'published',
      fields: CARD_FIELDS as any,
      populate: CARD_POPULATE as any,
      sort: [{ displayDate: 'desc' }, { publishedAt: 'desc' }] as any,
      limit: Math.min(Number(limit) || 100, 200),
    });
    ctx.body = { data };
  },

  // GET /api/content/articles/:slug
  async getArticle(ctx: Context) {
    const data = await strapi.documents(ARTICLE).findFirst({
      filters: { slug: { $eq: ctx.params.slug } },
      status: 'published',
      populate: deepPopulate(strapi, ARTICLE) as any,
    });
    if (!data) return ctx.notFound('No published article with that slug');
    ctx.body = { data };
  },

  // GET /api/content/topics
  async listTopics(ctx: Context) {
    const data = await strapi.documents('api::category.category' as any).findMany({
      fields: ['name', 'slug', 'description'] as any,
      sort: [{ name: 'asc' }] as any,
    });
    ctx.body = { data };
  },

  // GET /api/content/landing-pages
  async listLandingPages(ctx: Context) {
    const data = await strapi.documents(LANDING).findMany({
      status: 'published',
      fields: ['title', 'slug', 'eyebrow', 'lede'] as any,
      sort: [{ title: 'asc' }] as any,
    });
    ctx.body = { data };
  },

  // GET /api/content/landing-pages/:slug
  async getLandingPage(ctx: Context) {
    const data = await strapi.documents(LANDING).findFirst({
      filters: { slug: { $eq: ctx.params.slug } },
      status: 'published',
      populate: deepPopulate(strapi, LANDING) as any,
    });
    if (!data) return ctx.notFound('No published landing page with that slug');
    ctx.body = { data };
  },
});
