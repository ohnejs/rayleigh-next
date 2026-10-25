/**
 * The two themes a visitor can pick.
 */
export type Theme = 'light' | 'dark';

const KEY = 'theme';

// Runs in the page's `<head>`, before the first paint, so the page never flashes the wrong theme.
// It follows the system setting until the visitor picks a theme, then keeps their pick.
export const themeScript = `(() => {
  const media = matchMedia('(prefers-color-scheme: dark)');
  const apply = () => {
    let theme = null;
    try { theme = localStorage.getItem('${KEY}'); } catch {}
    document.documentElement.dataset.theme =
      theme === 'light' || theme === 'dark' ? theme : media.matches ? 'dark' : 'light';
  };
  apply();
  media.addEventListener('change', apply);
})();`;

/**
 * The theme the page shows right now.
 */
export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * Shows `theme` and remembers it for the next visit.
 * A browser that blocks storage still switches, and forgets the pick on reload.
 */
export function setTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(KEY, theme);
  } catch {}
}
