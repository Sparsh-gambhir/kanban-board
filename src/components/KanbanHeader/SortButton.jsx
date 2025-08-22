import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export default function SortButton({ sortBy, setSortBy }) {
  return (
    <Button
      variant={sortBy ? "solid" : "outline"}
      size="sm"
      className="flex items-center rounded-full border-2 border-dotted border-gray-400 text-gray-700 hover:bg-gray-100 px-3 py-1"
      onClick={() => setSortBy(sortBy === "severity" ? null : "severity")}
    >
      <Filter className="w-4 h-4 mr-1" /> Sort By
    </Button>
  );
}
