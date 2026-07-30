export interface GalleryItem {
  key: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  difficultyAr: string;
  hours: number;
  color: string;
  colorAr: string;
  image: string;
}

const ph = (id: number, w = 800, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}&h=${h}&fit=crop`;

export const galleryItems: GalleryItem[] = [
  { key: 'market-tote', title: 'Everyday Market Tote', titleAr: 'حقيبة التسوق اليومية', category: 'Bags', categoryAr: 'الحقائب', difficulty: 'Beginner', difficultyAr: 'مبتدئ', hours: 6, color: 'Neutral', colorAr: 'محايد', image: ph(1214212) },
  { key: 'cocoa-bunny', title: 'Cocoa Bunny Amigurumi', titleAr: 'أرنب الكاكاو أميغورومي', category: 'Plush Toys', categoryAr: 'الألعاب', difficulty: 'Intermediate', difficultyAr: 'متوسط', hours: 9, color: 'Earth', colorAr: 'ترابي', image: ph(12109904) },
  { key: 'olive-throw', title: 'Olive Cable Throw', titleAr: 'بطانية الزيتون', category: 'Blankets', categoryAr: 'البطانيات', difficulty: 'Advanced', difficultyAr: 'متقدم', hours: 24, color: 'Olive', colorAr: 'زيتوني', image: ph(6463348) },
  { key: 'linen-basket', title: 'Linen Storage Basket', titleAr: 'سلة التخزين الكتانية', category: 'Home Decor', categoryAr: 'ديكور المنزل', difficulty: 'Beginner', difficultyAr: 'مبتدئ', hours: 4, color: 'Neutral', colorAr: 'محايد', image: ph(13083077) },
  { key: 'cloud-blanket', title: 'Cloud Baby Blanket', titleAr: 'بطانية الطفل السحابية', category: 'Baby Items', categoryAr: 'مستلزمات الأطفال', difficulty: 'Beginner', difficultyAr: 'مبتدئ', hours: 12, color: 'Pastel', colorAr: 'باستيل', image: ph(6463349) },
  { key: 'sand-cardigan', title: 'Sand Dune Cardigan', titleAr: 'كارديغان كثبان الرمل', category: 'Clothing', categoryAr: 'الملابس', difficulty: 'Advanced', difficultyAr: 'متقدم', hours: 30, color: 'Earth', colorAr: 'ترابي', image: ph(6462889) },
  { key: 'wild-bouquet', title: 'Wild Posy Bouquet', titleAr: 'باقة الأزهار البرية', category: 'Flowers', categoryAr: 'الزهور', difficulty: 'Intermediate', difficultyAr: 'متوسط', hours: 5, color: 'Bright', colorAr: 'زاهي', image: ph(1214202) },
  { key: 'autumn-garland', title: 'Autumn Leaf Garland', titleAr: 'إكليل أوراق الخريف', category: 'Seasonal Projects', categoryAr: 'مشاريع موسمية', difficulty: 'Intermediate', difficultyAr: 'متوسط', hours: 7, color: 'Earth', colorAr: 'ترابي', image: ph(20868516) },
];
