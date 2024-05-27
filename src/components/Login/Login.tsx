import { useEffect, useRef, useState } from "react";

// FireBase Imports
import { auth } from "../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

// CSS File imports
import "./Login.css";

// Import Close Icon
import closeIcon from "../../assets/logos//close-icon.png";

interface LoginProps {
  setIsPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setIsPopupOpen, setIsLoggedIn }: LoginProps) {
  const [isCredentialsTrue, setIsCredentialsTrue] = useState(true);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  function displayError() {
    setIsCredentialsTrue(false);
    setTimeout(() => {
      setIsCredentialsTrue(true);
    }, 2000);
  }

  const handleSubmit = async () => {
    setError("");
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // setIsLoggedIn(true);
        setIsPopupOpen(false); // Close the popup on successful login
      } catch (error: any) {
        setError(error.message);
        displayError();
      }
    } else {
      setError("Please enter both email and password.");
      displayError();
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1
          className={isCredentialsTrue ? "login-warning-hide" : "login-warning"}
        >
          Invalid Credentials
        </h1>
        <input
          className="login-email"
          type="text"
          placeholder="Email"
          ref={emailRef}
        />
        <input
          className="login-password"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        <button className="login-button" onClick={() => handleSubmit()}>
          Login
        </button>
        <img
          className="login-close"
          src={closeIcon}
          alt="Click to Close"
          onClick={() => setIsPopupOpen(false)}
          draggable="false"
        />
      </div>
    </div>
  );
}

export default Login;
