import type { ReactNode } from 'react';

// Centers its content at the site's width, with the gutter at each side.
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={className ? `container ${className}` : 'container'}>{children}</div>;
}
