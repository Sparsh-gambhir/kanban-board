// src/components/EditModal.jsx
import React from "react";

const EditModal = ({ vulnerability, setEditingVulnerability, onSave }) => {
  if (!vulnerability) return null; // <-- Don’t render if nothing is being edited

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-5 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-3">Edit Vulnerability</h2>

        {/* Title */}
        <input
          type="text"
          className="border p-2 w-full mb-3"
          value={vulnerability.title}
          onChange={(e) =>
            setEditingVulnerability({ ...vulnerability, title: e.target.value })
          }
        />

        {/* Severity */}
        <select
          className="border p-2 w-full mb-3"
          value={vulnerability.severity}
          onChange={(e) =>
            setEditingVulnerability({ ...vulnerability, severity: e.target.value })
          }
        >
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={() => setEditingVulnerability(null)}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 bg-blue-500 text-white rounded"
            onClick={() => onSave(vulnerability)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
