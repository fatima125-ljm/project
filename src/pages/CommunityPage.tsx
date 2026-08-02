import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Trash2, Send, Upload, X } from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { AdSlot } from '@/components/AdSlot';
import { Button } from '@/components/ui/Button';

interface Post {
  id: string;
  user_id: string;
  image_url: string;
  title: string;
  description: string | null;
  category: string;
  difficulty: string;
  hours: number;
  created_at: string;
  like_count: number;
  liked_by_me: boolean;
  comments: Comment[];
}

interface Comment {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
}

export function CommunityPage() {
  const { dict, locale } = useI18n();
  const t = dict.community;
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({ title: '', description: '', category: 'Bags', difficulty: 'Beginner', hours: 4 });
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [posting, setPosting] = useState(false);
  const [commentText, setCommentText] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('community_posts')
      .select('id, user_id, image_url, title, description, category, difficulty, hours, created_at')
      .order('created_at', { ascending: false });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    if (!data) {
      setPosts([]);
      setLoading(false);
      return;
    }

    const postIds = data.map((p) => p.id);
    const [likesRes, commentsRes] = await Promise.all([
      supabase.from('likes').select('post_id, user_id').in('post_id', postIds),
      supabase.from('comments').select('id, post_id, content, user_id, created_at').in('post_id', postIds).order('created_at', { ascending: true }),
    ]);

    const likeMap = new Map<string, { count: number; mine: boolean }>();
    (likesRes.data ?? []).forEach((l: { post_id: string; user_id: string }) => {
      const cur = likeMap.get(l.post_id) ?? { count: 0, mine: false };
      cur.count++;
      if (l.user_id === user?.id) cur.mine = true;
      likeMap.set(l.post_id, cur);
    });

    const commentMap = new Map<string, Comment[]>();
    (commentsRes.data ?? []).forEach((c: { post_id: string; id: string; content: string; user_id: string; created_at: string }) => {
      const arr = commentMap.get(c.post_id) ?? [];
      arr.push({ id: c.id, content: c.content, user_id: c.user_id, created_at: c.created_at });
      commentMap.set(c.post_id, arr);
    });

    setPosts(
      data.map((p) => {
        const l = likeMap.get(p.id) ?? { count: 0, mine: false };
        return {
          ...p,
          like_count: l.count,
          liked_by_me: l.mine,
          comments: commentMap.get(p.id) ?? [],
        };
      }),
    );
    setLoading(false);
  }, [user?.id]);

  useEffect(() => {
    load();
  }, [load]);

  const onFile = (f: File) => {
    setFile(f);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };

  const submit = async () => {
    if (!user || !file || !form.title.trim()) return;
    setPosting(true);
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('community').upload(path, file);
    if (upErr) {
      setError(upErr.message);
      setPosting(false);
      return;
    }
    const { data: pub } = supabase.storage.from('community').getPublicUrl(path);
    const { error: insErr } = await supabase.from('community_posts').insert({
      image_url: pub.publicUrl,
      title: form.title,
      description: form.description || null,
      category: form.category,
      difficulty: form.difficulty,
      hours: Number(form.hours),
    });
    if (insErr) {
      setError(insErr.message);
      setPosting(false);
      return;
    }
    setForm({ title: '', description: '', category: 'Bags', difficulty: 'Beginner', hours: 4 });
    setFile(null);
    setPreview(null);
    setPosting(false);
    load();
  };

  const like = async (post: Post) => {
    if (!user) return;
    if (post.liked_by_me) {
      setPosts((ps) => ps.map((p) => (p.id === post.id ? { ...p, liked_by_me: false, like_count: p.like_count - 1 } : p)));
      const { error } = await supabase.from('likes').delete().eq('post_id', post.id).eq('user_id', user.id);
      if (error) setPosts((ps) => ps.map((p) => (p.id === post.id ? { ...p, liked_by_me: true, like_count: p.like_count + 1 } : p)));
    } else {
      setPosts((ps) => ps.map((p) => (p.id === post.id ? { ...p, liked_by_me: true, like_count: p.like_count + 1 } : p)));
      const { error } = await supabase.from('likes').insert({ post_id: post.id });
      if (error) setPosts((ps) => ps.map((p) => (p.id === post.id ? { ...p, liked_by_me: false, like_count: p.like_count - 1 } : p)));
    }
  };

  const comment = async (post: Post) => {
    const text = (commentText[post.id] ?? '').trim();
    if (!user || !text) return;
    const { data, error } = await supabase
      .from('comments')
      .insert({ post_id: post.id, content: text })
      .select('id, content, user_id, created_at')
      .single();
    if (error) { setError(error.message); return; }
    if (data) {
      setPosts((ps) => ps.map((p) => (p.id === post.id ? { ...p, comments: [...p.comments, data as Comment] } : p)));
      setCommentText((c) => ({ ...c, [post.id]: '' }));
    }
  };

  const remove = async (post: Post) => {
    if (!user || post.user_id !== user.id) return;
    const { error } = await supabase.from('community_posts').delete().eq('id', post.id);
    if (error) { setError(error.message); return; }
    setPosts((ps) => ps.filter((p) => p.id !== post.id));
  };

  const deleteComment = async (post: Post, c: Comment) => {
    if (!user || c.user_id !== user.id) return;
    const { error } = await supabase.from('comments').delete().eq('id', c.id);
    if (error) { setError(error.message); return; }
    setPosts((ps) => ps.map((p) => (p.id === post.id ? { ...p, comments: p.comments.filter((x) => x.id !== c.id) } : p)));
  };

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {user ? (
          <div className="surface p-6">
            <h2 className="text-lg font-semibold">{t.share}</h2>
            <div className="mt-4 grid gap-4">
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder={t.titlePlaceholder}
                className="h-11 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
              />
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder={t.descPlaceholder}
                rows={3}
                className="resize-none rounded-2xl border border-input bg-background p-4 text-sm outline-none focus:border-olive/50"
              />
              <div className="grid grid-cols-3 gap-3">
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="h-11 rounded-2xl border border-input bg-card px-3 text-sm outline-none focus:border-olive/50"
                >
                  {dict.gallery.categories.slice(1).map((c) => (
                    <option key={c} value={c === 'الحقائب' ? 'Bags' : c}>{c}</option>
                  ))}
                </select>
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                  className="h-11 rounded-2xl border border-input bg-card px-3 text-sm outline-none focus:border-olive/50"
                >
                  {dict.gallery.difficulties.slice(1).map((d) => (
                    <option key={d} value={d === 'مبتدئ' ? 'Beginner' : d === 'متوسط' ? 'Intermediate' : d === 'متقدم' ? 'Advanced' : d}>{d}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min={1}
                  value={form.hours}
                  onChange={(e) => setForm({ ...form, hours: Number(e.target.value) })}
                  className="h-11 rounded-2xl border border-input bg-background px-3 text-sm outline-none focus:border-olive/50"
                />
              </div>

              {preview ? (
                <div className="relative overflow-hidden rounded-2xl border border-border">
                  <img src={preview} alt="preview" className="max-h-64 w-full object-cover" />
                  <button
                    onClick={() => {
                      setFile(null);
                      setPreview(null);
                    }}
                    className="absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-background/80"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-muted/30 p-8 text-center">
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])} />
                  <Upload className="h-7 w-7 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{t.uploadHint}</span>
                </label>
              )}

              <Button onClick={submit} disabled={posting || !file || !form.title.trim()}>
                {posting ? t.posting : t.post}
              </Button>
            </div>
          </div>
        ) : (
          <div className="surface p-8 text-center">
            <p className="text-muted-foreground">{t.signInPrompt}</p>
            <Link to="/login" className="mt-4 inline-block">
              <Button variant="primary">{dict.nav.login}</Button>
            </Link>
          </div>
        )}

        {error && <p className="mt-4 text-center text-sm text-error">{error}</p>}

        <div className="mt-10 space-y-6">
          {loading ? (
            <p className="text-center text-muted-foreground">{t.loading}</p>
          ) : posts.length === 0 ? (
            <p className="text-center text-muted-foreground">{t.noPosts}</p>
          ) : (
            posts.map((post) => (
              <article key={post.id} className="surface overflow-hidden">
                <img src={post.image_url} alt={post.title} loading="lazy" className="max-h-96 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {post.difficulty} · {post.category} · {post.hours} {dict.gallery.hours}
                      </p>
                    </div>
                    {user?.id === post.user_id && (
                      <button onClick={() => remove(post)} aria-label={t.delete} className="text-muted-foreground hover:text-error">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  {post.description && <p className="mt-2 text-sm text-muted-foreground">{post.description}</p>}

                  <div className="mt-4 flex items-center gap-4">
                    <button
                      onClick={() => like(post)}
                      disabled={!user}
                      className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                    >
                      <Heart className={`h-4 w-4 ${post.liked_by_me ? 'fill-error text-error' : ''}`} />
                      {post.like_count}
                    </button>
                    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      {post.comments.length}
                    </span>
                  </div>

                  {post.comments.length > 0 && (
                    <div className="mt-4 space-y-2 border-t border-border pt-4">
                      {post.comments.map((c) => (
                        <div key={c.id} className="flex items-start justify-between gap-2 text-sm">
                          <p className="rounded-2xl rounded-bl-md bg-secondary px-3 py-2 text-secondary-foreground">{c.content}</p>
                          {user?.id === c.user_id && (
                            <button onClick={() => deleteComment(post, c)} className="text-muted-foreground hover:text-error">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {user && (
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        value={commentText[post.id] ?? ''}
                        onChange={(e) => setCommentText((c) => ({ ...c, [post.id]: e.target.value }))}
                        onKeyDown={(e) => e.key === 'Enter' && comment(post)}
                        placeholder={t.commentPlaceholder}
                        aria-label={t.commentPlaceholder}
                        className="h-10 flex-1 rounded-full border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
                      />
                      <Button size="icon" onClick={() => comment(post)} aria-label={t.send}>
                        <Send className="h-4 w-4 rtl:rotate-180" />
                      </Button>
                    </div>
                  )}
                </div>
              </article>
            ))
          )}
        </div>

        <div className="mt-12">
          <AdSlot />
        </div>
      </section>
    </>
  );
}
