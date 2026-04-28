import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/grammar.css";

import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import { useState } from "react";

function GrammarResult() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state;

  if (!resultData) {
    return (


      <div>
        <h2>No results found </h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  return (

  <div className="file-container">

    <Header toggleSidebar={() => setIsSidebarOpen(true)} />
    <Sidebar
      isOpen={isSidebarOpen}
      closeSidebar={() => setIsSidebarOpen(false)}
    />

    <div className="result-layout">

        <div className="table-wrapper">

  <div className="result-table">

    {/* left side HEADER */}
    <div className="table-header">
      <span>File Name</span>
      <span>Mispelled Words</span>
      <span>Total Words</span>
      <span>Spelling Score</span>
    </div>

    {/* ROWS */}
    {resultData.files.map((file, index) => (
      <div className="table-row" key={index}>
        <span>{file.name}</span>
        <span>{file.similarity > 70 ? "High Risk" : "Safe"}</span>
        <span>{file.mostSimilar}</span>
        <span>{file.similarity}%</span>
      </div>
    ))}

  </div>
</div>

      {/* RIGHT SIDE = DETAILS / MISTAKES */}
      <div className="mistake-panel">
        <h2>Spelling Mistakes</h2>

        {/* this will come from another file later */}
        <div className="mistake-box">
          Select a file to view mistakes
        </div>
      </div>

    </div>
  </div>
);
}

export default GrammarResult;