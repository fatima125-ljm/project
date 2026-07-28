import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Wand2, Images, Bot, Clock, Heart, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { LinkButton } from '@/components/ui/Button';
import { AdSlot } from '@/components/AdSlot';
import { galleryItems } from '@/lib/gallery-data';

const heroImg =
  'https://images.pexels.com/photos/6957094/pexels-photo-6957094.jpeg?auto=compress&cs=tinysrgb&w=1408&h=1104&fit=crop';

export function HomePage() {
  const { dict, locale } = useI18n();
  const t = dict.home;

  const features = [
    { to: '/color-matcher', icon: Palette, ...t.features.color },
    { to: '/pattern-generator', icon: Wand2, ...t.features.pattern },
    { to: '/gallery', icon: Images, ...t.features.gallery },
    { to: '/community', icon: Bot, ...t.features.assistant },
  ];

  return (
    <>
      <section className="hero-gradient overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-olive" />
              {t.badge}
            </span>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl text-balance">{t.title}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{t.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/pattern-generator" variant="primary" size="lg">
                {t.startCreating}
                <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </LinkButton>
              <LinkButton to="/gallery" variant="outline" size="lg">
                {t.exploreInspiration}
              </LinkButton>
            </div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4">
              <div>
                <dt className="font-display text-2xl font-semibold">120k+</dt>
                <dd className="text-xs text-muted-foreground">{t.stats.patterns}</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold">38k</dt>
                <dd className="text-xs text-muted-foreground">{t.stats.makers}</dd>
              </div>
              <div>
                <dt className="font-display text-2xl font-semibold">900+</dt>
                <dd className="text-xs text-muted-foreground">{t.stats.palettes}</dd>
              </div>
            </dl>
          </div>

          <div className="fade-up relative">
            <img
              src={heroImg}
              alt="Balls of beige, cream and olive crochet yarn with wooden hooks"
              className="w-full rounded-4xl object-cover shadow-lift"
            />
            <div className="surface absolute -bottom-5 start-4 flex items-center gap-3 px-4 py-3 sm:start-8">
              <span className="grid h-9 w-9 place-items-center rounded-xl soft-gradient">
                <Clock className="h-4 w-4 text-olive" />
              </span>
              <div>
                <p className="text-xs text-muted-foreground">{dict.pattern.estimatedTime}</p>
                <p className="text-sm font-semibold">6h · {dict.gallery.difficulties[1]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold sm:text-4xl">{t.featuresTitle}</h2>
          <p className="mt-3 text-muted-foreground">{t.featuresSubtitle}</p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <Link key={f.to} to={f.to} className="surface lift block p-6">
              <span className="grid h-11 w-11 place-items-center rounded-2xl soft-gradient">
                <f.icon className="h-5 w-5 text-olive" />
              </span>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
        <AdSlot />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold sm:text-4xl">{t.galleryTitle}</h2>
            <p className="mt-2 text-muted-foreground">{t.gallerySubtitle}</p>
          </div>
          <LinkButton to="/gallery" variant="ghost" size="md">
            {t.explore}
            <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
          </LinkButton>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.slice(0, 4).map((item) => (
            <article key={item.key} className="surface lift overflow-hidden">
              <img src={item.image} alt={locale === 'ar' ? item.titleAr : item.title} loading="lazy" className="aspect-square w-full object-cover" />
              <div className="p-4">
                <h3 className="text-base font-semibold">{locale === 'ar' ? item.titleAr : item.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Heart className="h-3.5 w-3.5" /> {item.hours} {dict.gallery.hours}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="surface soft-gradient px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-semibold sm:text-3xl">{t.comingSoonTitle}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t.comingSoonSubtitle}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {t.comingSoon.map((c) => (
              <li key={c} className="rounded-2xl bg-card px-4 py-4 text-sm font-medium">{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 text-center sm:px-6">
        <h2 className="text-3xl font-semibold sm:text-4xl">{t.ctaTitle}</h2>
        <p className="mt-3 text-muted-foreground">{t.ctaSubtitle}</p>
        <LinkButton to="/pattern-generator" variant="primary" size="lg" className="mt-7">
          {t.startCreating}
        </LinkButton>
      </section>
    </>
  );
}
