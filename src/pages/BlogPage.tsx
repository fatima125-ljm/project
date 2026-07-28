import { ArrowRight } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { AdSlot } from '@/components/AdSlot';
import { blogPosts } from '@/lib/blog-data';

export function BlogPage() {
  const { dict, locale } = useI18n();
  const t = dict.blog;

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="surface lift overflow-hidden md:grid md:grid-cols-[280px_1fr]">
              <img
                src={post.image}
                alt={locale === 'ar' ? post.titleAr : post.title}
                loading="lazy"
                className="h-48 w-full object-cover md:h-full"
              />
              <div className="p-6">
                <time className="text-xs text-muted-foreground">{post.dateLabel}</time>
                <h2 className="mt-2 text-xl font-semibold">{locale === 'ar' ? post.titleAr : post.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {locale === 'ar' ? post.excerptAr : post.excerpt}
                </p>
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-olive"
                >
                  {t.readArticle}
                  <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12">
          <AdSlot />
        </div>
      </section>
    </>
  );
}
