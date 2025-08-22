// hooks/useLocalStorageColumns.js
import { useState, useEffect } from "react";

const defaultColumns = [
  { id: "new", title: "New", count: 0, vulnerabilities: [] },
  { id: "draft", title: "Draft", count: 0, vulnerabilities: [] },
  { id: "unresolved", title: "Unresolved", count: 0, vulnerabilities: [] },
  { id: "under-review", title: "Under Review", count: 0, vulnerabilities: [] },
  { id: "solved", title: "Solved", count: 0, vulnerabilities: [] },
];

export default function useLocalStorageColumns() {
  const loadColumns = () => {
    const saved = localStorage.getItem("kanbanColumns");
    return saved ? JSON.parse(saved) : defaultColumns;
  };

  const [columns, setColumns] = useState(loadColumns);

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  return [columns, setColumns];
}
