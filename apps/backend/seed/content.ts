// The demo copy of Rayleigh, which `boot/seed.ts` puts into the CMS.

/**
 * The two galleries of the home page, each image with its caption.
 */
export const galleries = [
  {
    title: 'Interior design',
    directory: 'interior',
    items: [
      ['modern-armchair', 'Modern armchair'],
      ['contemporary-coffee-table', 'Contemporary coffee table'],
      ['sleek-lamp', 'Sleek lamp'],
      ['elegant-vase', 'Elegant vase'],
      ['simple-bookshelf', 'Simple bookshelf'],
      ['stylish-sofa', 'Stylish sofa'],
    ],
  },
  {
    title: 'Exterior design',
    directory: 'exterior',
    items: [
      ['luna-bench', 'Luna bench'],
      ['aurora-lamp', 'Aurora lamp'],
      ['serenity-fountain', 'Serenity fountain'],
      ['zephyr-sculpture', 'Zephyr sculpture'],
      ['harmony-seating', 'Harmony seating'],
      ['mystic-path', 'Mystic path'],
    ],
  },
] as const;
