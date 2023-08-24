import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./style.css";

function ViewSalesperson() {
  const [list, setList] = useState([]);

  const getSalesperson = async () => {
    fetch("https://workforce-web-backend.up.railway.app/getsalesperson", {
      method: "GET",
      crossDomain: true,

      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
    }).then((result) => {
      result.json().then((resp) => {
        setList(resp);
      });
    });
  };
  useEffect(() => {
    getSalesperson();
  }, []);

  function deleteSalesperson(id) {
    fetch(`http://localhost:5000/delete/${id}`, {
      method: "DELETE",
      crossDomain: true,
    }).then((result) => {
      result.json().then((resp) => {
        getSalesperson();
      });
    });
  }

  return (
    <>
      <p
        className="h3"
        style={{
          marginTop: "7rem",
          marginLeft: "35rem",
          justifyContent: "center",
        }}
      >
        Registered Salesperson
      </p>

      <div className="clearfix" style={{ marginLeft: "5rem" }}>
        <div className="row">
          {list?.map((data) => (
            <div className="col-md-4 animated fadeIn" key={data._id}>
              <div className="card">
                <div className="card-body">
                  <div className="avatar">
                    <img
                      src={data.photo}
                      className="card-img-top rounded-circle"
                      alt=""
                      style={{
                        width: "50%",
                        height: "50%",
                        marginLeft: "25%",
                      }}
                    />
                  </div>
                  <h5 className="card-title">{data.firstName}</h5>
                  <div className="card-text">
                    <p>{data.email}</p>
                    <p className="phone">{data.phoneNo}</p>
                  </div>
                  <div className="buttons">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteSalesperson(data._id)}
                    >
                      Delete
                    </button>
                    <Link
                      to={"/updateSalesperson/" + data._id}
                      className="btn btn-primary btn-sm m-1"
                    >
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ViewSalesperson;
