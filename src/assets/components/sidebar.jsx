import { useNavigate } from "react-router-dom";
import "../../styles/sidebar.css";
import File from "./file.jsx";

function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();

 {/* for test */}
   const user = {
    name: "Hello",
    role: "Welcome to Copycatch",
  };


const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

  return (

    
    <div className={`sidebar ${isOpen ? "open" : ""}`}>

      <div className="sidebar-header">
     

       {/* 👤 PROFILE SECTION */}
      <div className="sidebar-profile">
        <div className="avatar-circle">
          {user.name.charAt(0)}
        </div>
          <div className="profile-info">
          <p className="profile-name">{user.name}</p>
          <p className="profile-role">{user.role}</p>
        </div>
      </div>
      
      </div>
  
      <button className="closed-btn" onClick={closeSidebar}>≡</button>
      <div className="sidebar-nav">
        <button className="file-btn" onClick={() => navigate("/File")}>
          Similarity Detection
        </button>

        <button className="spel-btn" onClick={() => navigate("/spelling")}>
          Spelling Checker
        </button>

        <button className="gram-btn" onClick={() => navigate("/grammar")}>
          Grammar Checker
        </button>

        <button className="rep-btn" onClick={() => navigate("/grading")}>
         Automated Grading
        </button>
      </div>

      <div className="logout-sidebar">
     <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
      </div>

    </div>
  );
}

export default Sidebar;