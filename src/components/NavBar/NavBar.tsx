import "./NavBar.css";
import { auth } from "../../../firebase";
import { Link } from "react-router-dom";
import homeIcon from "../../assets/logos/homeIcon.png";
import linkedInLogo from "../../assets/logos/linkedInLogo.png";
import githubIcon_wbg from "../../assets/logos/githubIcon_wbg.png";

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
  // setIsLoggedIn,
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
      <div className="navbar-links-container">
        <Link to="/" className="navbar-home-link" draggable="false">
          <button className="navbar-link-button">
            <img
              src={homeIcon}
              alt="Home Icon"
              className="navbar-link-icon"
              draggable="false"
            />
            <span className="navbar-link-text">Home</span>
          </button>
        </Link>
        <a
          href="http://www.linkedin.com/in/emirhan-kanlar"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-linkedin-link"
          draggable="false"
        >
          <button className="navbar-link-button">
            <img
              src={linkedInLogo}
              alt="LinkedIn Icon"
              className="navbar-link-icon"
              draggable="false"
            />
            <span className="navbar-link-text">LinkedIn</span>
          </button>
        </a>
        <a
          href="https://github.com/ekanlar"
          target="_blank"
          rel="noopener noreferrer"
          className="navbar-linkedin-link"
          draggable="false"
        >
          <button className="navbar-link-button">
            <img
              src={githubIcon_wbg}
              alt="LinkedIn Icon"
              className="navbar-link-icon"
              draggable="false"
            />
            <span className="navbar-link-text">GitHub</span>
          </button>
        </a>
      </div>
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
