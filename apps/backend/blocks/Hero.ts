import { defineBlock, field } from 'ohnejs';

export default defineBlock({
  description: 'A big heading that opens a page',
  fields: {
    heading: field('text'),
    // `inline` keeps the lead to one paragraph, with bold and italic but no links.
    lead: field('richText', {
      inline: true,
      marks: ['strong', 'em'],
      links: false,
      nullable: true,
    }),
  },
  // `titleField` names the block in the editor's tree by its heading.
  dashboard: { icon: 'sparkles', titleField: 'heading' },
});
