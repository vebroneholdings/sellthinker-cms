/*
 * Read-only routes for the marketing website. Public (no token) and published
 * content only. They return whole documents with every block filled in, so the
 * site needs one request per page.
 */
export default {
  routes: [
    { method: 'GET', path: '/content/articles', handler: 'content.listArticles', config: { auth: false } },
    { method: 'GET', path: '/content/articles/:slug', handler: 'content.getArticle', config: { auth: false } },
    { method: 'GET', path: '/content/topics', handler: 'content.listTopics', config: { auth: false } },
    { method: 'GET', path: '/content/landing-pages', handler: 'content.listLandingPages', config: { auth: false } },
    { method: 'GET', path: '/content/landing-pages/:slug', handler: 'content.getLandingPage', config: { auth: false } },
  ],
};
