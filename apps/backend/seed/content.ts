// The demo copy of Rayleigh, written as rich text.
// Rich text is a list of blocks, so a paragraph and a heading are small objects.
// See https://ohne.dev/docs/database/rich-text

/**
 * A paragraph of plain text.
 */
function p(text: string) {
  return { kind: 'paragraph' as const, content: [{ text }] };
}

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

/**
 * The text of the About page.
 */
export const about = [
  p(
    "Welcome to my world of transforming spaces with art! I am an interior/exterior artist with a passion for creating visually stunning environments. With my expertise in both interior and exterior design, I have the ability to capture the essence of a space and elevate it to new heights. Whether it's revamping a room's interior or rejuvenating the exterior of a building, I take pride in my ability to bring life and personality to every project. From selecting the perfect color palette to incorporating unique textures and patterns, I believe that each element plays a crucial role in crafting a space that truly reflects the client's vision.",
  ),
  p(
    'I have a keen eye for detail and a deep understanding of spatial aesthetics. I strive to create balanced compositions that evoke emotions, inspire creativity, and enhance the surrounding atmosphere. By carefully blending form and function, I aim to create harmonious spaces that not only look breathtaking but also fulfill practical needs. My artistic journey began at a young age, fueled by my fascination with colors, textures, and the interplay of light and shadows. Over the years, I have honed my skills through formal education and hands-on experience, working on a diverse range of projects, from residential homes to commercial establishments.',
  ),
  p(
    "Being an avid traveler, I draw inspiration from various cultures, architectural styles, and natural landscapes. This allows me to infuse a distinct global perspective into my designs, resulting in truly unique and captivating spaces. I strongly believe in the power of collaboration and value open communication with my clients. By understanding their preferences, needs, and aspirations, I am able to create personalized and tailored designs that exceed expectations. Thank you for visiting my portfolio. I look forward to the opportunity to work with you and turn your interior or exterior space into a work of art. Let's embark on a creative journey together!",
  ),
];
