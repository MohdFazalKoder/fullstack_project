import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import HomeBg from "../assets/CloudImage.png";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token); // Token save
        setToken(result.token); // App.js state update
        Swal.fire("Success!", result.message, "success").then(() => {
          navigate("/"); // Redirect to FileUpload page
        });
      } else {
        Swal.fire("Error!", result.message, "error");
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong!", "error");
      console.error(error);
    }
  };

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
            style={{ fontSize: "2.5rem", fontWeight: "bold", color: "white" }}
          >
            CloudNova
          </a>
        </div>

        <div className="navbar-menu">
          <div className="navbar-end" style={{ display: "flex", gap: "10px" }}>
            <button
              className="button is-info is-medium is-dark is-focused is-rounded mt-2 mb-2"
              onClick={() => navigate("/Home")}
            >
              Home
            </button>
            <button
              className="button is-info is-medium is-dark is-focused is-rounded mt-2 mb-2"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
            <button
              className="button is-info is-medium is-dark is-focused is-rounded mt-2 mb-2"
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
          minHeight: "100vh",
        }}
      >
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh" }}>
          <section className="hero is-fullheight">
            <div className="hero-body">
              <div
                className="container"
                style={{ display: "flex", justifyContent: "center" }}
              >
                <form
                  className="box"
                  onSubmit={handleLogin}
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "15px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    padding: "2rem",
                  }}
                >
                  <h1
                    className="title has-text-centered has-text-info"
                    style={{ fontWeight: "bold", color: "#209cee" }}
                  >
                    Login
                  </h1>

                  <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                      <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                      <input
                        className="input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <button
                        className="button is-info is-dark is-fullwidth is-medium is-rounded"
                        type="submit"
                      >
                        Login
                      </button>
                    </div>
                  </div>

                  <p className="has-text-centered mt-3">
                    Don't have an account?{" "}
                    <span
                      className="has-text-info"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
