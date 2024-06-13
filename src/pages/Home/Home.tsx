import { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Project } from "../../App"; // Import the Project type from App.tsx
import { auth } from "../../../firebase";

interface HomeProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  projects: Project[];
  setIsAddProjectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const handleLogout = async () => {
  try {
    await auth.signOut();
    console.log("User logged out");
  } catch (error) {
    console.error("Logout error", error);
  }
};

class Home extends Component<HomeProps> {
  render() {
    const {
      setIsPopupOpen,
      isLoggedIn,
      setIsLoggedIn,
      projects,
      setIsAddProjectOpen,
    } = this.props;

    return (
      <>
        <NavBar
          setIsPopupOpen={setIsPopupOpen}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsAddProjectOpen={setIsAddProjectOpen}
        />
        <div className="home-container">
          <div className="home-main-section">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
        <button
          className="home-login-button"
          onClick={isLoggedIn ? handleLogout : () => setIsPopupOpen(true)}
        >
          {isLoggedIn ? "Logout" : "Admin"}
        </button>
      </>
    );
  }
}

export default Home;

// interface HomeProps {
//   setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }

// function Home({setIsPopupOpen}) {
//     return (
//       <>
//         <NavBar />
//         <div className="home-container">
//           <div className="home-main-section">
//             <ProjectCard />
//             <ProjectCard />
//             <ProjectCard />
//             <ProjectCard />
//             {array1}
//           </div>
//         </div>
//       </>
//     );
// }

// export default Home;
