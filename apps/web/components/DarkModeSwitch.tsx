'use client';

import { useLayoutEffect, useRef } from 'react';

import { currentTheme, setTheme, themeScript } from '../lib/theme';
import { IconMoon } from './icon/Moon';
import { IconSun } from './icon/Sun';

// The server cannot know a visitor's theme, so it renders the same button for both.
// CSS picks the icon from the `data-theme` the theme script set, so the page never flashes.
export function DarkModeSwitch() {
  const turns = useRef<number | null>(null);

  // Next renders a missing page in the browser, so the theme script in `<head>` never ran: run it here.
  useLayoutEffect(() => {
    if (document.documentElement.dataset.theme) return;
    document.head.append(
      Object.assign(document.createElement('script'), { textContent: themeScript }),
    );
  }, []);

  return (
    <button
      type="button"
      className="theme-switch"
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      onClick={(event) => {
        const theme = currentTheme();
        // Each click turns the sun and the moon half a circle further, starting from the current theme.
        turns.current = (turns.current ?? (theme === 'dark' ? 1 : 0)) + 1;
        event.currentTarget.style.setProperty('--turns', String(turns.current));
        setTheme(theme === 'dark' ? 'light' : 'dark');
      }}
    >
      <span className="theme-switch__orbit">
        <IconSun className="theme-switch__sun" />
        <IconMoon className="theme-switch__moon" />
      </span>
    </button>
  );
}
