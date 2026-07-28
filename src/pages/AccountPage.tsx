import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, LogOut } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { galleryItems } from '@/lib/gallery-data';
import { Button } from '@/components/ui/Button';

export function AccountPage() {
  const { dict, locale } = useI18n();
  const { user, signOut } = useAuth();
  const [favKeys, setFavKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from('favorites')
      .select('item_key')
      .then(({ data }) => setFavKeys((data ?? []).map((r: { item_key: string }) => r.item_key)));
  }, [user]);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-muted-foreground">{dict.community.signInPrompt}</p>
        <Link to="/login" className="mt-4 inline-block">
          <Button>{dict.nav.login}</Button>
        </Link>
      </div>
    );
  }

  const favs = galleryItems.filter((i) => favKeys.includes(i.key));

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{dict.nav.account}</h1>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button variant="outline" onClick={signOut}>
          <LogOut className="h-4 w-4" />
          {dict.nav.logout}
        </Button>
      </div>

      <div className="mt-10">
        <h2 className="flex items-center gap-2 text-lg font-semibold">
          <Bookmark className="h-5 w-5 text-olive" />
          {dict.gallery.saved}
        </h2>
        {favs.length === 0 ? (
          <p className="mt-4 text-muted-foreground">
            <Link to="/gallery" className="text-olive">{dict.nav.gallery}</Link>
          </p>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {favs.map((item) => (
              <article key={item.key} className="surface overflow-hidden">
                <img src={item.image} alt={locale === 'ar' ? item.titleAr : item.title} className="aspect-square w-full object-cover" />
                <div className="p-4">
                  <h3 className="text-base font-semibold">{locale === 'ar' ? item.titleAr : item.title}</h3>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
