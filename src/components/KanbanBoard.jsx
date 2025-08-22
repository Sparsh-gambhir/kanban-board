import { useState } from "react";
import { PointerSensor, useSensor, useSensors,TouchSensor } from "@dnd-kit/core";
import KanbanHeader from "./KanbanHeader/KanbanHeader";
import EditModal from "./EditModal";
import BoardContainer from "./BoardContainer";
import useLocalStorageColumns from "./hooks/useLocalStorageColumns";
import useFilters from "./hooks/useFilters";
import useView from "./hooks/useView";

const KanbanBoard = ({ isLoggedIn, onLoginClick, onLogoutClick }) => {
  const [columns, setColumns] = useLocalStorageColumns();
  const [activeVulnerability, setActiveVulnerability] = useState(null);
  const [editingVulnerability, setEditingVulnerability] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    assignedTo: null,
    severity: null,
    status: null,
    pentest: null,
    target: null,
  });
  const [sortBy, setSortBy] = useState(null);
  const [view, setView] = useView();

  const sensors = useSensors(
  useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
);
  const filteredColumns = useFilters(columns, searchQuery, activeFilters, sortBy);

  // Add new vulnerability
  const handleAddVulnerability = (newVuln) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString();
    const timeStr = now.toLocaleTimeString();
    const allCards = columns.flatMap((col) => col.vulnerabilities);
    const nextNumber = allCards.length + 1;
    const code = `#${String(nextNumber).padStart(4, "0")}`;

    setColumns((prev) =>
      prev.map((col) =>
        col.id === "new"
          ? {
              ...col,
              vulnerabilities: [
                ...col.vulnerabilities,
                {
                  ...newVuln,
                  id: Date.now().toString(),
                  code,
                  createdAt: now.toISOString(),
                  date: dateStr,
                  time: timeStr,
                  verified: false,
                },
              ],
              count: col.count + 1,
            }
          : col
      )
    );
  };

  const handleEdit = (vuln) => setEditingVulnerability(vuln);

  const handleSaveEdit = (updatedVuln) => {
    setColumns((prev) =>
      prev.map((col) => ({
        ...col,
        vulnerabilities: col.vulnerabilities.map((v) =>
          v.id === updatedVuln.id ? updatedVuln : v
        ),
      }))
    );
    setEditingVulnerability(null);
  };

  return (
    <div className="min-h-screen">
      <KanbanHeader
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAddVulnerability={handleAddVulnerability}
        activeFilters={activeFilters}
        setActiveFilters={setActiveFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        view={view}
        setView={setView}
        columns={columns}
        isLoggedIn={isLoggedIn}          // added
        onLoginClick={onLoginClick}      // added
        onLogoutClick={onLogoutClick}    // added
      />

      {isLoggedIn ? (
        <div
          className={`p-6 ${
            view === "list"
              ? "flex flex-col gap-6"
              : "flex gap-6 overflow-x-auto pb-6"
          }`}
        >
          <BoardContainer
            columns={columns}
            filteredColumns={filteredColumns}
            sensors={sensors}
            activeVulnerability={activeVulnerability}
            setActiveVulnerability={setActiveVulnerability}
            setColumns={setColumns}
            onEdit={handleEdit}
          />
        </div>
      ) : (
        <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
          <p>Please login or sign up to access the Kanban Board.</p>
        </div>
      )}

      <EditModal
        vulnerability={editingVulnerability}
        setEditingVulnerability={setEditingVulnerability}
        onSave={handleSaveEdit}
      />
    </div>
  );
};

export default KanbanBoard;
