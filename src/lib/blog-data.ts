export interface BlogPost {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  image: string;
}

const ph = (id: number, w = 1000, h = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const blogPosts: BlogPost[] = [
  {
    id: 'yarn-weights-explained',
    date: '2026-06-14',
    dateLabel: 'Jun 14, 2026',
    title: 'Yarn weights explained, from lace to jumbo',
    titleAr: 'شرح أوزان الخيوط، من الرفيع إلى الضخم',
    excerpt: 'Choosing the right weight changes drape, size and yarn usage. Here is a simple map.',
    excerptAr: 'اختيار الوزن المناسب يغيّر الانسدال والحجم واستهلاك الخيط. إليك خريطة بسيطة.',
    image: ph(37102283),
  },
  {
    id: 'neutral-palettes',
    date: '2026-05-30',
    dateLabel: 'May 30, 2026',
    title: 'Five neutral palettes that always work',
    titleAr: 'خمس لوحات محايدة تنجح دائمًا',
    excerpt: 'Beige, cream and olive combinations that photograph beautifully.',
    excerptAr: 'تركيبات البيج والكريمي والزيتوني التي تظهر بشكل جميل في الصور.',
    image: ph(3693230),
  },
  {
    id: 'amigurumi-tension',
    date: '2026-05-12',
    dateLabel: 'May 12, 2026',
    title: 'Amigurumi tension: stop the stuffing show',
    titleAr: 'شد الأميغورومي: أوقف ظهور الحشو',
    excerpt: 'Tight, even stitches are everything. Three drills to fix loose rounds.',
    excerptAr: 'الغرز المشدودة والمتساوية هي كل شيء. ثلاثة تمارين لإصلاح الجولات الرخوة.',
    image: ph(12109904),
  },
  {
    id: 'estimate-yarn-blanket',
    date: '2026-04-28',
    dateLabel: 'Apr 28, 2026',
    title: 'How to estimate yarn for a blanket',
    titleAr: 'كيف تقدّر كمية الخيط للبطانية',
    excerpt: 'A swatch, a scale and a little math give you a reliable number.',
    excerptAr: 'عينة وميزان وقليل من الرياضيات تمنحك رقمًا موثوقًا.',
    image: ph(6463348),
  },
];
