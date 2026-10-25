import { deepStrictEqual, match, strictEqual } from 'node:assert';
import { after, before, describe, it } from 'node:test';
import { applyHook, query } from 'ohnejs';

import { startApp, type TestApp } from '../_app.ts';

describe('seed', () => {
  let app: TestApp;

  before(async () => {
    app = await startApp();
  });

  after(() => app.stop());

  it('resolves every page and post to its record', async () => {
    const titles: Record<string, string> = {
      '/': 'Homepage | Rayleigh',
      '/blog': 'Blog | Rayleigh',
      '/about': 'About | Rayleigh',
      '/contact': 'Contact | Rayleigh',
      '/blog/harmony-in-space': 'Harmony in Space: The Essence of Minimalist Design | Rayleigh',
      '/blog/digital-roots': 'Digital Roots: Blending Technology with Nature | Rayleigh',
      '/blog/linear-elegance': 'Linear Elegance: The Beauty of Architectural Minimalism | Rayleigh',
      '/blog/city-meets-countryside':
        'City Meets Countryside: A Vision of Harmonious Coexistence | Rayleigh',
    };
    for (const [path, title] of Object.entries(titles)) {
      const { status, body } = await app.get(`/cms/routes/resolve?path=${path}`);
      strictEqual(status, 200, path);
      strictEqual(body.kind, 'page', path);
      strictEqual(body.seo.title, title);
    }
  });

  it('builds the home page from a page intro and two galleries of six', async () => {
    const { body } = await app.get('/cms/routes/resolve?path=/');
    const blocks = body.record.content.map(({ block, fields }: any) =>
      `${block} ${fields.title} ${fields.gallery?.length ?? ''}`.trim(),
    );
    deepStrictEqual(blocks, [
      'PageIntro Welcome to Rayleigh',
      'Portfolio Interior design 6',
      'Portfolio Exterior design 6',
    ]);
  });

  it('ends the contact page with the contact form', async () => {
    const { body } = await app.get('/cms/routes/resolve?path=/contact');
    const blocks = body.record.content.map(({ block }: { block: string }) => block);
    deepStrictEqual(blocks, ['PageIntro', 'ContactForm']);
  });

  it('answers a path nothing has with `notFound`', async () => {
    for (const path of ['/blog/nope', '/missing']) {
      const { body } = await app.get(`/cms/routes/resolve?path=${path}`);
      strictEqual(body.kind, 'notFound', path);
    }
  });

  it('lists the posts newest first, three to a page, each with its author', async () => {
    const list = '/cms/records/Posts?order=[-publishedAt]&perPage=3&select=[title,author]';
    const first = await app.get(`${list}&page=1`);
    strictEqual(first.body.total, 4);
    strictEqual(first.body.lastPage, 2);
    deepStrictEqual(
      first.body.records.map((post: any) => post.path),
      ['/blog/harmony-in-space', '/blog/digital-roots', '/blog/linear-elegance'],
    );
    for (const post of first.body.records) strictEqual(post.author.name, 'Khadgar');

    const second = await app.get(`${list}&page=2`);
    deepStrictEqual(
      second.body.records.map((post: any) => post.path),
      ['/blog/city-meets-countryside'],
    );
  });

  it('fills the settings with the logo, the menu, the footer and the blog page', async () => {
    const { body } = await app.get('/cms/records/Settings');
    match(body.logo.url, /^http:\/\/.+\/uploads\/logo\.svg$/);
    deepStrictEqual(
      body.menu.map(({ label, link }: any) => [label, link.href]),
      [
        ['Portfolio', '/'],
        ['Blog', '/blog'],
        ['About', '/about'],
        ['Contact', '/contact'],
      ],
    );
    strictEqual(body.copyright, '© 2026 Rayleigh. Built with ohne.');
    deepStrictEqual(
      body.social.map(({ icon, link }: any) => [icon, link.url]),
      [
        ['github', 'https://github.com/ohnejs'],
        ['website', 'https://ohne.dev/examples/rayleigh'],
      ],
    );
    strictEqual(body.blogPage.href, '/blog');
  });

  it('serves the uploaded images', async () => {
    const { body } = await app.get('/cms/routes/resolve?path=/about');
    const { url, width } = body.record.content[1].fields.image;
    strictEqual(width, 1440);
    const image = await app.get(new URL(url).pathname);
    strictEqual(image.status, 200);
    strictEqual(image.type, 'image/webp');
  });

  it('seeds one admin', async () => {
    deepStrictEqual(
      (await query('Users').select('email', 'roles').findMany()).map(({ email, roles }) => [
        email,
        roles,
      ]),
      [['admin@example.com', ['admin']]],
    );
  });

  it('fills an empty site only, so a second start adds nothing', async () => {
    const counts = () =>
      Promise.all([
        query('Pages').count(),
        query('Posts').count(),
        query('Authors').count(),
        query('Uploads').count(),
        query('Users').count(),
      ]);
    const before = await counts();
    // `schema:synced` fires on every start, so firing it again is what a restart does to the seed.
    await applyHook('schema:synced', { deletions: [], warnings: [] });
    deepStrictEqual(await counts(), before);
  });
});
