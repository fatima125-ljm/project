import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { Button } from '@/components/ui/Button';

interface Msg {
  role: 'user' | 'bot';
  text: string;
}

const rules: { match: string[]; en: string; ar: string }[] = [
  {
    match: ['magic ring', 'حلقة سحرية', 'حلقة'],
    en: 'A magic ring: loop yarn around your fingers, pull up a loop and chain 1 to lock. Work your first round into the ring, then pull the tail to close. Great for amigurumi.',
    ar: 'الحلقة السحرية: لفّ الخيط حول أصابعك، اسحب حلقة واعمل غرزة سلسلة واحدة لتثبيتها. اعمل الجولة الأولى داخل الحلقة، ثم اسحب الطرف للإغلاق. ممتازة للأميغورومي.',
  },
  {
    match: ['tension', 'شد', 'tight', 'رخو'],
    en: 'For even tension, hold the yarn consistently and relax your grip. Practice swatches until stitches look uniform. For amigurumi, go down a hook size so stuffing does not show.',
    ar: 'للشدّ المتساوي، أمسك الخيط بشكل ثابت وارخِ قبضتك. تدرّب على العينات حتى تبدو الغرز موحدة. للأميغورومي، استخدم إبرة أصغر حتى لا يظهر الحشو.',
  },
  {
    match: ['hook size', 'مقاس الإبرة', 'إبرة', 'hook'],
    en: 'Match hook to yarn weight: 2.5mm for lace/fingering, 3.5mm for DK, 5mm for worsted, 6-8mm for bulky. Check the yarn label first.',
    ar: 'طابق الإبرة مع وزن الخيط: 2.5مم للرفيع، 3.5مم لـ DK، 5مم للمتوسط، 6-8مم للسميك. تحقق من ملصق الخيط أولًا.',
  },
  {
    match: ['single crochet', 'غرزة فردية', 'نقصة'],
    en: 'Single crochet (US): insert hook, yarn over, pull up a loop (2 loops on hook), yarn over, pull through both loops. Compact and sturdy.',
    ar: 'الغرزة الفردية: أدخل الإبرة، لفّ الخيط، اسحب حلقة (حلقتان على الإبرة)، لفّ الخيط، اسحب عبر الحلقتين. مدمجة وقوية.',
  },
  {
    match: ['double crochet', 'غرزة مزدوجة', 'عمود'],
    en: 'Double crochet (US): yarn over, insert hook, yarn over, pull up loop (3 on hook), yarn over pull through 2 (2 left), yarn over pull through last 2. Tall and quick.',
    ar: 'الغرزة المزدوجة: لفّ الخيط، أدخل الإبرة، لفّ، اسحب حلقة (3 على الإبرة)، لفّ واسحب عبر 2، لفّ واسحب عبر الأخيرتين. طويلة وسريعة.',
  },
  {
    match: ['yarn', 'خيط', 'weight', 'وزن'],
    en: 'Common weights: lace, fingering, DK, worsted, bulky, jumbo. Lighter weight = finer fabric and more drape; heavier = faster and warmer.',
    ar: 'الأوزان الشائعة: رفيع، fingering، DK، متوسط، سميك، ضخم. الوزن الأخف = نسيج أدق وانسدال أفضل؛ الأثقل = أسرع وأدفأ.',
  },
  {
    match: ['granny square', 'مربع', 'granny'],
    en: 'Granny square: start with a magic ring, work 3-ch clusters separated by 1-ch spaces into each corner. Add rounds by working clusters into corners.',
    ar: 'مربع الغراني: ابدأ بحلقة سحرية، اعمل عناقيد 3 سلاسل مفصولة بمسافة سلسلة واحدة في كل زاوية. أضف جولات بالعمل في الزوايا.',
  },
  {
    match: ['mistake', 'خطأ', 'fix', 'إصلاح', 'frog'],
    en: 'To fix a mistake, "frog" (rip out) back to the error row, or use a stitch marker and tink (undo one stitch at a time). Count stitches each round to catch errors early.',
    ar: 'لإصلاح خطأ، فكّ حتى صف الخطأ، أو استخدم علامة غرزة وتراجع غرزة بغرزة. اعدّ الغرز كل جولة لاكتشاف الأخطاء مبكرًا.',
  },
];

function answer(q: string, locale: 'en' | 'ar'): string {
  const t = q.toLowerCase();
  const ar = locale === 'ar';
  for (const r of rules) {
    if (r.match.some((m) => t.includes(m))) return ar ? r.ar : r.en;
  }
  return ar
    ? 'اسألني عن الغرز (الفردية، المزدوجة، الحلقة السحرية)، أو الشدّ، أو مقاس الإبرة، أو اختيار الخيط، أو إصلاح الأخطاء.'
    : 'Ask me about stitches (single, double, magic ring), tension, hook size, choosing yarn, or fixing mistakes.';
}

export function AssistantButton() {
  const { dict, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [thinking, setThinking] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{ role: 'bot', text: dict.assistant.greeting }]);
    }
  }, [open, msgs.length, dict.assistant.greeting]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, thinking]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setThinking(true);
    timerRef.current = setTimeout(() => {
      setMsgs((m) => [...m, { role: 'bot', text: answer(q, locale) }]);
      setThinking(false);
    }, 600);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.assistant.title}
        aria-expanded={open}
        aria-controls="assistant-panel"
        className="fixed bottom-5 end-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}
      </button>

      {open && (
        <div
          id="assistant-panel"
          role="dialog"
          aria-label={dict.assistant.title}
          className="fixed bottom-24 end-5 z-50 flex h-[28rem] max-h-[calc(100vh-8rem)] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl animate-scale-in"
        >
          <div className="border-b border-border px-5 py-4">
            <h3 className="font-display text-base font-semibold">{dict.assistant.title}</h3>
            <p className="text-xs text-muted-foreground">{dict.assistant.subtitle}</p>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto scrollbar-thin px-4 py-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-be-md'
                      : 'bg-secondary text-secondary-foreground rounded-bs-md'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bs-md bg-secondary px-3.5 py-2.5 text-sm text-muted-foreground">
                  {dict.assistant.thinking}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder={dict.assistant.placeholder}
                aria-label={dict.assistant.placeholder}
                className="h-10 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
              />
              <Button size="icon" onClick={send} aria-label={dict.assistant.send}>
                <Send className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
