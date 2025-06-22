import { useState, useEffect } from "react";

interface SeveritySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const severityEmojis = [
  {
    level: 1,
    emoji: "😊",
    label: "Very Mild",
    color: "from-green-400 to-green-500",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    level: 2,
    emoji: "🙂",
    label: "Mild",
    color: "from-green-400 to-green-500",
    bgColor: "bg-green-100",
    textColor: "text-green-800",
  },
  {
    level: 3,
    emoji: "😐",
    label: "Mild",
    color: "from-green-400 to-yellow-400",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  {
    level: 4,
    emoji: "😕",
    label: "Moderate",
    color: "from-yellow-400 to-yellow-500",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  {
    level: 5,
    emoji: "😟",
    label: "Moderate",
    color: "from-yellow-400 to-yellow-500",
    bgColor: "bg-yellow-100",
    textColor: "text-yellow-800",
  },
  {
    level: 6,
    emoji: "😰",
    label: "Moderate",
    color: "from-yellow-500 to-orange-400",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
  {
    level: 7,
    emoji: "😣",
    label: "Severe",
    color: "from-orange-400 to-orange-500",
    bgColor: "bg-orange-100",
    textColor: "text-orange-800",
  },
  {
    level: 8,
    emoji: "😖",
    label: "Severe",
    color: "from-orange-500 to-red-400",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  {
    level: 9,
    emoji: "😫",
    label: "Very Severe",
    color: "from-red-400 to-red-500",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
  {
    level: 10,
    emoji: "😵",
    label: "Extreme",
    color: "from-red-500 to-red-600",
    bgColor: "bg-red-100",
    textColor: "text-red-800",
  },
];

export function SeveritySlider({ value, onChange }: SeveritySliderProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  const currentSeverity =
    severityEmojis.find((s) => s.level === value) || severityEmojis[4];
  const displaySeverity =
    severityEmojis.find((s) => s.level === displayValue) || severityEmojis[4];

  useEffect(() => {
    if (value !== displayValue) {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        setDisplayValue(value);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [value, displayValue]);

  const handleSliderChange = (newValue: number) => {
    onChange(newValue);
  };

  // Create gradient for slider track
  const getSliderBackground = () => {
    const percentage = ((value - 1) / 9) * 100;
    const colors = currentSeverity.color.match(/from-(\S+)\s+to-(\S+)/);
    if (colors) {
      // const fromColor = colors[1];
      // const toColor = colors[2];
      return `linear-gradient(to right, rgb(34 197 94) 0%, rgb(239 68 68) ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
    }
    return `linear-gradient(to right, rgb(34 197 94) 0%, rgb(239 68 68) ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  };

  return (
    <div className="space-y-6 w-full">
      <label className="text-sm font-medium text-gray-700 block">
        Severity Level
      </label>
      <div className="flex items-center justify-center space-x-6">
        <div className="relative">
          <div
            className={`w-20 h-20 rounded-full bg-gradient-to-br ${
              currentSeverity.color
            } flex items-center justify-center shadow-lg transform transition-all duration-500 ease-in-out ${
              isTransitioning ? "scale-95 rotate-12" : "scale-100 rotate-0"
            }`}
            style={{
              animation: isTransitioning ? "pulse 0.3s ease-in-out" : "none",
            }}
          >
            <span
              className={`text-3xl transition-all duration-300 ${
                isTransitioning ? "scale-75 opacity-0" : "scale-100 opacity-100"
              }`}
            >
              {displaySeverity.emoji}
            </span>
          </div>

          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${
              currentSeverity.color
            } opacity-30 transform transition-all duration-300 ${
              isTransitioning ? "scale-125 opacity-0" : "scale-100 opacity-0"
            }`}
          />
        </div>

        <div className="text-center">
          <div
            className={`text-3xl font-bold transition-all duration-300 ${
              currentSeverity.textColor
            } ${isTransitioning ? "scale-110" : "scale-100"}`}
          >
            {value}/10
          </div>
          <div
            className={`text-sm font-medium px-3 py-1 rounded-full transition-all duration-300 ${
              currentSeverity.bgColor
            } ${currentSeverity.textColor} ${
              isTransitioning ? "scale-105" : "scale-100"
            }`}
          >
            {currentSeverity.label}
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative">
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
            className="w-full h-4 rounded-lg appearance-none cursor-pointer transition-all duration-200 hover:h-5 slider-custom"
            style={{
              background: getSliderBackground(),
            }}
          />

          <div
            className={`absolute top-1/2 w-6 h-6 bg-white rounded-full shadow-lg border-2 transform -translate-y-1/2 transition-all duration-300 pointer-events-none ${
              isTransitioning ? "scale-125" : "scale-100"
            }`}
            style={{
              left: `calc(${((value - 1) / 9) * 100}% - 12px)`,
              borderColor: currentSeverity.color.includes("green")
                ? "#22c55e"
                : currentSeverity.color.includes("yellow")
                ? "#eab308"
                : currentSeverity.color.includes("orange")
                ? "#f97316"
                : "#ef4444",
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-gray-500 mt-3">
          {["Mild", "Moderate", "Severe", "Extreme"].map((label, index) => (
            <span
              key={label}
              className={`transition-all duration-300 ${
                (value >= 1 && value <= 3 && index === 0) ||
                (value >= 4 && value <= 6 && index === 1) ||
                (value >= 7 && value <= 8 && index === 2) ||
                (value >= 9 && value <= 10 && index === 3)
                  ? "font-semibold text-gray-700 scale-110"
                  : "font-normal text-gray-500"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
