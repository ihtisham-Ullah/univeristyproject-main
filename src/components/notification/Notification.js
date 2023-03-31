import { React, useState, useEffect } from "react";
import "./notication.css";
import axios from "axios";
import Select from "react-select";
import Swal from "sweetalert2";

function Notification() {
  const [message, setMessage] = useState("");
  const [salesperson, setSalesPerson] = useState([]);
  const [salespersonField, setSalesPersonField] = useState([]);
  const [type, setType] = useState();
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getSalesperson = async () => {
      const res = await fetch("http://localhost:5000/getsalesperson");
      const data = await res.json();

      const salesPersons = [];
      data.forEach((user) => {
        salesPersons.push({
          value: user._id,
          label: user.email,
        });
      });

      setSalesPerson(salesPersons);
    };
    getSalesperson();
  }, []);

  const Ntypes = [
    { value: "warning", label: "Warning" },
    { value: "information", label: "Information" },
    { value: "reminder", label: "Reminder" },
  ];

  const onTypeInputChange = (e) => {
    setType(e);
  };

  const onDescriptionInputChange = (e) => {
    setDescription(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(description.length);
    if (salespersonField.length < 1 || !type || description.length < 1)
      return Swal.fire("Please fill all the fields", "", "error");

    const formData = {
      to: salespersonField.map((person) => person.label),
      subject: type.label,
      description,
    };
    try {
      const { data } = await axios.post(
        "http://localhost:5000/users/",
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      Swal.fire("Notification Sent Successfully!", "", "success");
    } catch (err) {
      console.log(err.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div
      className="container"
      style={{ marginTop: "5rem", marginLeft: "25rem" }}
    >
      <div className="row">
        <div className=" col-md-6 form-group mb-3">
          <h4 className="text-center mb-2">Send Notification </h4>
          <p
            className="mb-3 mt-2"
            style={{ color: "green", marginLeft: "57px" }}
          >
            <b>{message}</b>
          </p>
          <div className="form-group mb-3">
            <Select
              required={true}
              value={salespersonField}
              isMulti={true}
              options={salesperson}
              onChange={(e) => {
                setSalesPersonField(e);
              }}
            />
          </div>

          <div className="form-group  mb-4 ">
            <div className="dropdown-container">
              <Select
                options={Ntypes}
                placeholder="Select Type"
                value={type}
                onChange={onTypeInputChange}
                isSearchable={true}
                required={true}
              />
            </div>
          </div>
          <div className="form-group  mb-4">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Description"
              name="description"
              onChange={onDescriptionInputChange}
              value={description}
              required={true}
            />
          </div>

          {isLoading ? (
            <button className="btn btn-primary" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Sending...
            </button>
          ) : (
            <button
              onClick={onSubmit}
              className="btn btn-primary btn-block "
              style={{ marginLeft: "30rem" }}
            >
              Send
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;
