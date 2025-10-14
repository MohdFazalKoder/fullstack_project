import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bulma/css/bulma.min.css";
import FileBg from "../assets/CloudImage.png";

const View = ({ token }) => {
  const { filename } = useParams();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/files/file/${filename}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          Swal.fire("Error", data.message || "File not found", "error");
        } else {
          setFile(data);
        }
      } catch (error) {
        Swal.fire("Error", "Error fetching file", "error");
      }
    };

    fetchFile();
  }, [filename, token]);

  if (!file) return <h2 className="has-text-centered mt-6">Loading...</h2>;

  return (
    <div
      style={{
        backgroundImage: `url(${FileBg})`,
        minHeight: "100vh",
        backgroundSize: "cover",
      }}
    >
      {/* Navbar */}
      <nav className="navbar is-info" role="navigation">
        <div className="navbar-brand">
       <a
            className="navbar-item"
            onClick={() => navigate("/")}
            style={{ fontSize: "2.5rem", fontWeight: "bold" }}
          >
            <strong>CloudNova</strong>
          </a>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-info is-medium  is-dark is-focused is-rounded mt-2 mb-2" onClick={() => navigate(-1)}>
              Back
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="section">
        <div className="container">
          <div
            className="box"
            style={{
              padding: "40px",
              maxWidth: "700px",
              margin: "30px auto",
              backgroundColor: "rgba(255,255,255,0.95)",
            }}
          >
            <h2 className="title has-text-info has-text-centered">File Details</h2>

            <div className="content">
              <p><strong>Name:</strong> {file.file_name}</p>
              <p><strong>Type:</strong> {file.file_type}</p>
              <p><strong>Size:</strong> {(file.file_size / 1024).toFixed(2)} KB</p>
              <p><strong>Uploaded:</strong> {new Date(file.upload_date).toLocaleString()}</p>
            </div>

            {file.file_type.startsWith("audio") && (
              <audio controls className="mb-4" style={{ width: "100%" }}>
                <source src={`http://localhost:5000/uploads/${file.file_path}`} type={file.file_type} />
              </audio>
            )}
            {file.file_type.startsWith("video") && (
              <video controls className="mb-4" style={{ width: "100%" }}>
                <source src={`http://localhost:5000/uploads/${file.file_path}`} type={file.file_type} />
              </video>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
