import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleDrop, handleDragOver, handleFileChange } from "./dragdrop";

import "../../styles/file.css";
import egg from "../../assets/components/egg.svg";
import book2 from "../../assets/components/book2.png";

import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";



function File({ setPage }) {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleUpload = () => {
   // if (files.length === 0) {
   //   alert("No files selected");
    //  return;
  //  }
//for test
    const fakeResult = {
      files: files.map((file) => ({
        name: file.name,
        mostSimilar: "file10.pdf",
        similarity: Math.floor(Math.random() * 100),
      })),
    };

    navigate("/result", { state: fakeResult });
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

    <div className="file-container">
      <div className="upload-box">
        <h1 className="meow">Similarity Detection</h1>
        <h2 className="title">Upload Student Submissions</h2>

        <div
          className="drop-area"
          onDrop={(e) => handleDrop(e, setFiles)}
          onDragOver={handleDragOver}
        >
          <p>Drop files here or click to choose files</p>

          <input
            type="file"
            multiple
            onChange={(e) => {
              console.log(e.target.files);
              handleFileChange(e, setFiles);
            }}
            className="file-input"
          />
        </div>

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
        <button className="compare-btn" onClick={handleUpload}>
          Compare
        </button>

        <button className="cancel-btn" onClick={handleCancel}>
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