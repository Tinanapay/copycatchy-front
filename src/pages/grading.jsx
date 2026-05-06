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

  // ✅ WEIGHT SYSTEM
  const [mode, setMode] = useState("standard");

  const [weights, setWeights] = useState({
    grammar: 30,
    spelling: 25,
    structure: 25,
    clarity: 20,
  });

  const presets = {
    standard: { grammar: 30, spelling: 25, structure: 25, clarity: 20 },
    grammar: { grammar: 40, spelling: 30, structure: 20, clarity: 10 },
    balanced: { grammar: 25, spelling: 25, structure: 25, clarity: 25 },
  };

  const handlePreset = (value) => {
    setMode(value);

    if (value !== "custom") {
      setWeights(presets[value]);
    }
  };

  const handleInputChange = (key, value) => {
    setWeights((prev) => ({
      ...prev,
      [key]: Number(value),
    }));
  };

  const total = Object.values(weights).reduce((a, b) => a + b, 0);

  // ✅ ANALYZE
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

              <button className="cancel-btn1" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>

          {/* ✅ NEW WEIGHT SYSTEM */}
          <div className="weight-box">

          <div className="weight-header">
          <h2>Grading Weights</h2>
          <p>Choose a preset or customize</p>
          </div>

            {/* DROPDOWN */}
            <select
              className="preset-select"
              value={mode}
              onChange={(e) => handlePreset(e.target.value)}
            >
              <option value="standard">Standard 
                (Grammar: 40%,
                ,Spelling: 30%,
                ,Structure: 20%,
                ,Clarity: 10%)
              </option>

              <option value="grammar">Grammar Focus 
                (Grammar: 40%
                ,Spelling: 30%
                ,Structure: 20%
                ,Clarity: 10%)
              </option>
              
              <option value="balanced">Balanced
                (Grammar: 25%
                ,Spelling: 25%
                ,Structure: 25%
                ,Clarity: 25%)
              </option>

              <option value="custom">Custom</option>
            </select>

            {/* CUSTOM INPUTS */}
            {mode === "custom" && (
              <div className="weight-inputs">

                <div className="input-row">
                  <span>Grammar</span>
                  <input
                    type="number"
                    value={weights.grammar}
                    onChange={(e) =>
                      handleInputChange("grammar", e.target.value)
                    }
                  />
                </div>

                <div className="input-row">
                  <span>Spelling</span>
                  <input
                    type="number"
                    value={weights.spelling}
                    onChange={(e) =>
                      handleInputChange("spelling", e.target.value)
                    }
                  />
                </div>

                <div className="input-row">
                  <span>Structure</span>
                  <input
                    type="number"
                    value={weights.structure}
                    onChange={(e) =>
                      handleInputChange("structure", e.target.value)
                    }
                  />
                </div>

                <div className="input-row">
                  <span>Clarity</span>
                  <input
                    type="number"
                    value={weights.clarity}
                    onChange={(e) =>
                      handleInputChange("clarity", e.target.value)
                    }
                  />
                </div>

              </div>
            )}

            {/* TOTAL */}
            <p className={`total ${total !== 100 ? "error" : ""}`}>
              Total: {total}%
            </p>

          </div>

          {/* UPLOAD */}
          <div className="upload-box1">
           
           <div className="weight-header">
           <h1>Files</h1>
           <p>Drop files here or click to choose</p>
           </div>

            {files.length === 0 && (
              <div
                className="drop-area"
                onDrop={(e) => handleDrop(e, setFiles)}
                onDragOver={handleDragOver}
              >
          

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

      <button className="dl-but11">download</button>
    </div>
  );
}

export default Grading;