import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function UploadVideo() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [salespersonId, setSalespersonId] = useState("");
  const [salespersons, setSalespersons] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    axios
      .get("https://workforce-web-backend.up.railway.app/getsalesperson")
      .then((res) => {
        setSalespersons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("https://workforce-web-backend.up.railway.app/getmedia")
      .then((res) => {
        setMediaList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (title && salespersonId && file) {
      setErrorMessage("");
    }
  }, [title, salespersonId, file]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSalespersonChange = (e) => {
    setSalespersonId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !salespersonId || !file) {
      setErrorMessage("Please select all fields.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("salespersonId", salespersonId);

    axios
      .post("http://localhost:5000/uploadVideo", formData)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        Swal.fire("Video assigned!", "", "success");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", backgroundColor: "#f2f2f2" }}>
      <div className="card bg-light" style={{ width: "40rem", borderRadius: "10px", boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.15)" }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4">Assign Video</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-4">
              <label htmlFor="title">Video Title:</label>
              <input
                type="text"
                id="title"
                onChange={handleTitleChange}
                className="form-control"
                style={{ backgroundColor: "#f7f7f7" }}
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="salesperson">Select Salesperson:</label>
              <select
                id="salesperson"
                onChange={handleSalespersonChange}
                className="form-control"
                style={{ backgroundColor: "#f7f7f7" }}
              >
                <option value="">Select a salesperson</option>
                {salespersons.map((salesperson) => (
                  <option key={salesperson._id} value={salesperson._id}>
                    {salesperson.firstName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mb-4">
              <label htmlFor="file">Choose a file:</label>
              <div className="custom-file">
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="custom-file-input"
                />
                
              </div>
            </div>
            {errorMessage && (
              <div className="alert alert-danger">{errorMessage}</div>
            )}
            <button type="submit" className="btn btn-primary btn-block mt-4" style={{ backgroundColor: "#5f73a5", border: "none" }}>
              Upload
            </button>
            {isLoading && (
              <div className="text-center mt-3">
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );

}

export default UploadVideo;
