# Refugee.info - Greece

This is a [Next.js](https://nextjs.org/) project for templating refugee.info Greece.

## Development environment setup

This section explains how to set up your development environment, so that you can build, test, and preview the site locally.

1. Install Node.js dependencies

   ```sh
   yarn install
   ```

2. Install Git hooks

   ```sh
   yarn prepare
   ```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

**_Note:_** To test Locale select page and Cookie banner, you need to test site in the Incognito mode or clear cookies for 'localhost' in browser settings, because selected language and cookie preferences are set in Cookies. Follow [instructions for Chrome on how to clear cookies](hhttps://support.google.com/chrome/answer/95647?hl=en&co=GENIE.Platform%3DDesktop&oco=0#zippy=%2Cdelete-cookies-from-a-site).

### Environment variables

The site depends on the following environment variables that you need to provide:

- `SITE_URL` (`VERCEL_URL` is used as fallback in Vercel environments). This
  variable should represent the site's canonical URL in the environment, e.g.,
  `https://www.beporsed.org`. You most likely want to use
  `http://localhost:3000` for your [variables in
  .env.local](https://nextjs.org/docs/basic-features/environment-variables#loading-environment-variables).
- `ZENDESK_URL`. The canonical Zendesk URL, e.g., `https://signpost-afghanistan.zendesk.com`.
- `ZENDESK_MAPPED_URL`. The mapped URL configured in Zendesk that Zendesk
  prepends to links, e.g., `https://www.unitedforukraine.org`.
- `ZENDESK_OAUTH_TOKEN`. [The OAuth token from Zendesk that allows
  querying their
  API](https://support.zendesk.com/hc/en-us/articles/4408845965210-Using-OAuth-authentication-with-your-application).
- `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`. The mapbox access token for the service map tiles.
- `PREVIEW_TOKEN` is used to access preview mode. See [preview mode instructions](https://docs.google.com/document/d/1IbtY_EvIm0c1C8yeKpEPWwPvWJyHiNehYkRpVJJ65kg/edit?usp=sharing) for more details.

## Linting & formatting

We use ESLint and [Prettier][prettier] to lint and format the directory respectively.

To check for lint and formatting errors, run

```
yarn lint
yarn prettier --check .
```

To automatically fix issues, run

```
yarn lint --fix
yarn prettier --write .
```

## Site's design

This section documents some of the site's design decisions.

### Sitemap & robots.txt

To improve SEO of the website, we publish robots.txt and a sitemap.

We use [next-sitemap][next-sitemap] to simplify the process of creating those
files.

[next-sitemap]: https://www.npmjs.com/package/next-sitemap 'next-sitemap'

### Search

We use [Algolia search engine](https://www.algolia.com/) to generate indexes for Zendesk Articles and Search queries.
See full list of Signpost indexes on Algolia Signpost Dashbaord: https://www.algolia.com/apps/BWATZIXLX6/dashboard

How to add Search to new Signpost websites:

1. Add Search index for your Signpost instance: https://www.algolia.com/getstarted/#/zendesk
   - Once added, you will see it in [Algolia Signpost dashboard](https://www.algolia.com/apps/BWATZIXLX6/dashboard)
2. Configure new search index ('Configuration' tab for your index):
   - In 'Language', populate 'Index languages' and 'Query languages' with your site's locales, e.g. see [example for U4U index](https://www.algolia.com/apps/BWATZIXLX6/explorer/configuration/zendesk_signpost-u4u_articles/language).
   - In 'Facets', add 'category.id' to 'Attributes for faceting'. It's needed to filter internal/helper articles. E.g. see [example of U4U index](https://www.algolia.com/apps/BWATZIXLX6/explorer/configuration/zendesk_signpost-u4u_articles/facets).
3. Add Queries index from your article index: https://www.algolia.com/apps/BWATZIXLX6/query-suggestions
   - Ask your Product manager (Liam) if you don't have permissions.
