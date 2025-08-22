/*------Split this header Into multi component in kanban Header folder------------------ 
 -------This file is just for backup----------------------------------*/ 


 

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Search,
//   Filter,
//   User,
//   AlertTriangle,
//   CheckCircle,
//   Target,
//   Grid3x3,
//   List,
// } from "lucide-react";
// import { Modal } from "@/components/ui/modal";
// import { NewVulnerabilityForm } from "./NewVulnerabilityForm";

// export const KanbanHeader = ({
//   searchQuery,
//   setSearchQuery,
//   onAddVulnerability,
//   activeFilters,
//   setActiveFilters,
//   sortBy,
//   setSortBy,
//   view,
//   setView,
//   columns, // required for real filter values
// }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [openFilter, setOpenFilter] = useState(null); // tracks which dropdown is open

//   const handleAddClick = () => setIsModalOpen(true);
//   const handleSave = (newVuln) => {
//     onAddVulnerability(newVuln);
//     setIsModalOpen(false);
//   };

//   // ---------- Collect unique options from current vulnerabilities ----------
// const assignedToOptions = [
//   ...new Set(
//     (columns ?? []).flatMap((col) =>
//       (col?.vulnerabilities ?? [])
//         .filter((v) => v) // drop undefined/null entries
//         .map((v) => v.assignedTo ?? null)
//     )
//   ),
// ].filter(Boolean);

// const severityOptions = [
//   ...new Set(
//     (columns ?? []).flatMap((col) =>
//       (col?.vulnerabilities ?? [])
//         .filter((v) => v)
//         .map((v) => v.severity ?? null)
//     )
//   ),
// ].filter(Boolean);

// const statusOptions = [
//   ...new Set(
//     (columns ?? []).flatMap((col) =>
//       (col?.vulnerabilities ?? [])
//         .filter((v) => v)
//         .map((v) => v.status ?? null)
//     )
//   ),
// ].filter(Boolean);

// const pentestOptions = [
//   ...new Set(
//     (columns ?? []).flatMap((col) =>
//       (col?.vulnerabilities ?? [])
//         .filter((v) => v)
//         .map((v) => v.pentest ?? null)
//     )
//   ),
// ].filter(Boolean);

// const targetOptions = [
//   ...new Set(
//     (columns ?? []).flatMap((col) =>
//       (col?.vulnerabilities ?? [])
//         .filter((v) => v)
//         .map((v) => v.target ?? null)
//     )
//   ),
// ].filter(Boolean);


//   // Filter buttons configuration
//   const filters = [
//     {
//       label: "Assigned To",
//       key: "assignedTo",
//       icon: <User className="w-4 h-4 mr-1" />,
//       options: assignedToOptions,
//     },
//     {
//       label: "Severity",
//       key: "severity",
//       icon: <AlertTriangle className="w-4 h-4 mr-1" />,
//       options: severityOptions,
//     },
//     {
//       label: "Status",
//       key: "status",
//       icon: <CheckCircle className="w-4 h-4 mr-1" />,
//       options: statusOptions,
//     },
//     {
//       label: "Pentest",
//       key: "pentest",
//       icon: <Filter className="w-4 h-4 mr-1" />,
//       options: pentestOptions,
//     },
//     {
//       label: "Target",
//       key: "target",
//       icon: <Target className="w-4 h-4 mr-1" />,
//       options: targetOptions,
//     },
//   ];

//   return (
//     <div className="px-6 py-4">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold text-foreground">Vulnerabilities</h1>
//         <Button
//           className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5"
//           onClick={handleAddClick}
//         >
//           New Vulnerability
//         </Button>
//       </div>

//       <div className="bg-white border rounded-xl shadow-sm px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
//         {/* Left: Search + Filters */}
//         <div className="flex items-center flex-wrap gap-2 flex-1">
//           {/* Search */}
//           <div className="relative w-64">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
//             <Input
//               placeholder="Search by issue name..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="pl-9 rounded-full border-gray-300"
//             />
//           </div>

//           {/* Filter & Sort Buttons */}
//           <div className="flex flex-wrap gap-2 relative">
//             {/* SortBy */}
//             <Button
//               variant={sortBy ? "solid" : "outline"}
//               size="sm"
//               className="flex items-center rounded-full border-2 border-dotted border-gray-400 text-gray-700 hover:bg-gray-100 px-3 py-1"
//               onClick={() =>
//                 setSortBy(sortBy === "severity" ? null : "severity")
//               }
//             >
//               <Filter className="w-4 h-4 mr-1" /> Sort By
//             </Button>

//             {/* Other filters with dropdowns */}
//             {filters.map((filter) => (
//               <div key={filter.key} className="relative">
//                 <Button
//                   variant={activeFilters[filter.key] ? "solid" : "outline"}
//                   size="sm"
//                   className="flex items-center rounded-full border-2 border-dotted border-gray-400 text-gray-700 hover:bg-gray-100 px-3 py-1"
//                   onClick={() =>
//                     setOpenFilter(openFilter === filter.key ? null : filter.key)
//                   }
//                 >
//                   {filter.icon}
//                   {filter.label}
//                 </Button>

//                 {/* Dropdown menu */}
//                 {openFilter === filter.key && (
//                   <div className="absolute top-full mt-1 left-0 bg-white border rounded shadow z-10">
//                     {filter.options.map((option) => (
//                       <button
//                         key={option}
//                         className={`block px-3 py-1 w-full text-left hover:bg-gray-100 ${
//                           activeFilters[filter.key] === option
//                             ? "bg-blue-600 text-white"
//                             : "text-gray-700"
//                         }`}
//                         onClick={() => {
//                           setActiveFilters({
//                             ...activeFilters,
//                             [filter.key]: option,
//                           });
//                           setOpenFilter(null); // close after selection
//                         }}
//                       >
//                         {option}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//             <Button
//               variant="outline"
//               size="sm"
//               className="flex items-center rounded-full border-2 border-dotted border-red-400 text-red-600 hover:bg-red-100 px-3 py-1"
//               onClick={() =>
//                 setActiveFilters({
//                   assignedTo: null,
//                   severity: null,
//                   status: null,
//                   pentest: null,
//                   target: null,
//                 })
//               }
//             >
//               Clear Filters
//             </Button>
//           </div>
//         </div>

//         {/* Right: Grid/List Toggle */}
//         <div className="flex items-center rounded-md border border-gray-300 overflow-hidden">
//           <Button
//             size="sm"
//             className={`flex items-center rounded-none px-4 ${
//               view === "grid"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//             onClick={() => setView("grid")}
//           >
//             <Grid3x3 className="w-4 h-4 mr-1" /> Board
//           </Button>

//           <Button
//             size="sm"
//             className={`flex items-center rounded-none px-4 ${
//               view === "list"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700 hover:bg-gray-100"
//             }`}
//             onClick={() => setView("list")}
//           >
//             <List className="w-4 h-4 mr-1" /> List
//           </Button>
//         </div>
//       </div>

//       {isModalOpen && (
//         <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
//           <NewVulnerabilityForm onSave={handleSave} />
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default KanbanHeader;
//