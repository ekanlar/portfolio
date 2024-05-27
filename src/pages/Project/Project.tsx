import { useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import "./Project.css";
import { fetchData } from "../../../firebase";

interface ProjectProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  project: {
    id: string;
    title: string;
    description: string;
    imageLink: string[];
  };
}

function Project({
  setIsPopupOpen,
  isLoggedIn,
  setIsLoggedIn,
  project,
}: ProjectProps) {
  const [largeImageSrc, setLargeImageSrc] = useState<string>(
    project.imageLink[0]
  );

  const handleImageClick = (src: string) => {
    setLargeImageSrc(src);
  };

  return (
    <>
      <NavBar
        setIsPopupOpen={setIsPopupOpen}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />
      <div className="project-container">
        <div className="project-main-section">
          <h1 className="project-title">{project.title}</h1>
          <a
            href="https://www.google.com"
            target="_blank"
            className="project-link"
          >
            Open Project
          </a>
          <img className="project-image" src={largeImageSrc} alt="" />
          <div className="project-image-thumbnail-container">
            {/* <img
              className="project-image-thumbnail"
              src="src/assets/images/imagesProject1/project1_img_1.webp"
              alt=""
              onClick={() =>
                handleImageClick(
                  "src/assets/images/imagesProject1/project1_img_1.webp"
                )
              }
            /> */}

            {project.imageLink.map((image, index) => (
              <img
                key={index}
                className="project-image-thumbnail"
                src={image}
                alt={`${project.title} thumbnail ${index + 1}`}
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          <p className="project-description">{project.description}</p>
        </div>
      </div>
    </>
  );
}

export default Project;
