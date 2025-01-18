import React, { useState } from "react";

function CollapsibleSection({ title, children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer", color: "#555" }}
      >
        {title} {isOpen ? "▼" : "►"}
      </h2>
      {isOpen && children}
    </div>
  );
}

export default CollapsibleSection;