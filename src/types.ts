export interface Project {
  id: string;
  title: string;
  category: string;
  tags: string[];
  image: string;
  description: string;
  span: string; // Tailwind grid span format e.g. "md:col-span-7"
  link?: string;
  github?: string;
  achievement?: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  summary: string;
}

export interface StatMetric {
  id: string;
  label: string;
  value: string;
  description: string;
  icon?: string;
}
