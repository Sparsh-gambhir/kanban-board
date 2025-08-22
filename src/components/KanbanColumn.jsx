import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus } from "lucide-react";
import { SortableVulnerabilityCard } from "./SortableVulnerabilityCard";

export const KanbanColumn = ({ column, setColumns, onEdit }) => {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  // Delete a card
  const handleDeleteCard = (cardId) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === column.id
          ? {
              ...col,
              vulnerabilities: col.vulnerabilities.filter(
                (v) => v.id !== cardId
              ),
              count: col.count - 1,
            }
          : col
      )
    );
  };

  // Toggle verified state
  const handleVerified = (id, value) => {
    setColumns((prev) =>
      prev.map((col) => {
        if (!col.vulnerabilities) return col;
        return {
          ...col,
          vulnerabilities: col.vulnerabilities.map((v) =>
            v.id === id ? { ...v, verified: value } : v
          ),
        };
      })
    );
  };

  return (
    <div className="flex flex-col min-w-80 max-w-80">
      <div className="flex items-center justify-between p-4 bg-kanban-column-bg border border-kanban-column-border rounded-t-lg">
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-foreground">{column.title}</h2>
          <span className="text-sm text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {column.vulnerabilities.length}
          </span>
        </div>
        <button className="w-6 h-6 p-0 bg-transparent hover:bg-muted rounded-sm transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 min-h-96 p-3 space-y-3 bg-kanban-column-bg border-x border-b border-kanban-column-border rounded-b-lg
          transition-colors duration-200 ${
            isOver ? "bg-primary/5 border-primary/20" : ""
          }`}
      >
        <SortableContext
          items={column.vulnerabilities.map((v) => v.id)}
          strategy={verticalListSortingStrategy}
        >
          {column.vulnerabilities.map((vulnerability) => (
            <SortableVulnerabilityCard
              key={vulnerability.id}
              vulnerability={{
                ...vulnerability,
                code: vulnerability.code || `V-${vulnerability.id}`,
                date: vulnerability.date || new Date().toLocaleDateString(),
                time: vulnerability.time || new Date().toLocaleTimeString(),
                onVerify: (val) => handleVerified(vulnerability.id, val),
              }}
              onDelete={handleDeleteCard}
              onEdit={() => onEdit(vulnerability)}  
            />
          ))}
        </SortableContext>

        {column.vulnerabilities.length === 0 && (
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            No vulnerabilities
          </div>
        )}
      </div>
    </div>
  );
};
