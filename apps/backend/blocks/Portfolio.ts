import { defineBlock, field } from 'ohnejs';

export default defineBlock({
  description: 'A grid of images that open full screen on a click',
  fields: {
    title: field('text'),
    // A repeater is a list of items that share one shape, here an image and its caption.
    gallery: field('repeater', {
      allowEmpty: false,
      fields: {
        // The slider shows the image large, so a small one is refused at upload.
        image: field('image', { minWidth: 1024, minHeight: 1024 }),
        caption: field('text', { nullable: true }),
      },
      layout: [{ row: ['image | 16rem', 'caption'] }],
    }),
  },
  dashboard: { icon: 'layout-grid' },
});
