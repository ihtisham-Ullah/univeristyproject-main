import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../../node_modules/font-awesome/css/font-awesome.min.css";
import "./login.css";
import Swal from "sweetalert2";
import wfm from "./wfm.png";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
    isLoading: false,
  });
  let navigate = useNavigate();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const sendDetailsToServer = () => {
    setState({ ...state, isLoading: true });
    if (state.email.length && state.password.length) {
      fetch("http://localhost:5000/login-user", {
        method: "POST",
        crossDomain: true,
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-origin": "*",
        },
        body: JSON.stringify({
          email: state.email,
          password: state.password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setState({ ...state, isLoading: false });
          if (data.status !== "ok") {
            Swal.fire("Email or Password not correct!", "", "error");
          }
          if (data.status === "ok") {
            localStorage.setItem("user", state.email);
            Swal.fire("Login Successfully!", "", "success");
            navigate("/Dashboard");
          }
        })
        .catch((error) => {
          setState({ ...state, isLoading: false }); // Set isLoading state to false when an error occurs
          console.error("Error:", error);
        });
    } else {
      setState({ ...state, isLoading: false });
      console.log("Please enter valid username and password");
    }
  };
  const handleSubmitClick = (e) => {
    e.preventDefault();
    sendDetailsToServer();
  };

  return (
    <div className="container" style={{ marginLeft: "17rem" }}>
      <div className="row">
        <div className="col-lg-10">
          <br />
          <h3 className="mb-3">Login Now</h3>
          <div className="bg-white shadow rounded">
            <div className="row">
              <div className="col-md-7 pe-0 col-sm-12">
                <div className="form-left h-100 py-5 px-5">
                  <form onSubmit={handleSubmitClick} className="row g-4">
                    <div className="col-12">
                      <label>
                        Email<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <div className="input-group-text">
                          <i className="fa fa-envelope" aria-hidden="true"></i>
                        </div>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email"
                          id="email"
                          value={state.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-12">
                      <label>
                        Password<span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <div className="input-group-text">
                          <i
                            className="fa fa-unlock-alt"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="Enter password"
                          value={state.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="inlineFormCheck"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineFormCheck"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <p className="float-end text-primary">
                        Forgot <Link to="/Reset">Password</Link>
                      </p>
                    </div>

                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary px-4 float-end mt-4"
                        disabled={state.isLoading}
                      >
                        {state.isLoading ? "Loading..." : "Login"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-5 ps-0 d-none d-md-block">
                <div className="form-right h-100 bg-primary text-white text-center pt-5">
                  <i className="bi bi-bootstrap"></i>

                  <img src={wfm} alt="logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
