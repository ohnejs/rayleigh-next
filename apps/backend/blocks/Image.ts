import { defineBlock, field } from 'ohnejs';

export default defineBlock({
  description: 'One wide image',
  fields: {
    image: field('image', { minWidth: 1440 }),
  },
  dashboard: { icon: 'photo' },
});
