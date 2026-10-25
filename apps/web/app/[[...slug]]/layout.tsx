import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';
import { ohne } from '../../lib/ohne';

// Every page of the site shares this header and footer, the not-found page too.
// `ohne.read` reads the `Settings` singleton once, and the read is cached like the page's.
export default async function SiteLayout({ children }: LayoutProps<'/[[...slug]]'>) {
  const settings = await ohne.read('Settings');
  return (
    <>
      <Header logo={settings.logo} menu={settings.menu} />
      {children}
      <Footer copyright={settings.copyright} social={settings.social} />
    </>
  );
}
