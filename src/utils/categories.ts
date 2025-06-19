import { SymptomCategory } from '../types';

export const symptomCategories: SymptomCategory[] = [
  { id: 'pain', name: 'Pain & Discomfort', color: 'bg-red-100 text-red-800', icon: 'Zap' },
  { id: 'digestive', name: 'Digestive', color: 'bg-orange-100 text-orange-800', icon: 'Stomach' },
  { id: 'respiratory', name: 'Respiratory', color: 'bg-blue-100 text-blue-800', icon: 'Wind' },
  { id: 'mental', name: 'Mental Health', color: 'bg-purple-100 text-purple-800', icon: 'Brain' },
  { id: 'sleep', name: 'Sleep', color: 'bg-indigo-100 text-indigo-800', icon: 'Moon' },
  { id: 'energy', name: 'Energy', color: 'bg-yellow-100 text-yellow-800', icon: 'Battery' },
  { id: 'skin', name: 'Skin', color: 'bg-pink-100 text-pink-800', icon: 'Sparkles' },
  { id: 'other', name: 'Other', color: 'bg-gray-100 text-gray-800', icon: 'MoreHorizontal' }
];

export const getSeverityColor = (severity: number): string => {
  if (severity <= 3) return 'text-green-600 bg-green-50';
  if (severity <= 6) return 'text-yellow-600 bg-yellow-50';
  if (severity <= 8) return 'text-orange-600 bg-orange-50';
  return 'text-red-600 bg-red-50';
};

export const getSeverityLabel = (severity: number): string => {
  if (severity <= 3) return 'Mild';
  if (severity <= 6) return 'Moderate';
  if (severity <= 8) return 'Severe';
  return 'Very Severe';
};