import { Component } from "react";
import "./ProjectCard.css";
import { Link } from "react-router-dom";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    imageLink: string[];
  };
}

class ProjectCard extends Component<ProjectCardProps> {
  render() {
    const { project } = this.props;
    return (
      <Link to={`/project/${project.title}`} className="projectcard-link">
        <div className="projectcard-container">
          <h1 className="projectcard-name">{project.title} </h1>

          <img
            className="projectcard-image"
            src={project.imageLink[0]}
            alt="Project Image"
          />

          <p className="projectcard-description">{project.description}</p>

          <div className="projectcard-icons">
            <img src="src\assets\logos\CSS3_logo.png" alt="" />
            <img src="src\assets\logos\html5_logo.png" alt="" />
            <img src="src\assets\logos\javascript_logo.png" alt="" />
          </div>
        </div>
      </Link>
    );
  }
}

export default ProjectCard;
