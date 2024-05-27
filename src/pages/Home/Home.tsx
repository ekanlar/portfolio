import { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import { Project } from "../../App"; // Import the Project type from App.tsx

interface HomeProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  projects: Project[];
  setIsAddProjectOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

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
