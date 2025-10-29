
import React from "https://esm.sh/react@18.2.0";
import Header from "./components/Header.js";
import Scanner from "./components/Scanner.js";
import Reports from "./components/Reports.js";

const App = () => {
  const [view, setView] = React.useState("SCANNER");
  const [scanCount, setScanCount] = React.useState(0);

  const handleScanSuccess = () => setScanCount(c => c + 1);

  return React.createElement('div', {className: 'min-h-screen bg-gray-100'},
    React.createElement(Header, { setView, currentView: view, scanCount }),
    React.createElement('main', {className: 'p-4 sm:p-6'},
      view === "SCANNER" && React.createElement(Scanner, { onScanSuccess: handleScanSuccess }),
      view === "REPORTS" && React.createElement(Reports, { goBack: () => setView('SCANNER') })
    )
  );
};

export default App;
