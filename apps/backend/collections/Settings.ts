import { defineCollection, field } from 'ohnejs';

// The site-wide settings your header and footer read: the logo, the menu and the footer links.
// A singleton holds exactly one record, so the dashboard opens it straight away.
// See https://ohne.dev/docs/cms/website#site-data
export default defineCollection({
  singleton: true,
  // Anyone may read the settings, and only an editor may change them.
  api: { read: 'public', update: true },
  fields: {
    logo: field('image', {
      description: 'Drawn in one dark color. The dark theme shows it inverted.',
    }),
    menu: field('repeater', {
      fields: {
        label: field('text'),
        // A link to a page follows it when its slug changes.
        link: field('link', { collections: ['Pages'] }),
      },
      layout: [{ row: ['label', 'link'] }],
    }),
    copyright: field('text', { nullable: true }),
    social: field('repeater', {
      fields: {
        icon: field('select', {
          choices: [
            { value: 'github', label: 'GitHub' },
            { value: 'x', label: 'X' },
            { value: 'discord', label: 'Discord' },
            { value: 'website', label: 'Website' },
          ],
        }),
        // Without `collections`, a link holds an address only.
        link: field('link'),
        title: field('text', {
          nullable: true,
          description: 'Shown when a visitor hovers the icon.',
        }),
      },
      layout: [{ row: ['icon | 10rem', 'link', 'title'] }],
    }),
    blogPage: field('link', {
      collections: ['Pages'],
      nullable: true,
      label: 'Blog landing page',
      description: 'The page that lists the posts. Every post links back to it.',
    }),
  },
  dashboard: {
    icon: 'settings',
    layout: [
      {
        tabs: [
          { label: 'Header', fields: ['logo', 'menu'] },
          { label: 'Footer', fields: ['copyright', 'social'] },
          { label: 'Blog', fields: ['blogPage'] },
        ],
      },
    ],
  },
});
