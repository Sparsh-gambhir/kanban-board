// hooks/useView.js
import { useState } from "react";

export default function useView() {
  const [view, setView] = useState(() => localStorage.getItem("kanbanView") || "grid");

  const handleViewChange = (newView) => {
    setView(newView);
    localStorage.setItem("kanbanView", newView);
  };

  return [view, handleViewChange];
}
