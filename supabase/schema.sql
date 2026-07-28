/*
# YarnMuse AI — core schema

Multi-user app with email/password auth. Users share finished crochet makes
in the Community, like and comment on posts, and save favorite gallery items.

Tables:
- community_posts: a user's shared finished make (photo, title, category, difficulty, hours).
- comments: a comment on a community post.
- likes: a single like per user per post (unique constraint).
- favorites: a saved gallery item per user (unique per user+item_key).

Storage:
- Public bucket "community" for uploaded make photos.

Security:
- RLS enabled on every table.
- community_posts: public read; owner-only insert/update/delete.
- comments: public read; owner-only insert/delete.
- likes: public read; owner-only insert/delete.
- favorites: owner-only all operations (private per user).
- All owner columns default to auth.uid() so client inserts omitting user_id succeed.
*/

-- community_posts
CREATE TABLE IF NOT EXISTS community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  title text NOT NULL,
  description text,
  category text NOT NULL DEFAULT 'Bags',
  difficulty text NOT NULL DEFAULT 'Beginner',
  hours numeric NOT NULL DEFAULT 4,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_community_posts" ON community_posts;
CREATE POLICY "select_community_posts" ON community_posts FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_community_posts" ON community_posts;
CREATE POLICY "insert_own_community_posts" ON community_posts FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_community_posts" ON community_posts;
CREATE POLICY "update_own_community_posts" ON community_posts FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_community_posts" ON community_posts;
CREATE POLICY "delete_own_community_posts" ON community_posts FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- comments
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_comments" ON comments;
CREATE POLICY "select_comments" ON comments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_comments" ON comments;
CREATE POLICY "insert_own_comments" ON comments FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_comments" ON comments;
CREATE POLICY "delete_own_comments" ON comments FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- likes
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, user_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_likes" ON likes;
CREATE POLICY "select_likes" ON likes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_likes" ON likes;
CREATE POLICY "insert_own_likes" ON likes FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_likes" ON likes;
CREATE POLICY "delete_own_likes" ON likes FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- favorites (private per user)
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  item_key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, item_key)
);

ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_favorites" ON favorites;
CREATE POLICY "select_own_favorites" ON favorites FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_favorites" ON favorites;
CREATE POLICY "insert_own_favorites" ON favorites FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_favorites" ON favorites;
CREATE POLICY "delete_own_favorites" ON favorites FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- indexes
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments (post_id, created_at);
CREATE INDEX IF NOT EXISTS idx_likes_post_id ON likes (post_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites (user_id);

-- storage bucket for community photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('community', 'community', true)
ON CONFLICT (id) DO NOTHING;

-- storage policies
DROP POLICY IF EXISTS "community_read" ON storage.objects;
CREATE POLICY "community_read" ON storage.objects FOR SELECT
  TO anon, authenticated USING (bucket_id = 'community');

DROP POLICY IF EXISTS "community_insert_own" ON storage.objects;
CREATE POLICY "community_insert_own" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'community' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "community_update_own" ON storage.objects;
CREATE POLICY "community_update_own" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'community' AND auth.uid()::text = (storage.foldername(name))[1])
  WITH CHECK (bucket_id = 'community' AND auth.uid()::text = (storage.foldername(name))[1]);

DROP POLICY IF EXISTS "community_delete_own" ON storage.objects;
CREATE POLICY "community_delete_own" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'community' AND auth.uid()::text = (storage.foldername(name))[1]);
