'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import type { Records } from '../ohne';

import { DarkModeSwitch } from './DarkModeSwitch';
import { Logo } from './Logo';
import { Menu } from './Menu';

/**
 * Props for `Header`.
 */
export interface HeaderProps {
  /**
   * The logo, from `Settings`.
   */
  logo: Records['Settings']['logo'];

  /**
   * The menu items, from `Settings`.
   */
  menu: Records['Settings']['menu'];
}

export function Header({ logo, menu }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);

  useEffect(() => {
    // The open menu covers the page, so the page behind it stops scrolling.
    document.documentElement.classList.toggle('scroll-lock', open);
    if (!open) return;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const close = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false);
    addEventListener('keydown', close);
    return () => removeEventListener('keydown', close);
  }, [open]);

  return (
    <header className="container header">
      <Link href="/" className="header__home" aria-label="Rayleigh">
        <Logo logo={logo} />
      </Link>
      <Menu menu={menu} open={open} onNavigate={() => setOpen(false)} />
      <DarkModeSwitch />
      <button
        type="button"
        className="header__burger"
        aria-controls="menu"
        aria-expanded={open}
        title={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}
