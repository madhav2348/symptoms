import React from 'react';
import { PlusCircle, TrendingUp, Activity } from 'lucide-react';
import { ViewMode } from '../types';

interface NavigationProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Symptom Journal</h1>
              <p className="text-sm text-gray-500">Track your health patterns</p>
            </div>
          </div>
          
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewChange('log')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentView === 'log'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Symptom</span>
            </button>
            <button
              onClick={() => onViewChange('trends')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentView === 'trends'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>View Trends</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};