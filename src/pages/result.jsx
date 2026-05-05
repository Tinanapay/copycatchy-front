import { useLocation, useNavigate } from "react-router-dom";
import "../styles/result.css";

import egg from "../assets/components/egg.svg";

import Header from "../assets/components/header.jsx";
import Sidebar from "../assets/components/sidebar.jsx";
import { useState } from "react";

function Result() {
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
      closeSidebar={() => setIsSidebarOpen(false)} />

   
    
      <div className="result-table">

        <button className= "dl-but1"> download</button>
   
       <div className="table-header">
          <span>File Name</span>
          <span>Status</span>
          <span>Most Similar</span>
          <span>Similarity</span>
        </div>

      {/* ROWS */}
        {resultData.files.map((file, index) => (
          <div className="table-row" key={index}>
            <span >{file.name}</span>

            {/* fake status */}
            <span >
              {file.similarity > 70 ? "High Risk" : "Safe"}
            </span>

            <span>{file.mostSimilar}</span>

            <span>{file.similarity}%</span>
          </div>
          
        ))}
 
    
    </div>
     <img className="egg2" src={egg} alt="Egg" />
    </div>
  );
}

export default Result;