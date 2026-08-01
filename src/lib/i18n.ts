export type Locale = 'en' | 'ar';

export interface Dict {
  dir: 'ltr' | 'rtl';
  langName: string;
  nav: {
    home: string;
    colorMatcher: string;
    patternGenerator: string;
    gallery: string;
    library: string;
    community: string;
    blog: string;
    pricing: string;
    login: string;
    logout: string;
    account: string;
  };
  home: {
    badge: string;
    title: string;
    subtitle: string;
    startCreating: string;
    exploreInspiration: string;
    stats: { patterns: string; makers: string; palettes: string };
    featuresTitle: string;
    featuresSubtitle: string;
    features: {
      color: { title: string; desc: string };
      pattern: { title: string; desc: string };
      gallery: { title: string; desc: string };
      assistant: { title: string; desc: string };
    };
    galleryTitle: string;
    gallerySubtitle: string;
    explore: string;
    comingSoonTitle: string;
    comingSoonSubtitle: string;
    comingSoon: string[];
    ctaTitle: string;
    ctaSubtitle: string;
    whyTitle: string;
    whySubtitle: string;
    whyPoints: { title: string; desc: string }[];
    howTitle: string;
    howSubtitle: string;
    howSteps: { step: string; title: string; desc: string }[];
    testimonialsTitle: string;
    testimonialsSubtitle: string;
    testimonials: { quote: string; name: string; role: string }[];
    faqTitle: string;
    faqSubtitle: string;
    faqs: { q: string; a: string }[];
    ctaBadge: string;
    ctaButton: string;
    ctaSecondary: string;
  };
  colorMatcher: {
    title: string;
    subtitle: string;
    chooseFromPalette: string;
    uploadPhoto: string;
    dropHere: string;
    yourSelection: string;
    suggest: string;
    preview: string;
    suggested: string;
    harmonies: string;
    clear: string;
    add: string;
    analyzing: string;
    detectedColors: string;
  };
  pattern: {
    title: string;
    subtitle: string;
    generate: string;
    placeholder: string;
    examples: string;
    exampleList: string[];
    materials: string;
    difficulty: string;
    estimatedTime: string;
    yarnEstimate: string;
    steps: string;
    generating: string;
    result: string;
    copy: string;
    copied: string;
    step1Title: string;
    step1Subtitle: string;
    step2Title: string;
    step2Subtitle: string;
    step3Title: string;
    step3Subtitle: string;
    next: string;
    back: string;
    projectTypes: { key: string; label: string; emoji: string }[];
    skillLevel: string;
    skillLevels: string[];
    yarnType: string;
    yarnTypes: string[];
    hookSize: string;
    hookSizes: string[];
    patternLanguage: string;
    patternLanguages: string[];
    projectTitle: string;
    hookSizeLabel: string;
    yarnQuantity: string;
    abbreviations: string;
    abbreviationsList: { abbr: string; meaning: string }[];
    abbreviationsListAr: { abbr: string; meaning: string }[];
    instructions: string;
    finishing: string;
    tips: string;
    tipsList: string[];
    tipsListAr: string[];
    downloadPdf: string;
    saveToFavorites: string;
    saved: string;
    signInToSave: string;
    patternFor: string;
    customPrompt: string;
    customPromptPlaceholder: string;
    regenerate: string;
  };
  gallery: {
    title: string;
    subtitle: string;
    category: string;
    difficulty: string;
    color: string;
    all: string;
    categories: string[];
    difficulties: string[];
    colors: string[];
    save: string;
    saved: string;
    noResults: string;
    hours: string;
  };
  library: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    categories: string[];
    difficulties: string[];
    sort: string;
    sortOptions: string[];
    results: string;
    noResults: string;
    free: string;
    premium: string;
    hours: string;
    viewPattern: string;
    loading: string;
  };
  patternDetail: {
    materials: string;
    yarnRecommendations: string;
    hookSize: string;
    finishedSize: string;
    difficulty: string;
    description: string;
    estimatedTime: string;
    yarnType: string;
    saveToFavorites: string;
    saved: string;
    signInToSave: string;
    downloadPdf: string;
    sharePattern: string;
    shareCopied: string;
    back: string;
    relatedPatterns: string;
    favorites: string;
  };
  community: {
    title: string;
    subtitle: string;
    signInPrompt: string;
    share: string;
    titlePlaceholder: string;
    descPlaceholder: string;
    category: string;
    difficulty: string;
    hours: string;
    image: string;
    post: string;
    posting: string;
    like: string;
    comment: string;
    commentPlaceholder: string;
    send: string;
    noPosts: string;
    loading: string;
    delete: string;
    comments: string;
    uploadHint: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readArticle: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    perMonth: string;
    mostPopular: string;
    choosePlan: string;
    plans: {
      free: { name: string; price: string; features: string[] };
      muse: { name: string; price: string; features: string[] };
      studio: { name: string; price: string; features: string[] };
    };
  };
  auth: {
    signInTitle: string;
    signInSubtitle: string;
    signUpTitle: string;
    signUpSubtitle: string;
    email: string;
    password: string;
    signIn: string;
    signUp: string;
    noAccount: string;
    haveAccount: string;
    createOne: string;
    signInLink: string;
    signingIn: string;
    signingUp: string;
  };
  assistant: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    greeting: string;
    thinking: string;
    you: string;
  };
  common: {
    advertisement: string;
    close: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    loading: string;
    error: string;
    retry: string;
  };
  footer: {
    tagline: string;
    studio: string;
    community: string;
    rights: string;
  };
}

const en: Dict = {
  dir: 'ltr',
  langName: 'English',
  nav: {
    home: 'Home',
    colorMatcher: 'AI Color Matcher',
    patternGenerator: 'AI Pattern Generator',
    gallery: 'Inspiration Gallery',
    library: 'Pattern Library',
    community: 'Community',
    blog: 'Blog',
    pricing: 'Pricing',
    login: 'Login',
    logout: 'Log out',
    account: 'Account',
  },
  home: {
    badge: 'AI crochet studio',
    title: 'Turn Your Yarn Into Beautiful Crochet Projects',
    subtitle:
      'YarnMuse AI is your personal crochet assistant. Match colors from a photo, generate full step-by-step patterns, estimate yarn quantity, and find endless inspiration — in seconds.',
    startCreating: 'Start Creating',
    exploreInspiration: 'Explore Inspiration',
    stats: {
      patterns: 'Patterns generated',
      makers: 'Happy makers',
      palettes: 'Color palettes',
    },
    featuresTitle: 'Everything a maker needs',
    featuresSubtitle: 'A calm, premium workspace for planning, making and sharing.',
    features: {
      color: { title: 'AI Color Matcher', desc: 'Upload a yarn photo or pick from the palette — get harmonious combinations instantly.' },
      pattern: { title: 'AI Pattern Generator', desc: 'Describe your idea and receive materials, difficulty, yarn estimate and full steps.' },
      gallery: { title: 'Inspiration Gallery', desc: 'Browse bags, plushies, blankets and more — filter by difficulty, color and category.' },
      assistant: { title: 'AI Crochet Assistant', desc: 'Ask anything about stitches, tension, hooks or fixing mistakes.' },
    },
    galleryTitle: 'Inspiration Gallery',
    gallerySubtitle: 'Handpicked crochet projects to spark your next make.',
    explore: 'Explore Inspiration',
    comingSoonTitle: 'Coming soon',
    comingSoonSubtitle: 'The next chapter of the YarnMuse studio.',
    comingSoon: [
      'AI Pattern Image Generator',
      'Yarn Quantity Calculator',
      'Crochet Stitch Identifier',
      'Marketplace for Premium Patterns',
    ],
    ctaTitle: 'Ready to make something beautiful?',
    ctaSubtitle: 'Start free — no credit card needed.',
    whyTitle: 'Why YarnMuse AI',
    whySubtitle: 'We built the studio we always wished existed — a calm, intelligent companion for every crocheter.',
    whyPoints: [
      { title: 'Designed for makers', desc: 'Every tool is crafted around how crocheters actually think — color, texture, and rhythm.' },
      { title: 'AI that understands yarn', desc: 'Our models are trained on crochet patterns, stitch anatomy, and fiber behavior — not generic text.' },
      { title: 'From idea to hook', desc: 'Go from a vague spark to a complete, ready-to-stitch pattern in under a minute.' },
      { title: 'A calmer kind of tool', desc: 'No clutter, no noise — just a warm, focused space that respects your craft.' },
    ],
    howTitle: 'How it works',
    howSubtitle: 'Three gentle steps from inspiration to finished make.',
    howSteps: [
      { step: '01', title: 'Describe your idea', desc: 'Tell YarnMuse what you want to make — a bag, a bunny, a blanket — in plain words.' },
      { step: '02', title: 'Let AI craft the pattern', desc: 'Get materials, difficulty, yarn estimate, and step-by-step instructions tailored to you.' },
      { step: '03', title: 'Pick up your hook', desc: 'Follow the pattern, save it to your favorites, and share the finished make with the community.' },
    ],
    testimonialsTitle: 'Loved by makers everywhere',
    testimonialsSubtitle: 'Thousands of crocheters use YarnMuse to plan, create, and share.',
    testimonials: [
      { quote: 'I described a sunflower granny square blanket and got a full pattern in seconds. It actually worked!', name: 'Maren K.', role: 'Hobby crocheter, Oslo' },
      { quote: 'The color matcher saved me three trips to the yarn store. I uploaded a photo and got a palette instantly.', name: 'Priya S.', role: 'Etsy shop owner, London' },
      { quote: 'As a beginner, the step-by-step patterns gave me the confidence to finish my first amigurumi.', name: 'Sofia R.', role: 'Beginner maker, Lisbon' },
    ],
    faqTitle: 'Frequently asked questions',
    faqSubtitle: 'Everything you need to know before you pick up your hook.',
    faqs: [
      { q: 'Do I need to know how to crochet to use YarnMuse?', a: 'Not at all. YarnMuse generates patterns with clear, step-by-step instructions and difficulty levels, so beginners can start right away.' },
      { q: 'Can I use the patterns commercially?', a: 'Free and Muse plans are for personal use. The Studio plan includes a commercial license for selling finished items.' },
      { q: 'How does the AI color matcher work?', a: 'Upload a photo of your yarn or choose from our palette. The AI analyzes the colors and suggests harmonious combinations you can use in any project.' },
      { q: 'Is there a free plan?', a: 'Yes. The Free plan includes 5 AI-generated patterns per month, basic color matching, gallery access, and community posting — no credit card needed.' },
      { q: 'What languages does YarnMuse support?', a: 'The interface and generated patterns are available in English and Arabic, with more languages coming soon.' },
    ],
    ctaBadge: 'Start your next project today',
    ctaButton: 'Generate your first pattern',
    ctaSecondary: 'Browse the gallery',
  },
  colorMatcher: {
    title: 'AI Color Matcher',
    subtitle: 'Pick your yarn colors or upload a photo, and let AI build the perfect palette.',
    chooseFromPalette: 'Choose from palette',
    uploadPhoto: 'Upload yarn photo',
    dropHere: 'Drop a photo here or click to browse',
    yourSelection: 'Your selection',
    suggest: 'Suggest combinations',
    preview: 'Project preview',
    suggested: 'Suggested palettes',
    harmonies: 'Color harmonies',
    clear: 'Clear',
    add: 'Add',
    analyzing: 'Analyzing…',
    detectedColors: 'Detected colors',
  },
  pattern: {
    title: 'AI Pattern Generator',
    subtitle: 'Describe the project you dream of and get a complete, ready-to-hook pattern.',
    generate: 'Generate pattern',
    placeholder: 'Create a beginner crochet tote bag…',
    examples: 'Quick ideas',
    exampleList: [
      'Create a beginner crochet tote bag',
      'Design an intermediate amigurumi bunny',
      'Make an olive green granny square blanket',
    ],
    materials: 'Materials',
    difficulty: 'Difficulty',
    estimatedTime: 'Estimated time',
    yarnEstimate: 'Yarn estimate',
    steps: 'Steps',
    generating: 'Generating your pattern…',
    result: 'Your pattern',
    copy: 'Copy',
    copied: 'Copied',
    step1Title: 'Choose your project',
    step1Subtitle: 'What would you like to crochet today?',
    step2Title: 'Customize details',
    step2Subtitle: 'Fine-tune the pattern to match your skill and materials.',
    step3Title: 'Your crochet pattern',
    step3Subtitle: 'A complete, ready-to-stitch pattern generated for you.',
    next: 'Next',
    back: 'Back',
    projectTypes: [
      { key: 'bag', label: 'Bag', emoji: '👜' },
      { key: 'amigurumi', label: 'Amigurumi', emoji: '🧸' },
      { key: 'blanket', label: 'Blanket', emoji: '🧶' },
      { key: 'hat', label: 'Hat', emoji: '🧢' },
      { key: 'scarf', label: 'Scarf', emoji: '🧣' },
      { key: 'basket', label: 'Basket', emoji: '🧺' },
    ],
    skillLevel: 'Skill level',
    skillLevels: ['Beginner', 'Intermediate', 'Advanced'],
    yarnType: 'Yarn type',
    yarnTypes: ['Cotton', 'Acrylic', 'Wool', 'DK', 'Worsted', 'Bulky'],
    hookSize: 'Hook size',
    hookSizes: ['2.5mm', '3.0mm', '3.5mm', '4.0mm', '5.0mm', '6.0mm'],
    patternLanguage: 'Pattern language',
    patternLanguages: ['English', 'Arabic'],
    projectTitle: 'Project title',
    hookSizeLabel: 'Hook size',
    yarnQuantity: 'Yarn quantity',
    abbreviations: 'Crochet abbreviations',
    abbreviationsList: [
      { abbr: 'ch', meaning: 'chain' },
      { abbr: 'sc', meaning: 'single crochet' },
      { abbr: 'dc', meaning: 'double crochet' },
      { abbr: 'hdc', meaning: 'half double crochet' },
      { abbr: 'sl st', meaning: 'slip stitch' },
      { abbr: 'inc', meaning: 'increase (2 stitches in one)' },
      { abbr: 'dec', meaning: 'decrease (2 stitches together)' },
      { abbr: 'mr', meaning: 'magic ring' },
      { abbr: 'fo', meaning: 'fasten off' },
      { abbr: 'blo', meaning: 'back loop only' },
    ],
    abbreviationsListAr: [
      { abbr: 'س', meaning: 'سلسلة' },
      { abbr: 'ف', meaning: 'غرزة فردية' },
      { abbr: 'م', meaning: 'غرزة مزدوجة' },
      { abbr: 'نم', meaning: 'نصف غرزة مزدوجة' },
      { abbr: 'من', meaning: 'غرزة منزلقة' },
      { abbr: 'ز', meaning: 'زيادة (غرزتان في واحدة)' },
      { abbr: 'نق', meaning: 'تنقيص (غرزتان معًا)' },
      { abbr: 'حل', meaning: 'حلقة سحرية' },
      { abbr: 'قطع', meaning: 'قطع الخيط' },
      { abbr: 'خلف', meaning: 'الغرزة الخلفية فقط' },
    ],
    instructions: 'Detailed instructions',
    finishing: 'Finishing instructions',
    tips: 'Helpful tips',
    tipsList: [
      'Use stitch markers to mark the beginning of each round.',
      'Keep your tension consistent for an even fabric.',
      'Count your stitches at the end of every row or round.',
      'Weave in ends as you go to save time at the end.',
      'Block your finished piece for a polished, professional look.',
    ],
    tipsListAr: [
      'استخدم علامات الغرز لتحديد بداية كل جولة.',
      'حافظ على ثبات شدّك للحصول على نسيج متساوٍ.',
      'عدّ غرزك في نهاية كل صف أو جولة.',
      'اخفّ الأطراف أثناء العمل لتوفير الوقت في النهاية.',
      'بلّل وثبّت قطعتك النهائية لمظهر احترافي مصقول.',
    ],
    downloadPdf: 'Download PDF',
    saveToFavorites: 'Save to Favorites',
    saved: 'Saved',
    signInToSave: 'Sign in to save',
    patternFor: 'Pattern for',
    customPrompt: 'Additional details (optional)',
    customPromptPlaceholder: 'e.g. earthy tones, floral details, baby-safe…',
    regenerate: 'Regenerate',
  },
  gallery: {
    title: 'Inspiration Gallery',
    subtitle: 'Handpicked crochet projects to spark your next make.',
    category: 'Category',
    difficulty: 'Difficulty',
    color: 'Color',
    all: 'All',
    categories: ['All', 'Bags', 'Plush Toys', 'Blankets', 'Home Decor', 'Baby Items', 'Clothing', 'Flowers', 'Seasonal Projects'],
    difficulties: ['All', 'Beginner', 'Intermediate', 'Advanced'],
    colors: ['All', 'Neutral', 'Olive', 'Pastel', 'Bright', 'Earth'],
    save: 'Save',
    saved: 'Saved',
    noResults: 'No projects match these filters.',
    hours: 'hours',
  },
  library: {
    title: 'Pattern Library',
    subtitle: 'Explore a curated collection of premium crochet patterns — from beginner-friendly to advanced.',
    searchPlaceholder: 'Search patterns…',
    categories: ['All', 'Bags', 'Amigurumi', 'Blankets', 'Hats', 'Scarves', 'Home Decor'],
    difficulties: ['All', 'Beginner', 'Intermediate', 'Advanced'],
    sort: 'Sort by',
    sortOptions: ['Most Popular', 'Newest', 'Free', 'Premium'],
    results: 'patterns',
    noResults: 'No patterns found. Try adjusting your filters.',
    free: 'Free',
    premium: 'Premium',
    hours: 'h',
    viewPattern: 'View pattern',
    loading: 'Loading patterns…',
  },
  patternDetail: {
    materials: 'Materials',
    yarnRecommendations: 'Yarn recommendations',
    hookSize: 'Hook size',
    finishedSize: 'Finished size',
    difficulty: 'Difficulty',
    description: 'Description',
    estimatedTime: 'Estimated time',
    yarnType: 'Yarn type',
    saveToFavorites: 'Save to Favorites',
    saved: 'Saved',
    signInToSave: 'Sign in to save',
    downloadPdf: 'Download PDF',
    sharePattern: 'Share',
    shareCopied: 'Link copied!',
    back: 'Back to library',
    relatedPatterns: 'You might also like',
    favorites: 'favorites',
  },
  community: {
    title: 'Community',
    subtitle: 'Share your finished makes, swap tips and cheer each other on.',
    signInPrompt: 'Sign in to share your makes, like and comment.',
    share: 'Share your make',
    titlePlaceholder: 'Project title',
    descPlaceholder: 'Tell us about it…',
    category: 'Category',
    difficulty: 'Difficulty',
    hours: 'Hours',
    image: 'Photo',
    post: 'Post',
    posting: 'Posting…',
    like: 'Like',
    comment: 'Comment',
    commentPlaceholder: 'Write a comment…',
    send: 'Send',
    noPosts: 'No makes yet. Be the first to share!',
    loading: 'Loading…',
    delete: 'Delete',
    comments: 'Comments',
    uploadHint: 'Choose a photo of your finished make',
  },
  blog: {
    title: 'Crochet Journal',
    subtitle: 'Guides, techniques and yarn stories from the YarnMuse studio.',
    readArticle: 'Read article',
  },
  pricing: {
    title: 'Simple pricing',
    subtitle: 'Start free. Upgrade when your yarn stash grows.',
    perMonth: '/month',
    mostPopular: 'Most popular',
    choosePlan: 'Choose plan',
    plans: {
      free: { name: 'Free', price: '$0', features: ['5 AI patterns / month', 'Color matcher basics', 'Gallery access', 'Community posting'] },
      muse: { name: 'Muse', price: '$9', features: ['Unlimited AI patterns', 'Photo color detection', 'Yarn quantity estimates', 'Save unlimited favorites', 'Ad-free experience'] },
      studio: { name: 'Studio', price: '$24', features: ['Everything in Muse', 'Commercial pattern license', 'Priority AI assistant', 'Early access to new tools'] },
    },
  },
  auth: {
    signInTitle: 'Welcome back',
    signInSubtitle: 'Sign in to save favorites and join the community.',
    signUpTitle: 'Create your account',
    signUpSubtitle: 'Start free — no credit card needed.',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign in',
    signUp: 'Sign up',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    createOne: 'Create one',
    signInLink: 'Sign in',
    signingIn: 'Signing in…',
    signingUp: 'Creating account…',
  },
  assistant: {
    title: 'Crochet Assistant',
    subtitle: 'Ask anything about stitches, tension, hooks or fixing mistakes.',
    placeholder: 'Ask about a stitch, fixing tension…',
    send: 'Send',
    greeting: "Hi! I'm your crochet assistant. Ask me about stitches, yarn choices, or fixing mistakes.",
    thinking: 'Thinking…',
    you: 'You',
  },
  common: {
    advertisement: 'Advertisement',
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading…',
    error: 'Something went wrong.',
    retry: 'Try again',
  },
  footer: {
    tagline: 'Made with yarn, love and a little AI.',
    studio: 'Studio',
    community: 'Community',
    rights: 'All rights reserved.',
  },
};

const ar: Dict = {
  dir: 'rtl',
  langName: 'العربية',
  nav: {
    home: 'الرئيسية',
    colorMatcher: 'مطابق الألوان',
    patternGenerator: 'مولّد الأنماط',
    gallery: 'معرض الإلهام',
    library: 'مكتبة الأنماط',
    community: 'المجتمع',
    blog: 'المدونة',
    pricing: 'الأسعار',
    login: 'تسجيل الدخول',
    logout: 'تسجيل الخروج',
    account: 'حسابي',
  },
  home: {
    badge: 'استوديو الكروشيه الذكي',
    title: 'حوّل خيوطك إلى مشاريع كروشيه جميلة',
    subtitle:
      'يورن ميوز هو مساعدك الشخصي للكروشيه. طابق الألوان من صورة، وولّد أنماطًا كاملة خطوة بخطوة، وقدّر كمية الخيط، واعثر على إلهام لا ينتهي — في ثوانٍ.',
    startCreating: 'ابدأ الإبداع',
    exploreInspiration: 'استكشف الإلهام',
    stats: {
      patterns: 'نمط تم توليده',
      makers: 'صانع سعيد',
      palettes: 'لوحة ألوان',
    },
    featuresTitle: 'كل ما يحتاجه الصانع',
    featuresSubtitle: 'مساحة هادئة وفاخرة للتخطيط والصنع والمشاركة.',
    features: {
      color: { title: 'مطابق الألوان', desc: 'ارفع صورة للخيوط أو اختر من اللوحة — احصل على تركيبات متناسقة فورًا.' },
      pattern: { title: 'مولّد الأنماط', desc: 'صِف فكرتك واحصل على المواد ومستوى الصعوبة وتقدير الخيط والخطوات الكاملة.' },
      gallery: { title: 'معرض الإلهام', desc: 'تصفّح الحقائب والمجسمات والبطانيات والمزيد — فلتر حسب الصعوبة واللون والفئة.' },
      assistant: { title: 'مساعد الكروشيه', desc: 'اسأل عن أي شيء يخص الغرز والشدّ والإبر أو إصلاح الأخطاء.' },
    },
    galleryTitle: 'معرض الإلهام',
    gallerySubtitle: 'مشاريع كروشيه منتقاة لتلهم مشروعك القادم.',
    explore: 'استكشف الإلهام',
    comingSoonTitle: 'قريبًا',
    comingSoonSubtitle: 'الفصل القادم من استوديو يورن ميوز.',
    comingSoon: [
      'مولّد صور الأنماط الذكي',
      'حاسبة كمية الخيط',
      'مُعرّف غرز الكروشيه',
      'سوق الأنماط المميزة',
    ],
    ctaTitle: 'جاهز لصنع شيء جميل؟',
    ctaSubtitle: 'ابدأ مجانًا — بدون بطاقة ائتمان.',
    whyTitle: 'لماذا YarnMuse AI',
    whySubtitle: 'بنينا الاستوديو الذي طالما تمنينا وجوده — رفيق هادئ وذكي لكل من يحيك.',
    whyPoints: [
      { title: 'مصمم للمبدعين', desc: 'كل أداة مصممة حول طريقة تفكير من يحوك — اللون والملمس والإيقاع.' },
      { title: 'ذكاء اصطناعي يفهم الخيوط', desc: 'نماذجنا مدرّبة على أنماط الكروشيه وتشريح الغرز وسلوك الألياف — لا نصوص عامة.' },
      { title: 'من الفكرة إلى الإبرة', desc: 'انتقل من شرارة غامضة إلى نمط كامل جاهز للتنفيذ في أقل من دقيقة.' },
      { title: 'أداة أكثر هدوءًا', desc: 'بلا فوضى ولا ضجيج — مساحة دافئة ومركزة تحترم حرفتك.' },
    ],
    howTitle: 'كيف يعمل',
    howSubtitle: 'ثلاث خطوات لطيفة من الإلهام إلى القطعة النهائية.',
    howSteps: [
      { step: '٠١', title: 'صِف فكرتك', desc: 'أخبر YarnMuse بما تريد صنعه — حقيبة أو أرنب أو بطانية — بكلمات بسيطة.' },
      { step: '٠٢', title: 'دع الذكاء الاصطناعي يصمم النمط', desc: 'احصل على المواد ومستوى الصعوبة وتقدير الخيط وتعليمات خطوة بخطوة مخصصة لك.' },
      { step: '٠٣', title: 'أمسك الإبرة', desc: 'اتبع النمط، احفظه في المفضلة، وشارك القطعة النهائية مع المجتمع.' },
    ],
    testimonialsTitle: 'محبوب من المبدعين في كل مكان',
    testimonialsSubtitle: 'آلاف من يحكون يستخدمون YarnMuse للتخطيط والإبداع والمشاركة.',
    testimonials: [
      { quote: 'وصفت بطانية غراني سكوير زهرة الشمس وحصلت على نمط كامل في ثوانٍ. وعمل فعلاً!', name: 'ميرين ك.', role: 'هاوية كروشيه، أوسلو' },
      { quote: 'مطابق الألوان وفّر عليّ ثلاث رحلات لمتجر الخيوط. رفعت صورة وحصلت على لوحة فورًا.', name: 'بريا س.', role: 'صاحبة متجر إتسي، لندن' },
      { quote: 'كمبتدئة، الأنماط خطوة بخطوة منحتني الثقة لإنهاء أول أميغورومي لي.', name: 'صوفيا ر.', role: 'مبدئة، لشبونة' },
    ],
    faqTitle: 'الأسئلة الشائعة',
    faqSubtitle: 'كل ما تحتاج معرفته قبل أن تمسك إبرتك.',
    faqs: [
      { q: 'هل أحتاج لمعرفة الكروشيه لاستخدام YarnMuse؟', a: 'إطلاقًا. يولّد YarnMuse أنماطًا بتعليمات واضحة خطوة بخطوة ومستويات صعوبة، حتى يبدأ المبتدئون فورًا.' },
      { q: 'هل يمكنني استخدام الأنماط تجاريًا؟', a: 'خطتا المجانية وMuse للاستخدام الشخصي. تشمل خطة Studio رخصة تجارية لبيع القطع النهائية.' },
      { q: 'كيف يعمل مطابق الألوان بالذكاء الاصطناعي؟', a: 'ارفع صورة لخيوطك أو اختر من لوحتنا. يحلل الذكاء الاصطناعي الألوان ويقترح تركيبات متناغمة يمكنك استخدامها في أي مشروع.' },
      { q: 'هل هناك خطة مجانية؟', a: 'نعم. تشمل الخطة المجانية 5 أنماط مولّدة شهريًا، مطابقة ألوان أساسية، وصول للمعرض، ونشر في المجتمع — بدون بطاقة ائتمان.' },
      { q: 'ما اللغات التي يدعمها YarnMuse؟', a: 'الواجهة والأنماط المولّدة متاحة بالإنجليزية والعربية، مع لغات أخرى قريبًا.' },
    ],
    ctaBadge: 'ابدأ مشروعك القادم اليوم',
    ctaButton: 'أنشئ نمطك الأول',
    ctaSecondary: 'تصفّح المعرض',
  },
  colorMatcher: {
    title: 'مطابق الألوان',
    subtitle: 'اختر ألوان خيوطك أو ارفع صورة، ودع الذكاء الاصطناعي يبني اللوحة المثالية.',
    chooseFromPalette: 'اختر من اللوحة',
    uploadPhoto: 'ارفع صورة للخيوط',
    dropHere: 'أفلت صورة هنا أو انقر للتصفح',
    yourSelection: 'اختيارك',
    suggest: 'اقترح تركيبات',
    preview: 'معاينة المشروع',
    suggested: 'اللوحات المقترحة',
    harmonies: 'تناغمات الألوان',
    clear: 'مسح',
    add: 'إضافة',
    analyzing: 'جارٍ التحليل…',
    detectedColors: 'الألوان المكتشفة',
  },
  pattern: {
    title: 'مولّد الأنماط',
    subtitle: 'صِف المشروع الذي تحلم به واحصل على نمط كامل جاهز للتنفيذ.',
    generate: 'ولّد النمط',
    placeholder: 'أنشئ حقيبة كروشيه للمبتدئين…',
    examples: 'أفكار سريعة',
    exampleList: [
      'أنشئ حقيبة كروشيه للمبتدئين',
      'صمّم أرنب أميغورومي متوسط المستوى',
      'اصنع بطانية مربعات بلون الزيتون',
    ],
    materials: 'المواد',
    difficulty: 'مستوى الصعوبة',
    estimatedTime: 'الوقت المقدّر',
    yarnEstimate: 'تقدير الخيط',
    steps: 'الخطوات',
    generating: 'جارٍ توليد النمط…',
    result: 'النمط الخاص بك',
    copy: 'نسخ',
    copied: 'تم النسخ',
    step1Title: 'اختر مشروعك',
    step1Subtitle: 'ماذا تود أن تحيك اليوم؟',
    step2Title: 'خصّص التفاصيل',
    step2Subtitle: 'اضبط النمط ليناسب مهارتك وخيوطك.',
    step3Title: 'نمط الكروشيه الخاص بك',
    step3Subtitle: 'نمط كامل جاهز للتنفيذ مولّد خصيصًا لك.',
    next: 'التالي',
    back: 'رجوع',
    projectTypes: [
      { key: 'bag', label: 'حقيبة', emoji: '👜' },
      { key: 'amigurumi', label: 'أميغورومي', emoji: '🧸' },
      { key: 'blanket', label: 'بطانية', emoji: '🧶' },
      { key: 'hat', label: 'قبعة', emoji: '🧢' },
      { key: 'scarf', label: 'وشاح', emoji: '🧣' },
      { key: 'basket', label: 'سلة', emoji: '🧺' },
    ],
    skillLevel: 'مستوى المهارة',
    skillLevels: ['مبتدئ', 'متوسط', 'متقدم'],
    yarnType: 'نوع الخيط',
    yarnTypes: ['قطن', 'أكريليك', 'صوف', 'DK', 'Worsted', 'سميك'],
    hookSize: 'حجم الإبرة',
    hookSizes: ['2.5mm', '3.0mm', '3.5mm', '4.0mm', '5.0mm', '6.0mm'],
    patternLanguage: 'لغة النمط',
    patternLanguages: ['الإنجليزية', 'العربية'],
    projectTitle: 'عنوان المشروع',
    hookSizeLabel: 'حجم الإبرة',
    yarnQuantity: 'كمية الخيط',
    abbreviations: 'اختصارات الكروشيه',
    abbreviationsList: [
      { abbr: 'ch', meaning: 'chain' },
      { abbr: 'sc', meaning: 'single crochet' },
      { abbr: 'dc', meaning: 'double crochet' },
      { abbr: 'hdc', meaning: 'half double crochet' },
      { abbr: 'sl st', meaning: 'slip stitch' },
      { abbr: 'inc', meaning: 'increase (2 stitches in one)' },
      { abbr: 'dec', meaning: 'decrease (2 stitches together)' },
      { abbr: 'mr', meaning: 'magic ring' },
      { abbr: 'fo', meaning: 'fasten off' },
      { abbr: 'blo', meaning: 'back loop only' },
    ],
    abbreviationsListAr: [
      { abbr: 'س', meaning: 'سلسلة' },
      { abbr: 'ف', meaning: 'غرزة فردية' },
      { abbr: 'م', meaning: 'غرزة مزدوجة' },
      { abbr: 'نم', meaning: 'نصف غرزة مزدوجة' },
      { abbr: 'من', meaning: 'غرزة منزلقة' },
      { abbr: 'ز', meaning: 'زيادة (غرزتان في واحدة)' },
      { abbr: 'نق', meaning: 'تنقيص (غرزتان معًا)' },
      { abbr: 'حل', meaning: 'حلقة سحرية' },
      { abbr: 'قطع', meaning: 'قطع الخيط' },
      { abbr: 'خلف', meaning: 'الغرزة الخلفية فقط' },
    ],
    instructions: 'تعليمات مفصلة',
    finishing: 'تعليمات التشطيب',
    tips: 'نصائح مفيدة',
    tipsList: [
      'استخدم علامات الغرز لتحديد بداية كل جولة.',
      'حافظ على ثبات شدّك للحصول على نسيج متساوٍ.',
      'عدّ غرزك في نهاية كل صف أو جولة.',
      'اخفّ الأطراف أثناء العمل لتوفير الوقت في النهاية.',
      'بلّل وثبّت قطعتك النهائية لمظهر احترافي مصقول.',
    ],
    tipsListAr: [
      'استخدم علامات الغرز لتحديد بداية كل جولة.',
      'حافظ على ثبات شدّك للحصول على نسيج متساوٍ.',
      'عدّ غرزك في نهاية كل صف أو جولة.',
      'اخفّ الأطراف أثناء العمل لتوفير الوقت في النهاية.',
      'بلّل وثبّت قطعتك النهائية لمظهر احترافي مصقول.',
    ],
    downloadPdf: 'تحميل PDF',
    saveToFavorites: 'حفظ في المفضلة',
    saved: 'محفوظ',
    signInToSave: 'سجّل الدخول للحفظ',
    patternFor: 'نمط لـ',
    customPrompt: 'تفاصيل إضافية (اختياري)',
    customPromptPlaceholder: 'مثال: درجات ترابية، تفاصيل زهور، آمن للأطفال…',
    regenerate: 'إعادة التوليد',
  },
  gallery: {
    title: 'معرض الإلهام',
    subtitle: 'مشاريع كروشيه منتقاة لتلهم مشروعك القادم.',
    category: 'الفئة',
    difficulty: 'الصعوبة',
    color: 'اللون',
    all: 'الكل',
    categories: ['الكل', 'الحقائب', 'الألعاب', 'البطانيات', 'ديكور المنزل', 'مستلزمات الأطفال', 'الملابس', 'الزهور', 'مشاريع موسمية'],
    difficulties: ['الكل', 'مبتدئ', 'متوسط', 'متقدم'],
    colors: ['الكل', 'محايد', 'زيتوني', 'باستيل', 'زاهي', 'ترابي'],
    save: 'حفظ',
    saved: 'محفوظ',
    noResults: 'لا توجد مشاريع تطابق هذه الفلاتر.',
    hours: 'ساعات',
  },
  library: {
    title: 'مكتبة الأنماط',
    subtitle: 'استكشف مجموعة منتقاة من أنماط الكروشيه المميزة — من المبتدئ إلى المتقدم.',
    searchPlaceholder: 'ابحث عن أنماط…',
    categories: ['الكل', 'الحقائب', 'أميغورومي', 'البطانيات', 'القبعات', 'الوشاح', 'ديكور المنزل'],
    difficulties: ['الكل', 'مبتدئ', 'متوسط', 'متقدم'],
    sort: 'ترتيب حسب',
    sortOptions: ['الأكثر شيوعًا', 'الأحدث', 'مجاني', 'مميز'],
    results: 'نمط',
    noResults: 'لا توجد أنماط. حاول تعديل الفلاتر.',
    free: 'مجاني',
    premium: 'مميز',
    hours: 'س',
    viewPattern: 'عرض النمط',
    loading: 'جارٍ تحميل الأنماط…',
  },
  patternDetail: {
    materials: 'المواد',
    yarnRecommendations: 'توصيات الخيوط',
    hookSize: 'حجم الإبرة',
    finishedSize: 'المقاس النهائي',
    difficulty: 'مستوى الصعوبة',
    description: 'الوصف',
    estimatedTime: 'الوقت المقدّر',
    yarnType: 'نوع الخيط',
    saveToFavorites: 'حفظ في المفضلة',
    saved: 'محفوظ',
    signInToSave: 'سجّل الدخول للحفظ',
    downloadPdf: 'تحميل PDF',
    sharePattern: 'مشاركة',
    shareCopied: 'تم نسخ الرابط!',
    back: 'العودة للمكتبة',
    relatedPatterns: 'قد يعجبك أيضًا',
    favorites: 'مفضلة',
  },
  community: {
    title: 'المجتمع',
    subtitle: 'شارك أعمالك المنتهية، وتبادل النصائح وشجّع بعضكم البعض.',
    signInPrompt: 'سجّل الدخول لمشاركة أعمالك والإعجاب والتعليق.',
    share: 'شارك عملك',
    titlePlaceholder: 'عنوان المشروع',
    descPlaceholder: 'أخبرنا عنه…',
    category: 'الفئة',
    difficulty: 'الصعوبة',
    hours: 'الساعات',
    image: 'الصورة',
    post: 'نشر',
    posting: 'جارٍ النشر…',
    like: 'إعجاب',
    comment: 'تعليق',
    commentPlaceholder: 'اكتب تعليقًا…',
    send: 'إرسال',
    noPosts: 'لا توجد أعمال بعد. كن أول من يشارك!',
    loading: 'جارٍ التحميل…',
    delete: 'حذف',
    comments: 'التعليقات',
    uploadHint: 'اختر صورة لعملك المنتهي',
  },
  blog: {
    title: 'مذكرات الكروشيه',
    subtitle: 'أدلة وتقنيات وقصص خيوط من استوديو يورن ميوز.',
    readArticle: 'اقرأ المقال',
  },
  pricing: {
    title: 'تسعير بسيط',
    subtitle: 'ابدأ مجانًا. ارقِ عندما تكبر مجموعة خيوطك.',
    perMonth: '/شهريًا',
    mostPopular: 'الأكثر شيوعًا',
    choosePlan: 'اختر الخطة',
    plans: {
      free: { name: 'مجاني', price: '$0', features: ['5 أنماط ذكية / شهر', 'أساسيات مطابق الألوان', 'الوصول للمعرض', 'النشر في المجتمع'] },
      muse: { name: 'ميوز', price: '$9', features: ['أنماط ذكية غير محدودة', 'كشف لون الصورة', 'تقدير كمية الخيط', 'حفظ مفضلات غير محدودة', 'تجربة بدون إعلانات'] },
      studio: { name: 'استوديو', price: '$24', features: ['كل مزايا ميوز', 'ترخيص تجاري للأنماط', 'مساعد ذكي ذو أولوية', 'وصول مبكر للأدوات الجديدة'] },
    },
  },
  auth: {
    signInTitle: 'مرحبًا بعودتك',
    signInSubtitle: 'سجّل الدخول لحفظ المفضلات والانضمام للمجتمع.',
    signUpTitle: 'أنشئ حسابك',
    signUpSubtitle: 'ابدأ مجانًا — بدون بطاقة ائتمان.',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    createOne: 'أنشئ واحدًا',
    signInLink: 'تسجيل الدخول',
    signingIn: 'جارٍ تسجيل الدخول…',
    signingUp: 'جارٍ إنشاء الحساب…',
  },
  assistant: {
    title: 'مساعد الكروشيه',
    subtitle: 'اسأل عن أي شيء يخص الغرز والشدّ والإبر أو إصلاح الأخطاء.',
    placeholder: 'اسأل عن غرزة، أو إصلاح الشدّ…',
    send: 'إرسال',
    greeting: 'مرحبًا! أنا مساعدك للكروشيه. اسألني عن الغرز أو اختيار الخيوط أو إصلاح الأخطاء.',
    thinking: 'يفكّر…',
    you: 'أنت',
  },
  common: {
    advertisement: 'إعلان',
    close: 'إغلاق',
    cancel: 'إلغاء',
    save: 'حفظ',
    delete: 'حذف',
    edit: 'تعديل',
    loading: 'جارٍ التحميل…',
    error: 'حدث خطأ ما.',
    retry: 'حاول مجددًا',
  },
  footer: {
    tagline: 'صُنع بالخيط والحب وقليل من الذكاء الاصطناعي.',
    studio: 'الاستوديو',
    community: 'المجتمع',
    rights: 'جميع الحقوق محفوظة.',
  },
};

export const dictionaries: Record<Locale, Dict> = { en, ar };

export function getDict(locale: Locale): Dict {
  return dictionaries[locale];
}
