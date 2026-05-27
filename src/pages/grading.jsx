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

  // im the new thingy for loaidnung
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);//im for download

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

// im the new thingy for uploading
const handleUploadFiles = async (e) => {

  // im the new thingy for uploading
  setUploading(true);

  try {

    // fake upload delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    handleFileChange(e, setFiles);

  } catch (error) {

    // im the new thingy for uploading
    console.log(error);

  } finally {

    // im the new thingy for uploading
    setUploading(false);
  }
};


  // ✅ ANALYZE
  const handleAnalyze = async () => {

    // im the new thingy for loaidnung
    if (files.length === 0) {
      alert("No files selected");
      return;
    }

    // im the new thingy for loaidnung
    setLoading(true);

    try {

      // im the new thingy for loaidnung
      // fake delay for demo/testing
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const fake = files.map((file) => ({
        name: file.name,

        // im the new thingy for loaidnung
        grammar: Math.floor(Math.random() * 30) + 70,

        // im the new thingy for loaidnung
        spelling: Math.floor(Math.random() * 30) + 70,

        // im the new thingy for loaidnung
        originality: Math.floor(Math.random() * 30) + 70,

        // im the new thingy for loaidnung
        totalWords: Math.floor(Math.random() * 500) + 200,

        // im the new thingy for loaidnung
        final: Math.floor(Math.random() * 30) + 70,
      }));

      setResults(fake);

    } catch (error) {

      // im the new thingy for loaidnung
      console.log(error);
      alert("Analysis failed");

    } finally {

      // im the new thingy for loaidnung
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFiles([]);
    setResults([]);
  };

    // im the new thingy for downlaod
  const handleDownload = () => {
  const blob = new Blob(
    [JSON.stringify(results, null, 2)],
    { type: "application/json" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "grading-results.json";
  a.click();
  URL.revokeObjectURL(url);

  setShowConfirm(false);
};
  return (
    <div className="homepage-container">

      {/* im the new thingy for loaidnung */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <h2>Hold on...</h2>
            <p>Analyzing files </p>
          </div>
        </div>
      )}

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
              <button
                className="compare-btn1"
                onClick={handleAnalyze}

                // im the new thingy for loaidnung
              disabled={loading || uploading}
              >
                {/* im the new thingy for loaidnung */}
                {loading ? "Checking..." : "Check"}
              </button>

              <button
                className="cancel-btn1"
                onClick={handleCancel}

              // im the new thingy for loaidnung
              disabled={loading || uploading}
              >
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
              <option value="standard">
                Standard
                (Grammar: 40%,
                ,Spelling: 30%,
                ,Structure: 20%,
                ,Clarity: 10%)
              </option>

              <option value="grammar">
                Grammar Focus
                (Grammar: 40%
                ,Spelling: 30%
                ,Structure: 20%
                ,Clarity: 10%)
              </option>

              <option value="balanced">
                Balanced
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
              <p>Click to choose files what to upload!</p>
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
                 // im the new thingy for uploading   
                 onChange={handleUploadFiles}
                  className="file-input"
                />

                {/* im the new thingy for uploading */}
                {uploading && (
                  <div className="uploading-text">
                    <div className="small-spinner"></div>
                    <p>Uploading files...</p>
                  </div>
                )}
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

        {/* RIGHT */}
        <div className="grading-right">
          <div className="result-table1">

            {/* HEADER */}
            <div className="table-header1">
              <span>File Name</span>
              <span>Grammar</span>
              <span>Spelling</span>
              <span>Originality</span>
              <span>Total Words</span>
              <span>Final Grade</span>
            </div>

            {/* ROWS */}
            {results.map((r, i) => (
              <div className="table-row1" key={i}>
                <span>{r.name}</span>
                <span>{r.grammar}%</span>
                <span>{r.spelling}%</span>
                <span>{r.originality}%</span>
                <span>{r.totalWords}</span>
                <span>{r.final}%</span>
              </div>
            ))}

          </div>
        </div>

      </div>

      <button
        className="dl-buto"
        onClick={() => setShowConfirm(true)}
      >
        Download
      </button>

      <img className="egg12" src={egg} alt="Egg" />
      {showConfirm && (
  <div className="loading-overlay">
    <div className="loading-content">
      <h2>Download file?</h2>
      <p>This will save your grading results.</p>

      <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
        <button className="compare-btn1" onClick={handleDownload}>
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
    </div>
  );
}

export default Grading;