import { useNavigate } from "react-router-dom";

import { useState } from "react";
import "../styles/homepage.css"
import Header from "../assets/components/header.jsx";
import Sidebar from "../assets/components/sidebar.jsx";

import egg from "../assets/components/egg.svg";
import learn from "../assets/components/learn.svg";

import File from "../assets/components/file.jsx";
import Spelling from "../pages/spelling.jsx";
import Grading from "../pages/grading.jsx";
function Homepage ({ setPage }) {
  const [isSidebarOpen,setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (

    <div className="homepage-container">
          <Header toggleSidebar={() => setIsSidebarOpen(true)} />
            <Sidebar 
            isOpen={isSidebarOpen}
            closeSidebar={() => setIsSidebarOpen(false)} />

  <div className= " home-cont">
    <h3>Hello!, What do u want bruh
    </h3>

  <div className="btnss">
          <button
            className="btn1"
            type="button"
          onClick={() => navigate("/file")}>
            Similarity Detection</button>
      
         <button
            className="btn2"
            type="button"
           onClick={() => navigate("/spelling")}>Spelling Checker </button>

        <button
            className="btn3"
            type="button"
        onClick={() => navigate("/grammar")}>Grammar Checker </button>
          
          <button className="btn4"
            type="button"
           onClick={() => navigate("/grading")}>Automated Grading</button>
   
    </div>
        <img className="egg2" src={egg} alt="Egg" />
        <img className="learn" src={learn} alt="nerd" />   

  </div>
    </div>
  );
}


export default Homepage; 