import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { NewVulnerabilityForm } from "../NewVulnerabilityForm";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import FilterGroup from "./FilterGroup";
import ViewToggle from "./ViewToggle";
import AddVulnerabilityButton from "./AddVulnerabilityButton";

export const KanbanHeader = ({
  searchQuery,
  setSearchQuery,
  onAddVulnerability,
  activeFilters,
  setActiveFilters,
  sortBy,
  setSortBy,
  view,
  setView,
  columns,
  isLoggedIn,
  onLoginClick,
  onLogoutClick,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openFilter, setOpenFilter] = useState(null);

  const handleSave = (newVuln) => {
    onAddVulnerability(newVuln);
    setIsModalOpen(false);
  };

  return (
    <div className="px-6 py-4">
      {/* Header Top */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-foreground">Vulnerabilities</h1>

        <div className="flex items-center gap-2">
          {isLoggedIn ? (
            <>
              {/* Opens the New Vulnerability modal */}
              <button
                className="bg-blue-600 text-white px-5 py-2 rounded-full"
                onClick={() => setIsModalOpen(true)}
              >
                New Vulnerability
              </button>

              {/* Logout button */}
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-full"
                onClick={onLogoutClick}
              >
                Logout
              </button>
            </>
          ) : (
            // Show login/signup button when not logged in
            <button
              className="bg-blue-600 text-white px-5 py-2 rounded-full"
              onClick={onLoginClick}
            >
              Login / Sign up
            </button>
          )}
        </div>
      </div>

      {/* Header Tools */}
      <div className="bg-white border rounded-xl shadow-sm px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Left */}
        <div className="flex items-center flex-wrap gap-2 flex-1">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <SortButton sortBy={sortBy} setSortBy={setSortBy} />

          <FilterGroup
            columns={columns}
            activeFilters={activeFilters}
            setActiveFilters={setActiveFilters}
            openFilter={openFilter}
            setOpenFilter={setOpenFilter}
          />
        </div>

        {/* Right */}
        <ViewToggle view={view} setView={setView} />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <NewVulnerabilityForm onSave={handleSave} />
        </Modal>
      )}
    </div>
  );
};

export default KanbanHeader;
