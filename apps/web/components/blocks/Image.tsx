import type { Block } from '../../ohne';

import { Container } from '../Container';

// An image field may be empty, and then the block shows nothing.
export function Image({ fields: { image } }: Block<'Image'>) {
  if (!image) return null;
  return (
    <Container className="content-block">
      <img
        className="image-block"
        src={image.url}
        width={image.width ?? undefined}
        height={image.height ?? undefined}
        alt={image.description ?? ''}
        decoding="async"
      />
    </Container>
  );
}
