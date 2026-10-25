import { pageFields, publishedScope } from '@ohnejs/cms';
import { defineCollection, field } from 'ohnejs';

export default defineCollection({
  fields: {
    title: field('text'),
    headline: field('text', {
      nullable: true,
      description: 'Shown above the post. Leave it empty to show the title.',
    }),
    // `publishedAt` from the page fields doubles as the date a post was written on.
    ...pageFields(),
    // A reference to one author. Your website receives the whole author, not only its `UUID`.
    // See https://ohne.dev/docs/cms/website#reading-a-page
    author: field('record', { collection: 'Authors' }),
    image: field('image', { description: 'Shown beside the post on the blog page.' }),
    description: field('text', {
      multiline: true,
      description: 'A short summary, shown on the blog page.',
    }),
    content: field('blocks', { allow: ['Image', 'Prose'] }),
  },
  api: {
    read: { public: true, access: publishedScope },
    create: true,
    update: true,
    delete: true,
  },
  dashboard: { icon: 'pin', recordLabel: 'title' },
});
