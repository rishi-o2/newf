import React from "react";
import { SearchProvider } from "./Context/usecontext"; // Adjust the import path as necessary
import Header from "./pages/Header";
import Banner from "./pages/Banner";
import AuthPage from "./pages/AuthPage";
import LoginPage from "./components/Auth/Login";
import SignupPage from "./components/Auth/SignUp";
import HomePage from "./pages/HomePage";
import {Route, BrowserRouter as Routes} from "react-router-dom";
import "./App.css";

const App = () => {
  return (
    <SearchProvider>
      <Header />
      <Routes>
      <Route  exact path="/" component={HomePage}/>
        <Route path="/banner" component={Banner} />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignupPage} />
      </Routes>
    </SearchProvider>
  );
};

export default App;
