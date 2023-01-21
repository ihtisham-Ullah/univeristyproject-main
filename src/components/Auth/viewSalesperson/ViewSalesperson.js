import React from "react";
import { useState, useEffect } from "react";
import {  Link } from "react-router-dom";
import "./style.css";

function ViewSalesperson() {
  const [list, setList] = useState([]);


  const getSalesperson = async () => {
    fetch("http://localhost:5000/getsalesperson", {
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
    fetch(`http://localhost:5000/${id}`, {
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
     

      <div class="page-heading">
      <p className="h3" style={{ marginTop: "7rem", marginLeft: "35rem" }}>
        Registered Salesperson
      </p>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <section class="section">
                <div class="card">
                  
                  <div class="card-body">
                    <table class="table table-striped" id="table1">
                      <thead>
                        <tr>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th> Email Address</th>
                          <th>Phone</th>
                          <th>Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        {list?.map((d) => (
                          <tr key={d._id}>
                            <td>{d.firstName}</td>
                            <td>{d.lastName}</td>
                            <td>{d.email}</td>
                            <td>{d.phoneNo}</td>
                            <td>{d.address}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteSalesperson(d._id)}
                              >
                                Delete
                              </button>
                              <Link
                                to={"/updateSalesperson/" + d._id}
                                className="btn btn-primary btn-sm m-1"
                              >
                                Update
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewSalesperson;
