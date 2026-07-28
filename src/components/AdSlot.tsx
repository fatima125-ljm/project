import { useI18n } from '@/lib/i18n-context';

export function AdSlot({ slot = 'yarnmuse-inline' }: { slot?: string }) {
  const { dict } = useI18n();
  return (
    <aside
      data-ad-slot={slot}
      aria-label={dict.common.advertisement}
      className="mx-auto flex min-h-24 w-full max-w-4xl items-center justify-center rounded-2xl border border-dashed border-border bg-muted/50 text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
    >
      {dict.common.advertisement}
    </aside>
  );
}
