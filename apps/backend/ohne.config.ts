import { defineConfig } from 'ohnejs';

export default defineConfig({
  // `ohnejs/base` brings sign-in, users and the dashboard, and `ohnejs/uploads` the media library.
  // `@ohnejs/cms` turns this app into the CMS for your website.
  layers: ['ohnejs/base', 'ohnejs/uploads', '@ohnejs/cms'],
  cms: {
    // Where your website runs, so the dashboard can show it beside the editor.
    // `SITE_URL` replaces it in production.
    site: 'http://localhost:3000',
    // Every path of the website shows a record of `Pages`, found by its slug.
    // See https://ohne.dev/docs/cms/setup#routes
    routes: { Pages: '/[...slug]' },
    // The CMS writes your website's types here, and keeps them current while `pnpm dev` runs.
    // See https://ohne.dev/docs/cms/website#types
    types: '../web/ohne.ts',
  },
});
