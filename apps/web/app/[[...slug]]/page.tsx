import { OhneBlocks } from '@ohnejs/next';

import { BackButton } from '../../components/BackButton';
import { Image } from '../../components/blocks/Image';
import { PageIntro } from '../../components/blocks/PageIntro';
import { Portfolio } from '../../components/blocks/Portfolio';
import { Posts } from '../../components/blocks/Posts';
import { Prose } from '../../components/blocks/Prose';
import { Container } from '../../components/Container';
import { WrittenOn } from '../../components/WrittenOn';
import { ohne } from '../../lib/ohne';

// The title, description, share tags and canonical link, from the page's `seo` in the CMS.
export const generateMetadata = ohne.metadata;

// One page renders every path, `/` included, by asking the CMS which page the path shows.
// A redirect or a missing page answers with its own status code, so this page only renders content.
export default async function Page() {
  const { page } = await ohne.page();

  // `cms.routes` shows a post at `/blog/<slug>`, and checking `collection` narrows the record to a post.
  if (page.collection === 'Posts') {
    const post = page.record;
    const { blogPage } = await ohne.read('Settings', { select: ['blogPage'] });
    return (
      <main className="main main--bordered main--post" lang={page.locale}>
        <Container>
          <header className="post-header">
            <BackButton link={blogPage}>Blog</BackButton>
            <h1>{post.headline || post.title}</h1>
            <WrittenOn date={post.publishedAt} author={post.author} />
          </header>
        </Container>
        <OhneBlocks blocks={post.content} components={{ Image, Prose }} />
      </main>
    );
  }

  // Each block renders its own heading, so a page adds no `<h1>` of its own.
  return (
    <main className={page.record.footerBorder ? 'main main--bordered' : 'main'} lang={page.locale}>
      {/* Name a component for every block. A block the CMS adds fails `pnpm typecheck` until it has one. */}
      <OhneBlocks
        blocks={page.record.content}
        components={{ PageIntro, Portfolio, Image, Prose, Posts }}
      />
    </main>
  );
}
