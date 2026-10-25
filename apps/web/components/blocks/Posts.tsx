import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ohne } from '../../lib/ohne';
import { Button } from '../Button';
import { Container } from '../Container';
import { WrittenOn } from '../WrittenOn';

// The block has no fields: it lists the newest posts, three to a page, wherever an editor puts it.
// It renders on the server, so it may read the CMS itself.
export async function Posts() {
  // Only a page receives `searchParams`, so a block reads the query through `ohne.searchParams()`.
  const value = (await ohne.searchParams()).get('page');
  const page = value === null ? 1 : Number(value);
  if (!Number.isInteger(page) || page < 1) notFound();

  // `ohne.list` reads one page of the `Posts` collection, as an anonymous visitor would.
  // See https://ohne.dev/docs/cms/website#site-data
  const posts = await ohne.list('Posts', {
    order: ['-publishedAt'],
    perPage: 3,
    page,
    select: ['title', 'headline', 'author', 'image', 'description', 'publishedAt'],
  });
  // A page past the last one answers 404, as a missing page does.
  if (page > posts.lastPage) notFound();

  // The pager links keep the page's own path, so the block works on any page.
  const [here] = (await ohne.current()).address.split('?');
  const pageHref = (n: number) => (n > 1 ? `${here}?page=${n}` : here);

  return (
    <Container className="posts">
      {posts.records.map(
        ({ UUID, path, title, headline, author, image, description, publishedAt }) =>
          // A post the visitor can read always has a page, so it carries its `path`.
          path && (
            <article key={UUID} className="posts__item">
              {image && (
                <img
                  className="posts__image"
                  src={image.url}
                  width={image.width ?? undefined}
                  height={image.height ?? undefined}
                  alt={image.description ?? ''}
                  decoding="async"
                  loading="lazy"
                />
              )}
              <div className="posts__body">
                <h2>
                  <Link href={path}>{headline || title}</Link>
                </h2>
                <WrittenOn date={publishedAt} author={author} />
                {description && (
                  <div className="prose posts__description">
                    <p>{description}</p>
                  </div>
                )}
                <Button to={path}>Read more</Button>
              </div>
            </article>
          ),
      )}
      {posts.lastPage > 1 && (
        <nav className="posts__pager" aria-label="Pages">
          {page > 1 && <Button to={pageHref(page - 1)}>Previous page</Button>}
          {page < posts.lastPage && (
            <Button to={pageHref(page + 1)} className="posts__next">
              Next page
            </Button>
          )}
        </nav>
      )}
    </Container>
  );
}
