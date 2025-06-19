import React from 'react';

interface SeveritySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const severityEmojis = [
  { level: 1, emoji: '😊', label: 'Very Mild', color: 'from-green-400 to-green-500' },
  { level: 2, emoji: '🙂', label: 'Mild', color: 'from-green-400 to-green-500' },
  { level: 3, emoji: '😐', label: 'Mild', color: 'from-green-400 to-yellow-400' },
  { level: 4, emoji: '😕', label: 'Moderate', color: 'from-yellow-400 to-yellow-500' },
  { level: 5, emoji: '😟', label: 'Moderate', color: 'from-yellow-400 to-yellow-500' },
  { level: 6, emoji: '😰', label: 'Moderate', color: 'from-yellow-500 to-orange-400' },
  { level: 7, emoji: '😣', label: 'Severe', color: 'from-orange-400 to-orange-500' },
  { level: 8, emoji: '😖', label: 'Severe', color: 'from-orange-500 to-red-400' },
  { level: 9, emoji: '😫', label: 'Very Severe', color: 'from-red-400 to-red-500' },
  { level: 10, emoji: '😵', label: 'Extreme', color: 'from-red-500 to-red-600' }
];

export const SeveritySlider: React.FC<SeveritySliderProps> = ({ value, onChange }) => {
  const currentSeverity = severityEmojis.find(s => s.level === value) || severityEmojis[4];

  return (
    <div className="space-y-6">
      <label className="text-sm font-medium text-gray-700 block">
        Severity Level
      </label>
      
      {/* Current severity display */}
      <div className="flex items-center justify-center space-x-4">
        <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentSeverity.color} flex items-center justify-center shadow-lg transform transition-all duration-300`}>
          <span className="text-2xl">{currentSeverity.emoji}</span>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">{value}/10</div>
          <div className="text-sm text-gray-600">{currentSeverity.label}</div>
        </div>
      </div>
      
      {/* Slider */}
      <div className="relative">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, ${currentSeverity.color.split(' ')[1]} 0%, ${currentSeverity.color.split(' ')[3]} ${value * 10}%, #e5e7eb ${value * 10}%, #e5e7eb 100%)`
          }}
        />
        
        {/* Severity level indicators */}
        <div className="flex justify-between mt-3">
          {severityEmojis.map((severity) => (
            <button
              key={severity.level}
              type="button"
              onClick={() => onChange(severity.level)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                value === severity.level
                  ? `bg-gradient-to-br ${severity.color} shadow-md scale-110`
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              title={`${severity.level}/10 - ${severity.label}`}
            >
              <span className="text-sm">{severity.emoji}</span>
            </button>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>Mild</span>
          <span>Moderate</span>
          <span>Severe</span>
          <span>Extreme</span>
        </div>
      </div>
    </div>
  );
};