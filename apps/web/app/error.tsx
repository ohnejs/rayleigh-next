'use client';

import Link from 'next/link';

import { Container } from '../components/Container';

// Next shows this when a page throws, like when the API fails.
// It renders without the header and footer, since they read the API too.
export default function ErrorPage() {
  return (
    <main className="main">
      <Container>
        <div className="page-intro">
          <h1>Something went wrong</h1>
          <p className="page-intro__kicker">
            <Link href="/">Back to the home page</Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
