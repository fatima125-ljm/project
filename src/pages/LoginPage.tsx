import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/Button';

export function LoginPage() {
  const { dict } = useI18n();
  const t = dict.auth;
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isSignUp = location.pathname === '/signup';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = isSignUp ? await signUp(email, password) : await signIn(email, password);
    setBusy(false);
    if (err) {
      setError(err);
      return;
    }
    navigate('/');
  };

  return (
    <section className="hero-gradient">
      <div className="mx-auto flex max-w-md flex-col px-4 py-20 sm:px-6">
        <div className="surface p-8">
          <h1 className="text-2xl font-semibold">{isSignUp ? t.signUpTitle : t.signInTitle}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{isSignUp ? t.signUpSubtitle : t.signInSubtitle}</p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">{t.email}</span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
              />
            </label>
            <label className="block">
              <span className="text-xs font-medium text-muted-foreground">{t.password}</span>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 h-11 w-full rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
              />
            </label>

            {error && <p className="text-sm text-error">{error}</p>}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? (isSignUp ? t.signingUp : t.signingIn) : isSignUp ? t.signUp : t.signIn}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isSignUp ? t.haveAccount : t.noAccount}{' '}
            <Link to={isSignUp ? '/login' : '/signup'} className="font-medium text-olive">
              {isSignUp ? t.signInLink : t.createOne}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
