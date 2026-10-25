import type { Block } from '../../ohne';

import { Container } from '../Container';

export function PageIntro({ fields }: Block<'PageIntro'>) {
  return (
    <Container>
      <div className="page-intro">
        <h1>{fields.title}</h1>
        {fields.kicker && <p className="page-intro__kicker">{fields.kicker}</p>}
      </div>
    </Container>
  );
}
