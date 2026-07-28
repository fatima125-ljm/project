import { useState, useCallback } from 'react';
import { Upload, X, Palette as PaletteIcon, Sparkles } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { AdSlot } from '@/components/AdSlot';
import { Button } from '@/components/ui/Button';
import { palette, buildHarmonies, type SwatchColor } from '@/lib/palette';
import { galleryItems } from '@/lib/gallery-data';

type Mode = 'palette' | 'photo';

export function ColorMatcherPage() {
  const { dict, locale } = useI18n();
  const t = dict.colorMatcher;

  const [mode, setMode] = useState<Mode>('palette');
  const [selected, setSelected] = useState<SwatchColor[]>([]);
  const [harmonies, setHarmonies] = useState<ReturnType<typeof buildHarmonies>>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [photoColors, setPhotoColors] = useState<string[]>([]);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const addColor = (c: SwatchColor) => {
    setSelected((s) => (s.some((x) => x.hex === c.hex) ? s : [...s, c]));
  };

  const removeColor = (hex: string) => {
    setSelected((s) => s.filter((c) => c.hex !== hex));
  };

  const suggest = () => {
    if (selected.length === 0) return;
    const base = selected[0];
    setHarmonies(buildHarmonies(base.hex));
  };

  const onFile = useCallback((file: File) => {
    setAnalyzing(true);
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoPreview(reader.result as string);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = 48;
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, size, size);
        const data = ctx.getImageData(0, 0, size, size).data;
        const buckets = new Map<string, { count: number; r: number; g: number; b: number }>();
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const key = `${Math.round(r / 32)}-${Math.round(g / 32)}-${Math.round(b / 32)}`;
          const bucket = buckets.get(key) ?? { count: 0, r: 0, g: 0, b: 0 };
          bucket.count++;
          bucket.r += r;
          bucket.g += g;
          bucket.b += b;
          buckets.set(key, bucket);
        }
        const sorted = [...buckets.values()].sort((a, b) => b.count - a.count).slice(0, 6);
        const colors = sorted.map((b) => {
          const r = Math.round(b.r / b.count);
          const g = Math.round(b.g / b.count);
          const bl = Math.round(b.b / b.count);
          return `#${[r, g, bl].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
        });
        setPhotoColors(colors);
        setAnalyzing(false);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const previews = galleryItems.slice(0, 4);

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 inline-flex rounded-full border border-border bg-card p-1">
          <button
            onClick={() => setMode('palette')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${mode === 'palette' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t.chooseFromPalette}
          </button>
          <button
            onClick={() => setMode('photo')}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${mode === 'photo' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {t.uploadPhoto}
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="surface p-6">
            {mode === 'palette' ? (
              <>
                <div className="grid grid-cols-6 gap-3">
                  {palette.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => addColor(c)}
                      className="group relative aspect-square rounded-2xl border border-border transition-transform hover:scale-105"
                      style={{ backgroundColor: c.hex }}
                      title={locale === 'ar' ? c.nameAr : c.name}
                    >
                      <span className="absolute inset-x-0 -bottom-6 text-center text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                        {locale === 'ar' ? c.nameAr : c.name}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-10">
                  <p className="text-sm font-semibold">{t.yourSelection}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {selected.length === 0 ? (
                      <span className="text-sm text-muted-foreground">—</span>
                    ) : (
                      selected.map((c) => (
                        <span key={c.hex} className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 ps-1 pe-3 text-xs">
                          <span className="h-5 w-5 rounded-full" style={{ backgroundColor: c.hex }} />
                          {locale === 'ar' ? c.nameAr : c.name}
                          <button onClick={() => removeColor(c.hex)} className="text-muted-foreground hover:text-foreground">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))
                    )}
                  </div>
                </div>

                <Button onClick={suggest} disabled={selected.length === 0} className="mt-6">
                  <Sparkles className="h-4 w-4" />
                  {t.suggest}
                </Button>
              </>
            ) : (
              <PhotoUploader onFile={onFile} preview={photoPreview} analyzing={analyzing} t={t} />
            )}
          </div>

          <div>
            {harmonies.length > 0 ? (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold">{t.harmonies}</h2>
                {harmonies.map((h) => (
                  <div key={h.type} className="surface p-5">
                    <p className="text-sm font-medium">{locale === 'ar' ? h.typeAr : h.type}</p>
                    <div className="mt-3 flex overflow-hidden rounded-2xl">
                      {h.colors.map((c) => (
                        <div key={c} className="h-16 flex-1" style={{ backgroundColor: c }} title={c} />
                      ))}
                    </div>
                    <div className="mt-2 flex gap-1">
                      {h.colors.map((c) => (
                        <span key={c} className="flex-1 text-center text-[10px] uppercase text-muted-foreground">{c}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : photoColors.length > 0 ? (
              <div className="surface p-6">
                <h2 className="text-lg font-semibold">{t.detectedColors}</h2>
                <div className="mt-4 flex overflow-hidden rounded-2xl">
                  {photoColors.map((c) => (
                    <div key={c} className="h-20 flex-1" style={{ backgroundColor: c }} title={c} />
                  ))}
                </div>
                <Button
                  onClick={() => {
                    setSelected(photoColors.slice(0, 3).map((hex) => ({ name: hex, nameAr: hex, hex })));
                    setMode('palette');
                  }}
                  className="mt-5"
                >
                  <PaletteIcon className="h-4 w-4" />
                  {t.suggest}
                </Button>
              </div>
            ) : (
              <div className="surface p-6">
                <h2 className="text-lg font-semibold">{t.preview}</h2>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {previews.map((p) => (
                    <div key={p.key} className="overflow-hidden rounded-2xl border border-border">
                      <img src={p.image} alt={locale === 'ar' ? p.titleAr : p.title} className="aspect-square w-full object-cover" />
                      <p className="px-3 py-2 text-xs font-medium">{locale === 'ar' ? p.titleAr : p.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12">
          <AdSlot />
        </div>
      </section>
    </>
  );
}

function PhotoUploader({
  onFile,
  preview,
  analyzing,
  t,
}: {
  onFile: (f: File) => void;
  preview: string | null;
  analyzing: boolean;
  t: ReturnType<typeof useI18n>['dict']['colorMatcher'];
}) {
  const [drag, setDrag] = useState(false);

  return (
    <label
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFile(f);
      }}
      className={`flex aspect-video cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors ${
        drag ? 'border-olive bg-olive/5' : 'border-border bg-muted/30'
      }`}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      {preview ? (
        <div className="relative h-full w-full">
          <img src={preview} alt="upload" className="h-full w-full rounded-2xl object-cover" />
          {analyzing && (
            <div className="absolute inset-0 grid place-items-center rounded-2xl bg-background/70 text-sm font-medium">
              {t.analyzing}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2 p-8 text-center">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{t.dropHere}</p>
        </div>
      )}
    </label>
  );
}
