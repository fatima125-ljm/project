import { Link } from 'react-router-dom';
import { useI18n } from '@/lib/i18n-context';
import { Logo } from '@/components/Logo';

export function Footer() {
  const { dict } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">{dict.footer.tagline}</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{dict.footer.studio}</h3>
          <ul className="mt-3 grid gap-2">
            <li><Link to="/color-matcher" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{dict.nav.colorMatcher}</Link></li>
            <li><Link to="/pattern-generator" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{dict.nav.patternGenerator}</Link></li>
            <li><Link to="/gallery" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{dict.nav.gallery}</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">{dict.footer.community}</h3>
          <ul className="mt-3 grid gap-2">
            <li><Link to="/community" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{dict.nav.community}</Link></li>
            <li><Link to="/blog" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{dict.nav.blog}</Link></li>
            <li><Link to="/pricing" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{dict.nav.pricing}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border px-4 py-5 text-center text-xs text-muted-foreground">
        © {year} YarnMuse AI. {dict.footer.rights}
      </div>
    </footer>
  );
}
