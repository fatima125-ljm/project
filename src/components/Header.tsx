import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Languages, Menu, X, LogOut, User } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/components/Logo';
import { Button, LinkButton } from '@/components/ui/Button';

export function Header() {
  const { dict, locale, toggle } = useI18n();
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { to: '/', label: dict.nav.home },
    { to: '/color-matcher', label: dict.nav.colorMatcher },
    { to: '/pattern-generator', label: dict.nav.patternGenerator },
    { to: '/gallery', label: dict.nav.gallery },
    { to: '/pattern-library', label: dict.nav.library },
    { to: '/community', label: dict.nav.community },
    { to: '/blog', label: dict.nav.blog },
    { to: '/pricing', label: dict.nav.pricing },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <Logo />

        <nav className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-3 py-2 text-sm transition-colors hover:bg-secondary hover:text-foreground ${
                  isActive ? 'bg-secondary text-foreground' : 'text-muted-foreground'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 justify-self-end">
          <Button variant="ghost" size="sm" onClick={toggle} aria-label="Toggle language">
            <Languages className="h-4 w-4" />
            <span className="text-xs font-semibold">{locale === 'en' ? 'العربية' : 'English'}</span>
          </Button>

          {user ? (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                to="/account"
                className="grid h-8 w-8 place-items-center rounded-full bg-secondary text-secondary-foreground"
                aria-label={dict.nav.account}
              >
                <User className="h-4 w-4" />
              </Link>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                {dict.nav.logout}
              </Button>
            </div>
          ) : (
            <LinkButton to="/login" variant="primary" size="sm" className="hidden sm:inline-flex">
              {dict.nav.login}
            </LinkButton>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="xl:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary ${
                    isActive ? 'bg-secondary text-foreground font-medium' : 'text-muted-foreground'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            {user ? (
              <>
                <Link to="/account" onClick={() => setOpen(false)} className="rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary">
                  {dict.nav.account}
                </Link>
                <button onClick={handleSignOut} className="rounded-xl px-3 py-2.5 text-start text-sm text-error hover:bg-secondary">
                  {dict.nav.logout}
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)} className="mt-2 block">
                <Button variant="primary" className="w-full">{dict.nav.login}</Button>
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
