import type { Link } from '@ohnejs/client';
import type { ReactNode } from 'react';

import { OhneLink } from '@ohnejs/next/client';

import { IconChevronLeft } from './icon/ChevronLeft';

// The link comes from `Settings`, so an editor picks the page it goes back to.
export function BackButton({ link, children }: { link: Link | null; children: ReactNode }) {
  if (!link) return null;
  return (
    <OhneLink link={link} className="back-button">
      <IconChevronLeft />
      {children}
    </OhneLink>
  );
}
