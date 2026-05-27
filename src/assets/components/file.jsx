import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleDrop, handleDragOver, handleFileChange } from "./dragdrop.js";

import "../../styles/file.css";
import egg from "../../assets/components/egg.svg";
import book2 from "../../assets/components/book2.svg";

import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";

function File() {
  const [files, setFiles] = useState([]);

   // im the new thingy for loaidnung
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  //  im the new thingy for loaidnung
  const handleUploadFiles = async (e) => {
    setUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      handleFileChange(e, setFiles);
    } finally {
      setUploading(false);
    }
  };

  //  // im the new thingy for loaidnung)
  const handleUpload = async () => {
    if (files.length === 0) {
      alert("No files selected");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const fakeResult = {
        files: files.map((file) => ({
          name: file.name,
          mostSimilar: "file10.pdf",
          similarity: Math.floor(Math.random() * 100),
        })),
      };

      navigate("/result", { state: fakeResult });

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFiles([]);
  };

  return (
    <>
      <Header toggleSidebar={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      {/*  // im the new thingy for loaidnung */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <h2>Hold on...</h2>
            <p>Analyzing uploaded files 🧠</p>
          </div>
        </div>
      )}

      <div className="file-container">

        <div className="upload-box">
          <h1 className="title">Similarity Detection</h1>

          {/* DROP AREA */}
          {!loading && files.length === 0 && (
            <div
              className="drop-area"
              onDrop={(e) => handleDrop(e, setFiles)}
              onDragOver={handleDragOver}
            >
              <p>Click to choose files what to upload!</p>

              <input
                type="file"
                multiple
                onChange={handleUploadFiles}
                className="file-input"
                disabled={loading || uploading}
              />

              {/*  // im the new thingy for loaidnung */}
              {uploading && (
                <div className="uploading-text">
                  <div className="small-spinner"></div>
                  <p>Uploading files...</p>
                </div>
              )}
            </div>
          )}

          {/* FILE LIST */}
          {!loading && files.length > 0 && (
            <div className="file-list">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BUTTONS */}
        <div className="btns">
          <button
            className="compare-btn1"
            onClick={handleUpload}
            disabled={loading || uploading}
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>

          <button
            className="cancel-btn1"
            onClick={handleCancel}
            disabled={loading || uploading}
          >
            Cancel
          </button>
        </div>

        <img className="egg1" src={egg} alt="Egg" />
        <img className="books" src={book2} alt="books" />
      </div>
    </>
  );
}

export default File;