import React from "react";

function DonorForm({ handleSubmit, editDonor, inputStyle, buttonStyle, themeStyles, theme }) {
  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: themeStyles[theme].backgroundColor,
        color: themeStyles[theme].color,
      }}
    >
      <h2 style={{ marginBottom: "15px", color: themeStyles[theme].color }}>
        {editDonor ? "Edit Donor" : "Register Donor"}
      </h2>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        defaultValue={editDonor?.fullName || ""}
        required
        style={inputStyle}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        defaultValue={editDonor?.age || ""}
        required
        style={inputStyle}
      />
      <select
        name="bloodType"
        defaultValue={editDonor?.bloodType || ""}
        required
        style={inputStyle}
      >
        <option value="">Select Blood Type</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>
      <input
        type="text"
        name="contact"
        placeholder="Contact Number"
        defaultValue={editDonor?.contact || ""}
        required
        style={inputStyle}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        defaultValue={editDonor?.address || ""}
        required
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        {editDonor ? "Update" : "Register"}
      </button>
    </form>
  );
}

export default DonorForm;