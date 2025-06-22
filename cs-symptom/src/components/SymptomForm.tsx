import React , { useState } from "react";
import { Calendar, Clock, FileText, Save, AlertCircle } from "lucide-react";
import { SymptomEntry } from "../types";
import { addEntry } from "../utils/storage";
import { SeveritySlider } from "./SeveritySlider";
import { CategorySelector } from "./CategorySelector";

interface SymptomFormProps {
  onEntryAdded: () => void;
}

export function SymptomForm({ onEntryAdded }: SymptomFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    symptom: "",
    category: "",
    severity: 5,
    notes: "",
    timeOfDay: "morning" as const,
    duration: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.symptom.trim()) {
      newErrors.symptom = "Symptom description is required";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const entry: SymptomEntry = {
      id: Date.now().toString(),
      date: formData.date,
      symptom: formData.symptom.trim(),
      category: formData.category,
      severity: formData.severity,
      notes: formData.notes.trim(),
      timeOfDay: formData.timeOfDay,
      duration: formData.duration ? parseInt(formData.duration) : undefined,
      createdAt: new Date().toISOString(),
    };

    try {
      addEntry(entry);

      // Reset form
      setFormData({
        date: new Date().toISOString().split("T")[0],
        symptom: "",
        category: "",
        severity: 5,
        notes: "",
        timeOfDay: "morning",
        duration: "",
      });

      onEntryAdded();

      // Show success feedback
      setTimeout(() => setIsSubmitting(false), 500);
    } catch (error) {
      console.error("Error saving entry:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-8">
       
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4" />
                <span>Date</span>
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                  errors.date ? "border-red-300" : "border-gray-300"
                }`}
              />
              {errors.date && (
                <p className="text-red-600 text-xs mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-3 h-3" />
                  <span>{errors.date}</span>
                </p>
              )}
            </div>

            <div>
              <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                <Clock className="w-4 h-4" />
                <span>Time of Day</span>
              </label>
              <select
                value={formData.timeOfDay}
                onChange={(e) =>
                  setFormData({ ...formData, timeOfDay: e.target.value as any })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>

    
          <CategorySelector
            selectedCategory={formData.category}
            onChange={(category) => setFormData({ ...formData, category })}
            error={errors.category}
          />


          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Symptom Description
            </label>
            <input
              type="text"
              value={formData.symptom}
              onChange={(e) =>
                setFormData({ ...formData, symptom: e.target.value })
              }
              placeholder="e.g., Headache, Nausea, Joint pain..."
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
                errors.symptom ? "border-red-300" : "border-gray-300"
              }`}
            />
            {errors.symptom && (
              <p className="text-red-600 text-xs mt-1 flex items-center space-x-1">
                <AlertCircle className="w-3 h-3" />
                <span>{errors.symptom}</span>
              </p>
            )}
          </div>

     
          <SeveritySlider
            value={formData.severity}
            onChange={(severity) => setFormData({ ...formData, severity })}
          />

   
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Duration (minutes) - Optional
            </label>
            <input
              type="number"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              placeholder="How long did it last?"
              min="1"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>


          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
              <FileText className="w-4 h-4" />
              <span>Additional Notes - Optional</span>
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Any additional details, triggers, or context..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all duration-200"
            />
          </div>

       
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex items-center justify-center space-x-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold transition-all duration-300 transform ${
              isSubmitting
                ? "from-green-600 to-green-700 scale-95"
                : "hover:from-blue-700 hover:to-indigo-700 hover:scale-105 hover:shadow-lg focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            }`}
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? "Saved Successfully!" : "Save Entry"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
