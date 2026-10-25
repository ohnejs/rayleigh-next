import { defineCollection, field } from 'ohnejs';

// The people who write the posts.
// Your website reads a post's author through this collection, so anyone may read it.
// `Users` stays private: it holds email addresses and passwords.
export default defineCollection({
  fields: {
    name: field('text'),
  },
  api: { read: 'public', create: true, update: true, delete: true },
  dashboard: { icon: 'feather', recordLabel: 'name' },
});
