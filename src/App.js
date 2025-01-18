import React, { useState, useEffect, useCallback } from "react";
import DonorForm from "./components/DonorForm.js";
import DonorList from "./components/DonorList.js";
import Inventory from "./components/Inventory.js";
import Report from "./components/Report.js";
import CollapsibleSection from "./components/CollapsibleSection.js";
import "./styles.css";

function App() {
  const [donors, setDonors] = useState([]);
  const [inventory, setInventory] = useState({});
  const [report, setReport] = useState(null);
  const [editDonor, setEditDonor] = useState(null);
  const [message, setMessage] = useState(null);
  const [theme, setTheme] = useState("light");

  const themeStyles = {
    light: {
      backgroundColor: "#fff",
      color: "#333",
      buttonBackground: "#007bff",
      buttonColor: "#fff",
    },
    dark: {
      backgroundColor: "#333",
      color: "#fff",
      buttonBackground: "#555",
      buttonColor: "#fff",
    },
    blue: {
      backgroundColor: "#e6f7ff",
      color: "#003366",
      buttonBackground: "#0066cc",
      buttonColor: "#fff",
    },
    green: {
      backgroundColor: "#e6ffe6",
      color: "#004d00",
      buttonBackground: "#009900",
      buttonColor: "#fff",
    },
    pink: {
      backgroundColor: "#ffe6f7",
      color: "#660033",
      buttonBackground: "#ff66b3",
      buttonColor: "#fff",
    },
  };

  const buttonStyle = {
    padding: "10px 15px",
    backgroundColor: themeStyles[theme].buttonBackground,
    color: themeStyles[theme].buttonColor,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "5px",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #ccc",
    backgroundColor: themeStyles[theme].backgroundColor,
    color: themeStyles[theme].color,
  };

  // Fetch donors and inventory
  const fetchDonors = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/donors");
      if (!response.ok) throw new Error("Failed to fetch donors.");
      const data = await response.json();
      setDonors(data);
      updateInventory(data);
    } catch (error) {
      console.error("Error fetching donors:", error);
      setMessage("Failed to fetch donors. Please try again.");
    }
  }, []);

  useEffect(() => {
    fetchDonors();
  }, [fetchDonors]);

  // Update inventory
  const updateInventory = (donors) => {
    const inventorySummary = {};
    donors.forEach((donor) => {
      if (inventorySummary[donor.bloodType]) {
        inventorySummary[donor.bloodType]++;
      } else {
        inventorySummary[donor.bloodType] = 1;
      }
    });
    setInventory(inventorySummary);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const donorData = {
      fullName: formData.get("fullName"),
      age: parseInt(formData.get("age"), 10),
      bloodType: formData.get("bloodType"),
      contact: formData.get("contact"),
      address: formData.get("address"),
    };

    try {
      if (editDonor) {
        const response = await fetch(`http://localhost:3001/donors/${editDonor.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donorData),
        });
        if (!response.ok) throw new Error("Failed to update donor.");
        setMessage("Donor updated successfully!");
      } else {
        const response = await fetch("http://localhost:3001/donors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(donorData),
        });
        if (!response.ok) throw new Error("Failed to register donor.");
        setMessage("Donor registered successfully!");
      }

      e.target.reset();
      setEditDonor(null);
      fetchDonors();
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to register/update donor. Please try again.");
    }
  };

  // Handle donor edit
  const handleEdit = (donor) => {
    setEditDonor(donor);
  };

  // Handle donor deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this donor?")) {
      try {
        const response = await fetch(`http://localhost:3001/donors/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error("Failed to delete donor.");
        setMessage("Donor deleted successfully!");
        fetchDonors();
      } catch (error) {
        console.error("Error:", error);
        setMessage("Failed to delete donor. Please try again.");
      }
    }
  };

  // Generate report
  const generateReport = () => {
    const totalDonors = donors.length;
    const donorsByAgeGroup = {
      "18-30": donors.filter((donor) => donor.age >= 18 && donor.age <= 30).length,
      "31-50": donors.filter((donor) => donor.age >= 31 && donor.age <= 50).length,
      "51+": donors.filter((donor) => donor.age >= 51).length,
    };

    const reportData = {
      totalDonors,
      inventory,
      donorsByAgeGroup,
    };
    setReport(reportData);
  };

  return (
    <div
      className="App"
      style={{
        backgroundColor: themeStyles[theme].backgroundColor,
        color: themeStyles[theme].color,
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", color: themeStyles[theme].color }}>
        Blood Management System
      </h1>

      {/* Theme Selector */}
      <div style={{ marginBottom: "20px" }}>
        <h3>Select Theme:</h3>
        <button onClick={() => setTheme("light")} style={buttonStyle}>
          Light
        </button>
        <button onClick={() => setTheme("dark")} style={buttonStyle}>
          Dark
        </button>
        <button onClick={() => setTheme("blue")} style={buttonStyle}>
          Blue
        </button>
        <button onClick={() => setTheme("green")} style={buttonStyle}>
          Green
        </button>
        <button onClick={() => setTheme("pink")} style={buttonStyle}>
          Pink
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          style={{
            padding: "10px",
            margin: "10px 0",
            backgroundColor: message.includes("success") ? "#d4edda" : "#f8d7da",
            color: message.includes("success") ? "#155724" : "#721c24",
            border: "1px solid #c3e6cb",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {message}
        </div>
      )}

      {/* Donor Form */}
      <DonorForm
        handleSubmit={handleSubmit}
        editDonor={editDonor}
        inputStyle={inputStyle}
        buttonStyle={buttonStyle}
        themeStyles={themeStyles}
        theme={theme}
      />

      {/* Donors Section */}
      <CollapsibleSection title="Donors">
        <DonorList
          donors={donors}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          buttonStyle={buttonStyle}
        />
      </CollapsibleSection>

      {/* Inventory Section */}
      <CollapsibleSection title="Blood Inventory">
        <Inventory inventory={inventory} />
      </CollapsibleSection>

      {/* Report Section */}
      <CollapsibleSection title="Reports">
        <button onClick={generateReport} style={buttonStyle}>
          Generate Report
        </button>
        {report && <Report report={report} />}
      </CollapsibleSection>
    </div>
  );
}

export default App;