import { openAsBlob } from 'node:fs';
import { hook, query, useEnv } from 'ohnejs';
import { putUpload, updateUpload } from 'ohnejs/uploads';

import { about, galleries } from '../seed/content.ts';

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

  const logo = await upload('logo.svg', 'Rayleigh');

  const portfolio = [];
  for (const { title, directory, items } of galleries) {
    const gallery = [];
    for (const [name, caption] of items) {
      gallery.push({ image: await upload(`${directory}/${name}.webp`, caption), caption });
    }
    portfolio.push({ block: 'Portfolio' as const, fields: { title, gallery } });
  }

  const home = await query('Pages').createOrThrow({
    title: 'Homepage',
    // `index` is the slug of the home page, shown at `/`.
    slug: 'index',
    status: 'published',
    content: [
      {
        block: 'PageIntro',
        fields: {
          title: 'Welcome to Rayleigh',
          kicker: 'A minimalistic portfolio template made with ohne.',
        },
      },
      ...portfolio,
    ],
  });

  const aboutPage = await query('Pages').createOrThrow({
    title: 'About',
    slug: 'about',
    status: 'published',
    footerBorder: true,
    content: [
      {
        block: 'PageIntro',
        fields: {
          title: 'About',
          kicker: 'Unveiling the artistry of interior and exterior design.',
        },
      },
      {
        block: 'Image',
        fields: {
          image: await upload(
            'other/about.webp',
            'A designer with folded arms in a bright open room beside a pool',
          ),
        },
      },
      { block: 'Prose', fields: { body: about } },
    ],
  });

  // A singleton always has its one record, so the seed updates it instead of creating it.
  await query('Settings').update({
    logo,
    menu: [
      { label: 'Portfolio', link: { collection: 'Pages', record: home.UUID } },
      { label: 'About', link: { collection: 'Pages', record: aboutPage.UUID } },
    ],
    copyright: '© 2026 Rayleigh. Built with ohne.',
    social: [
      {
        icon: 'github',
        link: { url: 'https://github.com/ohnejs', newTab: true },
        title: 'ohne on GitHub',
      },
      {
        icon: 'website',
        link: { url: 'https://ohne.dev/examples/rayleigh', newTab: true },
        title: 'Rayleigh on ohne.dev',
      },
    ],
  });
  // `Site` comes with the CMS: the site's name, which every page title ends with.
  await query('Site').update({
    name: 'Rayleigh',
    description: 'Rayleigh is a minimalistic portfolio template made with ohne.',
  });
});
