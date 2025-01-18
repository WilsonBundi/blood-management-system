import React from "react";

function DonorList({ donors, handleEdit, handleDelete, buttonStyle }) {
  return (
    <ul>
      {donors.map((donor) => (
        <li key={donor.id} style={{ marginBottom: "10px" }}>
          {donor.fullName} - {donor.bloodType} ({donor.contact})
          <button style={buttonStyle} onClick={() => handleEdit(donor)}>
            Edit
          </button>
          <button style={buttonStyle} onClick={() => handleDelete(donor.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default DonorList;