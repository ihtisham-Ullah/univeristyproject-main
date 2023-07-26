import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./updateSalesperson.css";
import Avatar from "react-avatar";
import Swal from "sweetalert2";
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
  const [emailError, setEmailError] = useState("");
  const [phoneNoError, setPhoneNoError] = useState("");
  const [photo, setPhoto] = useState("");
  const [newPhoto, setNewPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getSalesperson();
  }, []);

  const getSalesperson = async () => {
    const { data: res } = await axios.get(apiEndPoint);

    setFirstName(res.firstName);
    setLastName(res.lastName);
    setEmail(res.email);
    setPhoneNo(res.phoneNo);
    setAddress(res.address);
    setPhoto(res.photo);
  };
  const handlePhotoChange = (e) => {
    setNewPhoto(e.target.files[0]);
  };

  const updateSalesperson = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.warn(firstName, lastName, email, phoneNo, address, photo);
    const passwordRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z]*$/;
    const NoRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!passwordRegex.test(email)) {
      setEmailError("Email is not valid");
      return;
    }
    if (!NoRegex.test(phoneNo)) {
      setPhoneNoError("Phone Number is not valid");
      return;
    }
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phoneNo", phoneNo);
    formData.append("address", address);
    formData.append("email", email);
    formData.append("photo", newPhoto);
    console.log(newPhoto);
    try {
      const { data } = await axios.put(
        `http://localhost:5000/updateSalesperson/${params.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(data);
      navigate("/Salesperson");
    } catch (err) {
      Swal.fire(err.response.data.error, "", "error");
    } finally {
      setIsLoading(false);
    }
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
                {emailError && (
                  <small className=" text-danger">{emailError}</small>
                )}
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
                {phoneNoError && (
                  <small className=" text-danger">{phoneNoError}</small>
                )}
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
              <div className="col-md-6 form-group mb-3">
                <label htmlFor="photo">Photo</label>
                <div className="d-flex align-items-center">
                  <Avatar
                    src={photo}
                    round={true}
                    size="100"
                    className="mr-3"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <div
                    className="d-flex flex-column"
                    style={{ marginLeft: "10px" }}
                  >
                    <input
                      type="file"
                      onChange={handlePhotoChange}
                      placeholder="Profile picture"
                      name="photo"
                      className="form-control"
                      accept="image/*"
                    />
                    <small className="text-muted">Choose a new photo</small>
                  </div>
                </div>
              </div>

              <div className="col d-flex justify-content-end">
                {isLoading ? (
                  <button className="btn btn-primary" disabled>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating...
                  </button>
                ) : (
                  <button
                    onClick={updateSalesperson}
                    className="btn btn-primary"
                  >
                    Update Salesperson
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSalesperson;
