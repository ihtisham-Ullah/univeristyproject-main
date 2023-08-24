import { useState, useEffect } from "react";
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

  const [rememberMe, setRememberMe] = useState(false);
  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue !== null) {
      setRememberMe(rememberMeValue === "true");
    }
  }, []);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    
    if (storedEmail && storedPassword) {
      setState({
        email: storedEmail,
        password: storedPassword,
        isLoading: false,
      });
    }
  }, []);
  
  let navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const sendDetailsToServer = () => {
    setState({ ...state, isLoading: true });
    if (state.email.length && state.password.length) {
      fetch("https://workforce-web-backend.up.railway.app/login-user", {
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
          rememberMe: rememberMe,
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
            if (rememberMe) {
              localStorage.setItem("email", state.email); // Store email
              localStorage.setItem("password", state.password); // Store password
              localStorage.setItem("rememberMe", "true");
            } else {
              localStorage.removeItem("email"); // Remove email
              localStorage.removeItem("password"); // Remove password
              localStorage.removeItem("rememberMe");
            }
            Swal.fire("Login Successfully!", "", "success");
            navigate("/Dashboard");
          }
          
        })
        .catch((error) => {
          setState({ ...state, isLoading: false });
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
    <div className="container">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <br />
          <h3 className="mb-3">Login Now</h3>
          <div className="bg-white shadow rounded">
            <div className="row">
              <div className="col-md-7 col-sm-12">
                <div className="form-left py-5 px-4">
                  <form onSubmit={handleSubmitClick} className="row g-3">
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
                          placeholder="e.g: admin@gmail.com"
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
                          <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                        </div>
                        <input
                          type="password"
                          id="password"
                          className="form-control"
                          placeholder="e.g: Enter1sx@#"
                          value={state.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
  
                    <div className="col-12">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                          checked={rememberMe}
                          onChange={handleRememberMeChange}
                        />
                        <label className="form-check-label" htmlFor="rememberMe">
                          Remember Me
                        </label>
                      </div>
                    </div>
  
                    <div className="col-12">
                      <p className="text-center text-primary">
                        Forgot <Link to="/Reset">Password</Link>
                      </p>
                    </div>
  
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn btn-primary w-100"
                        disabled={state.isLoading}
                      >
                        {state.isLoading ? "Loading..." : "Login"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-5 d-none d-md-block">
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
