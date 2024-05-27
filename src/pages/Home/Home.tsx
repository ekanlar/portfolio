import { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Home.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";

const array1 = [<ProjectCard />, <ProjectCard />];

interface HomeProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

class Home extends Component<HomeProps> {
  render() {
    const { setIsPopupOpen, isLoggedIn, setIsLoggedIn } = this.props;
    return (
      <>
        <NavBar
          setIsPopupOpen={setIsPopupOpen}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="home-container">
          <div className="home-main-section">
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            <ProjectCard />
            {array1}
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
