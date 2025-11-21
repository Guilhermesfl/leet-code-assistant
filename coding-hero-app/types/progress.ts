// Unified progress tracker types
export interface Problem {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  section: string;
}

export interface TheoryItem {
  id: string;
  label: string;
  category: string;
  description?: string;
  slug?: string;
}

export type TabType = 'overview' | 'problems' | 'theory';

export interface TrackerStats {
  total: number;
  completed: number;
  easy?: number;
  medium?: number;
  hard?: number;
}

export interface ProgressData {
  problems: Problem[];
  theoryItems: TheoryItem[];
  problemStats: TrackerStats;
  theoryStats: TrackerStats;
}
