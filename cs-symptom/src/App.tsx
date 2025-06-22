import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { SymptomForm } from "./components/SymptomForm";
import { TrendsView } from "./components/TrendsView";
import { Route, Routes } from "react-router-dom";
import { Path } from "./components/Path";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDataChange = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <Path />

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route
            path="/"
            element={<SymptomForm onEntryAdded={handleDataChange} />}
          />
          <Route path="/trends" element={<TrendsView key={refreshKey} onDataChange={handleDataChange} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
