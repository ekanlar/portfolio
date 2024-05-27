// CSS File Import
import "./App.css";

// React Imports
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Page Imports
import Home from "./pages/Home/Home";
import Project from "./pages/Project/Project";

//Component Imports
import BackgroundAnimation from "./components/BackgroundAnimation/BackgroundAnimation";
import Login from "./components/Login/Login";

//Firebase Imports
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchData } from "../firebase";

// Define the Project type
interface Project {
  id: string;
  title: string;
  description: string;
  imageLink: string[];
}

function App() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await fetchData();
      setProjects(projectsData);
      console.log("Fetched Projects: ", projectsData);
      setLoading(false);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        setIsLoggedIn(true);
      } else {
        console.log("No user is logged in");
        setIsLoggedIn(false);
      }
      if (!loading) setLoading(false); // Set loading to false after auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while checking auth state
  }

  return (
    <>
      <BackgroundAnimation />
      {isPopupOpen && (
        <Login setIsPopupOpen={setIsPopupOpen} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              setIsPopupOpen={setIsPopupOpen}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        {/* <Route
          path="/project"
          element={
            <Project
              setIsPopupOpen={setIsPopupOpen}
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        /> */}
        {projects.map((project) => (
          <Route
            key={project.id}
            path={`/project/${encodeURIComponent(project.title)}`}
            element={
              <Project
                setIsPopupOpen={setIsPopupOpen}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                project={project}
              />
            }
          />
        ))}
        {/* <Route path="*" element={<div>Page not found</div>} />{" "} */}
        {/* Catch-all route for debugging*/}
      </Routes>
    </>
  );
}

export default App;
