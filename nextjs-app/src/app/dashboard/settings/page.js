"use client";
import React, { useState } from "react";

const SettingsPage = () => {
  const [username, setUsername] = useState("JohnDoe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveChanges = () => {
    // Here you can implement logic to save the changes (e.g., API calls)
    alert("Settings saved successfully!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Settings</h1>
      <p style={styles.description}>Manage your application settings here.</p>

      {/* Profile Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Profile Information</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
        </div>
      </section>

      {/* Notification Settings */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Notification Preferences</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Enable Notifications</label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            style={styles.checkbox}
          />
        </div>
      </section>

      {/* Appearance Settings */}
      <section style={styles.section}>
        <h2 style={styles.sectionHeader}>Appearance</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            style={styles.checkbox}
          />
        </div>
      </section>

      {/* Save Button */}
      <button onClick={handleSaveChanges} style={styles.saveButton}>
        Save Changes
      </button>
    </div>
  );
}

export default SettingsPage;

const styles = {
  container: {
    maxWidth: "600px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginBottom: "20px",
  },
  section: {
    marginBottom: "30px",
  },
  sectionHeader: {
    fontSize: "18px",
    color: "#333",
    borderBottom: "2px solid #ddd",
    paddingBottom: "5px",
    marginBottom: "15px",
  },
  formGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
  },
  label: {
    fontSize: "16px",
    color: "#333",
    flex: "1",
  },
  input: {
    flex: "2",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  checkbox: {
    transform: "scale(1.2)",
  },
  saveButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#0070f3",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  saveButtonHover: {
    backgroundColor: "#005bb5",
  },
};
