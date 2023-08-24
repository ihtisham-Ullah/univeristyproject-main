import React, { useState, useEffect } from "react";
import axios from "axios";


function ManageTraining() {
  const [salespersons, setSalespersons] = useState([]);
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

  const getMedia = async () => {
    axios
      .get("https://workforce-web-backend.up.railway.app/getmedia")
      .then((res) => {
        setMediaList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMedia();
  }, []);

  const handleDelete = async (id, index) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this video?");
      if (confirmDelete) {
        await fetch(`https://workforce-web-backend.up.railway.app/getmedia/${id}`, {
          method: "DELETE",
        }).then((result) => {
          result.json().then((resp) => {
            getMedia();
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const renderMediaGroup = (salesperson) => {
    const mediaGroup = mediaList.filter(
      (media) => media.firstName === salesperson.firstName
    );
    if (mediaGroup.length === 0) {
      return null;
    }
    return (
      <>
        <hr />
        <h3 className="mt-4">
          {salesperson.firstName} {salesperson.lastName}
        </h3>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {mediaGroup.map((media, index) => (
            <div className="col" key={media._id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title mb-3">{media.title}</h5>
                  <video width="100%" height="auto" controls>
                    <source src={media.url} />
                  </video>
                  <button
                    className="btn btn-danger mt-3"
                    onClick={() => handleDelete(media.mediaId, index)}
                  >
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
