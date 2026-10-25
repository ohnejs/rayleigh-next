import { defineConfig } from 'ohnejs';

export default defineConfig({
  // `ohnejs/base` brings sign-in, users and the dashboard, and `ohnejs/uploads` the media library.
  // `@ohnejs/cms` turns this app into the CMS for your website.
  layers: ['ohnejs/base', 'ohnejs/uploads', '@ohnejs/cms'],
  cms: {
    // Where your website runs, so the dashboard can show it beside the editor.
    // `SITE_URL` replaces it in production.
    site: 'http://localhost:3000',
    // A post shows at `/blog/<slug>`, and every other path shows a record of `Pages`.
    // The more specific route wins, so `/blog/hello` finds a post before it looks for a page.
    // See https://ohne.dev/docs/cms/setup#routes
    routes: { Pages: '/[...slug]', Posts: '/blog/[slug]' },
    // The CMS writes your website's types here, and keeps them current while `pnpm dev` runs.
    // See https://ohne.dev/docs/cms/website#types
    types: '../web/ohne.ts',
  },
});
