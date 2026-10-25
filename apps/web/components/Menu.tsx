'use client';

import { linkHref } from '@ohnejs/client';
import { OhneLink } from '@ohnejs/next/client';
import { usePathname } from 'next/navigation';
import { type CSSProperties, useEffect, useRef, useState } from 'react';

import type { Records } from '../ohne';

/**
 * Props for `Menu`.
 */
export interface MenuProps {
  /**
   * The menu items, from `Settings`.
   */
  menu: Records['Settings']['menu'];

  /**
   * Whether the mobile menu is open.
   */
  open: boolean;

  /**
   * Called when a visitor follows a link, so the mobile menu closes.
   */
  onNavigate: () => void;
}

export function Menu({ menu, open, onNavigate }: MenuProps) {
  const path = usePathname();
  const items = useRef<(HTMLLIElement | null)[]>([]);
  const [dot, setDot] = useState<number | null>(null);

  // `linkHref` turns a link field into its address, so a post at `/blog/<slug>` still marks Blog.
  const active = menu.findIndex(({ link }) => {
    const href = linkHref(link);
    return href === path || (href !== undefined && href !== '/' && path.startsWith(`${href}/`));
  });

  // The dot sits under the active item, and follows the pointer while it is over the menu.
  // It needs the item's position, which only the browser knows, so the server renders none.
  function moveDot(index = active) {
    setDot(active < 0 ? null : (items.current[index]?.offsetLeft ?? null));
  }

  useEffect(() => {
    moveDot();
    const reset = () => moveDot();
    addEventListener('resize', reset);
    return () => removeEventListener('resize', reset);
  }, [active]);

  if (!menu.length) return null;
  return (
    <nav id="menu" className={open ? 'menu menu--open' : 'menu'}>
      <ul className="menu__list" onMouseLeave={() => moveDot()}>
        {menu.map(({ UUID, label, link }, i) => (
          <li
            key={UUID}
            ref={(item) => {
              items.current[i] = item;
            }}
          >
            <OhneLink
              link={link}
              className={i === active ? 'menu__link menu__link--active' : 'menu__link'}
              aria-current={i === active ? 'page' : undefined}
              onMouseEnter={() => moveDot(i)}
              onClick={onNavigate}
            >
              {label}
            </OhneLink>
          </li>
        ))}
      </ul>
      {dot !== null && (
        <span className="menu__dot" style={{ '--dot-x': `${dot}px` } as CSSProperties} />
      )}
    </nav>
  );
}
