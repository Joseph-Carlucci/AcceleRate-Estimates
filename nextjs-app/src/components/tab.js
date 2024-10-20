import React from "react";

export default function Tab({ name, isActive, onClick }) {
  const handleClick = () => {
    onClick(name);
  };

  return (
    <div className="tab-container">
      <button
        className={`tab-button ${isActive ? "active" : ""}`}
        onClick={handleClick}
      >
        {name}
      </button>
      <style jsx>{`
        .tab-container {
          width: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .tab-button {
          padding: 12px 20px;
          cursor: pointer;
          background-color: transparent;
          border: none;
          outline: none;
          transition: background-color 0.3s, border-left 0.3s;
          font-size: 16px;
          font-weight: 600; /* Bolder text */
          color: #d3d3d3; /* Light grey text */
          position: relative;
          width: 100%;
          text-align: left;
          display: flex;
          align-items: center;
          border-left: 4px solid transparent;
          border-radius: 8px; /* Rounded edges */
        }
        .tab-button:hover,
        .tab-button.active {
          background-color: #3a3a3a; /* Darker grey background on hover */
          border-radius: 8px; /* Rounded edges on hover */
        }
      `}</style>
    </div>
  );
}
