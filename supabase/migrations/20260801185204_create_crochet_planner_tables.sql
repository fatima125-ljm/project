-- Create Crochet Planner tables
-- Tables: planner_projects, planner_tasks, planner_photos
-- RLS enabled on all tables with owner-scoped policies
-- Storage bucket 'planner' created for progress photos

CREATE TABLE IF NOT EXISTS planner_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text NOT NULL,
  pattern text,
  start_date date NOT NULL DEFAULT CURRENT_DATE,
  target_date date,
  skill_level text NOT NULL DEFAULT 'Beginner',
  yarn_type text NOT NULL DEFAULT '',
  hook_size text NOT NULL DEFAULT '',
  yarn_amount numeric,
  notes text,
  progress integer NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE planner_projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_planner_projects" ON planner_projects;
CREATE POLICY "select_own_planner_projects" ON planner_projects FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_planner_projects" ON planner_projects;
CREATE POLICY "insert_own_planner_projects" ON planner_projects FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_planner_projects" ON planner_projects;
CREATE POLICY "update_own_planner_projects" ON planner_projects FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_planner_projects" ON planner_projects;
CREATE POLICY "delete_own_planner_projects" ON planner_projects FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_planner_projects_user_id ON planner_projects (user_id);

CREATE TABLE IF NOT EXISTS planner_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES planner_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  completed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE planner_tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_planner_tasks" ON planner_tasks;
CREATE POLICY "select_own_planner_tasks" ON planner_tasks FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM planner_projects WHERE planner_projects.id = planner_tasks.project_id AND planner_projects.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "insert_own_planner_tasks" ON planner_tasks;
CREATE POLICY "insert_own_planner_tasks" ON planner_tasks FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM planner_projects WHERE planner_projects.id = planner_tasks.project_id AND planner_projects.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "update_own_planner_tasks" ON planner_tasks;
CREATE POLICY "update_own_planner_tasks" ON planner_tasks FOR UPDATE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM planner_projects WHERE planner_projects.id = planner_tasks.project_id AND planner_projects.user_id = auth.uid())
  ) WITH CHECK (
    EXISTS (SELECT 1 FROM planner_projects WHERE planner_projects.id = planner_tasks.project_id AND planner_projects.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "delete_own_planner_tasks" ON planner_tasks;
CREATE POLICY "delete_own_planner_tasks" ON planner_tasks FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM planner_projects WHERE planner_projects.id = planner_tasks.project_id AND planner_projects.user_id = auth.uid())
  );

CREATE INDEX IF NOT EXISTS idx_planner_tasks_project_id ON planner_tasks (project_id);

CREATE TABLE IF NOT EXISTS planner_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id uuid NOT NULL REFERENCES planner_projects(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  caption text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE planner_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_planner_photos" ON planner_photos;
CREATE POLICY "select_own_planner_photos" ON planner_photos FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM planner_projects WHERE planner_projects.id = planner_photos.project_id AND planner_projects.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "insert_own_planner_photos" ON planner_photos;
CREATE POLICY "insert_own_planner_photos" ON planner_photos FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM planner_projects WHERE planner_projects.id = planner_photos.project_id AND planner_projects.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "delete_own_planner_photos" ON planner_photos;
CREATE POLICY "delete_own_planner_photos" ON planner_photos FOR DELETE
  TO authenticated USING (
    EXISTS (SELECT 1 FROM planner_projects WHERE planner_projects.id = planner_photos.project_id AND planner_projects.user_id = auth.uid())
  );

CREATE INDEX IF NOT EXISTS idx_planner_photos_project_id ON planner_photos (project_id);

CREATE OR REPLACE FUNCTION update_planner_projects_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_planner_projects_updated_at ON planner_projects;
CREATE TRIGGER trigger_planner_projects_updated_at
  BEFORE UPDATE ON planner_projects
  FOR EACH ROW
  EXECUTE FUNCTION update_planner_projects_updated_at();

INSERT INTO storage.buckets (id, name, public)
VALUES ('planner', 'planner', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "planner_storage_read" ON storage.objects;
CREATE POLICY "planner_storage_read" ON storage.objects FOR SELECT
  TO authenticated USING (bucket_id = 'planner');

DROP POLICY IF EXISTS "planner_storage_insert" ON storage.objects;
CREATE POLICY "planner_storage_insert" ON storage.objects FOR INSERT
  TO authenticated WITH CHECK (bucket_id = 'planner');

DROP POLICY IF EXISTS "planner_storage_update" ON storage.objects;
CREATE POLICY "planner_storage_update" ON storage.objects FOR UPDATE
  TO authenticated USING (bucket_id = 'planner');

DROP POLICY IF EXISTS "planner_storage_delete" ON storage.objects;
CREATE POLICY "planner_storage_delete" ON storage.objects FOR DELETE
  TO authenticated USING (bucket_id = 'planner');