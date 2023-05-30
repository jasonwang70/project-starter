import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthButton from "./components/AuthButton";
import PrivateRouteRequiresAuth from "./components/PrivateRouteRequiresAuth";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage"
import LandingPage from "./pages/StartingPage";
import FavoritesPage from "./pages/FavoritesPage";

import "./App.css";

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Lo Recipe
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/posts/favorites">
              Favorites
            </NavLink>
          </li>
        </ul>
      </div>
      <AuthButton />
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <div className="container-xl text-center">
          <div className="row justify-content-center">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/posts/favorites"
                element={
                  <PrivateRouteRequiresAuth>
                    {/* In react-router v6 we protect routes like this */}
                    <FavoritesPage />
                  </PrivateRouteRequiresAuth>
                }
              />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/" element={<LandingPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
