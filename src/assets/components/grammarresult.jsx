import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/grammar.css";

import egg from "./egg.svg";
import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import { useState } from "react";

function GrammarResult() {
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

  // ✅ download handler
  const handleDownload = () => {
    const blob = new Blob(
      [JSON.stringify(resultData, null, 2)],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "grammar-results.json";
    a.click();
    URL.revokeObjectURL(url);

    setShowConfirm(false);
  };

  return (
    <div className="file-container2">

      <Header toggleSidebar={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/* // im the new thingy for download*/}
      {showConfirm && (
        <div className="loading-overlay">
          <div className="loading-content">
            <h2>Download file?</h2>
            <p>This will save your grammar results.</p>

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

      <div className="result-layout2">

        {/* LEFT SIDE */}
        <div className="table-wrapper2">
           
         {/* // im the new thingy for download*/}
          <button
            className="dl-but"
            onClick={() => setShowConfirm(true)}
          >
            Download
          </button>

          <div className="result-table2">

            <div className="table-header2">
              <span>File Name</span>
              <span>Grammar Mistakes</span>
              <span>Total Words</span>
              <span>Grammar Score</span>
            </div>

            {resultData.files.map((file, index) => (
              <div className="table-row2" key={index}>
                <span>{file.name}</span>
                <span>{Math.floor(Math.random() * 20) + 1}</span>
                <span>{Math.floor(Math.random() * 500) + 200}</span>
                <span>{Math.floor(Math.random() * 30) + 70}%</span>
              </div>
            ))}

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="mistake-panel2">

          <div className="nekobox">
            <h2>Grammatical Mistakes</h2>
          </div>

          <div className="mistake-box2">
            Select a file to view mistakes
          </div>

        </div>

      </div>

      <img className="egg1" src={egg} alt="Egg" />
    </div>
  );
}

export default GrammarResult;