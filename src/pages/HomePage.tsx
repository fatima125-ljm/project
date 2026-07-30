import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Palette,
  Wand2,
  Images,
  Bot,
  Clock,
  Heart,
  Sparkles,
  Plus,
  Minus,
  Quote,
  Check,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { LinkButton } from '@/components/ui/Button';
import { AdSlot } from '@/components/AdSlot';
import { Reveal } from '@/components/Reveal';
import { galleryItems } from '@/lib/gallery-data';

const heroImg =
  'https://images.pexels.com/photos/4601228/pexels-photo-4601228.png?auto=compress&cs=tinysrgb&w=1408&h=1104&fit=crop';

const whyImg =
  'https://images.pexels.com/photos/6462889/pexels-photo-6462889.jpeg?auto=compress&cs=tinysrgb&w=900&h=1100&fit=crop';

export function HomePage() {
  const { dict, locale } = useI18n();
  const t = dict.home;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const features = [
    { to: '/color-matcher', icon: Palette, ...t.features.color },
    { to: '/pattern-generator', icon: Wand2, ...t.features.pattern },
    { to: '/gallery', icon: Images, ...t.features.gallery },
    { to: '/community', icon: Bot, ...t.features.assistant },
  ];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-olive" />
              {t.badge}
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.75rem] text-balance">
              {t.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.subtitle}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <LinkButton to="/pattern-generator" variant="primary" size="lg">
                {t.startCreating}
                <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
              </LinkButton>
              <LinkButton to="/gallery" variant="outline" size="lg">
                {t.exploreInspiration}
              </LinkButton>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
              <div>
                <dt className="font-display text-3xl font-semibold gradient-text">120k+</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{t.stats.patterns}</dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-semibold gradient-text">38k</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{t.stats.makers}</dd>
              </div>
              <div>
                <dt className="font-display text-3xl font-semibold gradient-text">900+</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{t.stats.palettes}</dd>
              </div>
            </dl>
          </div>

          <div className="fade-up relative" style={{ animationDelay: '0.15s' }}>
            <div className="relative">
              <img
                src={heroImg}
                alt="Vibrant yarn and crochet hook on textured fabric"
                className="w-full rounded-[2rem] object-cover shadow-lift"
              />
              <div className="surface absolute -bottom-5 start-4 flex items-center gap-3 px-4 py-3 shadow-lift sm:start-8">
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
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-wider text-olive">
              {t.featuresTitle}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.featuresSubtitle}
            </h2>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <Reveal key={f.to} delay={i * 80}>
              <Link to={f.to} className="surface lift shimmer-border group block h-full p-7">
                <span className="grid h-12 w-12 place-items-center rounded-2xl soft-gradient transition-transform group-hover:scale-110">
                  <f.icon className="h-5 w-5 text-olive" />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
        <AdSlot />
      </div>

      {/* ── Why YarnMuse AI ───────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream/40 py-24">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <div className="relative">
                <img
                  src={whyImg}
                  alt="Colorful crocheted fabric layers"
                  className="w-full rounded-[2rem] object-cover shadow-lift"
                />
                <div className="surface absolute -bottom-5 -end-4 flex items-center gap-3 px-5 py-4 shadow-lift">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-olive/10">
                    <Heart className="h-5 w-5 text-olive" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-semibold gradient-text">4.9/5</p>
                    <p className="text-xs text-muted-foreground">{t.testimonialsSubtitle}</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <div>
              <Reveal>
                <span className="text-sm font-semibold uppercase tracking-wider text-olive">
                  {t.whyTitle}
                </span>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                  {t.whySubtitle}
                </h2>
              </Reveal>
              <div className="mt-8 space-y-5">
                {t.whyPoints.map((p, i) => (
                  <Reveal key={i} delay={i * 100}>
                    <div className="flex gap-4">
                      <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-olive/10">
                        <Check className="h-3.5 w-3.5 text-olive" />
                      </span>
                      <div>
                        <h3 className="text-base font-semibold">{p.title}</h3>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-olive">
              {t.howTitle}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.howSubtitle}
            </h2>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {t.howSteps.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative">
                <div className="flex items-center gap-4">
                  <span className="font-display text-5xl font-bold gradient-text">{s.step}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Gallery preview ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.galleryTitle}
              </h2>
              <p className="mt-2 text-muted-foreground">{t.gallerySubtitle}</p>
            </div>
            <LinkButton to="/gallery" variant="ghost" size="md">
              {t.explore}
              <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
            </LinkButton>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.slice(0, 4).map((item, i) => (
            <Reveal key={item.key} delay={i * 80}>
              <article className="surface lift overflow-hidden">
                <img
                  src={item.image}
                  alt={locale === 'ar' ? item.titleAr : item.title}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
                <div className="p-4">
                  <h3 className="text-base font-semibold">
                    {locale === 'ar' ? item.titleAr : item.title}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Heart className="h-3.5 w-3.5" /> {item.hours} {dict.gallery.hours}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────── */}
      <section className="relative overflow-hidden bg-cream/40 py-24">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-olive">
                {t.testimonialsTitle}
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.testimonialsSubtitle}
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {t.testimonials.map((tm, i) => (
              <Reveal key={i} delay={i * 100}>
                <figure className="surface flex h-full flex-col p-7">
                  <Quote className="h-8 w-8 text-sage" />
                  <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                    "{tm.quote}"
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-olive/10 font-display text-sm font-semibold text-olive">
                      {tm.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{tm.name}</p>
                      <p className="text-xs text-muted-foreground">{tm.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-olive">
              {t.faqTitle}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {t.faqSubtitle}
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 space-y-3">
          {t.faqs.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <div className="surface overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
                >
                  <span className="text-sm font-semibold">{f.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-olive/10">
                    {openFaq === i ? (
                      <Minus className="h-4 w-4 text-olive" />
                    ) : (
                      <Plus className="h-4 w-4 text-olive" />
                    )}
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{
                    gridTemplateRows: openFaq === i ? '1fr' : '0fr',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Coming soon ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <Reveal>
          <div className="surface soft-gradient px-6 py-10 sm:px-10">
            <h2 className="text-2xl font-semibold sm:text-3xl">{t.comingSoonTitle}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.comingSoonSubtitle}</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.comingSoon.map((c) => (
                <li key={c} className="rounded-2xl bg-card px-4 py-4 text-sm font-medium">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ── Call To Action ───────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-brown px-6 py-16 text-center sm:px-10 sm:py-20">
            <div className="dot-grid absolute inset-0 opacity-20" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-cream backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {t.ctaBadge}
              </span>
              <h2 className="mx-auto mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-cream sm:text-4xl">
                {t.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-cream/70">
                {t.ctaSubtitle}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <LinkButton to="/pattern-generator" variant="primary" size="lg" className="bg-cream text-brown hover:bg-cream/90">
                  {t.ctaButton}
                  <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
                </LinkButton>
                <LinkButton to="/gallery" variant="outline" size="lg" className="border-cream/30 bg-transparent text-cream hover:bg-white/10 hover:text-cream">
                  {t.ctaSecondary}
                </LinkButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
