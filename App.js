import React, { useState, useCallback } from "https://esm.sh/react@18.2.0";
import Header from "./Header.js";
import Scanner from "./Scanner.js";
import Reports from "./Reports.js";

const App = () => {
  // الحالة الحالية (صفحة المسح أو صفحة التقارير)
  const [view, setView] = useState("scanner");
  const [scanCount, setScanCount] = useState(0);

  const handleScanSuccess = useCallback(() => {
    setScanCount((prevCount) => prevCount + 1);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen font-sans text-gray-800">
      <Header setView={setView} currentView={view} scanCount={scanCount} />
      <main className="p-4 sm:p-6 pb-28">
        {view === "scanner" && <Scanner onScanSuccess={handleScanSuccess} />}
        {view === "reports" && <Reports />}
      </main>
    </div>
  );
};

export default App;
