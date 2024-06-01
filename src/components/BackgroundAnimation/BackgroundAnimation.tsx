import { useEffect } from "react";
import "./BackgroundAnimation.css";

const codes = [
  "if",
  "else",
  "class",
  "return",
  "function",
  "var",
  "switch",
  "case",
  "default",
  "for",
  "return",
  "break",
  "continue",
  "async",
  "await",
  "const",
  "let",
  "while",
  "{ }",
  "( )",
  "[ ]",
  "=>",
  "<=",
  ">=",
  "==",
  "===",
  "!=",
  "!==",
  "+",
  "-",
  "*",
  "/",
  "%",
  "||",
  "&&",
];

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

let activeElements = 0; // Counter for Active Animation Elements

const createCodeElement = () => {
  const codeElement = document.createElement("div");
  codeElement.className = "code";
  codeElement.innerText = codes[getRandomInt(codes.length)];
  codeElement.style.top = `${0}px`;
  codeElement.style.left = `${getRandomInt(window.innerWidth)}px`;
  codeElement.style.color = getRandomColor(); // Apply random color

  // calculate the animation duration according to the window height
  //  so the animation speed doesn't change as the window height changes
  const duration = window.innerHeight;
  // console.log(duration);    // uncomment for debug -- shows window size, use this to calculate required background elements
  codeElement.style.animationDuration = `${(duration * 2) / 100}s`; // animation duration is same as the setTimeout time

  document.querySelector(".background")?.appendChild(codeElement);
  activeElements++;
  // console.log(`Element created. Active elements: ${activeElements}`);   // uncomment for debug -- shows background element count

  setTimeout(() => {
    codeElement.remove();
    activeElements--;
    // console.log(`Element removed. Active elements: ${activeElements}`);   // uncomment for debug -- shows background element count
  }, duration * 2 * 10); // animation duration is same as the setTimeout time
};

function generateCodes() {
  setInterval(createCodeElement, 300); // you can set the intervals and this will determine the amount of animation
  // elements on the screen. I tried 200, 100, 50 and it didn't cause infinite amount of elements
}

// const BackgroundAnimation = () => {
//   const intervalIdRef = useRef<number | null>(null);

//   useEffect(() => {
//     intervalIdRef.current = window.setInterval(createCodeElement, 300);

//     return () => {
//       if (intervalIdRef.current !== null) {
//         clearInterval(intervalIdRef.current);
//         console.log("Interval cleaned");
//       }
//     };
//   }, []);

//   return <div className="background"></div>;
// };

const BackgroundAnimation = () => {
  useEffect(() => {
    generateCodes();
    console.log("generate code ran");
  }, []);

  return <div className="background"></div>;
};

export default BackgroundAnimation;
