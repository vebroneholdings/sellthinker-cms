# SellThinker CMS

Strapi 5 CMS for sellthinker.com: Resources (Blog, News, Guides, Tools) and the
feature landing pages. The content model, the 18 article templates and the 26
reusable blocks are described in [docs/CONTENT-MODEL.md](docs/CONTENT-MODEL.md).

```bash
npm install
npm run develop      # http://localhost:1337/admin
npm run seed         # load the sample content (safe to re-run)
npm run model        # regenerate schemas after editing scripts/content-model.js
```

The website reads from the public, read-only routes under `/api/content`.
