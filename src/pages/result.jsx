import { useLocation, useNavigate } from "react-router-dom";
import "../styles/result.css";

import egg from "../assets/components/egg.svg";
import Header from "../assets/components/header.jsx";
import Sidebar from "../assets/components/sidebar.jsx";
import { useState } from "react";

function Result() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state;

  if (!resultData) {
    return (
      <div>
        <h2>No results found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  // ✅ fake download function
  const handleDownload = () => {
    console.log("Downloading file...");
    setShowConfirm(false);

    // you can replace this with real file download later
    const blob = new Blob(
      [JSON.stringify(resultData, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "results.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="file-container">

      <Header toggleSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/*  // im the new thingy for download*/}
      {showConfirm && (
        <div className="loading-overlay">
          <div className="loading-content">
            <h2>Download file?</h2>
            <p>This will save results to your device.</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                className="compare-btn1"
                onClick={handleDownload}
              >
               Download
              </button>

              <button
                className="cancel-btn1"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="result-table">

        {/* DOWNLOAD BUTTON  // im the new thingy for download*/}
        <button
          className="dl-but1"
          onClick={() => setShowConfirm(true)}
        >
          Download
        </button>

        <div className="table-header">
          <span>File Name</span>
          <span>Status</span>
          <span>Most Similar</span>
          <span>Similarity</span>
        </div>

        {/* ROWS */}
        {resultData.files.map((file, index) => (
          <div className="table-row" key={index}>
            <span>{file.name}</span>

            <span>
              {file.similarity > 70 ? "High Risk" : "Safe"}
            </span>

            <span>{file.mostSimilar}</span>
            <span>{file.similarity}%</span>
          </div>
        ))}
      </div>

      <img className="egg2" src={egg} alt="Egg" />
    </div>
  );
}

export default Result;