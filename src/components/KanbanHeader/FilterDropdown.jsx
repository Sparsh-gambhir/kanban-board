import { Button } from "@/components/ui/button";

export default function FilterDropdown({
  filter,
  activeFilters,
  setActiveFilters,
  openFilter,
  setOpenFilter,
}) {
  return (
    <div className="relative">
      <Button
        variant={activeFilters[filter.key] ? "solid" : "outline"}
        size="sm"
        className="flex items-center rounded-full border-2 border-dotted border-gray-400 text-gray-700 hover:bg-gray-100 px-3 py-1"
        onClick={() =>
          setOpenFilter(openFilter === filter.key ? null : filter.key)
        }
      >
        {filter.icon}
        {filter.label}
      </Button>

      {openFilter === filter.key && (
        <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow z-10">
          {filter.options.length > 0 ? (
            filter.options.map((option) => (
              <button
                key={option}
                className={`block px-3 py-1 w-full text-left hover:bg-gray-100 ${
                  activeFilters[filter.key] === option
                    ? "bg-blue-600 text-white"
                    : "text-gray-700"
                }`}
                onClick={() => {
                  setActiveFilters({
                    ...activeFilters,
                    [filter.key]: option,
                  });
                  setOpenFilter(null);
                }}
              >
                {option}
              </button>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-400">No options</div>
          )}
        </div>
      )}
    </div>
  );
}
