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
 * A second-level heading.
 */
function h2(text: string) {
  return { kind: 'heading' as const, level: 2 as const, content: [{ text }] };
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

/**
 * The blog posts, each with the image it opens with.
 */
export const posts = [
  {
    slug: 'harmony-in-space',
    title: 'Harmony in Space: The Essence of Minimalist Design',
    publishedAt: Date.UTC(2024, 1, 21, 17, 45),
    image: 'blog-article-1',
    description:
      '"Harmony in Space" elegantly captures the essence of minimalist design, blending indoor and outdoor elements against a tranquil light gray backdrop. Its clean lines and balanced composition evoke serenity, embodying a design philosophy where less is truly more, and simplicity reigns supreme.',
    body: [
      p(
        'In an age where clutter and complexity often overwhelm our senses, the allure of minimalist design stands out like a beacon of tranquility. "Harmony in Space: The Essence of Minimalist Design" is more than just an image; it\'s a philosophy, a way of life encapsulated within a frame. This article delves into the profound simplicity and elegance captured in this evocative artwork.',
      ),
      h2('The Concept of Minimalism'),
      p(
        "Minimalism in design is often misunderstood as mere simplicity. However, it's a concept that goes beyond the absence of clutter. It's about finding the essence of design by stripping away the non-essential. This artistic representation brings this philosophy to life, merging interior and exterior spaces in a harmonious dance of lines, forms, and space.",
      ),
      p(
        '"Harmony in Space" masterfully dissolves the boundaries between indoor and outdoor living. The clean lines of furniture, the sleekness of an outdoor bench, and the subtlety of a minimalist garden suggest a seamless flow between the home and nature. This blend is symbolic of our intrinsic connection to our environment, highlighting a design ethos that embraces both the built and the natural world.',
      ),
      h2('The Color Palette'),
      p(
        'The choice of a light gray background is not incidental. It acts as a canvas, bringing out the soft, natural tones of the design elements. This muted palette evokes a sense of calm and elegance, allowing the viewer to experience the art without the interference of vibrant colors. It’s a testament to how minimal color usage can lead to a profound impact in design. Each element in "Harmony in Space" has been thoughtfully selected and positioned. The absence of intricate details is not a lack of complexity but an ode to thoughtful reductionism. Every line, curve, and open space is intentional, creating a sense of balance and peace. It’s a reminder that in design, as in life, what we choose to leave out is just as important as what we include.',
      ),
      p(
        '"Harmony in Space: The Essence of Minimalist Design" is more than an image; it’s a narrative on contemporary design philosophy. It speaks to the heart of what many seek in today’s fast-paced, cluttered world: a sense of peace, balance, and connection to the environment. In its quiet elegance, it challenges us to rethink our spaces, our homes, and our lives through the lens of minimalist beauty. This artwork doesn’t just occupy space; it transforms it, inviting us to imagine a world where less truly is more.',
      ),
    ],
  },
  {
    slug: 'city-meets-countryside',
    title: 'City Meets Countryside: A Vision of Harmonious Coexistence',
    publishedAt: Date.UTC(2024, 0, 9, 11),
    image: 'blog-article-4',
    description:
      '"City Meets Countryside" is more than just a visual piece; it\'s a contemplation on how harmonious coexistence can be achieved in our increasingly complex world. It encourages viewers to appreciate the unique qualities of both urban and rural environments while imagining a future where these two spheres complement and enhance one another.',
    body: [
      p(
        '"City Meets Countryside" is an artistic representation of the beautiful interplay between urban energy and rural serenity. This minimalist artwork paints a picture of a world where the fast-paced urban environment and the tranquil rural life coexist in perfect harmony.',
      ),
      h2('Blending Contrasts'),
      p(
        'The artwork seamlessly integrates elements of urban landscapes, such as towering skyscrapers and bustling city streets, with the gentle charm of rural settings, including sprawling fields, lush trees, and quaint farmhouses. This blend is symbolic of the potential synergy between the advancement of city life and the natural simplicity of the countryside.',
      ),
      h2('A Serene Neutral Backdrop'),
      p(
        'Against a calm and neutral background, "City Meets Countryside" focuses on the juxtaposition of these two worlds. The serene backdrop serves to highlight the individual characteristics of both the urban and rural elements while emphasizing their interconnectedness. The minimalist design of the artwork underscores the message of unity despite contrasting lifestyles. It suggests that urban advancements and rural tranquility need not be at odds but can instead enrich each other, creating a more balanced and fulfilling way of life.',
      ),
      p(
        '"City Meets Countryside" is more than just a visual piece; it\'s a contemplation on how harmonious coexistence can be achieved in our increasingly complex world. It encourages viewers to appreciate the unique qualities of both urban and rural environments while imagining a future where these two spheres complement and enhance one another.',
      ),
    ],
  },
  {
    slug: 'linear-elegance',
    title: 'Linear Elegance: The Beauty of Architectural Minimalism',
    publishedAt: Date.UTC(2024, 0, 10, 11),
    image: 'blog-article-3',
    description:
      '"Linear Elegance" artistically showcases the sophistication of minimalist architecture. With its sleek silhouettes and monochromatic palette, this image embodies the serene beauty and refined simplicity of modern design, inviting viewers to appreciate the elegance in minimal forms.',
    body: [
      p(
        '"Linear Elegance" is an artistic representation that beautifully encapsulates the essence of minimalist architecture. This image is a tribute to the sophistication and purity of architectural design, where less is indeed more.',
      ),
      h2('Celebrating Modern Architecture'),
      p(
        "The artwork features elements of modern architecture, such as sleek building silhouettes and innovative structures. These elements are woven into a minimalist art style characterized by clean lines and uncluttered compositions. The monochromatic color scheme in shades of gray highlights the structures' form and texture, emphasizing their inherent beauty.",
      ),
      p(
        'The choice of a monochromatic palette is deliberate, adding depth and focus to the architectural forms. This simplicity in color allows the viewer to appreciate the intricacies of the design, the interplay of light and shadow, and the overall harmony of the composition.',
      ),
      h2('Sophistication in Simplicity'),
      p(
        '"Linear Elegance" is a celebration of refined simplicity. It challenges the viewer to find beauty in the bare essentials of form and space. The image is a testament to the power of minimalist design in creating impactful, timeless pieces. This artwork is a homage to the elegance of architectural minimalism. It\'s a visual journey that invites viewers to appreciate the subtle sophistication of minimalist design. "Linear Elegance" is not just an image; it\'s an experience of tranquility and purity, a reminder of the serene beauty that lies in simplicity.',
      ),
    ],
  },
  {
    slug: 'digital-roots',
    title: 'Digital Roots: Blending Technology with Nature',
    publishedAt: Date.UTC(2024, 0, 11, 11),
    image: 'blog-article-2',
    description:
      '"Digital Roots" artfully merges technology and nature in a minimalist tableau. It portrays a world where digital elements and natural beauty coexist in harmony, symbolizing a future where progress and preservation walk hand in hand.',
    body: [
      p(
        'In the artwork "Digital Roots," we witness a captivating fusion of the digital and natural worlds. This piece is a profound exploration of how technology can coexist with the organic elements of our planet, symbolizing a harmonious balance between progress and preservation.',
      ),
      h2('The Essence of Fusion'),
      p(
        'At the heart of "Digital Roots" lies the seamless integration of sleek technological components, like a modern computer interface, with elements of nature, such as plants and wood textures. The artwork embodies a minimalist design, where every detail is purposefully placed to convey a message of unity and balance. The calm, neutral background sets the stage for this visual narrative, allowing the viewer to focus on the delicate interplay between technology and nature. The image suggests that technology, often seen as cold and impersonal, can be softened and enriched through the touch of nature.',
      ),
      h2('Harmony in Design'),
      p(
        'This artwork challenges the conventional boundaries between the digital and natural realms. It proposes a world where technology does not disrupt but rather enhances our natural environment. The minimalist approach underscores this idea, suggesting that simplicity can lead to a deeper understanding and appreciation of both worlds. "Digital Roots" is more than just an image; it\'s a modern-day parable on the importance of integrating technology with the natural world. It calls for a future where technological advancements harmoniously blend with the environment, leading to a sustainable, balanced way of life.',
      ),
    ],
  },
];
