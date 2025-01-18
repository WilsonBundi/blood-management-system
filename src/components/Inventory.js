import React from "react";

function Inventory({ inventory }) {
  return (
    <ul>
      {Object.entries(inventory).map(([type, count]) => (
        <li key={type} style={{ marginBottom: "10px" }}>
          {type}: {count} units
        </li>
      ))}
    </ul>
  );
}

export default Inventory;