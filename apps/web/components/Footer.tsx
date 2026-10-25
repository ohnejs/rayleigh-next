import { OhneLink } from '@ohnejs/next/client';

import type { Records } from '../ohne';

import { IconBrandDiscord } from './icon/BrandDiscord';
import { IconBrandGithub } from './icon/BrandGithub';
import { IconBrandX } from './icon/BrandX';
import { IconWorld } from './icon/World';

// The `icon` select in `Settings` names one of these.
const icons = {
  github: IconBrandGithub,
  x: IconBrandX,
  discord: IconBrandDiscord,
  website: IconWorld,
};

// The names of the icons, for a link without a title.
const names = { github: 'GitHub', x: 'X', discord: 'Discord', website: 'Website' };

/**
 * Props for `Footer`.
 */
export interface FooterProps {
  /**
   * The copyright line, from `Settings`.
   */
  copyright: Records['Settings']['copyright'];

  /**
   * The social links, from `Settings`.
   */
  social: Records['Settings']['social'];
}

export function Footer({ copyright, social }: FooterProps) {
  return (
    <footer className="container footer">
      {copyright && <p className="footer__copyright">{copyright}</p>}
      {social.length > 0 && (
        <ul className="footer__social">
          {social.map(({ UUID, icon, link, title }) => {
            const Icon = icons[icon];
            return (
              <li key={UUID}>
                <OhneLink
                  link={link}
                  className="footer__social-link"
                  title={title ?? undefined}
                  aria-label={title ?? names[icon]}
                >
                  <Icon />
                </OhneLink>
              </li>
            );
          })}
        </ul>
      )}
    </footer>
  );
}
