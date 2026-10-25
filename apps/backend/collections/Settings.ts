import { defineCollection, field } from 'ohnejs';
import { requireUser, userCan } from 'ohnejs/auth';

// The site-wide settings your website reads: the logo, the menu, the footer links and the spam check.
// A singleton holds exactly one record, so the dashboard opens it straight away.
// See https://ohne.dev/docs/cms/website#site-data
export default defineCollection({
  singleton: true,
  api: {
    // Anyone may read the settings, and only an editor may change them.
    read: 'public',
    update: {
      // Only an admin may change the secret key: the `admin` role's `*` covers `settings.secrets`.
      // See https://ohne.dev/docs/api/collections#the-write-input
      access: async ({ input }) =>
        !('recaptchaSecretKey' in input) || userCan(await requireUser(), 'settings.secrets'),
    },
  },
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
    recaptcha: field('boolean', {
      default: false,
      display: 'switch',
      label: 'Check messages with reCAPTCHA',
      description:
        'Google reCAPTCHA v3 scores each visitor, and a message from a likely bot is refused.',
    }),
    // `when` shows the keys only while the check is on.
    // See https://ohne.dev/docs/database/conditional-fields
    recaptchaSiteKey: field('text', {
      nullable: true,
      when: { recaptcha: true },
      label: 'Site key',
      description: 'From the reCAPTCHA admin console. Your website shows it to every visitor.',
    }),
    // `readable: false` keeps the secret out of every read, even the admin's, as a password is kept.
    // Only the backend's own code reads it, to ask Google about a message.
    // See https://ohne.dev/docs/database/collections#write-only-and-locked-fields
    recaptchaSecretKey: field('text', {
      nullable: true,
      readable: false,
      when: { recaptcha: true },
      label: 'Secret key',
      description: 'Saved, and never shown again. Type a new key to replace it.',
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
          {
            label: 'Contact form',
            fields: ['recaptcha', { row: ['recaptchaSiteKey', 'recaptchaSecretKey'] }],
          },
        ],
      },
    ],
  },
});
