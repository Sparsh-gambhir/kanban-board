import { DndContext, DragOverlay } from "@dnd-kit/core";
import { KanbanColumn } from "./KanbanColumn";
import { VulnerabilityCard } from "./VulnerabilityCard.jsx";
import { findVulnerability, handleDragOver, handleDragEnd } from "./dragUtils.jsx";

export default function BoardContainer({
  columns,
  filteredColumns,
  sensors,
  activeVulnerability,
  setActiveVulnerability,
  setColumns,
  onEdit
}) {
  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) =>
        setActiveVulnerability(findVulnerability(columns, active.id))
      }
      onDragOver={(event) => handleDragOver(event, columns, setColumns)}
      onDragEnd={(event) =>
        handleDragEnd(event, columns, setColumns, setActiveVulnerability)
      }
    >
      {filteredColumns.map((col) => (
        <KanbanColumn
          key={col.id}
          column={col}
          setColumns={setColumns}
          onEdit={onEdit}
        />
      ))}

      <DragOverlay>
        {activeVulnerability && (
          <div className="rotate-3 scale-105">
            <VulnerabilityCard
              vulnerability={activeVulnerability}
              onEdit={onEdit}
              onDelete={(id) =>
                setColumns((prev) =>
                  prev.map((col) => ({
                    ...col,
                    vulnerabilities: col.vulnerabilities.filter(
                      (v) => v.id !== id
                    ),
                  }))
                )
              }
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
