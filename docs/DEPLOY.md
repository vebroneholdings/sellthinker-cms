# Deploying the CMS

The CMS runs on the **website server** (Hostinger VPS `vashstudios.cloud`,
72.61.235.222), next to the website. Its address is `CMS_HOST` in the server's
`.env`: **https://sellthinker-cms.vashstudios.cloud** for now (that domain's DNS
is in the same Hostinger account as the server), moving to
`cms.sellthinker.com` later by adding that DNS record and changing `CMS_HOST`.

Never on the app server (`srv2025425`), and nothing here touches the n8n stack
on the website server: the CMS is its own Docker Compose project. It's reached
through the Traefik that already runs there, by labels on the CMS's own
container, the same way the website is.

```
/var/www/sellthinker-cms        this repo
  docker-compose.yml            cms (Strapi) + cms-db (Postgres 17), volumes db + uploads
  .env                          secrets, created on the server, never committed
```

## One-time setup

1. **DNS.** An A record for `CMS_HOST` pointing at 72.61.235.222: today
   `sellthinker-cms` in the `vashstudios.cloud` zone (studios account); later `cms`
   in the `sellthinker.com` zone (vebroneholdings account). Traefik gets the HTTPS
   certificate on its own once the name resolves.
2. **Code.** As `vash` on the server:
   `git clone https://github.com/vebroneholdings/sellthinker-cms.git /var/www/sellthinker-cms`
3. **Secrets.** Create `/var/www/sellthinker-cms/.env` (mode 600) with fresh random
   values for `APP_KEYS` (four, comma-separated), `API_TOKEN_SALT`,
   `ADMIN_JWT_SECRET`, `TRANSFER_TOKEN_SALT`, `JWT_SECRET`, `ENCRYPTION_KEY`,
   `DATABASE_PASSWORD`, plus `CMS_HOST=sellthinker-cms.vashstudios.cloud` and
   `ADMIN_ALLOW=<your IP>/32`.
4. **Start.** `docker compose up -d --build` in that folder.
5. **First admin.** Open https://<CMS_HOST>/admin from the IP in
   `ADMIN_ALLOW` and register the super admin. Then open the admin to the world
   (it's password-protected from here on): set `ADMIN_ALLOW=0.0.0.0/0` and run
   `docker compose up -d` again.
6. **Content.** `docker compose exec cms npm run seed` loads the sample content.
7. **Deploys on merge.** In the GitHub repo, add the secrets `VPS_HOST`
   (72.61.235.222), `VPS_USER` (vash) and `VPS_SSH_KEY` (a key in vash's
   `authorized_keys`). From then on, merging to `main` rebuilds the CMS
   (`.github/workflows/deploy.yml`).

## Why the admin starts locked

A fresh Strapi lets whoever opens `/admin` first register as super admin. Until
you've registered, Traefik only lets `ADMIN_ALLOW` reach `/admin`; the public
content API (`/api/content/...`) is open from the start.

## Backups

The database and uploads live in the Docker volumes `sellthinker-cms_db` and
`sellthinker-cms_uploads`. Hostinger's weekly VPS backup covers them, but only as
a whole-server restore. For a CMS-only copy:
`docker compose exec cms-db pg_dump -U strapi strapi > cms-$(date +%F).sql`.
