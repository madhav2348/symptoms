export interface SymptomEntry {
  id: string;
  date: string;
  symptom: string;
  category: string;
  severity: number; // 1-10 scale
  notes?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  duration?: number; // in minutes
  createdAt: string;
}

export interface SymptomCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export type ViewMode = 'log' | 'trends';