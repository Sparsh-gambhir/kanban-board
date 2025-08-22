import { arrayMove } from "@dnd-kit/sortable";

export const findVulnerability = (columns, id) => {
  for (const column of columns) {
    const vuln = column.vulnerabilities.find((v) => v.id === id);
    if (vuln) return vuln;
  }
  return null;
};

export const handleDragOver = ({ active, over }, columns, setColumns) => {
  if (!over) return;

  const activeCol = columns.find((c) =>
    c.vulnerabilities.some((v) => v.id === active.id)
  );
  const overCol = columns.find((c) => c.id === over.id);
  const activeVuln = findVulnerability(columns, active.id);

  if (!activeCol || !overCol || !activeVuln || activeCol.id === overCol.id)
    return;

  setColumns((prev) => {
    const newCols = [...prev];
    const source = newCols.find((c) => c.id === activeCol.id);
    const target = newCols.find((c) => c.id === overCol.id);

    source.vulnerabilities = source.vulnerabilities.filter(
      (v) => v.id !== active.id
    );
    source.count--;
    target.vulnerabilities.push({ ...activeVuln, status: overCol.id });
    target.count++;

    return newCols; // saving happens in useEffect
  });
};

export const handleDragEnd = (
  { active, over },
  columns,
  setColumns,
  setActiveVulnerability
) => {
  setActiveVulnerability(null);
  if (!over) return;

  const activeCol = columns.find((c) =>
    c.vulnerabilities.some((v) => v.id === active.id)
  );
  const overCol = columns.find((c) =>
    c.vulnerabilities.some((v) => v.id === over.id)
  );

  if (!activeCol || !overCol || activeCol.id !== overCol.id) return;

  setColumns((prev) => {
    const newCols = [...prev];
    const colIndex = newCols.findIndex((c) => c.id === activeCol.id);
    const vulns = [...newCols[colIndex].vulnerabilities];

    const activeIndex = vulns.findIndex((v) => v.id === active.id);
    const overIndex = vulns.findIndex((v) => v.id === over.id);

    newCols[colIndex].vulnerabilities = arrayMove(vulns, activeIndex, overIndex);

    return newCols; // saving happens in useEffect
  });
};
