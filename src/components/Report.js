import React from "react";

function Report({ report }) {
  return (
    <div style={{ marginTop: "10px" }}>
      <h3>Report Summary</h3>
      <p>Total Donors: {report.totalDonors}</p>
      <ul>
        {Object.entries(report.inventory).map(([type, count]) => (
          <li key={type}>
            {type}: {count} units
          </li>
        ))}
      </ul>
      <h4>Donors by Age Group</h4>
      <ul>
        {Object.entries(report.donorsByAgeGroup).map(([group, count]) => (
          <li key={group}>
            {group}: {count} donors
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Report;