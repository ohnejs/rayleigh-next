import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

// Every page of the site shares this header and footer, the not-found page too.
export default function SiteLayout({ children }: LayoutProps<'/[[...slug]]'>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
