import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bulma/css/bulma.min.css";
import FileBg from "../assets/CloudImage.png";
import deleteGif from "../assets/delete2.gif"; 
import Eye from "../assets/Eye.gif";
import Reset from "../assets/Reset.gif"


function FileUpload({ token }) {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [filteredFiles, setFilteredFiles] = useState([]);

  // Fetch files
  const fetchFiles = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/files/files", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setFiles(data.files);
        setFilteredFiles(data.files);
      } else Swal.fire("Error", data.message || "Failed to fetch files", "error");
    } catch {
      Swal.fire("Error", "Error fetching files", "error");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Search
  const handleSearch = () => {
    const filtered = files.filter((f) => {
      const matchName = f.file_name.toLowerCase().includes(search.toLowerCase());
      const matchDate =
        (!dateFrom || new Date(f.upload_date) >= new Date(dateFrom)) &&
        (!dateTo || new Date(f.upload_date) <= new Date(dateTo));
      return matchName && matchDate;
    });
    setFilteredFiles(filtered);
  };

  // Upload
const handleUpload = async (e) => {
  e.preventDefault();
  if (!file) {
    return Swal.fire("Warning", "Please select a file!", "warning");
  }
  const isDuplicate = files.some(
    (f) => f.file_name.split("/").pop().toLowerCase() === file.name.toLowerCase()
  );

  if (isDuplicate) {
    return Swal.fire("Duplicate File", "This file already exists!", "warning");
  }

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("http://localhost:5000/api/files/upload", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await res.json();

    if (res.ok) {
      Swal.fire("Success!", "File uploaded successfully!", "success");
      setFile(null);
      fetchFiles();
    } else {
      Swal.fire("Error", result.message || "Failed to upload file", "error");
    }
  } catch {
    Swal.fire("Error", "Something went wrong while uploading", "error");
  }
};

 // Delete
  const handleDelete = async (filename) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this file?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/files/files/${filename}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        fetchFiles();
      } else Swal.fire("Error", data.message, "error");
    } catch {
      Swal.fire("Error", "Error deleting file", "error");
    }
  };

  // View file
  const handleView = (file) => navigate(`/view/${file.file_name}`);

  // Logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire("Logged Out!", "You have been logged out successfully.", "success").then(() =>
          navigate("/login")
        );
      }
    });
  };

  return (
    <>
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
          <div className="navbar-end" style={{ display: "flex", gap: "10px" }}>
            <button
              className="button is-info is-medium is-dark is-focused is-rounded mt-2 mb-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div
        style={{
          backgroundImage: `url(${FileBg})`,
          minHeight: "100vh",
          backgroundSize: "cover",
        }}
      >
        <div style={{ backgroundColor: "rgba(0,0,0,0.5)", minHeight: "100vh", padding: "30px" }}>
          <div className="container" style={{ maxWidth: "1900px", margin: "auto" }}>
            <div className="columns">

              {/* Files Table */}
              <div className="column is-9">
                <div className="box" style={{ ...boxStyle, padding: "30px" }}>

                  {/* Search + Date + Reset Row */}
                  <div className="field is-grouped mb-3">
                    <input
                      className="input is-expanded"
                      placeholder="Search by name"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <input
                      className="input"
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                    <input
                      className="input"
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                    <button
                      className="button is-info is-rounded is-small"
                      type="button"
                      title="Search"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                    <button
                      className="button  is-rounded is-medium"
                      type="button"
                      onClick={() => {
                        setSearch("");
                        setDateFrom("");
                        setDateTo("");
                        setFilteredFiles(files);
                      }}
                    >
                      <img src={Reset} alt="Reset" title="Reset" style={{ width: "80px", height: "25px" }} />
                    </button>
                  </div>

                  <h2 className="title has-text-info has-text-centered" style={{ fontSize: "2rem" }}>
                    Your Files
                  </h2>

                  <div style={{ overflowX: "auto", maxHeight: "600px" }}>
                    <table className="table is-fullwidth is-bordered is-striped is-hoverable">
                      <thead>
                        <tr>
                          <th>S.no</th>
                          <th>Name</th>
                          <th>Date / Time</th>
                          <th>Size (KB)</th>
                          <th>Type</th>
                          <th>Play</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
  {filteredFiles.length === 0 ? (
    <tr>
      <td colSpan="7" className="has-text-centered">
        No files found
      </td>
    </tr>
  ) : (
    filteredFiles.map((f, index) => (
      <tr key={f.file_name}>
        <td>{index + 1}</td>
        <td>{f.file_name}</td>
        <td>{new Date(f.upload_date).toLocaleString()}</td>
        <td>{(f.file_size / 1024).toFixed(2)}</td>
        <td>{f.file_type}</td>
        <td>
          {f.file_type.startsWith("audio") ? (
            <audio controls style={{ maxWidth: "200px" }}>
              <source src={`http://localhost:5000/uploads/${f.file_path}`} type={f.file_type} />
            </audio>
          ) : f.file_type.startsWith("video") ? (
            <video controls width="200">
              <source src={`http://localhost:5000/uploads/${f.file_path}`} type={f.file_type} />
            </video>
          ) : (
            <span>—</span>
          )}
        </td>
        <td>
          <div className="is-flex is-justify-content-center is-align-items-center">
            <button
              className="button is-rounded mr-2"
              onClick={() => handleView(f)}
              title="View File"
            >
              <img src={Eye} alt="View" style={{ width: "20px", height: "20px" }} />
            </button>
            <button
              className="button is-rounded"
              onClick={() => handleDelete(f.file_name)}
              title="Delete File"
            >
              <img src={deleteGif} alt="Delete" style={{ width: "20px", height: "20px" }} />
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

                    </table>
                  </div>
                </div>
              </div>
              <div className="column is-3">
                <div className="box" style={boxStyle}>
                  <h2 className="title has-text-info has-text-centered">Upload File</h2>
                  <form onSubmit={handleUpload} style={uploadFormStyle}>
                    <input className="input" type="file" onChange={(e) => setFile(e.target.files[0])} />
                    <button className="button is-info is-dark is-rounded"title="Upload" type="submit" style={{width: "100px"}}>
                      Upload
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const boxStyle = { background: "rgba(255,255,255,0.95)", borderRadius: "15px", padding: "20px", marginBottom: "20px" };
const uploadFormStyle = { display: "flex", gap: "10px", flexDirection: "column" };

export default FileUpload;
