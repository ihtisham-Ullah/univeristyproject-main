import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function ManageTraining() {
  const [salespersons, setSalespersons] = useState([]);
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

  const handleDelete = (id) => {
    // TODO: Implement delete logic
  };

  const renderMediaGroup = (salesperson) => {
    const mediaGroup = mediaList.filter((media) => media.firstName === salesperson.firstName);
    if (mediaGroup.length === 0) {
      return null;
    }
    return (
      <>
        <hr />
        <h3 className="mt-4">{salesperson.firstName} {salesperson.lastName}</h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {mediaGroup.map((media) => (
            <div className="col" key={media._id}>
              <div className="card h-100">
                <div className="card-body">
                 
                  <h5 className="card-title mb-3">{media.title}</h5>
                  <video width="100%" height="auto" controls>
                    <source src={media.url} />
                  </video>
                  <button className="btn btn-danger mt-3" onClick={() => handleDelete(media._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4" style={{ marginTop: "8rem" }}>
        Manage Training Videos
      </h2>
      {salespersons.map((salesperson) => renderMediaGroup(salesperson))}
      <hr />
    </div>
  );
}

export default ManageTraining;
