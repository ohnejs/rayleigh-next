import { openAsBlob } from 'node:fs';
import { hook, query, queryUntyped, useEnv, usePrinter } from 'ohnejs';
import { putUpload, updateUpload } from 'ohnejs/uploads';
import { randomToken } from 'ohnejs/utils/crypto';

import { about, galleries, posts } from '../seed/content.ts';

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

  const blog = await query('Pages').createOrThrow({
    title: 'Blog',
    slug: 'blog',
    status: 'published',
    footerBorder: true,
    content: [
      { block: 'PageIntro', fields: { title: 'Blog', kicker: 'Inspiration at every turn.' } },
      // The website fills this block with the posts.
      { block: 'Posts', fields: {} },
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

  const contact = await query('Pages').createOrThrow({
    title: 'Contact',
    slug: 'contact',
    status: 'published',
    footerBorder: true,
    seo: { description: 'Contact us and get in touch.' },
    content: [
      { block: 'PageIntro', fields: { title: 'Contact', kicker: 'Get in touch.' } },
      // The website renders the form, and each message lands in `Messages`.
      { block: 'ContactForm', fields: {} },
    ],
  });

  const author = await query('Authors').createOrThrow({ name: 'Khadgar' });
  for (const { image, body, ...post } of posts) {
    const picture = await upload(`blog/${image}.webp`, post.title);
    await query('Posts').createOrThrow({
      ...post,
      headline: post.title,
      status: 'published',
      author: author.UUID,
      image: picture,
      // What search engines and share cards show for the post.
      seo: { description: post.description, image: picture },
      content: [
        { block: 'Image', fields: { image: picture } },
        { block: 'Prose', fields: { body } },
      ],
    });
  }

  // A singleton always has its one record, so the seed updates it instead of creating it.
  await query('Settings').update({
    logo,
    menu: [
      { label: 'Portfolio', link: { collection: 'Pages', record: home.UUID } },
      { label: 'Blog', link: { collection: 'Pages', record: blog.UUID } },
      { label: 'About', link: { collection: 'Pages', record: aboutPage.UUID } },
      { label: 'Contact', link: { collection: 'Pages', record: contact.UUID } },
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
    blogPage: { collection: 'Pages', record: blog.UUID },
  });
  // `Site` comes with the CMS: the site's name, which every page title ends with.
  await query('Site').update({
    name: 'Rayleigh',
    description:
      'Rayleigh is a minimalistic portfolio template made with ohne, with a gallery, an About page, a blog and a contact form.',
  });

  // The admin account, unless you already created one.
  // Its password is random and printed once, so no install starts with a known admin password.
  if (await queryUntyped('Users').unscoped().exists()) return;
  const password = randomToken(12);
  await query('Users').createOrThrow({
    email: 'admin@example.com',
    password,
    firstName: 'Khadgar',
    roles: ['admin'],
  });
  usePrinter().info(`Seeded \`admin@example.com\` with password \`${password}\``);
});
