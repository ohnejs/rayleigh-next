import Link from 'next/link';

import { DarkModeSwitch } from './DarkModeSwitch';
import { Logo } from './Logo';
import { Menu } from './Menu';

export function Header() {
  return (
    <header className="container header">
      <Link href="/" className="header__home" aria-label="Rayleigh">
        <Logo />
      </Link>
      <Menu />
      <DarkModeSwitch />
    </header>
  );
}
