import { OhneBlocks } from '@ohnejs/next';
import Link from 'next/link';

import { Image } from '../../components/blocks/Image';
import { PageIntro } from '../../components/blocks/PageIntro';
import { Portfolio } from '../../components/blocks/Portfolio';
import { Posts } from '../../components/blocks/Posts';
import { Prose } from '../../components/blocks/Prose';
import { Container } from '../../components/Container';
import { ohne } from '../../lib/ohne';

// Next shows this for a path no page in the CMS answers.
// A page you mark as the 404 page in the CMS shows here instead.
export default async function NotFound() {
  const { resolved } = await ohne.current();
  const page = resolved.kind === 'notFound' ? resolved.page : undefined;
  if (page)
    return (
      <main className={page.footerBorder ? 'main main--bordered' : 'main'}>
        <OhneBlocks
          blocks={page.content}
          components={{ PageIntro, Portfolio, Image, Prose, Posts }}
        />
      </main>
    );
  return (
    <main className="main">
      <Container>
        <div className="page-intro">
          <h1>Page not found</h1>
          <p className="page-intro__kicker">
            <Link href="/">Back to the home page</Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
