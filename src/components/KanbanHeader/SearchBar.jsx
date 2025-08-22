import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input.jsx";

export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
      <Input
        placeholder="Search by issue name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pl-9 rounded-full border-gray-300"
      />
    </div>
  );
}
