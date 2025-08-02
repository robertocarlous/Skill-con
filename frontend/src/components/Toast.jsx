import { useState, useCallback } from "react";
import { ToastContext } from "../context/ToastContext";

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "info",
    visible: false,
  });
  const [timeoutId, setTimeoutId] = useState(null);

  const showToast = useCallback(
    (message, type = "info", duration = 3500) => {
      setToast({ message, type, visible: true });
      if (timeoutId) clearTimeout(timeoutId);
      const id = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, duration);
      setTimeoutId(id);
    },
    [timeoutId]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast.visible && (
        <div
          className={`fixed top-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-xl text-white text-base font-medium flex items-center gap-2 transition-all duration-300 animate-fade-in
            ${toast.type === "success" ? "bg-green-600" : ""}
            ${toast.type === "error" ? "bg-red-600" : ""}
            ${toast.type === "info" ? "bg-blue-600" : ""}
          `}
          style={{ minWidth: 220, maxWidth: 400 }}
        >
          {toast.type === "success" && (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
          {toast.type === "error" && (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
          {toast.type === "info" && (
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01"
              />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </ToastContext.Provider>
  );
};
