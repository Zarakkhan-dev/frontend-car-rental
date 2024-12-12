import { useState } from "react";
import LoginPage from "./login";
import SignUpForm from "../Signup/signUp";


const AuthPage = () => {
  const [isSignIn, setIsSignIn] = useState(true); // Tracks current form

  const toggleAuth = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {isSignIn ? (
        <LoginPage toggleAuth={toggleAuth} />
      ) : (
        <SignUpForm toggleAuth={toggleAuth} />
      )}
    </div>
  );
};

export default AuthPage;
