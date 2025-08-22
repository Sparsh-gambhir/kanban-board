// hooks/useFilters.js
export default function useFilters(columns, searchQuery, activeFilters, sortBy) {
  return columns.map((col) => {
    let vulns = col.vulnerabilities.filter((v) => {
      const matchesSearch =
        v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.tags?.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesAssigned =
        !activeFilters.assignedTo || v.assignedTo === activeFilters.assignedTo;
      const matchesSeverity =
        !activeFilters.severity || v.severity === activeFilters.severity;
      const matchesStatus =
        !activeFilters.status || v.status === activeFilters.status;
      const matchesPentest =
        !activeFilters.pentest || v.pentest === activeFilters.pentest;
      const matchesTarget =
        !activeFilters.target || v.target === activeFilters.target;

      return (
        matchesSearch &&
        matchesAssigned &&
        matchesSeverity &&
        matchesStatus &&
        matchesPentest &&
        matchesTarget
      );
    });

    if (sortBy === "severity") {
      const severityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
      vulns = vulns.sort(
        (a, b) => severityOrder[a.severity] - severityOrder[b.severity]
      );
    }

    return { ...col, vulnerabilities: vulns };
  });
}
