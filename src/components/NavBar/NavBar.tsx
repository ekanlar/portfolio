import { Component, useEffect, useState } from "react";
import "./NavBar.css";
import Login from "../Login/Login";
import { auth } from "../../../firebase";
import AddProject from "../AddProject/AddProject";

// class NavBar extends Component {

//   const [isPopupOpen, setIsPopupOpen] = useState(false)

//   render() {
//     return (
//       <div className="navbar-container">
//         <ul className="navbar-list">
//           <li>Home</li>
//           <li>Projects</li>
//           <li>Blog</li>
//         </ul>
//         <button className="navbar-login-button">Login</button>
//       </div>
//     );
//   }
// }

interface NavBarProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddProjectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function NavBar({
  setIsPopupOpen,
  isLoggedIn,
  setIsLoggedIn,
  setIsAddProjectOpen,
}: NavBarProps) {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // setIsLoggedIn(false);
      console.log("User logged out");
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div className="navbar-container">
      {isLoggedIn && (
        <button
          className="navbar-addproject"
          onClick={() => {
            setIsAddProjectOpen(true);
          }}
        >
          Add Project
        </button>
      )}
      <ul className="navbar-list">
        <li>Home</li>
        <li>Projects</li>
        <li>Blog</li>
        {isLoggedIn && <li>Manage</li>}
      </ul>
      <button
        className="navbar-login-button"
        // onClick={isLoggedIn ? () => logout() : () => setIsPopupOpen(true)}
        onClick={isLoggedIn ? () => handleLogout() : () => setIsPopupOpen(true)}
      >
        {/* {isLoggedIn ? "Logout" : "Login"} */}
        {isLoggedIn ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default NavBar;
