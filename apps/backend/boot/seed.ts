import { hook, query, useEnv } from 'ohnejs';

// Boot files run before the schema sync creates the tables, so the seed waits for `schema:synced`.
// It fires on every start. See https://ohne.dev/docs/project/boot
hook('schema:synced', async () => {
  if (useEnv().get('NODE_ENV') === 'production') return;
  // Only an empty site gets the Home page, so the seed never touches your edits.
  if (await query('Pages').exists()) return;

  await query('Pages').createOrThrow({
    title: 'Home',
    // `index` is the slug of the home page, shown at `/`.
    slug: 'index',
    status: 'published',
    content: [
      {
        block: 'Hero',
        fields: {
          heading: 'Your new website',
          lead: [
            {
              kind: 'paragraph',
              content: [
                { text: 'This page lives in your CMS. Edit it in the dashboard, under ' },
                { text: 'Pages', marks: ['strong'] },
                { text: '.' },
              ],
            },
          ],
        },
      },
      {
        block: 'Prose',
        fields: {
          body: [
            { kind: 'heading', level: 2, content: [{ text: 'Where things live' }] },
            {
              kind: 'list',
              ordered: false,
              items: [
                {
                  content: [
                    { text: 'apps/backend', marks: ['code'] },
                    { text: ': pages, blocks and the dashboard.' },
                  ],
                },
                {
                  content: [
                    { text: 'apps/web', marks: ['code'] },
                    { text: ': the website that renders them.' },
                  ],
                },
              ],
            },
            {
              kind: 'paragraph',
              content: [
                { text: 'Read the ' },
                { text: 'CMS guide', link: { url: 'https://ohne.dev/docs/cms/setup' } },
                { text: ' to add your own blocks.' },
              ],
            },
          ],
        },
      },
    ],
  });
});
