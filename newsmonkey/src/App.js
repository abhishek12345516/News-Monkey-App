import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 15;

  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");

  // Theme toggler
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Update body classes based on theme
  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  }, [theme]);

  // Handle search from Navbar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      {/* Navbar with theme + search */}
      <Navbar theme={theme} toggleTheme={toggleTheme} onSearch={handleSearch} />

      {/* Top loading bar */}
      <LoadingBar color="#f11946" progress={progress} />

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <News
              setProgress={setProgress}
              key="general"
              pageSize={pageSize}
              country="us"
              category="general"
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/general"
          element={
            <News
              setProgress={setProgress}
              key="general"
              pageSize={pageSize}
              country="us"
              category="general"
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/business"
          element={
            <News
              setProgress={setProgress}
              key="business"
              pageSize={pageSize}
              country="us"
              category="business"
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/entertainment"
          element={
            <News
              setProgress={setProgress}
              key="entertainment"
              pageSize={pageSize}
              country="us"
              category="entertainment"
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/health"
          element={
            <News
              setProgress={setProgress}
              key="health"
              pageSize={pageSize}
              country="us"
              category="health"
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/science"
          element={
            <News
              setProgress={setProgress}
              key="science"
              pageSize={pageSize}
              country="us"
              category="science"
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              key="sports"
              pageSize={pageSize}
              country="us"
              category="sports"
              searchQuery={searchQuery}
            />
          }
        />
        <Route
          path="/technology"
          element={
            <News
              setProgress={setProgress}
              key="technology"
              pageSize={pageSize}
              country="us"
              category="technology"
              searchQuery={searchQuery}
            />
          }
        />

        {/* Auth Page */}
        <Route path="/auth" element={<Auth theme={theme} />} />
      </Routes>

      {/* Footer */}
      <Footer theme={theme} />
    </Router>
  );
};

export default App;
