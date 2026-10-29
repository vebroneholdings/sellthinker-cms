import type { Core } from '@strapi/strapi';

// Content anyone may read without a token (published entries only).
const PUBLIC_READ = ['article', 'category', 'author', 'landing-page', 'global'];

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /*
   * Grants the Public role read access (find, findOne) to the website's content
   * on every start, so a fresh database needs no clicking in the admin. Write
   * access is never granted here.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const publicRole = await strapi
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });
    if (!publicRole) return;

    const permissions = strapi.query('plugin::users-permissions.permission');
    for (const api of PUBLIC_READ) {
      for (const action of ['find', 'findOne']) {
        const name = `api::${api}.${api}.${action}`;
        const exists = await permissions.findOne({ where: { action: name, role: publicRole.id } });
        if (!exists) await permissions.create({ data: { action: name, role: publicRole.id } });
      }
    }
  },
};
