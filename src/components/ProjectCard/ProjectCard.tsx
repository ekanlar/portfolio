import { Component } from "react";
import "./ProjectCard.css";
import { Link } from "react-router-dom";
import loadingIcon from "../../assets/logos/loading.gif";
import pendulum from "../../assets/logos/pendulum.gif";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    imageLink: string[];
  };
}

interface ProjectCardState {
  isImageLoaded: boolean;
}

class ProjectCard extends Component<ProjectCardProps, ProjectCardState> {
  constructor(props: ProjectCardProps) {
    super(props);
    this.state = {
      isImageLoaded: false,
    };
  }

  handleImageLoad = () => {
    this.setState({ isImageLoaded: true });
  };

  render() {
    const { project } = this.props;
    const { isImageLoaded } = this.state;
    return (
      <Link to={`/project/${project.title}`} className="projectcard-link">
        <div className="projectcard-container">
          <h1 className="projectcard-name">{project.title} </h1>

          {!isImageLoaded && (
            <img
              className="projectcard-loading-icon"
              src={loadingIcon}
              alt="Loading..."
            />
          )}
          <img
            className="projectcard-image"
            src={project.imageLink[0]}
            alt="Project Image"
            onLoad={this.handleImageLoad}
            style={{ display: isImageLoaded ? "block" : "none" }}
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
