import { useState, useMemo, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Calendar,
  Filter,
  Trash2,
  Clock,
  FileText,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { SymptomEntry } from "../types";
import {
  symptomCategories,
  getSeverityColor,
  getSeverityLabel,
} from "../utils/categories";
import { getStoredEntries, deleteEntry } from "../utils/storage";


interface TrendsViewProps {
  onDataChange: () => void;
}

export function TrendsView({ onDataChange }: TrendsViewProps) {
  const [entries, setEntries] = useState<SymptomEntry[]>(() =>
    getStoredEntries()
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"date" | "severity">("date");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch("http://localhost:3000/get");
        const data = await request.json()
        // const local  = [...entries]
        
        console.log(data);
        
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    };
    fetchData()
  },[]);

  const filteredEntries = useMemo(() => {
    let filtered = [...entries];
        console.log(` local entries ${filtered}`);

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (entry) => entry.category === selectedCategory
      );
    }

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return b.severity - a.severity;
    });

    return filtered;
  }, [entries, selectedCategory, sortBy]);

  const stats = useMemo(() => {
    if (entries.length === 0) return null;

    const avgSeverity =
      entries.reduce((sum, entry) => sum + entry.severity, 0) / entries.length;
    const mostCommonCategory = entries.reduce((acc, entry) => {
      acc[entry.category] = (acc[entry.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCategory = Object.entries(mostCommonCategory).sort(
      ([, a], [, b]) => b - a
    )[0];

    const recentEntries = entries.filter((entry) => {
      const entryDate = new Date(entry.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });

    return {
      total: entries.length,
      avgSeverity: avgSeverity.toFixed(1),
      topCategory: topCategory
        ? symptomCategories.find((cat) => cat.id === topCategory[0])?.name
        : "None",
      recentCount: recentEntries.length,
    };
  }, [entries]);

  const handleDeleteEntry = (id?: string) => {
    setEntryToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (entryToDelete) {
      try {
        deleteEntry(entryToDelete);
        const updatedEntries = getStoredEntries();
        setEntries(updatedEntries);
      } catch (error) {
        console.error("Error deleting entry:", error);
      } finally {
        setShowDeleteModal(false);
        setEntryToDelete(null);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEntryToDelete(null);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryInfo = (categoryId: string) => {
    return symptomCategories.find((cat) => cat.id === categoryId);
  };

  if (entries.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No entries yet
          </h3>
          <p className="text-gray-600 mb-6">
            Start logging your symptoms to see trends and patterns over time.
          </p>
        </div>
      </div>
    );
  }
  const trendChartData = entries.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    severity: entry.severity,
    category: entry.category,
  }));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Severity Trend Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 10]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="severity"
              stroke="#3b82f6"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total}
                </p>
                <p className="text-sm text-gray-600">Total Entries</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.avgSeverity}
                </p>
                <p className="text-sm text-gray-600">Avg Severity</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Filter className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {stats.topCategory}
                </p>
                <p className="text-sm text-gray-600">Most Common</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.recentCount}
                </p>
                <p className="text-sm text-gray-600">This Week</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {symptomCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "date" | "severity")
                }
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Date</option>
                <option value="severity">Severity</option>
              </select>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredEntries.length} of {entries.length} entries
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {filteredEntries.map((entry) => {
          const categoryInfo = getCategoryInfo(entry.category);
          return (
            <div
              key={entry.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          categoryInfo?.color || "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {categoryInfo?.name}
                      </div>
                      <div
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(
                          entry.severity
                        )}`}
                      >
                        {getSeverityLabel(entry.severity)} ({entry.severity}/10)
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {entry.symptom}
                    </h3>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(entry.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span className="capitalize">{entry.timeOfDay}</span>
                      </div>
                      {entry.duration && (
                        <div className="flex items-center space-x-1">
                          <span>{entry.duration} min</span>
                        </div>
                      )}
                    </div>

                    {entry.notes && (
                      <div className="flex items-start space-x-2 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                        <FileText className="w-4 h-4 mt-0.5 text-gray-500" />
                        <p>{entry.notes}</p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="flex items-center justify-center w-8 h-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete entry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                          Delete Entry
                        </h2>
                        <p className="text-gray-700 mb-6">
                          Are you sure you want to delete this symptom entry?
                          This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={cancelDelete}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={confirmDelete}
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
