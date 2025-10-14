import React from "react";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import HomeBg from "../assets/CloudImage.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* ---------------- Navbar ---------------- */}
      <nav
        className="navbar is-info"
        role="navigation"
        aria-label="main navigation"
        style={{ minHeight: "60px", padding: "0 60px" }}
      >
        <div className="navbar-brand">
          <a
            className="navbar-item"
            onClick={() => navigate("/")}
            style={{ fontSize: "2.5rem", fontWeight: "bold" }}
          >
            <strong>CloudNova</strong>
          </a>
          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            onClick={() => {
              const menu = document.querySelector(".navbar-menu");
              menu.classList.toggle("is-active");
            }}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end" style={{ display: "flex", gap: "10px", color:"blue" }}>
            <button
              className="button is-info is-medium  is-dark is-focused is-rounded mt-2 mb-2"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="button is-info is-medium  is-dark is-focused is-rounded mt-2 mb-2"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
            <button
              className="button is-info is-medium  is-dark is-focused is-rounded mt-2 mb-2"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>
        </div>
      </nav>
      <div
        style={{
          backgroundImage: `url(${HomeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay */}
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          {/* Hero Section */}
          <section className="hero is-fullheight">
            <div className="hero-body">
              <div className="container has-text-centered">
                <h1 className="title is-1 has-text-white">Welcome to CloudNova</h1>
                <h2 className="subtitle is-4 has-text-white">
                  Upload, manage, and organize your files securely and effortlessly.
                </h2>
                <button
                  className="button is-warning is-large"
                  onClick={() => navigate("/signup")}
                >
                  Get Started
                </button>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="section">
            <div className="container">
              <h2 className="title has-text-centered has-text-white">Our Features</h2>
              <div className="columns is-multiline is-centered">
                <div className="column is-one-third">
                  <div className="box has-text-centered">
                    <h3 className="title is-4">Upload Files</h3>
                    <p>Store your audio/video files safely with CloudNova.</p>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="box has-text-centered">
                    <h3 className="title is-4">Secure Access</h3>
                    <p>Only you can access your files with JWT authentication.</p>
                  </div>
                </div>
                <div className="column is-one-third">
                  <div className="box has-text-centered">
                    <h3 className="title is-4">Manage Efficiently</h3>
                    <p>View, play, delete, and search files with ease.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <footer className="footer has-background-info has-text-white has-text-centered">
        <div className="content">
          <p>© 2025 CloudNova. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
