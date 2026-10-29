# SellThinker CMS (Strapi 5) for the website server. Built and run by
# docker-compose.yml; see docs/DEPLOY.md.
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM node:22-slim
WORKDIR /app
ENV NODE_ENV=production
# Dev dependencies are kept on purpose: `npm run seed` compiles the TypeScript
# sources, and it runs inside this container.
COPY --from=build /app ./
EXPOSE 1337
CMD ["npm", "run", "start"]
