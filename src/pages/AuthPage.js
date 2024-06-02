// src/components/AuthPage.js
import React, { useContext } from "react";
import { AuthContext } from "../Context/Authcontext";
import "./AuthPage.css";

const AuthPage = () => {
  const { isAuthenticated, signIn, signOut } = useContext(AuthContext);

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className="auth-page">
      <h2>{isAuthenticated ? "Sign Out" : "Sign In"}</h2>
      {isAuthenticated ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default AuthPage;
