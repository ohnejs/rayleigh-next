import { OhneRichText } from '@ohnejs/next/client';

// `ohne.ts` holds the types the CMS writes, so `fields` matches the block in `apps/backend/blocks/`.
import type { Block } from '../../ohne';

import { Container } from '../Container';

// `OhneBlocks` in the page renders this component for every `Hero` block, by its name.
export function Hero({ fields }: Block<'Hero'>) {
  return (
    <Container>
      <h1>{fields.heading}</h1>
      {fields.lead && (
        <p>
          <OhneRichText value={fields.lead} inline />
        </p>
      )}
    </Container>
  );
}
