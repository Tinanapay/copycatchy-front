import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/grammar.css";
import Header from "../assets/components/header.jsx";
import Sidebar from "../assets/components/sidebar.jsx";

import {
  handleDrop,
  handleDragOver,
  handleFileChange
} from "../assets/components/dragdrop";

import egg from "../assets/components/egg.svg";
import book2 from "../assets/components/book2.svg";

function Grammar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  // im the new thingy for loaidnung
  const [loading, setLoading] = useState(false);

  // im the new thingy for uploading
  const [uploading, setUploading] = useState(false);

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

  const handleUpload = async () => {

    // im the new thingy for loaidnung
    if (files.length === 0) {
      alert("No files selected");
      return;
    }

    // im the new thingy for loaidnung
    setLoading(true);

    try {

      // im the new thingy for loaidnung
      // fake delay for testing/demo
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const fakeResult = {
        files: files.map((file) => ({
          name: file.name,
          mostSimilar: "file10.pdf",
          similarity: Math.floor(Math.random() * 100),
        })),
      };

      navigate("/GrammarResult", { state: fakeResult });

    } catch (error) {

      // im the new thingy for loaidnung
      console.log(error);
      alert("Upload failed");

    } finally {

      // im the new thingy for loaidnung
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFiles([]);
  };

  return (
    <div className="homepage-container">

      {/* im the new thingy for loaidnung */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="spinner"></div>
            <h2>Hold on...</h2>
            <p>Checking grammar</p>
          </div>
        </div>
      )}

      <Header toggleSidebar={() => setIsSidebarOpen(true)} />

      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <div className="file-container">

        <div className="upload-box">
          <h1 className="title2">Grammar checker</h1>

          {/* dropping shows if no files yet */}
          {files.length === 0 && (
            <div
              className="drop-area"
              onDrop={(e) => handleDrop(e, setFiles)}
              onDragOver={handleDragOver}
            >
              <p>Click to choose files what to upload!</p>

              <input
                type="file"
                multiple

                // im the new thingy for uploading
                onChange={handleUploadFiles}

                className="file-input"

                // im the new thingy for loaidnung
                disabled={loading || uploading}
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

          {/* SHOW FILE LIST AFTER UPLOAD */}
          {files.length > 0 && (
            <div className="file-list">
              {files.map((file, index) => (
                <div className="file-item" key={index}>
                  {file.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="btns">

          {/* compare btn is for check too */}
          <button
            className="compare-btn1"
            onClick={handleUpload}

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

        <img className="egg1" src={egg} alt="Egg" />
        <img className="books" src={book2} alt="books" />
      </div>
    </div>
  );
}

export default Grammar;