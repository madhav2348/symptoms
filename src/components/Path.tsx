import { PlusCircle, TrendingUp } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Path() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentView = location.pathname;

  function onViewChange(route: string) {
    if (route === "trends") {
      navigate("/trends");
    }
    if (route === "/") {
      navigate("/");
    }
  }
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-gradient-to-r from-white via-indigo-50 to-purple-50 px-6 py-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-items-center justify-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewChange("/")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentView === "/"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Symptom</span>
            </button>
            <button
              onClick={() => onViewChange("trends")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                currentView === "trends"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>View Trends</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
