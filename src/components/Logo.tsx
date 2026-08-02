import { Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { Link } from 'react-router-dom';

export function Logo({ to = '/' }: { to?: string }) {
  const { dict } = useI18n();
  return (
    <Link to={to} className="flex min-w-0 items-center gap-2" aria-label={dict.nav.home}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl soft-gradient" aria-hidden="true">
        <Sparkles className="h-4 w-4 text-olive" />
      </span>
      <span className="truncate font-display text-lg font-semibold tracking-tight">
        YarnMuse <span className="text-olive">AI</span>
      </span>
    </Link>
  );
}
