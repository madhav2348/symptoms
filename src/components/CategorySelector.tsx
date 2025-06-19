import React from 'react';
import { symptomCategories } from '../utils/categories';

interface CategorySelectorProps {
  selectedCategory: string;
  onChange: (category: string) => void;
  error?: string;
}

const categoryIcons = {
  pain: '⚡',
  digestive: '🫃',
  respiratory: '🫁',
  mental: '🧠',
  sleep: '😴',
  energy: '🔋',
  skin: '✨',
  other: '📋'
};

export const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  onChange, 
  error 
}) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 mb-3 block">
        Symptom Category
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {symptomCategories.map((category) => {
          const isSelected = selectedCategory === category.id;
          const icon = categoryIcons[category.id as keyof typeof categoryIcons] || '📋';
          
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onChange(category.id)}
              className={`relative p-4 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="text-center space-y-2">
                {/* Icon container */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ${
                  isSelected 
                    ? 'bg-blue-100 transform rotate-12' 
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <span className="text-2xl">{icon}</span>
                </div>
                
                {/* Category name */}
                <div className={`text-sm font-medium transition-colors duration-200 ${
                  isSelected ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {category.name}
                </div>
              </div>
              
              {/* Selection indicator */}
              {isSelected && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              
              {/* Hover effect */}
              <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                isSelected 
                  ? 'bg-blue-500 opacity-5' 
                  : 'bg-gray-500 opacity-0 hover:opacity-5'
              }`} />
            </button>
          );
        })}
      </div>
      
      {error && (
        <p className="text-red-600 text-xs mt-2 flex items-center space-x-1">
          <span>⚠️</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};