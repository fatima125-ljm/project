import { Check, Star } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { AdSlot } from '@/components/AdSlot';
import { Button } from '@/components/ui/Button';

export function PricingPage() {
  const { dict } = useI18n();
  const t = dict.pricing;
  const plans = [
    { key: 'free', ...t.plans.free, popular: false },
    { key: 'muse', ...t.plans.muse, popular: true },
    { key: 'studio', ...t.plans.studio, popular: false },
  ] as const;

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 text-center">
          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">{t.title}</h1>
          <p className="mt-3 text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`surface relative flex flex-col p-7 ${plan.popular ? 'ring-2 ring-olive/40' : ''}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 start-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground rtl:translate-x-1/2">
                  <Star className="h-3 w-3" />
                  {t.mostPopular}
                </span>
              )}
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-2">
                <span className="font-display text-4xl font-semibold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{t.perMonth}</span>
              </p>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-olive" />
                    <span className="text-muted-foreground">{f}</span>
                  </li>
                ))}
              </ul>
              <Button variant={plan.popular ? 'primary' : 'outline'} className="mt-8 w-full">
                {t.choosePlan}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <AdSlot />
        </div>
      </section>
    </>
  );
}
