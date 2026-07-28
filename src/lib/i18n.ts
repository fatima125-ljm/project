export type Locale = 'en' | 'ar';

export interface Dict {
  dir: 'ltr' | 'rtl';
  langName: string;
  nav: {
    home: string;
    colorMatcher: string;
    patternGenerator: string;
    gallery: string;
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
