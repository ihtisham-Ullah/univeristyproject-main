import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./updateSalesperson.css";
import axios from "axios";

const UpdateSalesperson = () => {
  const params = useParams();
  const apiEndPoint = `http://localhost:5000/getsalesperson/${params.id}`;
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getSalesperson();
  }, []);

  const getSalesperson = async () => {
    //console.warn(params);
    // fetch(`http://localhost:5000/getsalesperson/${params.id}`, {
    //   method: "GET",
    //   crossDomain: true,
    //   headers: {
    //     "content-type": "application/json",
    //     Accept: "application/json",
    //     "Access-Control-Allow-origin": "*",
    //   },
    // }).then((result) => {
    //   result.json().then((resp) => {
    //     setFirstName(resp.firstName);
    //     setLastName(resp.lastName);
    //     setEmail(resp.email);
    //     setPhoneNo(resp.phoneNo);
    //     setAddress(resp.address);
    //   });
    // });
    // // result = await result.json();
    // // console.log(result);

    const { data: res } = await axios.get(apiEndPoint);

    setFirstName(res.firstName);
    setLastName(res.lastName);
    setEmail(res.email);
    setPhoneNo(res.phoneNo);
    setAddress(res.address);
  };
  const updateSalesperson = async (e) => {
    e.preventDefault();
    console.warn(firstName, lastName, email, phoneNo, address);


    fetch(`http://localhost:5000/updateSalesperson/${params.id}`, {
      method: "PUT",
      crossDomain: true,
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        phoneNo,
        address,
      }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
    }).then((result) => {
      result.json().then((resp) => {
        if (resp) {
          navigate("/Salesperson");
        }
      });
    });
  };

  return (
    <div className="auth-wrapper p-5">
      <div className="continer mx-5 p-5">
        <div className="  main">
          <h3>Update Salesperson</h3>
          <form>
            <div className="row">
              <div className=" col-md-6 form-group mb-3">
                <label htmlFor="firstName">First name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>

              <div className=" col-md-6 mb-3">
                <label>Last name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Email Address</label>
                <input
                  type="text"
                  placeholder="Email"
                  className="form-control"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Phone Number</label>

                <input
                  type="text"
                  placeholder="Phone No"
                  className="form-control"
                  value={phoneNo}
                  onChange={(e) => {
                    setPhoneNo(e.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="col-md-6 mb-3">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Address"
                  className="form-control"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>

              <div className="col d-flex justify-content-end">
                <button onClick={updateSalesperson} className="btn btn-primary">
                  Update Salesperson
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalesperson;
