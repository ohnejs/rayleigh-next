import type { ReactNode } from 'react';

import Link from 'next/link';

/**
 * Props for `Button`.
 */
export interface ButtonProps {
  /**
   * Where the button leads. Without it, the button is a real `<button>`, like the contact form's Send.
   */
  to?: string;

  /**
   * The `<button>`'s type, when the button has no `to`.
   *
   * @default
   * 'button'
   */
  type?: 'button' | 'submit';

  /**
   * More classes, beside `button`.
   */
  className?: string;

  children: ReactNode;
}

export function Button({ to, type = 'button', className, children }: ButtonProps) {
  const classes = className ? `button ${className}` : 'button';
  const label = <span className="button__label">{children}</span>;
  if (!to)
    return (
      <button type={type} className={classes}>
        {label}
      </button>
    );
  return (
    <Link href={to} className={classes}>
      {label}
    </Link>
  );
}
