import { defineBlock, field } from 'ohnejs';

export default defineBlock({
  description: 'Formatted text: headings, lists, quotes and links',
  fields: {
    // Rich text is stored as JSON, never HTML, and links to a page follow it when its slug changes.
    // See https://ohne.dev/docs/database/rich-text
    body: field('richText', { links: ['Pages'] }),
  },
  dashboard: { icon: 'align-left' },
});
