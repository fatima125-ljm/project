import { useState } from 'react';
import { Wand2, Copy, Check, Clock, Package, Layers, Gauge } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { AdSlot } from '@/components/AdSlot';
import { Button } from '@/components/ui/Button';

interface Pattern {
  materials: string[];
  materialsAr: string[];
  difficulty: string;
  difficultyAr: string;
  hours: number;
  yarnEstimate: string;
  steps: string[];
}

function generate(input: string, locale: 'en' | 'ar'): Pattern {
  const q = input.toLowerCase();
  const ar = locale === 'ar';

  let difficulty = 'Beginner';
  let difficultyAr = 'مبتدئ';
  let hours = 6;
  if (/intermediate|متوسط/.test(q)) {
    difficulty = 'Intermediate';
    difficultyAr = 'متوسط';
    hours = 12;
  }
  if (/advanced|متقدم|complex|معقد/.test(q)) {
    difficulty = 'Advanced';
    difficultyAr = 'متقدم';
    hours = 24;
  }

  const isAmigurumi = /amigurumi|أميغورومي|bunny|أرنب|toy|لعبة|plush/.test(q);
  const isBlanket = /blanket|بطانية|throw|afghan|granny/.test(q);

  const hook = isAmigurumi ? '3.0mm' : isBlanket ? '5.0mm' : '4.0mm';
  const yarn = isAmigurumi ? 'DK cotton' : isBlanket ? 'Worsted acrylic' : 'Worsted cotton';
  const yarnMeters = isAmigurumi ? '180' : isBlanket ? '1400' : '320';

  const stepsEn = isAmigurumi
    ? [
        'Make a magic ring, chain 1 to secure.',
        'Round 1: 6 single crochet (sc) into the ring. Pull tail to close. (6)',
        'Round 2: 2 sc in each stitch around. (12)',
        'Round 3: [1 sc, 2 sc in next] x6. (18)',
        'Continue increasing per pattern until the body reaches desired size.',
        'Stuff firmly with polyfill.',
        'Close opening and weave in ends. Add eyes and embroidery details.',
      ]
    : isBlanket
    ? [
        'Chain a multiple of 3 + 2 for the turning chain.',
        'Row 1: Work double crochet (dc) in the 4th chain from hook and each chain across.',
        'Row 2: Chain 3, turn. Dc in each stitch across.',
        'Repeat Row 2 until the blanket measures your target length.',
        'Fasten off and weave in all ends.',
        'Optional: add a single-crochet border for a clean edge.',
      ]
    : [
        'Chain 41 (or any odd number for your width).',
        'Row 1: Single crochet (sc) in the 2nd chain from hook and each chain across. (40)',
        'Row 2: Chain 1, turn. Sc in each stitch across.',
        'Repeat Row 2 until the panel measures your desired height.',
        'Fold panel in half, slip stitch or single crochet the side seams.',
        'Attach handles: chain 60, slip stitch to attach at each top corner.',
        'Fasten off and weave in ends.',
      ];

  const stepsAr = isAmigurumi
    ? [
        'اصنع حلقة سحرية، واعمل سلسلة واحدة للتثبيت.',
        'الجولة 1: 6 غرز فردية داخل الحلقة. اسحب الطرف للإغلاق. (6)',
        'الجولة 2: غرزتان فرديتان في كل غرزة. (12)',
        'الجولة 3: [غرزة فردية، غرزتان في التالية] × 6. (18)',
        'استمر في الزيادة حسب النمط حتى يصل الجسم للحجم المطلوب.',
        'احشو بإحكام مع البولي فيل.',
        'أغلق الفتحة واخفّ الأطراف. أضف العيون وتفاصيل التطريز.',
      ]
    : isBlanket
    ? [
        'اعمل سلسلة بمضاعفات 3 + 2 لسلسلة الدوران.',
        'الصف 1: اعمل غرزة مزدوجة في السلسلة الرابعة وفي كل سلسلة.',
        'الصف 2: 3 سلاسل، استدر. غرزة مزدوجة في كل غرزة.',
        'كرر الصف 2 حتى تصل البطانية للطول المطلوب.',
        'اقطع الخيط واخفّ كل الأطراف.',
        'اختياري: أضف حدودًا بغرزة فردية لحافة نظيفة.',
      ]
    : [
        'اعمل سلسلة 41 (أو أي رقم فردي للعرض المطلوب).',
        'الصف 1: غرزة فردية في السلسلة الثانية وفي كل سلسلة. (40)',
        'الصف 2: سلسلة 1، استدر. غرزة فردية في كل غرزة.',
        'كرر الصف 2 حتى يقيس المقطع الارتفاع المطلوب.',
        'اطوِ المقطع نصفين، واعمل غرزة منزلقة على الجوانب.',
        'أضف المقبض: 60 سلسلة، غرزة منزلقة في كل زاوية علوية.',
        'اقطع الخيط واخفّ الأطراف.',
      ];

  return {
    materials: [
      `${yarn} yarn (${yarnMeters} m)`,
      `${hook} crochet hook`,
      'Stitch markers',
      'Tapestry needle',
      'Scissors',
    ],
    materialsAr: [
      `خيط ${yarn} (${yarnMeters} م)`,
      `إبرة كروشيت ${hook}`,
      'علامات غرز',
      'إبرة خياطة',
      'مقص',
    ],
    difficulty,
    difficultyAr,
    hours,
    yarnEstimate: `${yarnMeters} m of ${yarn}`,
    steps: ar ? stepsAr : stepsEn,
  };
}

export function PatternGeneratorPage() {
  const { dict, locale } = useI18n();
  const t = dict.pattern;
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [pattern, setPattern] = useState<Pattern | null>(null);
  const [copied, setCopied] = useState(false);

  const run = (text: string) => {
    const q = text.trim();
    if (!q) return;
    setPrompt(q);
    setLoading(true);
    setPattern(null);
    setTimeout(() => {
      setPattern(generate(q, locale));
      setLoading(false);
    }, 900);
  };

  const copy = () => {
    if (!pattern) return;
    const text = [
      `Materials: ${pattern.materials.join(', ')}`,
      `Difficulty: ${locale === 'ar' ? pattern.difficultyAr : pattern.difficulty}`,
      `Time: ${pattern.hours}h`,
      `Yarn: ${pattern.yarnEstimate}`,
      '',
      'Steps:',
      ...pattern.steps.map((s, i) => `${i + 1}. ${s}`),
    ].join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="surface p-6">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.placeholder}
              rows={5}
              className="w-full resize-none rounded-2xl border border-input bg-background p-4 text-sm outline-none focus:border-olive/50"
            />

            <div className="mt-4">
              <p className="text-xs font-medium text-muted-foreground">{t.examples}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {t.exampleList.map((ex) => (
                  <button
                    key={ex}
                    onClick={() => run(ex)}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={() => run(prompt)} disabled={!prompt.trim() || loading} className="mt-6 w-full sm:w-auto">
              <Wand2 className="h-4 w-4" />
              {loading ? t.generating : t.generate}
            </Button>
          </div>

          <div>
            {loading ? (
              <div className="surface grid h-full min-h-64 place-items-center p-6">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-olive" />
                  <p className="text-sm">{t.generating}</p>
                </div>
              </div>
            ) : pattern ? (
              <div className="surface p-6 animate-fade-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">{t.result}</h2>
                  <Button variant="ghost" size="sm" onClick={copy}>
                    {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    {copied ? t.copied : t.copy}
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  <Stat icon={Gauge} label={t.difficulty} value={locale === 'ar' ? pattern.difficultyAr : pattern.difficulty} />
                  <Stat icon={Clock} label={t.estimatedTime} value={`${pattern.hours}h`} />
                  <Stat icon={Package} label={t.yarnEstimate} value={pattern.yarnEstimate} />
                </div>

                <div className="mt-6">
                  <h3 className="flex items-center gap-2 text-sm font-semibold">
                    <Layers className="h-4 w-4 text-olive" />
                    {t.materials}
                  </h3>
                  <ul className="mt-2 grid gap-1.5 text-sm text-muted-foreground">
                    {(locale === 'ar' ? pattern.materialsAr : pattern.materials).map((m) => (
                      <li key={m} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm font-semibold">{t.steps}</h3>
                  <ol className="mt-2 space-y-3">
                    {pattern.steps.map((s, i) => (
                      <li key={i} className="flex gap-3 text-sm leading-relaxed">
                        <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-secondary text-xs font-semibold text-secondary-foreground">
                          {i + 1}
                        </span>
                        <span className="pt-0.5">{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ) : (
              <div className="surface grid h-full min-h-64 place-items-center p-6 text-center text-muted-foreground">
                <p className="text-sm">{t.subtitle}</p>
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

function Stat({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-muted/30 p-3">
      <Icon className="h-4 w-4 text-olive" />
      <p className="mt-2 text-[11px] text-muted-foreground">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}
