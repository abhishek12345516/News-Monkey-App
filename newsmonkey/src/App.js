import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Auth from "./components/Auth";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export default class App extends Component {
  pageSize = 15;

  state = {
    progress: 0,
  };

  setProgress = (progress) => {
    this.setState({ progress: progress });
  };



  constructor() {
    super();
    this.state = {
      theme: "light", // light/dark mode
      searchQuery: "",
    };
  }

  toggleTheme = () => {
    this.setState(
      (prevState) => ({
        theme: prevState.theme === "dark" ? "light" : "dark",
      }),
      () => {
        document.body.className =
          this.state.theme === "dark" ? "bg-dark text-light" : "bg-light text-dark";
      }
    );
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query });
  };

  render() {
    return (
      <Router>
        <Navbar
          theme={this.state.theme}
          toggleTheme={this.toggleTheme}
          onSearch={this.handleSearch}
        />
        <LoadingBar
        color="#f11946"
        progress={this.state.progress}


      />

        <Routes>
          <Route
            path="/"
            element={
              <News setProgress={this.setProgress}
                key="general"
                pageSize={this.pageSize}
                country="us"
                category="general"
                searchQuery={this.state.searchQuery}
              />
            }
          />
          <Route
            path="/business"
            element={
              <News setProgress={this.setProgress}
                key="business"
                pageSize={this.pageSize}
                country="us"
                category="business"
                searchQuery={this.state.searchQuery}
              />
            }
          />
          <Route
            path="/entertainment"
            element={
              <News setProgress={this.setProgress}
                key="entertainment"
                pageSize={this.pageSize}
                country="us"
                category="entertainment"
                searchQuery={this.state.searchQuery}
              />
            }
          />
          <Route
            path="/general"
            element={
              <News setProgress={this.setProgress}
                key="general"
                pageSize={this.pageSize}
                country="us"
                category="general"
                searchQuery={this.state.searchQuery}
              />
            }
          />
          <Route
            path="/health"
            element={
              <News setProgress={this.setProgress}
                key="health"
                pageSize={this.pageSize}
                country="us"
                category="health"
                searchQuery={this.state.searchQuery}
              />
            }
          />
          <Route
            path="/science"
            element={
              <News setProgress={this.setProgress}
                key="science"
                pageSize={this.pageSize}
                country="us"
                category="science"
                searchQuery={this.state.searchQuery}
              />
            }
          />
          <Route
            path="/sports"
            element={
              <News setProgress={this.setProgress}
                key="sports"
                pageSize={this.pageSize}
                country="us"
                category="sports"
                searchQuery={this.state.searchQuery}
              />
            }
          />
          <Route
            path="/technology"
            element={
              <News setProgress={this.setProgress}
                key="technology"
                pageSize={this.pageSize}
                country="us"
                category="technology"
                searchQuery={this.state.searchQuery}
              />
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>

        <Footer theme={this.state.theme} toggleTheme={this.toggleTheme} />
      </Router>
    );
  }
}
