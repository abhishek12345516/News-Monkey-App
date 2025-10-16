import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Auth from "./components/Auth";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

const App = () => {
  const pageSize = 15;

  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Theme toggler function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // ✅ Update document body when theme changes
  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
  }, [theme]);

  // ✅ Handle search query from Navbar
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} onSearch={handleSearch} />
      <LoadingBar color="#f11946" progress={progress} />

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
        <Route path="/auth" element={<Auth />} />
      </Routes>

      <Footer theme={theme} toggleTheme={toggleTheme} />
    </Router>
  );
};

export default App;
