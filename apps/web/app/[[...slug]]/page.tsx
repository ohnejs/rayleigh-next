import { OhneBlocks } from '@ohnejs/next';

import { Hero } from '../../components/blocks/Hero';
import { Portfolio } from '../../components/blocks/Portfolio';
import { Prose } from '../../components/blocks/Prose';
import { ohne } from '../../lib/ohne';

// The title, description, share tags and canonical link, from the page's `seo` in the CMS.
export const generateMetadata = ohne.metadata;

// One page renders every path, `/` included, by asking the CMS which page the path shows.
// A redirect or a missing page answers with its own status code, so this page only renders content.
export default async function Page() {
  const { page } = await ohne.page();
  // Each block renders its own heading, so a page adds no `<h1>` of its own.
  return (
    <main className="main" lang={page.locale}>
      {/* Name a component for every block. A block the CMS adds fails `pnpm typecheck` until it has one. */}
      <OhneBlocks blocks={page.record.content} components={{ Hero, Prose, Portfolio }} />
    </main>
  );
}
