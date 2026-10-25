import { defineCollection, field } from 'ohnejs';

// The messages visitors send with the contact form on your website.
export default defineCollection({
  fields: {
    // A message stays as its visitor wrote it: the API offers no update, and `immutable` refuses one too.
    name: field('text', { max: 100, immutable: true }),
    // An `email` field refuses anything that is not an email address.
    email: field('email', { immutable: true }),
    message: field('text', { multiline: true, max: 5000, immutable: true }),
  },
  api: {
    // Anyone may send a message, and nobody but an editor may read one.
    // `middleware/recaptcha.ts` checks each message for spam before it is stored.
    // See https://ohne.dev/docs/api/collections#exposure
    create: { public: true, middleware: ['recaptcha'] },
    read: true,
    delete: true,
  },
  dashboard: { icon: 'mail', recordLabel: 'name' },
});
