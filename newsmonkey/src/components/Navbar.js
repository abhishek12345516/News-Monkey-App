import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = ({ theme, toggleTheme, onSearch }) => {
  const [searchText, setSearchText] = useState("");


  const handleSearch = (e) => {
    e.preventDefault(); // prevent page reload
    onSearch(searchText);
  };


  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"} shadow-sm`}>
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">NewsApp</Link>

        {/* Hamburger button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/general" className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}>
                General
              </NavLink>
            </li>
            {["business", "entertainment", "health", "science", "sports", "technology"].map((cat) => (
              <li className="nav-item" key={cat}>
                <NavLink to={`/${cat}`} className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </NavLink>
              </li>
            ))}
            <li className="nav-item">
              <NavLink to="/auth" className={({ isActive }) => "nav-link" + (isActive ? " active fw-bold" : "")}>
                Login
              </NavLink>
            </li>
          </ul>

          {/* Search + Theme toggle */}
          <form className="d-flex" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search news..."
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button type="submit" className={`btn me-2 ${theme === "dark" ? "btn-light" : "btn-dark"}`}>
              Search
            </button>
            <button type="button" className={`btn ${theme === "dark" ? "btn-light" : "btn-dark"}`} onClick={toggleTheme}>
              {theme === "dark" ? "Light" : "Dark"}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
