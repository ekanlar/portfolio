import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import MyPic from "../../assets/images/MyPic.jpeg";

// Styled components for the floating image and expanded div
const Container = styled.div`
  position: fixed;
  top: 10px;
  left: 10px;
  z-index: 1000;

  @media (max-width: 768px) {
    top: 10px;
  }
`;

const TextContainer = styled.div`
  padding-bottom: 30px;
  transform: rotate(-15deg); // Adjust the angle as needed
  white-space: nowrap; // Prevent text wrapping
  position: absolute;
  left: 20px;
  font-size: 40px; // Adjust the font size as needed
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000; // Simulates a border by creating a shadow on all sides
  font-family: "Lobster", sans-serif;

  @media (max-width: 768px) {
    // Media query for smaller screens
    font-size: 30px; // Smaller font size for smaller screens
    padding-bottom: 15px;
    left: 0px;
  }
`;

const FloatingImage = styled.div<{ expanded: boolean }>`
  width: ${(props) => (props.expanded ? "300px" : "160px")};
  height: ${(props) => (props.expanded ? "300px" : "200px")};
  background-image: url(${MyPic});
  background-size: cover;
  background-position: center;
  border: 5px double rgba(135, 187, 162, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: ${(props) =>
    props.expanded ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none"};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    // Media query for smaller screens
    width: ${(props) =>
      props.expanded ? "150px" : "80px"}; // Smaller width for smaller screens
    height: ${(props) =>
      props.expanded ? "150px" : "100px"}; // Smaller height for smaller screens
  }
`;

const ExpandedContent = styled.div<{ expanded: boolean }>`
  display: ${(props) => (props.expanded ? "block" : "none")};
  margin-top: 10px;
  padding: 20px;
  background: linear-gradient(
    rgba(201, 228, 202, 1),
    rgba(135, 187, 162, 1),
    rgba(85, 130, 139, 0.9),
    rgba(59, 96, 100, 0.9),
    rgba(54, 73, 88, 0.8)
  );
  border: 5px double white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  width: 300px;
  height: 300px;
  transform: translateY(${(props) => (props.expanded ? "250px" : "0")});
  transition: transform 0.3s ease-in-out;
  pointer-events: ${(props) => (props.expanded ? "auto" : "none")};

  @media (max-width: 768px) {
    // Media query for smaller screens
    width: 300px; // Smaller width for smaller screens
    height: 300px; // Smaller height for smaller screens
    transform: translateY(
      ${(props) => (props.expanded ? "125px" : "0")}
    ); // Adjust transform for smaller screens
    padding: 10px; // Smaller padding for smaller screens
  }
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
`;

const AboutMe: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Container ref={containerRef}>
      <FloatingImage expanded={expanded} onClick={handleToggle}>
        {!expanded && <TextContainer>About Me</TextContainer>}
      </FloatingImage>
      <ExpandedContent expanded={expanded}>
        <CloseButton onClick={handleToggle}>×</CloseButton>
        <h2>About Me</h2>
        <p>
          Hello! I'm [Your Name], a highly capable and motivated software
          developer with experience in various programming languages and
          technologies. I love creating innovative solutions and collaborating
          with teams to build amazing applications.
        </p>
      </ExpandedContent>
    </Container>
  );
};

export default AboutMe;
