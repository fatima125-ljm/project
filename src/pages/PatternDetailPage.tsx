import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Heart,
  Clock,
  Gauge,
  Package,
  Layers,
  Download,
  Share2,
  Check,
  ChevronLeft,
  Crown,
  Sparkles,
  Ruler,
  BookOpen,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';
import { libraryPatterns } from '@/lib/pattern-library-data';

const difficultyColors: Record<string, string> = {
  Beginner: 'bg-success/15 text-success',
  Intermediate: 'bg-warning/15 text-warning',
  Advanced: 'bg-error/15 text-error',
};

export function PatternDetailPage() {
  const { id } = useParams();
  const { dict, locale } = useI18n();
  const t = dict.patternDetail;
  const { user } = useAuth();
  const isAr = locale === 'ar';

  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (shareTimer.current) clearTimeout(shareTimer.current); };
  }, []);

  const pattern = libraryPatterns.find((p) => p.id === id);
  if (!pattern) return <Navigate to="/pattern-library" replace />;

  const title = isAr ? pattern.titleAr : pattern.title;
  const cat = isAr ? pattern.categoryAr : pattern.category;
  const diff = isAr ? pattern.difficultyAr : pattern.difficulty;
  const yarn = isAr ? pattern.yarnTypeAr : pattern.yarnType;
  const desc = isAr ? pattern.descriptionAr : pattern.description;
  const materials = isAr ? pattern.materialsAr : pattern.materials;
  const yarnRecs = isAr ? pattern.yarnRecommendationsAr : pattern.yarnRecommendations;
  const finishedSize = isAr ? pattern.finishedSizeAr : pattern.finishedSize;

  const related = libraryPatterns
    .filter((p) => p.category === pattern.category && p.id !== pattern.id)
    .slice(0, 3);

  const share = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      if (shareTimer.current) clearTimeout(shareTimer.current);
      shareTimer.current = setTimeout(() => setCopied(false), 2000);
    }).catch(() => {});
  };

  const save = async () => {
    if (!user || !pattern) return;
    setSaving(true);
    setSaveError(null);
    const { error } = await supabase.from('saved_patterns').insert({
      project_type: pattern.category,
      skill_level: pattern.difficulty,
      yarn_type: pattern.yarnType,
      hook_size: pattern.hookSize,
      pattern_language: isAr ? 'Arabic' : 'English',
      custom_prompt: null,
      pattern_data: { title, ...pattern } as unknown as Record<string, unknown>,
    });
    setSaving(false);
    if (error) setSaveError(error.message);
    else setSaved(true);
  };

  const downloadText = () => {
    const text = [
      title,
      '',
      `${t.difficulty}: ${diff}`,
      `${t.estimatedTime}: ${pattern.hours}h`,
      `${t.yarnType}: ${yarn}`,
      `${t.hookSize}: ${pattern.hookSize}`,
      `${t.finishedSize}: ${finishedSize}`,
      '',
      t.materials,
      ...materials.map((m) => `  - ${m}`),
      '',
      t.yarnRecommendations,
      ...yarnRecs.map((y) => `  - ${y}`),
      '',
      t.description,
      desc,
    ].join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <Link
          to="/pattern-library"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          {t.back}
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Gallery */}
          <Reveal>
            <div>
              <div className="relative overflow-hidden rounded-[2rem] shadow-lift">
                <img
                  src={pattern.gallery[activeImg]}
                  alt={title}
                  loading="eager"
                  width={600}
                  height={750}
                  className="aspect-[4/5] w-full object-cover"
                />
                <div className="absolute start-3 top-3 flex gap-1.5">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                      pattern.isPremium ? 'bg-brown/85 text-cream' : 'bg-cream/85 text-brown'
                    }`}
                  >
                    {pattern.isPremium ? (
                      <span className="flex items-center gap-1">
                        <Crown className="h-3 w-3" />
                        {dict.library.premium}
                      </span>
                    ) : (
                      dict.library.free
                    )}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-sm ${
                      difficultyColors[pattern.difficulty] ?? 'bg-secondary text-foreground'
                    }`}
                  >
                    {diff}
                  </span>
                </div>
              </div>
              {/* Thumbnails */}
              <div className="mt-4 flex gap-3">
                {pattern.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`overflow-hidden rounded-2xl border-2 transition-all ${
                      activeImg === i ? 'border-olive' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${title} ${i + 1}`} loading="lazy" className="h-20 w-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Info */}
          <Reveal delay={100}>
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-olive">{cat}</span>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>

              {/* Stats grid */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatCard icon={Gauge} label={t.difficulty} value={diff} />
                <StatCard icon={Clock} label={t.estimatedTime} value={`${pattern.hours}h`} />
                <StatCard icon={Package} label={t.yarnType} value={yarn} />
                <StatCard icon={BookOpen} label={t.hookSize} value={pattern.hookSize} />
                <StatCard icon={Ruler} label={t.finishedSize} value={finishedSize} />
                <StatCard icon={Heart} label={t.favorites} value={pattern.favorites.toLocaleString()} />
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                {user ? (
                  <Button onClick={save} disabled={saving || saved}>
                    {saved ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <Heart className={`h-4 w-4 ${saved ? 'fill-olive text-olive' : ''}`} />
                    )}
                    {saved ? t.saved : t.saveToFavorites}
                  </Button>
                ) : (
                  <Link to="/login">
                    <Button variant="outline">
                      <Heart className="h-4 w-4" />
                      {t.signInToSave}
                    </Button>
                  </Link>
                )}
                {saveError && <span className="self-center text-sm text-error">{saveError}</span>}
                <Button variant="outline" onClick={downloadText}>
                  <Download className="h-4 w-4" />
                  {t.downloadPdf}
                </Button>
                <Button variant="ghost" onClick={share}>
                  {copied ? <Check className="h-4 w-4 text-success" /> : <Share2 className="h-4 w-4" />}
                  {copied ? t.shareCopied : t.sharePattern}
                </Button>
              </div>

              {/* Materials */}
              <div className="mt-8 border-t border-border pt-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <Layers className="h-4 w-4 text-olive" />
                  {t.materials}
                </h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {materials.map((m) => (
                    <li key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Yarn recommendations */}
              <div className="mt-6 border-t border-border pt-6">
                <h2 className="flex items-center gap-2 text-sm font-semibold">
                  <Package className="h-4 w-4 text-olive" />
                  {t.yarnRecommendations}
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {yarnRecs.map((y) => (
                    <span
                      key={y}
                      className="rounded-full border border-border bg-secondary/40 px-3 py-1.5 text-xs font-medium text-foreground"
                    >
                      {y}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Related patterns */}
        {related.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h2 className="flex items-center gap-2 text-2xl font-semibold">
                <Sparkles className="h-5 w-5 text-olive" />
                {t.relatedPatterns}
              </h2>
            </Reveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 100}>
                  <Link to={`/pattern-library/${p.id}`}>
                    <article className="surface lift group overflow-hidden">
                      <div className="relative overflow-hidden">
                        <img
                          src={p.image}
                          alt={isAr ? p.titleAr : p.title}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <span
                          className={`absolute start-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-sm ${
                            p.isPremium ? 'bg-brown/85 text-cream' : 'bg-cream/85 text-brown'
                          }`}
                        >
                          {p.isPremium ? dict.library.premium : dict.library.free}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-base font-semibold">{isAr ? p.titleAr : p.title}</h3>
                        <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {p.hours}{dict.library.hours}
                          </span>
                          <span className="flex items-center gap-1">
                            <Heart className="h-3.5 w-3.5" />
                            {p.favorites.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-3">
      <Icon className="h-4 w-4 text-olive" />
      <p className="mt-2 text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
