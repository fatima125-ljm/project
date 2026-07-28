import { useState, useEffect, useMemo } from 'react';
import { Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { AdSlot } from '@/components/AdSlot';
import { galleryItems } from '@/lib/gallery-data';

export function GalleryPage() {
  const { dict, locale } = useI18n();
  const t = dict.gallery;
  const { user } = useAuth();

  const [cat, setCat] = useState(0);
  const [diff, setDiff] = useState(0);
  const [color, setColor] = useState(0);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setFavorites(new Set());
      return;
    }
    supabase
      .from('favorites')
      .select('item_key')
      .then(({ data }) => {
        setFavorites(new Set((data ?? []).map((r: { item_key: string }) => r.item_key)));
      });
  }, [user]);

  const filtered = useMemo(() => {
    return galleryItems.filter((item) => {
      if (cat !== 0 && item.category !== t.categories[cat]) return false;
      if (diff !== 0 && item.difficulty !== t.difficulties[diff]) return false;
      if (color !== 0 && item.color !== t.colors[color]) return false;
      return true;
    });
  }, [cat, diff, color, t.categories, t.difficulties, t.colors]);

  const toggleFav = async (key: string) => {
    if (!user) return;
    setBusy(key);
    const isFav = favorites.has(key);
    setFavorites((prev) => {
      const next = new Set(prev);
      if (isFav) next.delete(key);
      else next.add(key);
      return next;
    });
    if (isFav) {
      await supabase.from('favorites').delete().eq('item_key', key);
    } else {
      await supabase.from('favorites').insert({ item_key: key });
    }
    setBusy(null);
  };

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <FilterSelect label={t.category} value={cat} onChange={setCat} options={t.categories} />
          <FilterSelect label={t.difficulty} value={diff} onChange={setDiff} options={t.difficulties} />
          <FilterSelect label={t.color} value={color} onChange={setColor} options={t.colors} />
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">{t.noResults}</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((item) => {
              const title = locale === 'ar' ? item.titleAr : item.title;
              const catLabel = locale === 'ar' ? item.categoryAr : item.category;
              const diffLabel = locale === 'ar' ? item.difficultyAr : item.difficulty;
              const isFav = favorites.has(item.key);
              return (
                <article key={item.key} className="surface lift overflow-hidden">
                  <div className="relative">
                    <img src={item.image} alt={title} loading="lazy" className="aspect-square w-full object-cover" />
                    {user && (
                      <button
                        onClick={() => toggleFav(item.key)}
                        disabled={busy === item.key}
                        aria-label={isFav ? t.saved : t.save}
                        className="absolute end-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur transition-transform hover:scale-110"
                      >
                        {isFav ? (
                          <BookmarkCheck className="h-4 w-4 text-olive" />
                        ) : (
                          <Bookmark className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold">{title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {diffLabel} · {catLabel}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" /> {item.hours} {t.hours}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <div className="mt-12">
          <AdSlot />
        </div>
      </section>
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  options: readonly string[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 h-10 w-full rounded-full border border-input bg-card px-4 text-sm outline-none focus:border-olive/50"
      >
        {options.map((o, i) => (
          <option key={o} value={i}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
