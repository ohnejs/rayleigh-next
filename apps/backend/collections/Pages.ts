import { pageFields, publishedScope } from '@ohnejs/cms';
import { defineCollection, field } from 'ohnejs';

export default defineCollection({
  fields: {
    title: field('text'),
    // `slug`, `status`, the publishing window and `seo`: the fields a page with a route needs.
    // See https://ohne.dev/docs/cms/setup#pages
    ...pageFields(),
    footerBorder: field('boolean', {
      default: false,
      display: 'switch',
      description: 'Draws a line above the footer.',
    }),
    // The page's content, as a list of blocks. Each name here is a file in `blocks/`.
    content: field('blocks', { allow: ['PageIntro', 'Portfolio', 'Image', 'Prose', 'Posts'] }),
  },
  api: {
    // Visitors read published pages only.
    // Writing takes the matching capability, like `collection.Pages.update`.
    read: { public: true, access: publishedScope },
    create: true,
    update: true,
    delete: true,
  },
  dashboard: { icon: 'file', recordLabel: 'title' },
});
