import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/spelling.css";

import egg from "./egg.svg";
import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import { useState } from "react";

function SpellingResult() {
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

  // ✅ fake download handler
  const handleDownload = () => {
    const blob = new Blob(
      [JSON.stringify(resultData, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "spelling-results.json";
    a.click();
    URL.revokeObjectURL(url);

    setShowConfirm(false);
  };

  return (
    <div className="file-container1">

      <Header toggleSidebar={() => setIsSidebarOpen(true)} />
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* // im the new thingy for download */}
      {showConfirm && (
        <div className="loading-overlay">
          <div className="loading-content">
            <h2>Download file?</h2>
            <p>This will save your spelling results.</p>

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

      <div className="result-layout1">

        <div className="table-wrapper1">
          <div className="result-table1">

            {/* HEADER */}
            <div className="table-header1">
              <span>File Name</span>
              <span>Spelling Mistake</span>
              <span>Total Words</span>
              <span>Spelling Score</span>
            </div>

            {/* ROWS */}
            {resultData.files.map((file, index) => (
              <div className="table-row1" key={index}>
                <span>{file.name}</span>
                <span>{Math.floor(Math.random() * 20) + 1}</span>
                <span>{Math.floor(Math.random() * 500) + 200}</span>
                <span>{Math.floor(Math.random() * 30) + 70}%</span>
              </div>
            ))}

            {/* DOWNLOAD BUTTON  // im the new thingy for download*/}
            <button
              className="dl-but1"
              onClick={() => setShowConfirm(true)}
            >
              Download
            </button>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="mistake-panel1">
          <div className="nekobox1">
            <h2>Spelling Mistakes</h2>
          </div>

          <div className="mistake-box1">
            Select a file to view mistakes
          </div>
        </div>

      </div>

      <img className="egg1" src={egg} alt="Egg" />
    </div>
  );
}

export default SpellingResult;