import React from "https://esm.sh/react@18.2.0";
import ReactDOM from "https://esm.sh/react-dom@18.2.0/client";
import App from "./App.js";

// 🔹 تأكد من وجود عنصر root في index.html
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("❌ لم يتم العثور على العنصر root في الصفحة.");
}

// 🔹 إنشاء جذر React وتفعيل التطبيق
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
