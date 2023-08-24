
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
        "https://workforce-web-backend.up.railway.app/register",
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
