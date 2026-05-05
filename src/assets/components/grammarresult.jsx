import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/grammar.css";

import egg from "./egg.svg";
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
        <h2>No results found</h2>
        <button onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="file-container2">

      <Header toggleSidebar={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="result-layout2">

        {/* LEFT SIDE */}
        <div className="table-wrapper2">
        
            <button className="dl-but">Download</button>
         
          <div className="result-table2">

            {/* left table header */}
            <div className="table-header2">
              <span>File Name</span>
              <span>Grammar Mistakes</span>
              <span>Total Words</span>
              <span>Grammar Score</span>
            </div>

            {/* rows */}
            {resultData.files.map((file, index) => (
              <div className="table-row2" key={index}>
                <span>{file.name}</span>

                {/* fake grammar mistakes */}
                <span>
                  {Math.floor(Math.random() * 20) + 1}
                </span>

                {/* fake total words */}
                <span>
                  {Math.floor(Math.random() * 500) + 200}
                </span>

                {/* fake grammar score */}
                <span>
                  {Math.floor(Math.random() * 30) + 70}%
                </span>
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

      <img
        className="egg2"
        src={egg}
        alt="Egg"
      />
    </div>
  );
}

export default GrammarResult;