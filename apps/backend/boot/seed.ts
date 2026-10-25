import { openAsBlob } from 'node:fs';
import { hook, query, useEnv } from 'ohnejs';
import { putUpload, updateUpload } from 'ohnejs/uploads';

import { galleries } from '../seed/content.ts';

/**
 * Uploads one image from `seed/images/` to the media library, as an editor would, and gives it its alt text.
 * Returns the upload's `UUID`, which an image field stores.
 */
async function upload(path: string, description: string): Promise<string> {
  const [directory, name] = path.includes('/') ? path.split('/') : ['', path];
  const file = await openAsBlob(new URL(`../seed/images/${path}`, import.meta.url));
  const { UUID } = await putUpload({ directory, name, body: file.stream(), size: file.size });
  await updateUpload(UUID, { description });
  return UUID;
}

// Boot files run before the schema sync creates the tables, so the seed waits for `schema:synced`.
// It fires on every start. See https://ohne.dev/docs/project/boot
hook('schema:synced', async () => {
  if (useEnv().get('NODE_ENV') === 'production') return;
  // Only an empty site gets the demo, so the seed never touches your edits.
  if (await query('Pages').exists()) return;

  const portfolio = [];
  for (const { title, directory, items } of galleries) {
    const gallery = [];
    for (const [name, caption] of items) {
      gallery.push({ image: await upload(`${directory}/${name}.webp`, caption), caption });
    }
    portfolio.push({ block: 'Portfolio' as const, fields: { title, gallery } });
  }

  await query('Pages').createOrThrow({
    title: 'Homepage',
    // `index` is the slug of the home page, shown at `/`.
    slug: 'index',
    status: 'published',
    content: [
      {
        block: 'Hero',
        fields: {
          heading: 'Welcome to Rayleigh',
          lead: [
            {
              kind: 'paragraph',
              content: [{ text: 'A minimalistic portfolio template made with ohne.' }],
            },
          ],
        },
      },
      ...portfolio,
    ],
  });

  // `Site` comes with the CMS: the site's name, which every page title ends with.
  await query('Site').update({
    name: 'Rayleigh',
    description: 'Rayleigh is a minimalistic portfolio template made with ohne.',
  });
});
