/*
# Create saved_patterns table

1. New Tables
- `saved_patterns`: stores a user's AI-generated crochet patterns so they can revisit them later.
  - `id` (uuid, primary key)
  - `user_id` (uuid, not null, defaults to auth.uid(), references auth.users with cascade delete)
  - `project_type` (text, not null) — e.g. bag, amigurumi, blanket
  - `skill_level` (text, not null)
  - `yarn_type` (text, not null)
  - `hook_size` (text, not null)
  - `pattern_language` (text, not null)
  - `custom_prompt` (text, nullable) — optional extra details the user typed
  - `pattern_data` (jsonb, not null) — the full generated pattern object (title, difficulty, hours, materials, steps, abbreviations, finishing, tips)
  - `created_at` (timestamptz, defaults to now)

2. Security
- Enable RLS on `saved_patterns`.
- Owner-scoped CRUD: each authenticated user can only access rows they own.
- SELECT, INSERT, UPDATE, DELETE all scoped to `auth.uid() = user_id`.
- `user_id` defaults to `auth.uid()` so client inserts omitting it succeed.

3. Indexes
- `idx_saved_patterns_user_id` on `user_id` for per-user list queries.
*/

CREATE TABLE IF NOT EXISTS saved_patterns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  project_type text NOT NULL,
  skill_level text NOT NULL,
  yarn_type text NOT NULL,
  hook_size text NOT NULL,
  pattern_language text NOT NULL,
  custom_prompt text,
  pattern_data jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE saved_patterns ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_saved_patterns" ON saved_patterns;
CREATE POLICY "select_own_saved_patterns" ON saved_patterns FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_saved_patterns" ON saved_patterns;
CREATE POLICY "insert_own_saved_patterns" ON saved_patterns FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_saved_patterns" ON saved_patterns;
CREATE POLICY "update_own_saved_patterns" ON saved_patterns FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_saved_patterns" ON saved_patterns;
CREATE POLICY "delete_own_saved_patterns" ON saved_patterns FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_saved_patterns_user_id ON saved_patterns (user_id);
