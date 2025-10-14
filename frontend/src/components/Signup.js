import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "bulma/css/bulma.min.css";
import HomeBg from "../assets/CloudImage.png";

const Signup = () => {
  const [full_name, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const data = { full_name, email, password };
  
    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        Swal.fire("Success!", result.message, "success").then(() => {
          navigate("/login");
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
          minHeight: "calc(100vh - 60px)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Overlay */}
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "2rem",
              borderRadius: "15px",
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            }}
          >
            <h1 className="title has-text-centered has-text-info">Signup</h1>

            <form onSubmit={handleSignup}>
              <div className="field">
                <label className="label">Full Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Full Name"
                    value={full_name}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

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
                    Sign Up
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
