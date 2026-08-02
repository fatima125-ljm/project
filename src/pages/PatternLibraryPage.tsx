import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, Clock, Crown, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { AdSlot } from '@/components/AdSlot';
import { Reveal } from '@/components/Reveal';
import { libraryPatterns, type LibraryPattern } from '@/lib/pattern-library-data';

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-success/15 text-success',
  Intermediate: 'bg-warning/15 text-warning',
  Advanced: 'bg-error/15 text-error',
};

export function PatternLibraryPage() {
  const { dict, locale } = useI18n();
  const t = dict.library;
  const isAr = locale === 'ar';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(0); // index into t.categories
  const [difficulty, setDifficulty] = useState(0);
  const [sort, setSort] = useState(0);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    setLoading(false);
  }, []);

  const filtered = useMemo(() => {
    let result = [...libraryPatterns];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.titleAr.includes(search) ||
          p.yarnType.toLowerCase().includes(q),
      );
    }

    // Category
    const cat = t.categories[category];
    if (cat !== t.categories[0]) {
      result = result.filter((p) => p.category === cat || p.categoryAr === cat);
    }

    // Difficulty
    const diff = t.difficulties[difficulty];
    if (diff !== t.difficulties[0]) {
      result = result.filter((p) => p.difficulty === diff || p.difficultyAr === diff);
    }

    // Sort
    const sortKey = t.sortOptions[sort];
    if (sortKey === t.sortOptions[0]) {
      result.sort((a, b) => b.favorites - a.favorites);
    } else if (sortKey === t.sortOptions[1]) {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortKey === t.sortOptions[2]) {
      result.sort((a, b) => Number(a.isPremium) - Number(b.isPremium));
    } else if (sortKey === t.sortOptions[3]) {
      result.sort((a, b) => Number(b.isPremium) - Number(a.isPremium));
    }

    return result;
  }, [search, category, difficulty, sort, t]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <>
      <section className="hero-gradient relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-olive" />
            {t.title}
          </span>
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">
            {t.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Search bar */}
        <div className="relative mb-6">
          <Search className="absolute start-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchPlaceholder}
            className="w-full rounded-2xl border border-input bg-card py-3 ps-11 pe-4 text-sm outline-none transition-colors focus:border-olive/50 focus:ring-2 focus:ring-olive/20"
          />
        </div>

        {/* Category chips */}
        <div className="no-scrollbar mb-4 flex gap-2 overflow-x-auto pb-1">
          {t.categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setCategory(i)}
              aria-pressed={category === i}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                category === i
                  ? 'border-olive bg-olive text-cream'
                  : 'border-border bg-card text-muted-foreground hover:border-olive/40 hover:bg-secondary/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Difficulty + Sort row */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {t.difficulties.map((diff, i) => (
              <button
                key={diff}
                onClick={() => setDifficulty(i)}
                aria-pressed={difficulty === i}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                  difficulty === i
                    ? 'border-brown bg-brown text-cream'
                    : 'border-border bg-card text-muted-foreground hover:border-brown/30'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              value={sort}
              onChange={(e) => setSort(Number(e.target.value))}
              aria-label={t.sortOptions[sort]}
              className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground outline-none focus:border-olive/50 focus:ring-2 focus:ring-olive/20"
            >
              {t.sortOptions.map((opt, i) => (
                <option key={opt} value={i}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-muted-foreground">
          {filtered.length} {t.results}
        </p>

        {/* Masonry grid */}
        {loading ? (
          <SkeletonGrid />
        ) : filtered.length === 0 ? (
          <div className="grid min-h-48 place-items-center rounded-2xl border border-border bg-card">
            <p className="text-sm text-muted-foreground">{t.noResults}</p>
          </div>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
            {visible.map((p, i) => (
              <PatternCard key={p.id} pattern={p} isAr={isAr} t={t} index={i} />
            ))}
          </div>
        )}

        {/* Load more */}
        {!loading && visibleCount < filtered.length && (
          <div className="mt-10 text-center">
            <button
              onClick={() => setVisibleCount((c) => c + 9)}
              className="rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-all hover:border-olive/40 hover:bg-secondary/40"
            >
              {t.viewPattern}
            </button>
          </div>
        )}

        <div className="mt-12">
          <AdSlot />
        </div>
      </section>
    </>
  );
}

function PatternCard({
  pattern,
  isAr,
  t,
  index,
}: {
  pattern: LibraryPattern;
  isAr: boolean;
  t: typeof dict.library;
  index: number;
}) {
  const title = isAr ? pattern.titleAr : pattern.title;
  const cat = isAr ? pattern.categoryAr : pattern.category;
  const diff = isAr ? pattern.difficultyAr : pattern.difficulty;
  const yarn = isAr ? pattern.yarnTypeAr : pattern.yarnType;

  return (
    <Link
      to={`/pattern-library/${pattern.id}`}
      className="mb-5 block break-inside-avoid"
    >
      <Reveal delay={Math.min(index * 60, 300)}>
        <article className="surface lift group overflow-hidden">
          {/* Image */}
          <div className="relative overflow-hidden">
            <img
              src={pattern.image}
              alt={title}
              loading="lazy"
              className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Badges */}
            <div className="absolute start-3 top-3 flex flex-col gap-1.5">
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${
                  pattern.isPremium
                    ? 'bg-brown/85 text-cream'
                    : 'bg-cream/85 text-brown'
                }`}
              >
                {pattern.isPremium ? (
                  <span className="flex items-center gap-1">
                    <Crown className="h-3 w-3" />
                    {t.premium}
                  </span>
                ) : (
                  t.free
                )}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${
                  difficultyColors[pattern.difficulty] ?? 'bg-secondary text-foreground'
                }`}
              >
                {diff}
              </span>
            </div>
            {/* Favorite count */}
            <div className="absolute end-3 top-3 flex items-center gap-1 rounded-full bg-card/85 px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm">
              <Heart className="h-3 w-3 text-olive" />
              {pattern.favorites.toLocaleString()}
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <span className="text-[11px] font-medium uppercase tracking-wider text-olive">{cat}</span>
            <h3 className="mt-1 text-base font-semibold leading-tight">{title}</h3>
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {pattern.hours}{t.hours}
              </span>
              <span className="h-3 w-px bg-border" />
              <span>{yarn}</span>
            </div>
          </div>
        </article>
      </Reveal>
    </Link>
  );
}

function SkeletonGrid() {
  return (
    <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="mb-5 break-inside-avoid">
          <div className="surface overflow-hidden">
            <div
              className="w-full animate-pulse bg-secondary"
              style={{ height: `${200 + (i % 4) * 80}px` }}
            />
            <div className="p-4">
              <div className="h-3 w-16 animate-pulse rounded bg-secondary" />
              <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-secondary" />
              <div className="mt-4 flex gap-3">
                <div className="h-3 w-12 animate-pulse rounded bg-secondary" />
                <div className="h-3 w-16 animate-pulse rounded bg-secondary" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
