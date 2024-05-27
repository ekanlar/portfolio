import { Component } from "react";
import "./ProjectCard.css";

class ProjectCard extends Component {
  render() {
    return (
      <div className="projectcard-container">
        <h1 className="projectcard-name">Project Name</h1>

        <img
          className="projectcard-image"
          src="src/assets/images/sudoku_img.png"
          alt="Project Image"
        />

        <p className="projectcard-description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem nulla
        </p>

        <div className="projectcard-icons">
          <img src="src\assets\logos\CSS3_logo.png" alt="" />
          <img src="src\assets\logos\html5_logo.png" alt="" />
          <img src="src\assets\logos\javascript_logo.png" alt="" />
        </div>
      </div>
    );
  }
}

export default ProjectCard;
