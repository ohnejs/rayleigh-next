import type { ReactNode } from 'react';

import Link from 'next/link';

export function Button({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={to} className={className ? `button ${className}` : 'button'}>
      <span className="button__label">{children}</span>
    </Link>
  );
}
