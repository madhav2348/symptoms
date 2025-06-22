export interface SymptomEntry {
  id: string;
  date: string;
  symptom: string;
  category: string;
  severity: number; 
  notes?: string;
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  duration?: number; 
  createdAt: string;
}

export interface SymptomCategory {
  id: string;
  name: string;
  color: string;
  icon: string;
}
