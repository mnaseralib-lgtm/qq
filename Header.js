import React, { useEffect, useState } from "https://esm.sh/react@18.2.0";
import { Download, QrCode, BarChart3 } from "./icons.js";

const Header = ({ setView, currentView, scanCount }) => {
  const [installPrompt, setInstallPrompt] = useState(null);

  // التعامل مع حدث "تثبيت التطبيق" PWA
  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () =>
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
  }, []);

  const handleInstallClick = async () => {
    if (installPrompt) {
      installPrompt.prompt();
      const result = await installPrompt.userChoice;
      if (result.outcome === "accepted") {
        console.log("تم تثبيت التطبيق ✅");
      }
      setInstallPrompt(null);
    } else {
      alert("🔹 يمكنك تثبيت التطبيق من إعدادات المتصفح.");
    }
  };

  return (
    <header className="bg-emerald-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold tracking-wide">نظام الحضور الذكي</h1>

      <div className="flex items-center space-x-3 space-x-reverse">
        {/* زر التبديل بين الماسح والتقارير */}
        {currentView === "scanner" ? (
          <button
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-700 px-3 py-1 rounded-xl transition"
            onClick={() => setView("reports")}
          >
            <BarChart3 size={18} />
            <span className="text-sm">التقارير</span>
          </button>
        ) : (
          <button
            className="flex items-center gap-1 bg-emerald-500 hover:bg-emerald-700 px-3 py-1 rounded-xl transition"
            onClick={() => setView("scanner")}
          >
            <QrCode size={18} />
            <span className="text-sm">الماسح</span>
          </button>
        )}

        {/* زر التثبيت 📲 */}
        <button
          className="bg-white text-emerald-600 rounded-full p-2 hover:bg-gray-200 transition"
          onClick={handleInstallClick}
          title="تثبيت التطبيق"
        >
          <Download size={18} />
        </button>
      </div>
    </header>
  );
};

export default Header;
