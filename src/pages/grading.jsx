import { useState } from "react";
import Header from "../assets/components/header.jsx";
import Sidebar from "../assets/components/sidebar.jsx";

import {
  handleDrop,
  handleDragOver,
  handleFileChange,
} from "../assets/components/dragdrop";

import "../styles/grading.css";
import egg from "../assets/components/egg.svg";

function Grading() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);

  // fixed grading system (100%)
  const weights = {
    grammar: 30,
    spelling: 25,
    structure: 25,
    clarity: 20,
  };

  const handleAnalyze = () => {
    const fake = files.map((file) => ({
      name: file.name,
      mistakes: Math.floor(Math.random() * 20),
      total: Math.floor(Math.random() * 500) + 200,
      score: Math.floor(Math.random() * 30) + 70,
    }));

    setResults(fake);
  };

  const handleCancel = () => {
    setFiles([]);
    setResults([]);
  };

const toggleWeight = (key) => {
  setSelectedWeights((prev) => ({
    ...prev,
    [key]: !prev[key],
  }));
};

const [selectedWeights, setSelectedWeights] = useState({
  grammar: false,
  spelling: false,
  structure: false,
  clarity: false,
});

  return (
    <div className="homepage-container">
      <Header toggleSidebar={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="grading-layout">

        {/* LEFT SIDE */}
        <div className="grading-left">

          {/* TOP BAR */}
          <div className="top-bar">
            <h1 className="title11">Automated Grading</h1>

        <div className="top-bar">
            <button className="compare-btn1" onClick={handleAnalyze}>
              Check
            </button>
             {/* CANCEL */}
          <button className="cancel-btn1" onClick={handleCancel}>
            Cancel
          </button>
          </div>
          </div>

          {/* WEIGHTS */}

<div className="weight-buttons">

   <h2>Grading Weights</h2>
                 <h4>Totals are added for the final</h4>
  <button
    className={`weight-btn ${selectedWeights.grammar ? "active" : ""}`}
    onClick={() => toggleWeight("grammar")}
  >
    Grammar 20%
  </button>

  <button
    className={`weight-btn ${selectedWeights.spelling ? "active" : ""}`}
    onClick={() => toggleWeight("spelling")}
  >
    Spelling 15%
  </button>

  <button
    className={`weight-btn ${selectedWeights.structure ? "active" : ""}`}
    onClick={() => toggleWeight("structure")}
  >
    Structure 15%
  </button>

  <button
    className={`weight-btn ${selectedWeights.clarity ? "active" : ""}`}
    onClick={() => toggleWeight("clarity")}
  >
    Clarity 20%
  </button>
</div>
          {/* UPLOAD */}
          <div className="upload-box1">
            <h1>Files</h1>
            
            {files.length === 0 && (
              <div
                className="drop-area"
                onDrop={(e) => handleDrop(e, setFiles)}
                onDragOver={handleDragOver}
              >
                <p>Drop files here or click to choose</p>

                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, setFiles)}
                  className="file-input"
                />
              </div>
            )}

            {files.length > 0 && (
              <div className="file-list">
                {files.map((file, i) => (
                  <div key={i} className="file-item">
                    {file.name}
                  </div>
                ))}
              </div>
            )}
          </div>

         
        </div>

        {/* RIGHT SIDE */}
        <div className="grading-right">

          <div className="result-table1">

            <div className="table-header1">
              <span>File Name</span>
              <span>Mistakes</span>
              <span>Total Words</span>
              <span>Score</span>
            </div>

            {results.map((r, i) => (
              <div className="table-row1" key={i}>
                <span>{r.name}</span>
                <span>{r.mistakes}</span>
                <span>{r.total}</span>
                <span>{r.score}%</span>
              </div>
            ))}

          </div>
        </div>

      </div>
      <button className= "dl-but11"> download</button>
      <img className="egg2" src={egg} alt="egg" />
    </div>
  );
}

export default Grading;