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
      .get("http://localhost:5000/getsalesperson")
      .then((res) => {
        setSalespersons(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/getmedia")
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
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "200vh" }}
    >
      <div className="card" style={{ width: "50rem" }}>
        <div className="card-body">
          <h5 className="card-title">Assign Video</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Video Title:</label>
              <input
                type="text"
                id="title"
                onChange={handleTitleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="salesperson">Select Salesperson:</label>
              <select
                id="salesperson"
                onChange={handleSalespersonChange}
                className="form-control"
              >
                <option value="">Select a salesperson</option>
                {salespersons.map((salesperson) => (
                  <option key={salesperson._id} value={salesperson._id}>
                    {salesperson.firstName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
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
            <button type="submit" className="btn btn-primary">
              Upload
            </button>
            {isLoading && (
              <div className="mt-3">
                <i className="fas fa-spinner fa-spin"></i> Uploading...
              </div>
            )}
          </form>
          <table className="table mt-5">
            <thead>
              <tr>
                <th>Name</th>
                <th>Video Title</th>
                <th>Video</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mediaList.map((media) => (
                <tr key={media._id}>
                  <td>{media.firstName}</td>
                  <td>{media.title}</td>
                  <td>
                    <video width="320" height="240" controls>
                      <source src={media.url} />
                    </video>
                  </td>
                  <td>
                    <button
                    // className="btn btn-danger"
                    // onClick={() => handleDelete(media._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UploadVideo;
