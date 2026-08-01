export interface PlannerProject {
  id: string;
  user_id: string;
  name: string;
  category: string;
  pattern: string | null;
  start_date: string;
  target_date: string | null;
  skill_level: string;
  yarn_type: string;
  hook_size: string;
  yarn_amount: number | null;
  notes: string | null;
  progress: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface PlannerTask {
  id: string;
  project_id: string;
  content: string;
  completed: boolean;
  created_at: string;
}

export interface PlannerPhoto {
  id: string;
  project_id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface NewProjectInput {
  name: string;
  category: string;
  pattern?: string;
  start_date: string;
  target_date?: string;
  skill_level: string;
  yarn_type: string;
  hook_size: string;
  yarn_amount?: number;
  notes?: string;
}

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr: string, locale: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getWeekProgress(projects: PlannerProject[]): { day: string; value: number }[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const now = new Date();
  const dayOfWeek = now.getDay();
  const week: { day: string; value: number }[] = [];

  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    const dateStr = date.toISOString().slice(0, 10);
    const dayName = days[date.getDay()];
    // Count projects updated that day as activity
    const value = projects.filter((p) => p.updated_at.slice(0, 10) === dateStr).length;
    week.push({ day: dayName, value });
  }

  return week;
}
