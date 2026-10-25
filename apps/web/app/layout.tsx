import type { Metadata } from 'next';

import { OhnePreview } from '@ohnejs/next/client';

import { themeScript } from '../lib/theme';
import './styles/site.css';

// The title of a page that has none of its own, like the not-found page.
export const metadata: Metadata = { title: 'Rayleigh' };

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    // The theme script sets `data-theme` before React hydrates, so React must not warn about it.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* The fonts the first screen needs start loading before the stylesheet asks for them. */}
        <link
          rel="preload"
          href="/fonts/lato-400.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/poppins-500.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {children}
        {/* Inside the dashboard's editor, this updates the page as you type. Elsewhere it does nothing. */}
        <OhnePreview />
      </body>
    </html>
  );
}
