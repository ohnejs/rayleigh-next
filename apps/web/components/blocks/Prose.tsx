import { OhneRichText } from '@ohnejs/next/client';

import type { Block } from '../../ohne';

import { Container } from '../Container';

// The block's editor offers only headings, lists, bold, italic and links, the styles `prose.css` has.
// A click on a link to one of your pages moves there without a full page load.
export function Prose({ fields }: Block<'Prose'>) {
  return (
    <Container className="content-block">
      <OhneRichText value={fields.body} className="prose" />
    </Container>
  );
}
