import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Navbar = ({ theme, toggleTheme, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
    setQuery("");
  };

  return (
    <nav
      className={`navbar fixed-top navbar-expand-lg shadow-sm ${
        theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
      } sticky-top`}
    >
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span role="img" aria-label="monkey" style={{ fontSize: "1.5rem" }}>
            🐒
          </span>
          <span className="fw-bold">NewsMonkey</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {[
              ["Home", "/"],
              ["Business", "/business"],
              ["Entertainment", "/entertainment"],
              ["General", "/general"],
              ["Health", "/health"],
              ["Science", "/science"],
              ["Sports", "/sports"],
              ["Technology", "/technology"],
            ].map(([name, path]) => (
              <li className="nav-item" key={path}>
                <Link className="nav-link active" to={path}>
                  {name}
                </Link>
              </li>
            ))}
            <li className="nav-item">
              <Link className="nav-link active" to="/auth">
                Login / Sign Up
              </Link>
            </li>
          </ul>

          <form className="d-flex align-items-center gap-2" onSubmit={handleSearch}>
            <input
              className="form-control"
              type="search"
              placeholder="Search News..."
              value={query}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>

            <button
              type="button"
              className={`btn ${theme === "dark" ? "btn-outline-light" : "btn-outline-dark"} ms-2`}
              onClick={toggleTheme}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              <i className={`bi bi-${theme === "dark" ? "sun" : "moon"}`}></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
