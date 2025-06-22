import { Activity } from "lucide-react";
import { Path } from "./Path";

export function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Symptom Journal
              </h1>
              <p className="text-sm text-gray-500">
                Track your health patterns
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
