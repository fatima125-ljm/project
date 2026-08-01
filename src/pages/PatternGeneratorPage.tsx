import { useState } from 'react';
import {
  Wand2,
  Copy,
  Check,
  Clock,
  Package,
  Layers,
  Gauge,
  Download,
  Heart,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  BookOpen,
  Lightbulb,
  Flag,
  Scissors,
  Type,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { AdSlot } from '@/components/AdSlot';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/Reveal';

interface GeneratedPattern {
  title: string;
  titleAr: string;
  difficulty: string;
  difficultyAr: string;
  hours: number;
  yarnEstimate: string;
  yarnEstimateAr: string;
  hookSize: string;
  materials: string[];
  materialsAr: string[];
  steps: string[];
  stepsAr: string[];
  finishing: string[];
  finishingAr: string[];
  tips: string[];
  tipsAr: string[];
}

interface GenOptions {
  projectType: string;
  skillLevel: number;
  yarnType: number;
  hookSize: number;
  patternLanguage: number;
  customPrompt: string;
}

const projectData: Record<
  string,
  { hours: number; yarnMeters: number; baseSteps: string[]; baseStepsAr: string[] }
> = {
  bag: {
    hours: 6,
    yarnMeters: 320,
    baseSteps: [
      'Chain 41 (or any odd number for your desired width).',
      'Row 1: Single crochet (sc) in the 2nd chain from hook and each chain across. (40)',
      'Row 2: Chain 1, turn. Sc in each stitch across.',
      'Repeat Row 2 until the panel measures your desired height.',
      'Fold the panel in half and slip stitch or single crochet the side seams closed.',
      'Attach handles: chain 60, slip stitch to attach at each top corner.',
      'Fasten off and weave in all ends with a tapestry needle.',
    ],
    baseStepsAr: [
      'اعمل سلسلة 41 (أو أي رقم فردي للعرض المطلوب).',
      'الصف 1: غرزة فردية في السلسلة الثانية وفي كل سلسلة. (40)',
      'الصف 2: سلسلة 1، استدر. غرزة فردية في كل غرزة.',
      'كرر الصف 2 حتى يقيس المقطع الارتفاع المطلوب.',
      'اطوِ المقطع نصفين واعمل غرزة منزلقة على الجوانب.',
      'أضف المقبض: 60 سلسلة، غرزة منزلقة في كل زاوية علوية.',
      'اقطع الخيط واخفّ كل الأطراف بإبرة الخياطة.',
    ],
  },
  amigurumi: {
    hours: 9,
    yarnMeters: 180,
    baseSteps: [
      'Make a magic ring (mr), chain 1 to secure.',
      'Round 1: 6 single crochet (sc) into the ring. Pull tail to close. (6)',
      'Round 2: 2 sc in each stitch around. (12)',
      'Round 3: [1 sc, 2 sc in next] x6. (18)',
      'Continue increasing per pattern until the body reaches desired size.',
      'Stuff firmly with polyfill, shaping as you go.',
      'Close the opening, weave in ends, and add eyes or embroidery details.',
    ],
    baseStepsAr: [
      'اصنع حلقة سحرية، واعمل سلسلة واحدة للتثبيت.',
      'الجولة 1: 6 غرز فردية داخل الحلقة. اسحب الطرف للإغلاق. (6)',
      'الجولة 2: غرزتان فرديتان في كل غرزة. (12)',
      'الجولة 3: [غرزة فردية، غرزتان في التالية] × 6. (18)',
      'استمر في الزيادة حسب النمط حتى يصل الجسم للحجم المطلوب.',
      'احشو بإحكام مع البولي فيل، وشكّل أثناء الحشو.',
      'أغلق الفتحة، اخفّ الأطراف، وأضف العيون أو تفاصيل التطريز.',
    ],
  },
  blanket: {
    hours: 24,
    yarnMeters: 1400,
    baseSteps: [
      'Chain a multiple of 3 + 2 for the turning chain.',
      'Row 1: Work double crochet (dc) in the 4th chain from hook and each chain across.',
      'Row 2: Chain 3, turn. Dc in each stitch across.',
      'Repeat Row 2 until the blanket measures your target length.',
      'Fasten off and weave in all ends with a tapestry needle.',
      'Optional: add a single-crochet border for a clean, finished edge.',
    ],
    baseStepsAr: [
      'اعمل سلسلة بمضاعفات 3 + 2 لسلسلة الدوران.',
      'الصف 1: اعمل غرزة مزدوجة في السلسلة الرابعة وفي كل سلسلة.',
      'الصف 2: 3 سلاسل، استدر. غرزة مزدوجة في كل غرزة.',
      'كرر الصف 2 حتى تصل البطانية للطول المطلوب.',
      'اقطع الخيط واخفّ كل الأطراف بإبرة الخياطة.',
      'اختياري: أضف حدودًا بغرزة فردية لحافة نظيفة.',
    ],
  },
  hat: {
    hours: 5,
    yarnMeters: 200,
    baseSteps: [
      'Chain 60 and join with a slip stitch to form a ring, being careful not to twist.',
      'Round 1: Chain 2, half double crochet (hdc) in each stitch around. (60)',
      'Rounds 2–8: Chain 2, turn. Hdc in each stitch around.',
      'Round 9: [Hdc in next 8, hdc2tog] x6 to begin decreasing. (54)',
      'Continue decreasing every round until 12 stitches remain.',
      'Cut yarn, thread through remaining stitches, pull tight, and fasten off.',
      'Weave in all ends with a tapestry needle.',
    ],
    baseStepsAr: [
      'اعمل سلسلة 60 ووصلة بغرزة منزلقة لتكوين حلقة، مع تجنب الالتواء.',
      'الجولة 1: سلسلتان، نصف غرزة مزدوجة في كل غرزة. (60)',
      'الجولات 2–8: سلسلتان، استدر. نصف غرزة مزدوجة في كل غرزة.',
      'الجولة 9: [نصف مزدوجة في 8، تنقيص] × 6 لبدء التنقيص. (54)',
      'استمر في التنقيص كل جولة حتى تبقى 12 غرزة.',
      'اقطع الخيط، مرره عبر الغرز المتبقية، شدّ، واقطع.',
      'اخفّ كل الأطراف بإبرة الخياطة.',
    ],
  },
  scarf: {
    hours: 4,
    yarnMeters: 250,
    baseSteps: [
      'Chain 26 for a standard scarf width.',
      'Row 1: Single crochet (sc) in the 2nd chain from hook and each chain across. (25)',
      'Row 2: Chain 1, turn. Sc in each stitch across.',
      'Repeat Row 2 until the scarf measures your desired length (approx. 150 cm).',
      'Fasten off and weave in all ends with a tapestry needle.',
      'Optional: add fringe by attaching 15 cm yarn strands to each short end.',
    ],
    baseStepsAr: [
      'اعمل سلسلة 26 لعرض وشاح قياسي.',
      'الصف 1: غرزة فردية في السلسلة الثانية وفي كل سلسلة. (25)',
      'الصف 2: سلسلة 1، استدر. غرزة فردية في كل غرزة.',
      'كرر الصف 2 حتى يقيس الوشاح الطول المطلوب (حوالي 150 سم).',
      'اقطع الخيط واخفّ كل الأطراف بإبرة الخياطة.',
      'اختياري: أضف شراشب بتثبيت خيوط بطول 15 سم على كل طرف.',
    ],
  },
  basket: {
    hours: 3,
    yarnMeters: 150,
    baseSteps: [
      'Make a magic ring (mr), chain 1 to secure.',
      'Round 1: 8 single crochet (sc) into the ring. Pull tail to close. (8)',
      'Round 2: 2 sc in each stitch around. (16)',
      'Round 3: [1 sc, 2 sc in next] x8. (24)',
      'Rounds 4–6: Sc in each stitch around, working in back loops only for a defined base edge.',
      'Round 7+: Sc in each stitch around, working through both loops to build the walls.',
      'Continue until the basket reaches your desired height, then fasten off and weave in ends.',
    ],
    baseStepsAr: [
      'اصنع حلقة سحرية، واعمل سلسلة واحدة للتثبيت.',
      'الجولة 1: 8 غرز فردية داخل الحلقة. اسحب الطرف للإغلاق. (8)',
      'الجولة 2: غرزتان فرديتان في كل غرزة. (16)',
      'الجولة 3: [غرزة فردية، غرزتان في التالية] × 8. (24)',
      'الجولات 4–6: غرزة فردية في كل غرزة، بالعمل في الخلف فقط لحافة قاعدة محددة.',
      'الجولة 7+: غرزة فردية في كل غرزة، بالعمل عبر الحلقتين لبناء الجدران.',
      'استمر حتى تصل السلة للارتفاع المطلوب، ثم اقطع واخفّ الأطراف.',
    ],
  },
};

const projectTitles: Record<string, { en: string; ar: string }> = {
  bag: { en: 'Handmade Crochet Bag', ar: 'حقيبة كروشيه مصنوعة يدويًا' },
  amigurumi: { en: 'Cute Amigurumi Friend', ar: 'صديق أميغورومي لطيف' },
  blanket: { en: 'Cozy Crochet Blanket', ar: 'بطانية كروشيه دافئة' },
  hat: { en: 'Warm Crochet Hat', ar: 'قبعة كروشيه دافئة' },
  scarf: { en: 'Soft Crochet Scarf', ar: 'وشاح كروشيه ناعم' },
  basket: { en: 'Sturdy Crochet Basket', ar: 'سلة كروشيه متينة' },
};

function generatePattern(opts: GenOptions): GeneratedPattern {
  const data = projectData[opts.projectType] ?? projectData.bag;
  const titles = projectTitles[opts.projectType] ?? projectTitles.bag;
  const skillMultiplier = 1 + opts.skillLevel * 0.4;
  const hours = Math.round(data.hours * skillMultiplier);
  const yarnMeters = Math.round(data.yarnMeters * (1 + opts.skillLevel * 0.15));

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const difficultiesAr = ['مبتدئ', 'متوسط', 'متقدم'];
  const difficulty = difficulties[opts.skillLevel];
  const difficultyAr = difficultiesAr[opts.skillLevel];

  const yarnTypes = ['Cotton', 'Acrylic', 'Wool', 'DK', 'Worsted', 'Bulky'];
  const yarnTypesAr = ['قطن', 'أكريليك', 'صوف', 'DK', 'Worsted', 'سميك'];
  const yarnType = yarnTypes[opts.yarnType];
  const yarnTypeAr = yarnTypesAr[opts.yarnType];

  const hookSizes = ['2.5mm', '3.0mm', '3.5mm', '4.0mm', '5.0mm', '6.0mm'];
  const hookSize = hookSizes[opts.hookSize];

  const materials = [
    `${yarnType} yarn (${yarnMeters} m)`,
    `${hookSize} crochet hook`,
    'Stitch markers',
    'Tapestry needle',
    'Scissors',
    opts.projectType === 'amigurumi' ? 'Polyfill stuffing' : 'Measuring tape',
  ];
  const materialsAr = [
    `خيط ${yarnTypeAr} (${yarnMeters} م)`,
    `إبرة كروشيه ${hookSize}`,
    'علامات غرز',
    'إبرة خياطة',
    'مقص',
    opts.projectType === 'amigurumi' ? 'حشوة بولي فيل' : 'شريط قياس',
  ];

  return {
    title: titles.en,
    titleAr: titles.ar,
    difficulty,
    difficultyAr,
    hours,
    yarnEstimate: `${yarnMeters} m of ${yarnType}`,
    yarnEstimateAr: `${yarnMeters} م من ${yarnTypeAr}`,
    hookSize,
    materials,
    materialsAr,
    steps: data.baseSteps,
    stepsAr: data.baseStepsAr,
    finishing: [
      'Weave in all loose ends using a tapestry needle.',
      'Block the finished piece by dampening and pinning to shape.',
      'Inspect all seams and reinforce any loose joins.',
      'Add any final embellishments — buttons, embroidery, or appliqués.',
    ],
    finishingAr: [
      'اخفّ كل الأطراف السائبة بإبرة الخياطة.',
      'بلّل وثبّت القطعة النهائية بالدبابيس لتشكيلها.',
      'افحص كل الوصلات وعزّز أي وصلات فضفاضة.',
      'أضف أي لمسات نهائية — أزرار، تطريز، أو تطبيقات.',
    ],
    tips: [
      'Use stitch markers to mark the beginning of each round.',
      'Keep your tension consistent for an even fabric.',
      'Count your stitches at the end of every row or round.',
      'Weave in ends as you go to save time at the end.',
      'Block your finished piece for a polished, professional look.',
    ],
    tipsAr: [
      'استخدم علامات الغرز لتحديد بداية كل جولة.',
      'حافظ على ثبات شدّك للحصول على نسيج متساوٍ.',
      'عدّ غرزك في نهاية كل صف أو جولة.',
      'اخفّ الأطراف أثناء العمل لتوفير الوقت في النهاية.',
      'بلّل وثبّت قطعتك النهائية لمظهر احترافي مصقول.',
    ],
  };
}

function buildPatternText(p: GeneratedPattern, t: typeof dict.pattern, useAr: boolean): string {
  const lines: string[] = [];
  lines.push(useAr ? p.titleAr : p.title);
  lines.push('');
  lines.push(`${t.difficulty}: ${useAr ? p.difficultyAr : p.difficulty}`);
  lines.push(`${t.estimatedTime}: ${p.hours}h`);
  lines.push(`${t.yarnQuantity}: ${useAr ? p.yarnEstimateAr : p.yarnEstimate}`);
  lines.push(`${t.hookSizeLabel}: ${p.hookSize}`);
  lines.push('');
  lines.push(t.materials);
  (useAr ? p.materialsAr : p.materials).forEach((m) => lines.push(`  - ${m}`));
  lines.push('');
  lines.push(t.abbreviations);
  const abbrs = useAr ? t.abbreviationsListAr : t.abbreviationsList;
  abbrs.forEach((a) => lines.push(`  ${a.abbr} = ${a.meaning}`));
  lines.push('');
  lines.push(t.instructions);
  (useAr ? p.stepsAr : p.steps).forEach((s, i) => lines.push(`  ${i + 1}. ${s}`));
  lines.push('');
  lines.push(t.finishing);
  (useAr ? p.finishingAr : p.finishing).forEach((s) => lines.push(`  - ${s}`));
  lines.push('');
  lines.push(t.tips);
  (useAr ? p.tipsAr : p.tips).forEach((s) => lines.push(`  - ${s}`));
  return lines.join('\n');
}

// minimal PDF builder — prints the pattern text into a downloadable PDF
function downloadPdf(p: GeneratedPattern, t: typeof dict.pattern, useAr: boolean) {
  const text = buildPatternText(p, t, useAr);
  const isRtl = useAr;
  const blob = new Blob(
    [
      `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length ${text.length + 200} >>
stream
BT
/F1 11 Tf
50 790 Td
14 TL
${isRtl ? '0.85 0 0 0.85 545 0 Tm' : ''}
${text
  .split('\n')
  .map((line) => `(${line.replace(/[()\\]/g, '\\$&')}) Tj`)
  .join('\nT*\n')}
T*
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000266 00000 n 
0000000335 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
${text.length + 600}
%%EOF`,
    ],
    { type: 'application/pdf' },
  );
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${useAr ? p.titleAr : p.title}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
}

export function PatternGeneratorPage() {
  const { dict, locale } = useI18n();
  const t = dict.pattern;
  const { user } = useAuth();

  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState('');
  const [skillLevel, setSkillLevel] = useState(0);
  const [yarnType, setYarnType] = useState(0);
  const [hookSize, setHookSize] = useState(3);
  const [patternLang, setPatternLang] = useState(locale === 'ar' ? 1 : 0);
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [pattern, setPattern] = useState<GeneratedPattern | null>(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const useAr = patternLang === 1;

  const canProceedStep1 = !!projectType;

  const run = () => {
    setLoading(true);
    setPattern(null);
    setSaved(false);
    setTimeout(() => {
      setPattern(
        generatePattern({
          projectType,
          skillLevel,
          yarnType,
          hookSize,
          patternLanguage: patternLang,
          customPrompt,
        }),
      );
      setLoading(false);
      setStep(2);
    }, 900);
  };

  const copy = () => {
    if (!pattern) return;
    navigator.clipboard.writeText(buildPatternText(pattern, t, useAr));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const saveToFavorites = async () => {
    if (!pattern || !user) return;
    setSaving(true);
    const { error } = await supabase.from('saved_patterns').insert({
      project_type: projectType,
      skill_level: t.skillLevels[skillLevel],
      yarn_type: t.yarnTypes[yarnType],
      hook_size: t.hookSizes[hookSize],
      pattern_language: t.patternLanguages[patternLang],
      custom_prompt: customPrompt || null,
      pattern_data: pattern as unknown as Record<string, unknown>,
    });
    setSaving(false);
    if (!error) setSaved(true);
  };

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

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Progress bar */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {[0, 1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full text-sm font-semibold transition-all ${
                  s <= step
                    ? 'bg-olive text-cream'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                {s + 1}
              </span>
              {s < 2 && <span className={`h-0.5 w-12 rounded ${s < step ? 'bg-olive' : 'bg-border'}`} />}
            </div>
          ))}
        </div>

        {/* ── Step 1: Project type ── */}
        {step === 0 && (
          <Reveal>
            <div className="surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{t.step1Title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.step1Subtitle}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {t.projectTypes.map((pt) => (
                  <button
                    key={pt.key}
                    onClick={() => setProjectType(pt.key)}
                    className={`group flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-all ${
                      projectType === pt.key
                        ? 'border-olive bg-olive/5 shadow-lift'
                        : 'border-border bg-card hover:border-olive/40 hover:bg-secondary/40'
                    }`}
                  >
                    <span className="text-4xl transition-transform group-hover:scale-110">{pt.emoji}</span>
                    <span className="text-sm font-semibold">{pt.label}</span>
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <Button onClick={() => setStep(1)} disabled={!canProceedStep1}>
                  {t.next}
                  <ChevronRight className="h-4 w-4 rtl:rotate-180" />
                </Button>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Step 2: Customize ── */}
        {step === 1 && (
          <Reveal>
            <div className="surface p-6 sm:p-8">
              <h2 className="text-xl font-semibold">{t.step2Title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{t.step2Subtitle}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <SelectField label={t.skillLevel} value={skillLevel} onChange={setSkillLevel} options={t.skillLevels} />
                <SelectField label={t.yarnType} value={yarnType} onChange={setYarnType} options={t.yarnTypes} />
                <SelectField label={t.hookSize} value={hookSize} onChange={setHookSize} options={t.hookSizes} />
                <SelectField label={t.patternLanguage} value={patternLang} onChange={setPatternLang} options={t.patternLanguages} />
              </div>

              <div className="mt-6">
                <label className="text-sm font-semibold">{t.customPrompt}</label>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder={t.customPromptPlaceholder}
                  rows={3}
                  className="mt-2 w-full resize-none rounded-2xl border border-input bg-background p-4 text-sm outline-none focus:border-olive/50"
                />
              </div>

              <div className="mt-8 flex items-center justify-between">
                <Button variant="ghost" onClick={() => setStep(0)}>
                  <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                  {t.back}
                </Button>
                <Button onClick={run} disabled={loading}>
                  <Wand2 className="h-4 w-4" />
                  {loading ? t.generating : t.generate}
                </Button>
              </div>
            </div>
          </Reveal>
        )}

        {/* ── Step 3: Result ── */}
        {step === 2 && (
          <>
            {loading ? (
              <div className="surface grid min-h-64 place-items-center p-6">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <div className="h-10 w-10 animate-spin rounded-full border-2 border-border border-t-olive" />
                  <p className="text-sm">{t.generating}</p>
                </div>
              </div>
            ) : pattern ? (
              <Reveal>
                <div className="surface p-6 sm:p-8">
                  {/* Header + actions */}
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-medium text-olive">{t.patternFor} {useAr ? pattern.titleAr : pattern.title}</span>
                      <h2 className="mt-1 text-2xl font-semibold">{useAr ? pattern.titleAr : pattern.title}</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="ghost" size="sm" onClick={copy}>
                        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                        {copied ? t.copied : t.copy}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => downloadPdf(pattern, t, useAr)}>
                        <Download className="h-4 w-4" />
                        {t.downloadPdf}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={saveToFavorites}
                        disabled={!user || saving || saved}
                      >
                        {saved ? (
                          <Check className="h-4 w-4 text-success" />
                        ) : (
                          <Heart className={`h-4 w-4 ${saved ? 'fill-olive text-olive' : ''}`} />
                        )}
                        {saved ? t.saved : user ? t.saveToFavorites : t.signInToSave}
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <Stat icon={Gauge} label={t.difficulty} value={useAr ? pattern.difficultyAr : pattern.difficulty} />
                    <Stat icon={Clock} label={t.estimatedTime} value={`${pattern.hours}h`} />
                    <Stat icon={Package} label={t.yarnQuantity} value={useAr ? pattern.yarnEstimateAr : pattern.yarnEstimate} />
                    <Stat icon={Type} label={t.hookSizeLabel} value={pattern.hookSize} />
                  </div>

                  {/* Materials */}
                  <Section icon={Layers} title={t.materials}>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {(useAr ? pattern.materialsAr : pattern.materials).map((m) => (
                        <li key={m} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-olive" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  {/* Abbreviations */}
                  <Section icon={BookOpen} title={t.abbreviations}>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {(useAr ? t.abbreviationsListAr : t.abbreviationsList).map((a) => (
                        <div key={a.abbr} className="flex items-center gap-2 text-sm">
                          <code className="rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground">
                            {a.abbr}
                          </code>
                          <span className="text-muted-foreground">{a.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </Section>

                  {/* Instructions */}
                  <Section icon={Wand2} title={t.instructions}>
                    <ol className="space-y-3">
                      {(useAr ? pattern.stepsAr : pattern.steps).map((s, i) => (
                        <li key={i} className="flex gap-3 text-sm leading-relaxed">
                          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-olive/10 text-xs font-semibold text-olive">
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{s}</span>
                        </li>
                      ))}
                    </ol>
                  </Section>

                  {/* Finishing */}
                  <Section icon={Flag} title={t.finishing}>
                    <ul className="space-y-2">
                      {(useAr ? pattern.finishingAr : pattern.finishing).map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Scissors className="mt-0.5 h-3.5 w-3.5 shrink-0 text-olive" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  {/* Tips */}
                  <Section icon={Lightbulb} title={t.tips}>
                    <ul className="space-y-2">
                      {(useAr ? pattern.tipsAr : pattern.tips).map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sage" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </Section>

                  {/* Footer actions */}
                  <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
                    <Button variant="ghost" onClick={() => setStep(0)}>
                      <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                      {t.back}
                    </Button>
                    <Button onClick={run} disabled={loading}>
                      <Wand2 className="h-4 w-4" />
                      {t.regenerate}
                    </Button>
                  </div>
                </div>
              </Reveal>
            ) : null}
          </>
        )}

        <div className="mt-12">
          <AdSlot />
        </div>
      </section>
    </>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => onChange(i)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              value === i
                ? 'border-olive bg-olive text-cream'
                : 'border-border bg-card text-muted-foreground hover:border-olive/40 hover:bg-secondary/40'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
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

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Clock;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-8 border-t border-border pt-6">
      <h3 className="flex items-center gap-2 text-sm font-semibold">
        <Icon className="h-4 w-4 text-olive" />
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
