import { Button } from "@/components/ui/Button.jsx";
import { Grid3x3, List } from "lucide-react";

export default function ViewToggle({ view, setView }) {
  return (
    <div className="flex items-center rounded-md border border-gray-300 overflow-hidden">
      <Button
        size="sm"
        className={`flex items-center rounded-none px-4 ${
          view === "grid"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setView("grid")}
      >
        <Grid3x3 className="w-4 h-4 mr-1" /> Board
      </Button>

      <Button
        size="sm"
        className={`flex items-center rounded-none px-4 ${
          view === "list"
            ? "bg-blue-600 text-white"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setView("list")}
      >
        <List className="w-4 h-4 mr-1" /> List
      </Button>
    </div>
  );
}
