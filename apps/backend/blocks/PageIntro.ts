import { defineBlock, field } from 'ohnejs';

export default defineBlock({
  description: 'The title that opens a page, with a short line below it',
  fields: {
    title: field('text'),
    kicker: field('text', { nullable: true }),
  },
  dashboard: { icon: 'h-1' },
});
