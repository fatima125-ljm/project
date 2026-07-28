export interface SwatchColor {
  name: string;
  nameAr: string;
  hex: string;
}

export const palette: SwatchColor[] = [
  { name: 'Cream', nameAr: 'كريمي', hex: '#F3EDE0' },
  { name: 'Sand', nameAr: 'رملي', hex: '#D9C7A3' },
  { name: 'Olive', nameAr: 'زيتوني', hex: '#7A7F3A' },
  { name: 'Forest', nameAr: 'غابي', hex: '#3F5130' },
  { name: 'Terracotta', nameAr: 'طيني', hex: '#B5654A' },
  { name: 'Rust', nameAr: 'صدئي', hex: '#9C4A2F' },
  { name: 'Mustard', nameAr: 'خردلي', hex: '#C99A2E' },
  { name: 'Sage', nameAr: 'مرمري', hex: '#A7B59A' },
  { name: 'Dusty Rose', nameAr: 'وردي باهت', hex: '#C99AAE' },
  { name: 'Slate', nameAr: 'رمادي', hex: '#5B6470' },
  { name: 'Navy', nameAr: 'كحلي', hex: '#2E3A4D' },
  { name: 'Ivory', nameAr: 'عاجي', hex: '#FBF8F1' },
];

export interface Harmony {
  type: string;
  typeAr: string;
  colors: string[];
}

export function buildHarmonies(baseHex: string): Harmony[] {
  const base = hexToHsl(baseHex);
  if (!base) return [];
  const { h, s, l } = base;
  const make = (hh: number, ll: number, ss: number) => hslToHex(((hh % 360) + 360) % 360, ss, ll);

  return [
    { type: 'Complementary', typeAr: 'مكمل', colors: [baseHex, make(h + 180, l, s)] },
    { type: 'Analogous', typeAr: 'متناغم', colors: [make(h - 30, l, s), baseHex, make(h + 30, l, s)] },
    { type: 'Triadic', typeAr: 'ثلاثي', colors: [baseHex, make(h + 120, l, s), make(h + 240, l, s)] },
    { type: 'Tints & Shades', typeAr: 'تدرّج', colors: [make(h, 88, s), baseHex, make(h, Math.max(20, l - 28), s)] },
  ];
}

function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const m = hex.replace('#', '');
  if (m.length !== 6) return null;
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const toHex = (x: number) =>
    Math.round(255 * x)
      .toString(16)
      .padStart(2, '0');
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
}
