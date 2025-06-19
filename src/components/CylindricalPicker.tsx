import React, { useRef, useEffect, useState } from 'react';

interface CylindricalPickerProps {
  options: string[] | number[];
  value: string | number;
  onChange: (value: string | number) => void;
  label: string;
  formatOption?: (option: string | number) => string;
}

export const CylindricalPicker: React.FC<CylindricalPickerProps> = ({
  options,
  value,
  onChange,
  label,
  formatOption = (option) => option.toString()
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const itemHeight = 48;
  const visibleItems = 5;
  const containerHeight = itemHeight * visibleItems;

  useEffect(() => {
    const currentIndex = options.findIndex(option => option === value);
    if (containerRef.current && currentIndex !== -1) {
      const targetScroll = currentIndex * itemHeight;
      containerRef.current.scrollTop = targetScroll;
    }
  }, [value, options, itemHeight]);

  const snapToNearestItem = () => {
    if (!containerRef.current) return;
    
    const scrollTop = containerRef.current.scrollTop;
    const index = Math.round(scrollTop / itemHeight);
    const clampedIndex = Math.max(0, Math.min(index, options.length - 1));
    const targetScroll = clampedIndex * itemHeight;
    
    // Smooth scroll to the nearest item
    containerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    // Update the selected value
    if (options[clampedIndex] !== value) {
      onChange(options[clampedIndex]);
    }
  };

  const handleScroll = () => {
    setIsScrolling(true);
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Set new timeout to snap after scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      snapToNearestItem();
    }, 150);
  };

  const handleItemClick = (option: string | number, index: number) => {
    if (!containerRef.current) return;
    
    const targetScroll = index * itemHeight;
    containerRef.current.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
    
    onChange(option);
  };

  return (
    <div className="relative">
      <label className="text-sm font-medium text-gray-700 mb-2 block">{label}</label>
      <div className="relative bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
        {/* Selection indicator */}
        <div 
          className="absolute left-0 right-0 bg-blue-50 border-y-2 border-blue-200 pointer-events-none z-10 transition-all duration-200"
          style={{
            top: `${itemHeight * 2}px`,
            height: `${itemHeight}px`
          }}
        />
        
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white via-white/80 to-transparent pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
        
        <div
          ref={containerRef}
          className="overflow-y-scroll scrollbar-hide cursor-grab active:cursor-grabbing"
          style={{ height: `${containerHeight}px` }}
          onScroll={handleScroll}
        >
          {/* Top padding */}
          <div style={{ height: `${itemHeight * 2}px` }} />
          
          {options.map((option, index) => {
            const isSelected = option === value;
            return (
              <div
                key={index}
                className={`flex items-center justify-center transition-all duration-200 cursor-pointer select-none ${
                  isSelected 
                    ? 'text-blue-600 font-semibold scale-110 bg-blue-50/50' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
                style={{ height: `${itemHeight}px` }}
                onClick={() => handleItemClick(option, index)}
              >
                <span className="px-4 py-2 rounded-lg transition-all duration-200">
                  {formatOption(option)}
                </span>
              </div>
            );
          })}
          
          {/* Bottom padding */}
          <div style={{ height: `${itemHeight * 2}px` }} />
        </div>
      </div>
    </div>
  );
};