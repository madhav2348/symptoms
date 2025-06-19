import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { SymptomForm } from './components/SymptomForm';
import { TrendsView } from './components/TrendsView';
import { ViewMode } from './types';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('log');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="py-8 px-4 sm:px-6 lg:px-8">
        {currentView === 'log' ? (
          <SymptomForm onEntryAdded={handleDataChange} />
        ) : (
          <TrendsView key={refreshKey} onDataChange={handleDataChange} />
        )}
      </main>
      
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Track your symptoms consistently for better health insights
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;