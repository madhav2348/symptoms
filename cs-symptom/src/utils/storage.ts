import { SymptomEntry } from '../types';

const STORAGE_KEY = 'symptom-journal-entries';

export const getStoredEntries = (): SymptomEntry[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const storeEntries = (entries: SymptomEntry[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error('Error writing to localStorage:', error);
  }
};

export const addEntry = (entry: SymptomEntry): void => {
  const entries = getStoredEntries();
  entries.push(entry);
  storeEntries(entries);
};

export const deleteEntry = (id: string): void => {
  const entries = getStoredEntries();
  const filtered = entries.filter(entry => entry.id !== id);
  storeEntries(filtered);
};