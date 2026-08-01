import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Clock,
  Package,
  CheckCircle2,
  TrendingUp,
  Calendar as CalendarIcon,
  BarChart3,
  LayoutDashboard,
  FolderOpen,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Upload,
  X,
  Check,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { useI18n } from '@/lib/i18n-context';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { Reveal } from '@/components/Reveal';
import { Button } from '@/components/ui/Button';
import {
  type PlannerProject,
  type PlannerTask,
  type PlannerPhoto,
  type NewProjectInput,
  daysUntil,
  formatDate,
  getWeekProgress,
} from '@/lib/planner-types';

type Tab = 'dashboard' | 'projects' | 'calendar' | 'stats';

export function CrochetPlannerPage() {
  const { dict, locale } = useI18n();
  const t = dict.planner;
  const { user } = useAuth();

  const [tab, setTab] = useState<Tab>('dashboard');
  const [projects, setProjects] = useState<PlannerProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<PlannerProject | null>(null);

  const load = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    const { data, error: err } = await supabase
      .from('planner_projects')
      .select('*')
      .order('updated_at', { ascending: false });

    if (err) {
      setError(err.message);
      setLoading(false);
      return;
    }
    setProjects((data ?? []) as PlannerProject[]);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <p className="text-muted-foreground">{t.signInPrompt}</p>
        <Link to="/login" className="mt-4 inline-block">
          <Button>{dict.nav.login}</Button>
        </Link>
      </div>
    );
  }

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => {
          setSelectedProject(null);
          load();
        }}
        onUpdate={(p) => setSelectedProject(p)}
      />
    );
  }

  if (showForm) {
    return (
      <ProjectForm
        onCancel={() => setShowForm(false)}
        onCreated={() => {
          setShowForm(false);
          load();
        }}
      />
    );
  }

  const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: 'dashboard', label: t.tabs.dashboard, icon: LayoutDashboard },
    { id: 'projects', label: t.tabs.projects, icon: FolderOpen },
    { id: 'calendar', label: t.tabs.calendar, icon: CalendarIcon },
    { id: 'stats', label: t.tabs.stats, icon: BarChart3 },
  ];

  return (
    <>
      <section className="hero-gradient relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-olive" />
            {t.title}
          </span>
          <h1 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl text-balance">{t.title}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{t.subtitle}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {/* Tab navigation */}
        <div className="no-scrollbar mb-8 flex gap-2 overflow-x-auto border-b border-border pb-px">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => setTab(tb.id)}
              className={`flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                tab === tb.id
                  ? 'border-olive text-olive'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <tb.icon className="h-4 w-4" />
              {tb.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 rounded-2xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid min-h-64 place-items-center">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-olive" />
          </div>
        ) : (
          <>
            {tab === 'dashboard' && (
              <Dashboard
                projects={projects}
                onCreate={() => setShowForm(true)}
                onSelect={setSelectedProject}
              />
            )}
            {tab === 'projects' && (
              <ProjectsList
                projects={projects}
                onCreate={() => setShowForm(true)}
                onSelect={setSelectedProject}
                onDeleted={load}
              />
            )}
            {tab === 'calendar' && <PlannerCalendar projects={projects} />}
            {tab === 'stats' && <StatsView projects={projects} />}
          </>
        )}
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Dashboard
// ---------------------------------------------------------------------------

function Dashboard({
  projects,
  onCreate,
  onSelect,
}: {
  projects: PlannerProject[];
  onCreate: () => void;
  onSelect: (p: PlannerProject) => void;
}) {
  const { dict, locale } = useI18n();
  const t = dict.planner.dashboard;
  const isAr = locale === 'ar';

  const active = projects.filter((p) => p.status === 'active');
  const completed = projects.filter((p) => p.status === 'completed');
  const totalHours = projects.reduce((sum, p) => sum + (p.yarn_amount ?? 0), 0);
  const totalYarn = projects.reduce((sum, p) => sum + (p.yarn_amount ?? 0), 0);
  const weekData = getWeekProgress(projects);

  const upcomingDeadlines = projects
    .filter((p) => p.status === 'active' && p.target_date)
    .map((p) => ({ ...p, daysLeft: daysUntil(p.target_date!) }))
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 5);

  const maxWeek = Math.max(...weekData.map((w) => w.value), 1);

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">
              {t.welcome} {isAr ? '👋' : ''}
            </h2>
            <p className="text-sm text-muted-foreground">
              {active.length} {t.activeProjects.toLowerCase()} · {completed.length} {t.completedProjects.toLowerCase()}
            </p>
          </div>
          <Button onClick={onCreate}>
            <Plus className="h-4 w-4" />
            {t.createFirst}
          </Button>
        </div>
      </Reveal>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard icon={FolderOpen} label={t.activeProjects} value={String(active.length)} color="text-olive" />
        <StatCard icon={CheckCircle2} label={t.completedProjects} value={String(completed.length)} color="text-success" />
        <StatCard icon={Clock} label={t.totalHours} value={String(totalHours)} color="text-brown" />
        <StatCard icon={Package} label={t.totalYarn} value={totalYarn.toLocaleString()} color="text-sage" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weekly progress chart */}
        <Reveal>
          <div className="surface p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <TrendingUp className="h-4 w-4 text-olive" />
              {t.weeklyProgress}
            </h3>
            <div className="mt-6 flex items-end justify-between gap-2" style={{ height: '160px' }}>
              {weekData.map((w, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-olive/40 to-olive transition-all duration-700"
                      style={{ height: `${(w.value / maxWeek) * 100}%`, minHeight: w.value > 0 ? '8px' : '2px' }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{w.day}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Upcoming deadlines */}
        <Reveal delay={100}>
          <div className="surface p-6">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <AlertCircle className="h-4 w-4 text-brown" />
              {t.deadlines}
            </h3>
            {upcomingDeadlines.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">{t.noDeadlines}</p>
            ) : (
              <div className="mt-4 space-y-3">
                {upcomingDeadlines.map((p) => {
                  const overdue = p.daysLeft < 0;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelect(p)}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-border bg-muted/30 px-4 py-3 text-start transition-colors hover:border-olive/30"
                    >
                      <span className="truncate text-sm font-medium">{p.name}</span>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          overdue ? 'bg-error/15 text-error' : p.daysLeft <= 3 ? 'bg-warning/15 text-warning' : 'bg-secondary text-muted-foreground'
                        }`}
                      >
                        {overdue ? t.overdue : `${p.daysLeft} ${t.daysLeft}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Recent projects */}
      {projects.length > 0 && (
        <div>
          <h3 className="mb-4 text-lg font-semibold">{t.recentProjects}</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={Math.min(i * 60, 240)}>
                <ProjectCard project={p} onClick={() => onSelect(p)} />
              </Reveal>
            ))}
          </div>
        </div>
      )}

      {projects.length === 0 && (
        <div className="surface grid min-h-48 place-items-center p-8 text-center">
          <div>
            <p className="text-sm text-muted-foreground">{t.noProjects}</p>
            <Button onClick={onCreate} className="mt-4">
              <Plus className="h-4 w-4" />
              {t.createFirst}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Projects List
// ---------------------------------------------------------------------------

function ProjectsList({
  projects,
  onCreate,
  onSelect,
  onDeleted,
}: {
  projects: PlannerProject[];
  onCreate: () => void;
  onSelect: (p: PlannerProject) => void;
  onDeleted: () => void;
}) {
  const { dict } = useI18n();
  const t = dict.planner;

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const filtered = projects.filter((p) => filter === 'all' || p.status === filter);

  const del = async (p: PlannerProject) => {
    await supabase.from('planner_projects').delete().eq('id', p.id);
    onDeleted();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {(['all', 'active', 'completed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                filter === f ? 'border-olive bg-olive text-cream' : 'border-border bg-card text-muted-foreground hover:border-olive/40'
              }`}
            >
              {f === 'all' ? dict.planner.tabs.projects : f === 'active' ? t.dashboard.activeProjects : t.dashboard.completedProjects}
            </button>
          ))}
        </div>
        <Button onClick={onCreate}>
          <Plus className="h-4 w-4" />
          {t.dashboard.createFirst}
        </Button>
      </div>

      {filtered.length === 0 ? (
        <div className="surface grid min-h-48 place-items-center p-8 text-center">
          <p className="text-sm text-muted-foreground">{t.dashboard.noProjects}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i * 60, 240)}>
              <ProjectCard project={p} onClick={() => onSelect(p)} onDelete={() => del(p)} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Project Card
// ---------------------------------------------------------------------------

function ProjectCard({
  project,
  onClick,
  onDelete,
}: {
  project: PlannerProject;
  onClick: () => void;
  onDelete?: () => void;
}) {
  const { dict, locale } = useI18n();
  const t = dict.planner.detail;
  const isAr = locale === 'ar';
  const cat = isAr
    ? dict.planner.categories[dict.planner.categories.indexOf(project.category)] ?? project.category
    : project.category;
  const isCompleted = project.status === 'completed' || project.progress >= 100;

  return (
    <article className="surface lift group cursor-pointer overflow-hidden" onClick={onClick}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[11px] font-medium uppercase tracking-wider text-olive">{cat}</span>
            <h3 className="mt-1 truncate text-base font-semibold">{project.name}</h3>
          </div>
          {isCompleted && (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-[11px] font-semibold text-success">
              <CheckCircle2 className="h-3 w-3" />
              {t.completedBadge}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{t.progress}</span>
            <span className="font-semibold text-foreground">{project.progress}%</span>
          </div>
          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className={`h-full rounded-full transition-all duration-700 ${isCompleted ? 'bg-success' : 'bg-olive'}`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formatDate(project.start_date, locale)}
          </span>
          {project.target_date && (
            <>
              <span className="h-3 w-px bg-border" />
              <span>{formatDate(project.target_date, locale)}</span>
            </>
          )}
        </div>

        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="mt-4 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-error"
          >
            <Trash2 className="h-3.5 w-3.5" />
            {dict.planner.detail.deleteProject}
          </button>
        )}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Project Form
// ---------------------------------------------------------------------------

function ProjectForm({ onCancel, onCreated }: { onCancel: () => void; onCreated: () => void }) {
  const { dict, locale } = useI18n();
  const t = dict.planner.create;
  const { user } = useAuth();
  const isAr = locale === 'ar';

  const [form, setForm] = useState<NewProjectInput>({
    name: '',
    category: dict.planner.categories[0],
    pattern: '',
    start_date: new Date().toISOString().slice(0, 10),
    target_date: '',
    skill_level: dict.planner.skillLevels[0],
    yarn_type: '',
    hook_size: '',
    yarn_amount: undefined,
    notes: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!user || !form.name.trim()) return;
    setSaving(true);
    setError(null);
    const payload = {
      name: form.name.trim(),
      category: form.category,
      pattern: form.pattern?.trim() || null,
      start_date: form.start_date,
      target_date: form.target_date || null,
      skill_level: form.skill_level,
      yarn_type: form.yarn_type,
      hook_size: form.hook_size,
      yarn_amount: form.yarn_amount ?? null,
      notes: form.notes?.trim() || null,
    };
    const { error: err } = await supabase.from('planner_projects').insert(payload);
    setSaving(false);
    if (err) {
      setError(err.message);
      return;
    }
    onCreated();
  };

  const cats = isAr ? dict.planner.categories : dict.planner.categories;
  const skillCats = isAr ? dict.planner.skillLevels : dict.planner.skillLevels;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          {dict.planner.detail.back}
        </button>
      </div>

      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Reveal>
          <div className="surface p-6 sm:p-8">
            <h1 className="text-2xl font-semibold">{t.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{t.subtitle}</p>

            {error && (
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
                <AlertCircle className="h-4 w-4" />
                {error}
              </div>
            )}

            <div className="mt-6 grid gap-5">
              <Field label={t.projectName}>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={t.projectNamePlaceholder}
                  className="h-11 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.category}>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="h-11 rounded-2xl border border-input bg-card px-3 text-sm outline-none focus:border-olive/50"
                  >
                    {cats.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label={t.skillLevel}>
                  <select
                    value={form.skill_level}
                    onChange={(e) => setForm({ ...form, skill_level: e.target.value })}
                    className="h-11 rounded-2xl border border-input bg-card px-3 text-sm outline-none focus:border-olive/50"
                  >
                    {skillCats.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field label={t.pattern}>
                <input
                  value={form.pattern}
                  onChange={(e) => setForm({ ...form, pattern: e.target.value })}
                  placeholder={t.patternPlaceholder}
                  className="h-11 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={t.startDate}>
                  <input
                    type="date"
                    value={form.start_date}
                    onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                    className="h-11 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
                  />
                </Field>
                <Field label={t.targetDate}>
                  <input
                    type="date"
                    value={form.target_date}
                    onChange={(e) => setForm({ ...form, target_date: e.target.value })}
                    className="h-11 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
                  />
                </Field>
              </div>

              <div className="grid gap-5 sm:grid-cols-3">
                <Field label={t.yarnType}>
                  <input
                    value={form.yarn_type}
                    onChange={(e) => setForm({ ...form, yarn_type: e.target.value })}
                    placeholder="DK"
                    className="h-11 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
                  />
                </Field>
                <Field label={t.hookSize}>
                  <input
                    value={form.hook_size}
                    onChange={(e) => setForm({ ...form, hook_size: e.target.value })}
                    placeholder="4.0mm"
                    className="h-11 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
                  />
                </Field>
                <Field label={t.yarnAmount}>
                  <input
                    type="number"
                    value={form.yarn_amount ?? ''}
                    onChange={(e) => setForm({ ...form, yarn_amount: e.target.value ? Number(e.target.value) : undefined })}
                    placeholder={t.yarnAmountPlaceholder}
                    className="h-11 rounded-2xl border border-input bg-background px-4 text-sm outline-none focus:border-olive/50"
                  />
                </Field>
              </div>

              <Field label={t.notes}>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder={t.notesPlaceholder}
                  rows={4}
                  className="resize-none rounded-2xl border border-input bg-background p-4 text-sm outline-none focus:border-olive/50"
                />
              </Field>

              <div className="flex gap-3">
                <Button onClick={submit} disabled={saving || !form.name.trim()}>
                  {saving ? t.creating : t.create}
                </Button>
                <Button variant="outline" onClick={onCancel}>
                  {t.cancel}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Project Detail
// ---------------------------------------------------------------------------

function ProjectDetail({
  project,
  onBack,
  onUpdate,
}: {
  project: PlannerProject;
  onBack: () => void;
  onUpdate: (p: PlannerProject) => void;
}) {
  const { dict, locale } = useI18n();
  const t = dict.planner.detail;
  const { user } = useAuth();
  const isAr = locale === 'ar';

  const [progress, setProgress] = useState(project.progress);
  const [progressDebounce, setProgressDebounce] = useState<NodeJS.Timeout | null>(null);
  const [tasks, setTasks] = useState<PlannerTask[]>([]);
  const [newTask, setNewTask] = useState('');
  const [photos, setPhotos] = useState<PlannerPhoto[]>([]);
  const [notes, setNotes] = useState(project.notes ?? '');
  const [notesSaving, setNotesSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');

  const loadDetail = useCallback(async () => {
    const [tasksRes, photosRes] = await Promise.all([
      supabase.from('planner_tasks').select('*').eq('project_id', project.id).order('created_at', { ascending: true }),
      supabase.from('planner_photos').select('*').eq('project_id', project.id).order('created_at', { ascending: false }),
    ]);
    if (tasksRes.data) setTasks(tasksRes.data as PlannerTask[]);
    if (photosRes.data) setPhotos(photosRes.data as PlannerPhoto[]);
  }, [project.id]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);

  const updateProgress = (val: number) => {
    setProgress(val);
    if (progressDebounce) clearTimeout(progressDebounce);
    const timer = setTimeout(async () => {
      const newStatus = val >= 100 ? 'completed' : 'active';
      const { data } = await supabase
        .from('planner_projects')
        .update({ progress: val, status: newStatus })
        .eq('id', project.id)
        .select('*')
        .single();
      if (data) onUpdate(data as PlannerProject);
    }, 500);
    setProgressDebounce(timer);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    const { data } = await supabase
      .from('planner_tasks')
      .insert({ project_id: project.id, content: newTask.trim() })
      .select('*')
      .single();
    if (data) {
      setTasks([...(tasks as PlannerTask[]), data as PlannerTask]);
      setNewTask('');
    }
  };

  const toggleTask = async (task: PlannerTask) => {
    setTasks(tasks.map((t2) => (t2.id === task.id ? { ...t2, completed: !t2.completed } : t2)));
    await supabase.from('planner_tasks').update({ completed: !task.completed }).eq('id', task.id);
  };

  const deleteTask = async (task: PlannerTask) => {
    setTasks(tasks.filter((t2) => t2.id !== task.id));
    await supabase.from('planner_tasks').delete().eq('id', task.id);
  };

  const uploadPhoto = async (file: File) => {
    if (!user) return;
    setUploading(true);
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `${user.id}/${crypto.randomUUID()}.${ext}`;
    const { error: upErr } = await supabase.storage.from('planner').upload(path, file);
    if (upErr) {
      setUploading(false);
      return;
    }
    const { data: pub } = supabase.storage.from('planner').getPublicUrl(path);
    const { data } = await supabase
      .from('planner_photos')
      .insert({ project_id: project.id, image_url: pub.publicUrl, caption: caption.trim() || null })
      .select('*')
      .single();
    if (data) {
      setPhotos([data as PlannerPhoto, ...photos]);
      setCaption('');
    }
    setUploading(false);
  };

  const deletePhoto = async (photo: PlannerPhoto) => {
    setPhotos(photos.filter((p) => p.id !== photo.id));
    await supabase.from('planner_photos').delete().eq('id', photo.id);
  };

  const saveNotes = async () => {
    setNotesSaving(true);
    const { data } = await supabase
      .from('planner_projects')
      .update({ notes: notes.trim() || null })
      .eq('id', project.id)
      .select('*')
      .single();
    if (data) onUpdate(data as PlannerProject);
    setNotesSaving(false);
  };

  const deleteProject = async () => {
    await supabase.from('planner_projects').delete().eq('id', project.id);
    onBack();
  };

  const isCompleted = progress >= 100;
  const remaining = 100 - progress;
  const cat = isAr ? project.category : project.category;
  const skill = isAr ? project.skill_level : project.skill_level;

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
          {t.back}
        </button>
      </div>

      <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <Reveal>
          <div className="surface p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-olive">{cat}</span>
                <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">{project.name}</h1>
                {project.pattern && <p className="mt-1 text-sm text-muted-foreground">{t.pattern}: {project.pattern}</p>}
              </div>
              {isCompleted && (
                <span className="flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1.5 text-sm font-semibold text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  {t.completedBadge}
                </span>
              )}
            </div>

            {/* Meta info grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              <MetaItem label={t.startDate} value={formatDate(project.start_date, locale)} />
              <MetaItem label={t.targetDate} value={project.target_date ? formatDate(project.target_date, locale) : '-'} />
              <MetaItem label={t.skillLevel} value={skill} />
              <MetaItem label={t.yarnType} value={project.yarn_type || '-'} />
              <MetaItem label={t.hookSize} value={project.hook_size || '-'} />
              <MetaItem label={t.yarnAmount} value={project.yarn_amount ? `${project.yarn_amount}m` : '-'} />
            </div>
          </div>
        </Reveal>

        {/* Progress tracking */}
        <Reveal delay={50}>
          <div className="surface mt-6 p-6">
            <h2 className="text-sm font-semibold">{t.progress}</h2>
            <div className="mt-4 flex items-center gap-4">
              <input
                type="range"
                min={0}
                max={100}
                value={progress}
                onChange={(e) => updateProgress(Number(e.target.value))}
                className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-secondary accent-olive"
                style={{ accentColor: 'hsl(var(--olive))' }}
              />
              <span className="w-12 text-right text-lg font-semibold">{progress}%</span>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-success' : 'bg-olive'}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>{progress}% {t.completed}</span>
              <span>{remaining}% {t.remaining}</span>
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Task checklist */}
          <Reveal>
            <div className="surface p-6">
              <h2 className="text-sm font-semibold">{t.tasks}</h2>
              <div className="mt-4 flex gap-2">
                <input
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTask()}
                  placeholder={t.taskPlaceholder}
                  className="h-10 flex-1 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-olive/50"
                />
                <Button size="sm" onClick={addTask} disabled={!newTask.trim()}>
                  <Plus className="h-4 w-4" />
                  {t.addTask}
                </Button>
              </div>
              {tasks.length === 0 ? (
                <p className="mt-4 text-sm text-muted-foreground">{t.noTasks}</p>
              ) : (
                <ul className="mt-4 space-y-2">
                  {tasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 px-3 py-2.5">
                      <button
                        onClick={() => toggleTask(task)}
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 transition-colors ${
                          task.completed ? 'border-success bg-success text-cream' : 'border-border hover:border-olive'
                        }`}
                      >
                        {task.completed && <Check className="h-3 w-3" />}
                      </button>
                      <span className={`flex-1 text-sm ${task.completed ? 'text-muted-foreground line-through' : ''}`}>
                        {task.content}
                      </span>
                      <button
                        onClick={() => deleteTask(task)}
                        className="text-muted-foreground transition-colors hover:text-error"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>

          {/* Notes */}
          <Reveal delay={100}>
            <div className="surface p-6">
              <h2 className="text-sm font-semibold">{t.notes}</h2>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={t.notesPlaceholder}
                rows={6}
                className="mt-4 w-full resize-none rounded-xl border border-input bg-background p-4 text-sm outline-none focus:border-olive/50"
              />
              <Button size="sm" variant="outline" onClick={saveNotes} disabled={notesSaving} className="mt-3">
                {notesSaving ? t.saving : t.saveNotes}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Photo timeline */}
        <Reveal delay={150}>
          <div className="surface mt-6 p-6">
            <h2 className="text-sm font-semibold">{t.photoTimeline}</h2>

            {/* Upload area */}
            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex cursor-pointer items-center gap-2 rounded-full border border-input bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-olive/40">
                  <Upload className="h-4 w-4" />
                  {t.uploadPhoto}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => e.target.files?.[0] && uploadPhoto(e.target.files[0])}
                  />
                </label>
                <input
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={t.captionPlaceholder}
                  className="h-10 flex-1 rounded-xl border border-input bg-background px-3 text-sm outline-none focus:border-olive/50"
                />
              </div>
              {uploading && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-olive" />
                  {t.uploadPhoto}...
                </div>
              )}
            </div>

            {photos.length === 0 ? (
              <p className="mt-4 text-sm text-muted-foreground">{t.noPhotos}</p>
            ) : (
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative overflow-hidden rounded-2xl border border-border">
                    <img src={photo.image_url} alt={photo.caption ?? ''} className="aspect-square w-full object-cover" />
                    {photo.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-xs text-cream">{photo.caption}</p>
                      </div>
                    )}
                    <div className="absolute end-2 top-2 rounded-full bg-card/80 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur-sm">
                      {formatDate(photo.created_at, locale)}
                    </div>
                    <button
                      onClick={() => deletePhoto(photo)}
                      className="absolute start-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-card/80 text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity hover:text-error group-hover:opacity-100"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Reveal>

        {/* Delete project */}
        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={deleteProject} className="text-error hover:bg-error/5">
            <Trash2 className="h-4 w-4" />
            {t.deleteProject}
          </Button>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Calendar View
// ---------------------------------------------------------------------------

function PlannerCalendar({ projects }: { projects: PlannerProject[] }) {
  const { dict, locale } = useI18n();
  const t = dict.planner.calendar;
  const isAr = locale === 'ar';

  const [current, setCurrent] = useState(new Date());

  const year = current.getFullYear();
  const month = current.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const deadlineProjects = projects.filter((p) => p.target_date && p.status === 'active');
  const deadlineMap = new Map<string, PlannerProject[]>();
  deadlineProjects.forEach((p) => {
    const key = p.target_date!;
    const arr = deadlineMap.get(key) ?? [];
    arr.push(p);
    deadlineMap.set(key, arr);
  });

  const upcoming = deadlineProjects
    .map((p) => ({ ...p, daysLeft: daysUntil(p.target_date!) }))
    .filter((p) => p.daysLeft >= 0)
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 8);

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));
  const goToday = () => setCurrent(new Date());

  const today = new Date();
  const isToday = (d: number) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear();

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <Reveal>
        <div className="surface p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              {t.months[month]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={prevMonth} aria-label={t.prevMonth}>
                <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
              </Button>
              <Button variant="ghost" size="sm" onClick={goToday}>
                {t.today}
              </Button>
              <Button variant="ghost" size="icon" onClick={nextMonth} aria-label={t.nextMonth}>
                <ChevronRight className="h-4 w-4 rtl:rotate-180" />
              </Button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-1">
            {t.weekdays.map((day) => (
              <div key={day} className="pb-2 text-center text-[11px] font-medium text-muted-foreground">
                {day}
              </div>
            ))}
            {cells.map((d, i) => {
              if (d === null) return <div key={i} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              const dayDeadlines = deadlineMap.get(dateStr) ?? [];
              return (
                <div
                  key={i}
                  className={`flex min-h-16 flex-col items-center rounded-xl border p-1.5 text-xs transition-colors ${
                    isToday(d) ? 'border-olive bg-olive/5' : 'border-border bg-muted/20'
                  }`}
                >
                  <span className={`font-medium ${isToday(d) ? 'text-olive' : 'text-muted-foreground'}`}>{d}</span>
                  {dayDeadlines.length > 0 && (
                    <div className="mt-1 flex flex-1 flex-col justify-end gap-0.5">
                      {dayDeadlines.slice(0, 2).map((p) => (
                        <div
                          key={p.id}
                          className="truncate rounded-md bg-brown/15 px-1 py-0.5 text-[9px] font-medium text-brown"
                          title={p.name}
                        >
                          {p.name}
                        </div>
                      ))}
                      {dayDeadlines.length > 2 && (
                        <span className="text-[9px] text-muted-foreground">+{dayDeadlines.length - 2}</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="surface p-6">
          <h3 className="flex items-center gap-2 text-sm font-semibold">
            <AlertCircle className="h-4 w-4 text-brown" />
            {t.deadlines}
          </h3>
          {upcoming.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">{t.noDeadlines}</p>
          ) : (
            <div className="mt-4 space-y-3">
              {upcoming.map((p) => (
                <div key={p.id} className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {formatDate(p.target_date!, locale)} · {p.daysLeft} {dict.planner.dashboard.daysLeft}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Reveal>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stats View
// ---------------------------------------------------------------------------

function StatsView({ projects }: { projects: PlannerProject[] }) {
  const { dict, locale } = useI18n();
  const t = dict.planner.stats;
  const isAr = locale === 'ar';

  const total = projects.length;
  const finished = projects.filter((p) => p.status === 'completed').length;
  const current = projects.filter((p) => p.status === 'active').length;
  const totalHours = projects.reduce((sum, p) => sum + (p.yarn_amount ?? 0), 0);
  const completionRate = total > 0 ? Math.round((finished / total) * 100) : 0;

  const completedProjects = projects.filter((p) => p.status === 'completed' && p.target_date);
  const avgDays =
    completedProjects.length > 0
      ? Math.round(
          completedProjects.reduce((sum, p) => {
            const start = new Date(p.start_date).getTime();
            const end = new Date(p.target_date!).getTime();
            return sum + Math.max(1, (end - start) / (1000 * 60 * 60 * 24));
          }, 0) / completedProjects.length,
        )
      : 0;

  const byCategory = new Map<string, number>();
  projects.forEach((p) => {
    byCategory.set(p.category, (byCategory.get(p.category) ?? 0) + 1);
  });
  const maxCat = Math.max(...byCategory.values(), 1);

  if (total === 0) {
    return (
      <div className="surface grid min-h-48 place-items-center p-8 text-center">
        <p className="text-sm text-muted-foreground">{t.noData}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <StatCard icon={FolderOpen} label={t.totalProjects} value={String(total)} color="text-olive" />
        <StatCard icon={CheckCircle2} label={t.finishedProjects} value={String(finished)} color="text-success" />
        <StatCard icon={TrendingUp} label={t.currentProjects} value={String(current)} color="text-brown" />
        <StatCard icon={Clock} label={t.totalHours} value={String(totalHours)} color="text-sage" />
        <StatCard icon={CalendarIcon} label={t.avgCompletionTime} value={avgDays > 0 ? `${avgDays}d` : '-'} color="text-brown" />
        <StatCard icon={BarChart3} label={t.completionRate} value={`${completionRate}%`} color="text-olive" />
      </div>

      <Reveal>
        <div className="surface p-6">
          <h3 className="text-sm font-semibold">{t.byCategory}</h3>
          <div className="mt-6 space-y-3">
            {Array.from(byCategory.entries()).map(([cat, count]) => (
              <div key={cat}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{cat}</span>
                  <span className="font-semibold">{count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-olive/60 to-olive transition-all duration-700"
                    style={{ width: `${(count / maxCat) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Shared components
// ---------------------------------------------------------------------------

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="surface p-4">
      <Icon className={`h-5 w-5 ${color}`} />
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-muted/20 p-3">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium">{label}</label>
      {children}
    </div>
  );
}
