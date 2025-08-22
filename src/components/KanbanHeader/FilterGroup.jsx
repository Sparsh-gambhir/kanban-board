import { Button } from "@/components/ui/Button";
import FilterDropdown from "./FilterDropdown";


export default function FilterGroup({
  columns,
  activeFilters,
  setActiveFilters,
  openFilter,
  setOpenFilter,
}) {
  const getOptions = (key) => [
    ...new Set(
      (columns ?? []).flatMap((col) =>
        (col?.vulnerabilities ?? [])
          .filter((v) => v)
          .map((v) => v[key] ?? null)
      )
    ),
  ].filter(Boolean);

  const filters = [
    { label: "Assigned To", key: "assignedTo", options: getOptions("assignedTo") },
    { label: "Severity", key: "severity", options: getOptions("severity") },
    { label: "Status", key: "status", options: getOptions("status") },
    { label: "Pentest", key: "pentest", options: getOptions("pentest") },
    { label: "Target", key: "target", options: getOptions("target") },
  ];

  return (
    <div className="flex flex-wrap gap-2 relative">
      {filters.map((filter) => (
        <FilterDropdown
          key={filter.key}
          filter={filter}
          activeFilters={activeFilters}
          setActiveFilters={setActiveFilters}
          openFilter={openFilter}
          setOpenFilter={setOpenFilter}
        />
      ))}

      <Button
        variant="outline"
        size="sm"
        className="flex items-center rounded-full border-2 border-dotted border-red-400 text-red-600 hover:bg-red-100 px-3 py-1"
        onClick={() =>
          setActiveFilters({
            assignedTo: null,
            severity: null,
            status: null,
            pentest: null,
            target: null,
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
}
