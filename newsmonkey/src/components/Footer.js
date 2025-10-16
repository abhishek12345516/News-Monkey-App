import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const Footer = ({ theme = "light", toggleTheme = () => {} }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");
  const [location, setLocation] = useState("Detecting location...");

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.includes("@") || email.length < 5) {
      setMessage("❌ Please enter a valid email address.");
      return;
    }
    setMessage("✅ Subscribed successfully! Thank you.");
    setEmail("");
    setTimeout(() => setMessage(""), 4000);
  };

  // ✅ Update timestamp every minute
  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    };
    updateTimestamp();
    const interval = setInterval(updateTimestamp, 60000);
    return () => clearInterval(interval);
  }, []);

  // ✅ Get user location (with safety & fallback)
  const fetchLocation = useCallback(async (latitude, longitude) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        "Unknown City";
      const country = data.address?.country || "Unknown Country";
      setLocation(`${city}, ${country}`);
    } catch (error) {
      console.error("Location fetch error:", error);
      setLocation("Unable to fetch location details.");
    }
  }, []);

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setLocation("Geolocation not supported on this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchLocation(latitude, longitude);
      },
      (error) => {
        if (error.code === 1) setLocation("Location access denied.");
        else setLocation("Unable to retrieve location.");
      }
    );
  }, [fetchLocation]);

  const year = new Date().getFullYear();

  return (
    <footer
      className={`mt-4 pt-4 pb-2 ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ transition: "background 0.4s ease, color 0.4s ease" }}
    >
      <div className="container">
        <div className="row text-center text-md-start">
          {/* 📰 Column 1 - About + Theme */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">📰 NewsMonkey</h5>
            <p style={{ color: theme === "dark" ? "#ddd" : "#6c757d" }}>
              Your daily dose of reliable and trending news.
              Stay updated with the latest headlines from around the world.
            </p>
            <button
              onClick={toggleTheme}
              className={`btn btn-sm mt-2 ${
                theme === "dark" ? "btn-outline-light" : "btn-outline-dark"
              }`}
            >
              Toggle {theme === "dark" ? "Light" : "Dark"} Mode
            </button>
          </div>

          {/* 🔗 Column 2 - Quick Links */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              {[
                ["Home", "/"],
                ["General", "/general"],
                ["Business", "/business"],
                ["Technology", "/technology"],
                ["Sports", "/sports"],
                ["Health", "/health"],
                ["Science", "/science"],
                ["Entertainment", "/entertainment"],
              ].map(([name, path]) => (
                <li key={name}>
                  <Link
                    to={path}
                    className="text-decoration-none d-block my-1"
                    style={{
                      transition: "color 0.3s",
                      color: theme === "dark" ? "#ccc" : "#333",
                    }}
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ✉️ Column 3 - Newsletter */}
          <div className="col-md-3 mb-3">
            <h5 className="fw-bold">Subscribe</h5>
            <p style={{ color: theme === "dark" ? "#ccc" : "#6c757d" }}>
              Get daily news updates straight to your inbox!
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="input-group mb-2">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button className="btn btn-primary" type="submit">
                  Subscribe
                </button>
              </div>
              {message && (
                <small
                  className={`d-block mt-1 ${
                    message.includes("❌") ? "text-danger" : "text-success"
                  }`}
                >
                  {message}
                </small>
              )}
            </form>
          </div>

          {/* 🌐 Column 4 - Social + Location + Back to Top */}
          <div className="col-md-3 mb-3 text-md-end text-center">
            <h5 className="fw-bold">Connect</h5>
            <div className="d-flex justify-content-center justify-content-md-end gap-3 mb-3 fs-5">
              {[
                ["twitter", "https://twitter.com"],
                ["facebook", "https://facebook.com"],
                ["instagram", "https://instagram.com"],
                ["linkedin", "https://linkedin.com"],
              ].map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={name}
                  className="text-reset"
                  style={{ color: theme === "dark" ? "#ddd" : "inherit" }}
                >
                  <i className={`bi bi-${name}`}></i>
                </a>
              ))}
            </div>

            <p
              className="small mb-1"
              style={{ color: theme === "dark" ? "#bbb" : "#6c757d" }}
            >
              <i className="bi bi-geo-alt"></i> {location}
            </p>

            <button
              className="btn btn-outline-primary btn-sm rounded-pill"
              onClick={scrollToTop}
            >
              ↑ Back to Top
            </button>
          </div>
        </div>

        <hr
          className={
            theme === "dark" ? "border-light mt-4" : "border-secondary mt-4"
          }
        />

        <p
          className="text-center mb-0"
          style={{ color: theme === "dark" ? "#ccc" : "#6c757d" }}
        >
          © {year} NewsMonkey | Last updated at {lastUpdated}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

