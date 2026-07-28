import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { Link, type LinkProps } from 'react-router-dom';

type Variant = 'primary' | 'outline' | 'ghost' | 'soft';
type Size = 'sm' | 'md' | 'lg' | 'icon';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-olive/40 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0';

const variants: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground shadow hover:bg-primary/90 active:scale-[0.98]',
  outline: 'border border-input shadow-sm hover:bg-accent hover:text-accent-foreground bg-card active:scale-[0.98]',
  ghost: 'hover:bg-secondary hover:text-foreground',
  soft: 'bg-secondary text-secondary-foreground hover:bg-secondary/70 active:scale-[0.98]',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs rounded-full',
  md: 'h-10 px-5 text-sm rounded-full',
  lg: 'h-11 px-7 text-sm rounded-full',
  icon: 'h-9 w-9 rounded-full',
};

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = forwardRef<HTMLButtonElement, BtnProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => (
    <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  ),
);
Button.displayName = 'Button';

interface LinkBtnProps extends LinkProps {
  variant?: Variant;
  size?: Size;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkBtnProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => (
    <Link ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />
  ),
);
LinkButton.displayName = 'LinkButton';
