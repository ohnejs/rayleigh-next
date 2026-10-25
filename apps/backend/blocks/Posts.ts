import { defineBlock } from 'ohnejs';

// A block without fields: your website fills it with the newest posts, three to a page.
export default defineBlock({
  description: 'The newest posts, three to a page',
  fields: {},
  dashboard: { icon: 'list' },
});
