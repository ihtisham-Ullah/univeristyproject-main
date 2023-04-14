// import React, { Component } from "react";
// import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import "./register.css";
// import Swal from "sweetalert2";
// import axios from "axios";
// const emailValidator =
//   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z]*$/;
// const passwordValidator =
//   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{2,64}$/;
// const NameValidator = /^[a-z]+$/;
// const AddressValidator = /^[a-zA-Z0-9-]$/;
// const phoneValidator =
//   /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

// export default class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       firstName: "",
//       firstNameError: "",
//       lastName: "",
//       email: "",
//       emailAddressError: "",
//       address: "",
//       addressError: "",
//       phoneNo: "",
//       phoneError: "",
//       password: "",
//       passwordError: "",
//       isFormSubmitted: false,
//       photo: null,
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleBlur = this.handleBlur.bind(this);
//     this.validateFirstName = this.validateFirstName.bind(this);
//     this.validateLastName = this.validateLastName.bind(this);
//     this.validateEmailAddress = this.validateEmailAddress.bind(this);
//     this.validatePassword = this.validatePassword.bind(this);
//     this.validatephoneNo = this.validatephoneNo.bind(this);
//     this.validateAddress = this.validateAddress.bind(this);
//   }
//   handleChange(event) {
//     const { name, value } = event.target;

//     this.setState({
//       [name]: value,
//     });

//     return;
//   }

//   handleBlur(event) {
//     const { name } = event.target;

//     this.validateField(name);
//     return;
//   }

//   handleSubmit = async (e) => {
//     e.preventDefault();
//     let { firstName, lastName, email, password, address, phoneNo, photo } =
//       this.state;

//     console.log(firstName, lastName, email, password, address, phoneNo, photo);

//     let formFields = [
//       "firstName",
//       "lastName",
//       "email",
//       "password",
//       "address",
//       "phoneNo",
//     ];
//     let isValid = true;

//     formFields.forEach((field) => {
//       isValid = this.validateField(field) && isValid;
//     });
//     if (isValid) this.setState({ isFormSubmitted: true });
//     else this.setState({ isFormSubmitted: false });
//     if (!this.validateFirstName()) {
//     }
//     if (!this.validateLastName()) {
//     }
//     if (!this.validateEmailAddress()) {
//     }
//     if (!this.validatePassword()) {
//     }
//     if (!this.validatephoneNo()) {
//     }
//     if (!this.validateAddress()) {
//     } else {
//       const formData = new FormData();
//       formData.append("firstName", firstName);
//       formData.append("lastName", lastName);
//       formData.append("email", email);
//       formData.append("password", password);
//       formData.append("phoneNo", phoneNo);
//       formData.append("address", address);
//       formData.append("photo", photo);
//       console.log(photo);
//       try {
//         const { data } = await axios.post(
//           "http://localhost:5000/register",
//           formData,
//           {
//             headers: { "Content-Type": "multipart/form-data" },
//           }
//         );

//         console.log(data);
//         Swal.fire("Salesperson Registered!", "", "success");
//       } catch (err) {
//         console.log(err.response.data.error);
//         Swal.fire(err.response.data.error, "", "error");
//       }
//     }
//     return this.state.isFormSubmitted;
//   };

//   validateField(name) {
//     let isValid = false;

//     if (name === "firstName") isValid = this.validateFirstName();
//     else if (name === "lastName") isValid = this.validateLastName();
//     else if (name === "email") isValid = this.validateEmailAddress();
//     else if (name === "password") isValid = this.validatePassword();
//     else if (name === "phoneNo") isValid = this.validatephoneNo();
//     else if (name === "address") isValid = this.validateAddress();
//     return isValid;
//   }

//   validateFirstName() {
//     let firstNameError = "";
//     const value = this.state.firstName;
//     if (value.trim() === "") {
//       firstNameError = "First Name is required";
//     } else {
//       if (!NameValidator.test(this.state.firstName)) {
//         firstNameError = "Letters allowed only";
//       }

//       if (this.state.firstName.length > 10) {
//         firstNameError = "Maximum length should be 10 letters";
//       }
//     }
//     this.setState({
//       firstNameError,
//     });
//     return firstNameError === "";
//   }

//   validateLastName() {
//     let lastNameError = "";
//     const value = this.state.lastName;
//     if (value.trim() === "") lastNameError = "Last Name is required";
//     else {
//       if (!NameValidator.test(this.state.lastName)) {
//         lastNameError = "Letters allowed only";
//       }
//       if (this.state.firstName.length > 10) {
//         lastNameError = "Maximum length should be 10 letters";
//       }
//     }
//     this.setState({
//       lastNameError,
//     });
//     return lastNameError === "";
//   }

//   validateEmailAddress() {
//     let emailAddressError = "";
//     const value = this.state.email;
//     if (value.trim() === "") emailAddressError = "Email Address is required";
//     else if (!emailValidator.test(value))
//       emailAddressError = "Email is not valid";

//     this.setState({
//       emailAddressError,
//     });
//     return emailAddressError === "";
//   }

//   validatePassword() {
//     let passwordError = "";
//     const value = this.state.password;
//     if (value.trim() === "") passwordError = "Password is required";
//     else if (!passwordValidator.test(value))
//       passwordError =
//         "Password must contain at least 5 characters, Min 1 number, Min 1 upper and 1 lowercase, Min 1 special character!";
//     else if (this.state.password.length < 5) {
//       passwordError = "minimum length";
//     }

//     this.setState({
//       passwordError,
//     });
//     return passwordError === "";
//   }

//   validateAddress() {
//     let addressError = "";
//     const value = this.state.address;
//     if (value.trim() === "") addressError = "Address is required";

//     this.setState({
//       addressError,
//     });
//     return addressError === "";
//   }

//   validatephoneNo() {
//     let phoneError = "";
//     const value = this.state.phoneNo;
//     if (value.trim() === "") phoneError = "Phone Number is required";
//     else if (!phoneValidator.test(value)) phoneError = "Phone Number is wrong";

//     this.setState({
//       phoneError,
//     });
//     return phoneError === "";
//   }

//   render() {
//     return (
//       <div className="auth-wrapper p-5">
//         <div className="continer mx-5 p-5">
//           <div className="  main">
//             <h3>Register Salesperson</h3>
//             {/* {this.state.isFormSubmitted ? (
//               (window.location.href = "http://localhost:3000/Salesperson")
//             ) : ( */}
//             <form onSubmit={this.handleSubmit}>
//               <div className="row">
//                 <div className=" col-md-6 form-group mb-3">
//                   <label htmlFor="firstName">First name</label>
//                   <input
//                     type="text"
//                     id="firstName"
//                     placeholder="First Name"
//                     name="firstName"
//                     className="form-control"
//                     value={this.state.firstName}
//                     onChange={this.handleChange}
//                     onBlur={this.handleBlur}
//                     onInput={(e) =>
//                       (e.target.value = ("" + e.target.value).toLowerCase())
//                     }
//                     autoComplete="off"
//                     required
//                   />

//                   {this.state.firstNameError && (
//                     <small class="text-danger">
//                       {" "}
//                       {this.state.firstNameError}{" "}
//                     </small>
//                   )}
//                 </div>

//                 <div className=" col-md-6 mb-3">
//                   <label>Last name</label>
//                   <input
//                     type="text"
//                     placeholder="Last Name"
//                     name="lastName"
//                     className="form-control"
//                     value={this.state.lastName}
//                     onChange={this.handleChange}
//                     onBlur={this.handleBlur}
//                     autoComplete="off"
//                     onInput={(e) =>
//                       (e.target.value = ("" + e.target.value).toLowerCase())
//                     }
//                     required
//                   />
//                   {this.state.lastNameError && (
//                     <small className="text-danger">
//                       {this.state.lastNameError}
//                     </small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label>Email Address</label>
//                   <input
//                     type="email"
//                     placeholder="Email Address"
//                     name="email"
//                     className="form-control"
//                     value={this.state.email}
//                     onChange={this.handleChange}
//                     onBlur={this.handleBlur}
//                     autoComplete="off"
//                     required
//                   />
//                   {this.state.emailAddressError && (
//                     <small className=" text-danger">
//                       {this.state.emailAddressError}
//                     </small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label>Password</label>
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     name="password"
//                     className="form-control"
//                     value={this.state.password}
//                     onChange={this.handleChange}
//                     onBlur={this.handleBlur}
//                     autoComplete="off"
//                     required
//                   />

//                   {this.state.passwordError && (
//                     <small className=" text-danger">
//                       {this.state.passwordError}
//                     </small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label>Phone Number</label>

//                   <input
//                     type="text"
//                     placeholder="Phone No"
//                     name="phoneNo"
//                     className="form-control"
//                     value={this.state.phoneNo}
//                     onChange={this.handleChange}
//                     onBlur={this.handleBlur}
//                     autoComplete="off"
//                     required
//                   />
//                   {this.state.phoneError && (
//                     <small className=" text-danger">
//                       {this.state.phoneError}
//                     </small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label>Address</label>
//                   <input
//                     type="text"
//                     placeholder="Address"
//                     name="address"
//                     className="form-control"
//                     value={this.state.address}
//                     onChange={this.handleChange}
//                     onBlur={this.handleBlur}
//                     autoComplete="off"
//                     required
//                   />
//                   {this.state.addressError && (
//                     <small className=" text-danger">
//                       {this.state.addressError}
//                     </small>
//                   )}
//                 </div>

//                 <div className="col-md-6 mb-3">
//                   <label>Profile picture</label>
//                   <input
//                     type="file"
//                     placeholder="Profile picture"
//                     name="photo"
//                     className="form-control"
//                     accept="image/*"
//                     onChange={(e) =>
//                       this.setState({ photo: e.target.files[0] })
//                     }
//                     onBlur={this.handleBlur}
//                     autoComplete="off"
//                     required
//                   />
//                 </div>

//                 <div className="col d-flex justify-content-end">
//                   <button type="submit" className="btn btn-primary">
//                     Register
//                   </button>
//                 </div>
//               </div>
//             </form>
//             {/* // )} */}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";

import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const theme = createTheme();

export default function RegisterSalesperson() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};

    if (!firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+.[a-zA-Z]*$/.test(email)
    ) {
      errors.email = "Email is invalid";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/.test(
        password
      )
    ) {
      errors.password =
        "Password must contain at least 5 characters, Min 1 number, Min 1 upper and 1 lowercase, Min 1 special character!";
    }

    if (!phoneNo.trim()) {
      errors.phoneNo = "Phone number is required";
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phoneNo)
    ) {
      errors.phoneNo = "Phone number is invalid";
    }

    if (!address.trim()) {
      errors.address = "Address is required";
    }

    if (!photo) {
      errors.photo = "Profile photo is required";
    }

    return errors;
  };
  const handleBlur = (event) => {
    const { name } = event.target;
    setErrors((prevErrors) => {
      return { ...prevErrors, [name]: validate()[name] };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setIsLoading(false);
      return;
    }
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phoneNo", phoneNo);
    formData.append("address", address);
    formData.append("photo", photo);

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      console.log(response.data);
      Swal.fire("Salesperson Registered!", "", "success");
    } catch (error) {
      console.log(error.response.data.error);
      Swal.fire(error.response.data.error, "", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register Salesperson
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  sx={{
                    borderColor: errors.firstName ? "red" : "",
                  }}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName}
                  onBlur={() => {
                    if (firstName) {
                      setErrors((prevState) => ({
                        ...prevState,
                        firstName: "",
                      }));
                    }
                  }}
                />
              </Grid> */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName}
                  onChange={(event) => {
                    setFirstName(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        firstName: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.firstName ? "red" : "",
                  }}
                  error={errors.firstName ? true : false}
                  helperText={errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(event) => {
                    setLastName(event.target.value);
                    if (event.target.value) {
                      setErrors((prevState) => ({
                        ...prevState,
                        lastName: "",
                      }));
                    }
                  }}
                  sx={{
                    borderColor: errors.lastName ? "red" : "",
                  }}
                  error={errors.lastName ? true : false}
                  helperText={errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  sx={{
                    borderColor: errors.email ? "red" : "",
                  }}
                  error={errors.email ? true : false}
                  helperText={errors.email}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  sx={{
                    borderColor: errors.password ? "red" : "",
                  }}
                  error={errors.password ? true : false}
                  helperText={errors.password}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phoneNo"
                  label="Phone Number"
                  type="tel"
                  id="phoneNo"
                  autoComplete="tel"
                  value={phoneNo}
                  onChange={(event) => setPhoneNo(event.target.value)}
                  sx={{
                    borderColor: errors.phoneNo ? "red" : "",
                  }}
                  error={errors.phoneNo ? true : false}
                  helperText={errors.phoneNo}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="address"
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  autoFocus
                  value={address}
                  onChange={(event) => setAddress(event.target.value)}
                  sx={{
                    borderColor: errors.address ? "red" : "",
                  }}
                  error={errors.address ? true : false}
                  helperText={errors.address}
                  onBlur={handleBlur}
                />
              </Grid>

              <Grid item xs={12}>
                <label
                  htmlFor="photo"
                  style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}
                >
                  Profile photo:
                </label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  accept="image/*"
                  required
                  style={{
                    border: "1px solid #ccc",
                    padding: "0.5rem",
                    borderRadius: "0.25rem",
                  }}
                  onChange={handlePhotoChange}
                  onBlur={handleBlur}
                />
                {errors.photo && <p style={{ color: "red" }}>{errors.photo}</p>}
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading} // disable the button when loading
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
