import React, { Component } from "react";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./register.css";
const emailValidator =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordValidator =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{2,64}$/;
const NameValidator = /^[a-z]+$/;
const phoneValidator =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      address: "",
      phoneNo: "",
      phoneError: "",
      firstNameError: "",
      emailAddressError: "",
      passwordError: "",
      isFormSubmitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
    this.validateEmailAddress = this.validateEmailAddress.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validatephoneNo = this.validatephoneNo.bind(this);
  }
  handleChange(event) {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    return;
  }

  handleBlur(event) {
    const { name } = event.target;

    this.validateField(name);
    return;
  }

  handleSubmit(e) {
    e.preventDefault();
    let { firstName, lastName, email, password, address, phoneNo } = this.state;

    console.log(firstName, lastName, email, password, address, phoneNo);

    let formFields = [
      "firstName",
      "lastName",
      "email",
      "password",
      "address",
      "phoneNo",
    ];
    let isValid = true;

    formFields.forEach((field) => {
      isValid = this.validateField(field) && isValid;
    });
    if (isValid) this.setState({ isFormSubmitted: true });
    else this.setState({ isFormSubmitted: false });
    if (!this.validateFirstName()) {
      alert("Invalid First Name");
    }
    if (!this.validateLastName()) {
      alert("Invalid Last Name");
    }
    if (!this.validateEmailAddress()) {
      alert("Invalid Email Address");
    }
    if (!this.validatePassword()) {
      alert("Invalid Password");
    }
    if (!this.validatephoneNo()) {
      alert("Invalid Phone Number");
    } else {
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-origin": "*",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          address,
          phoneNo,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "user Register Successsfully");
        });
    }
    return this.state.isFormSubmitted;
  }

  validateField(name) {
    let isValid = false;

    if (name === "firstName") isValid = this.validateFirstName();
    else if (name === "lastName") isValid = this.validateLastName();
    else if (name === "email") isValid = this.validateEmailAddress();
    else if (name === "password") isValid = this.validatePassword();
    else if (name === "phoneNo") isValid = this.validatephoneNo();
    return isValid;
  }

  validateFirstName() {
    let firstNameError = "";
    const value = this.state.firstName;
    if (value.trim() === "") {
      firstNameError = "First Name is required";
    }
    if (!NameValidator.test(this.state.firstName)) {
      firstNameError = "Letters allowed only";
    }

    if (this.state.firstName.length > 10) {
      firstNameError = "Maximum length should be 10 letters";
    }

    this.setState({
      firstNameError,
    });
    return firstNameError === "";
  }

  validateLastName() {
    let lastNameError = "";
    const value = this.state.lastName;
    if (value.trim() === "") lastNameError = "Last Name is required";
    if (!NameValidator.test(this.state.lastName)) {
      lastNameError = "Letters allowed only";
    }
    if (this.state.firstName.length > 10) {
      lastNameError = "Maximum length should be 10 letters";
    }

    this.setState({
      lastNameError,
    });
    return lastNameError === "";
  }

  validateEmailAddress() {
    let emailAddressError = "";
    const value = this.state.email;
    if (value.trim() === "") emailAddressError = "Email Address is required";
    else if (!emailValidator.test(value))
      emailAddressError = "Email is not valid";

    this.setState({
      emailAddressError,
    });
    return emailAddressError === "";
  }

  validatePassword() {
    let passwordError = "";
    const value = this.state.password;
    if (value.trim() === "") passwordError = "Password is required";
    else if (!passwordValidator.test(value))
      passwordError =
        "Password must contain at least 5 characters, Min 1 number, Min 1 upper and 1 lowercase, Min 1 special character!";
    if (this.state.password.length < 5) {
      passwordError = "minimum length";
    }

    this.setState({
      passwordError,
    });
    return passwordError === "";
  }

  validatephoneNo() {
    let phoneError = "";
    const value = this.state.phoneNo;
    if (value.trim() === "") phoneError = "Phone Number is required";
    else if (!phoneValidator.test(value)) phoneError = "Phone Number is wrong";

    this.setState({
      phoneError,
    });
    return phoneError === "";
  }

  render() {
    return (
      <div className="auth-wrapper">
        <div className="auth-inner">
          <div className="main">
            <h3>Register Salesperson</h3>
            {this.state.isFormSubmitted ? (
              <div className="details">
                <h3>Thanks for signing up, find your details below:</h3>
                <div>First Name: {this.state.firstName}</div>
                <div>Last Name: {this.state.lastName}</div>
                <div>Email Address: {this.state.email}</div>
              </div>
            ) : (
              <form onSubmit={this.handleSubmit}>
                <div className="mb-3">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    onInput={(e) =>
                      (e.target.value = ("" + e.target.value).toLowerCase())
                    }
                    autoComplete="off"
                    required
                  />
                </div>

                {this.state.firstNameError && (
                  <div className="errorMsg">{this.state.firstNameError}</div>
                )}

                <div className="mb-3">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={this.state.lastName}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    autoComplete="off"
                    onInput={(e) =>
                      (e.target.value = ("" + e.target.value).toLowerCase())
                    }
                    required
                  />
                </div>
                {this.state.lastNameError && (
                  <div className="errorMsg">{this.state.lastNameError}</div>
                )}

                <div className="mb-3">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    autoComplete="off"
                    required
                  />
                </div>
                {this.state.emailAddressError && (
                  <div className="errorMsg">{this.state.emailAddressError}</div>
                )}

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    autoComplete="off"
                    required
                  />
                </div>

                {this.state.passwordError && (
                  <div className="errorMsg">{this.state.passwordError}</div>
                )}
                <div className="mb-3">
                  <label>Phone Number</label>

                  <input
                    type="text"
                    placeholder="Phone No"
                    name="phoneNo"
                    className="form-control"
                    value={this.state.phoneNo}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    autoComplete="off"
                    required
                  />
                </div>
                {this.state.phoneError && (
                  <div className="errorMsg">{this.state.phoneError}</div>
                )}

                <div className="mb-3">
                  <label>Address</label>
                  <input
                    type="text"
                    placeholder="Address"
                    name="address"
                    className="form-control"
                    value={this.state.address}
                    onChange={this.handleChange}
                    onBlur={this.handleBlur}
                    autoComplete="off"
                    required
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }
}
