// import "./notification.css";
import { React, useState } from "react";
import axios from "axios";
import Select from "react-select";

function Notification() {
  const [msg, setMsg] = useState("");
  const [selectedOptions, setSelectedOptions] = useState();
  const [user, setUser] = useState({
    to: "",
    subject: "",
    description: "",

  });

  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];

  const Ntypes = [
    { value: "warning", label: "Warning" },
    { value: "information", label: "Information" },
    { value: "reminder", label: "Reminder" },

  ];

  const { to, subject, description } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e, data) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/users/",user)
   .then(response => setMsg(response.data.respMesg));
    // setSelectedOptions(data);
  };
  return (
    <div className="container" style={{ marginTop: "5rem" }}>
      <div class="row">
        <div className="col-sm-4 mx-auto shadow p-5">
          <h4 className="text-center mb-2">Send Notification </h4>
          <p class="mb-3 mt-2" style={{ color: "green", marginLeft: "57px" }}>
            <b>{msg}</b>
          </p>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="To"
              name="to"
              onChange={onInputChange}
              value={user.to}
            />
          </div>
          {/* <div className="form-group  mb-4 ">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Subject"
              name="subject"
              onChange={onInputChange}
              value={subject}
            />
          </div> */}

          <div className="form-group  mb-4 ">
            <div className="dropdown-container">
              <Select
                options={Ntypes}
                placeholder="Select Type"
                value={subject}
                onChange={onInputChange}
                isSearchable={true}
                isMulti
              />
            </div>
          </div>
          <div className="form-group  mb-4">
            <textarea
              type="text"
              className="form-control form-control-lg"
              placeholder="Description"
              name="description"
              onChange={onInputChange}
              value={description}
            />
          </div>

          <div className="form-group  mb-4 ">
            <div className="dropdown-container">
              <Select
                options={optionList}
                placeholder="Select color"
                value={selectedOptions}
                onChange={onSubmit}
                isSearchable={true}
                isMulti
              />
            </div>
          </div>

          <button
            onClick={onSubmit}
            className="btn btn-primary btn-block "
            style={{ marginLeft: "100px" }}
          >
            Send Mail
          </button>
        </div>
      </div>

      {/* <h2>Choose your color</h2> */}
    </div>
  );
}

export default Notification;
