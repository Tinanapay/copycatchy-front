import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/spelling.css";


import egg from "./egg.svg";

import Header from "./header.jsx";
import Sidebar from "./sidebar.jsx";
import { useState } from "react";

function SpellingResult() {
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

  

  <div className="file-container1">


    <Header toggleSidebar={() => setIsSidebarOpen(true)} />
    <Sidebar
      isOpen={isSidebarOpen}
      closeSidebar={() => setIsSidebarOpen(false)}
    />

    <div className="result-layout1">

        <div className="table-wrapper1">

  <div className="result-table1">

    {/* left side HEADER */}
    <div className="table-header1">
      <span>File Name</span>
      <span>Spelling Mistake</span>
      <span>Total Words</span>
      <span>Spelling Score</span>
    </div>

      {/* ROWS */}
    {resultData.files.map((file, index) => (
      <div className="table-row1" key={index}>
        <span>{file.name}</span>

        {/* fake spelling mistakes count */}
        <span>{Math.floor(Math.random() * 20) + 1}</span>

        {/* fake total words */}
        <span>{Math.floor(Math.random() * 500) + 200}</span>

        {/* fake spelling score */}
        <span>{Math.floor(Math.random() * 30) + 70}%</span>
      </div>
    ))}

  </div>
</div>

      {/* RIGHT SIDE = DETAILS / MISTAKES */}
      <div className="mistake-panel1">
  
        <div className="nekobox1">
       <h2 >Spelling Mistakes</h2>
       <button className= "dl-but"> download</button>
       </div>

        {/* this will come from another file later */}
        <div className="mistake-box1">
          Select a file to view mistakes
          
        </div>
      </div>
    </div>
     <img className="egg2" src={egg} alt="Egg" />
  </div>
);
}

export default SpellingResult;