import React, { Component } from "react";
import "./reset.css";
export default class Reset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handlesubmit = this.handlesubmit.bind(this);
  }

  handlesubmit(e) {
    e.preventDefault();
    const { email } = this.state;
    console.log(email);
    //alert("email is sent");
    fetch("http://localhost:5000/forgot-password", {
      method: "POST",
      crossDomain: true,
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-origin": "*",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status !== "ok") {
          alert("Email not valid");
        } else {
          alert("Email sent");
          // window.location.href = "./sign-up";
        }
      });
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <form onSubmit={this.handlesubmit}>
            <h3>Forgot Password</h3>

            <div className="mb-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
