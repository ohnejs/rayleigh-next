import { defineBlock, field } from 'ohnejs';

export default defineBlock({
  description: 'Formatted text: headings, lists and links',
  fields: {
    // Rich text is stored as JSON, never HTML, and links to a page follow it when its slug changes.
    // The options limit the editor's toolbar to what the design has styles for.
    // See https://ohne.dev/docs/database/rich-text
    body: field('richText', {
      elements: ['h2', 'h3', 'ul'],
      marks: ['strong', 'em'],
      links: ['Pages'],
    }),
  },
  dashboard: { icon: 'align-left' },
});
