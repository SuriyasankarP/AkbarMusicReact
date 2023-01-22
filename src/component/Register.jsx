import React, { Component } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import axios from "axios";
import jwt from "jwt-decode";
import Cookies from 'js-cookie'

const theme = createTheme();
function Register() {
  const ApiUrl = "https://localhost:7123/api/Users/Register";
  const [Data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handle(e) {
    const newData = { ...Data };
    newData[e.target.id] = e.target.value;
    setData(newData);
    console.log(newData);
  }
  async function submit(e) {
    e.preventDefault();
    await axios
      .post(ApiUrl, {
        userName: Data.username,
        email: Data.email,
        password: Data.password,
      })
      .then(function (res) {
        console.log("Register Success");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  // const userDetail = jwt(localStorage.getItem("user"));
  

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box sx={{ mt: 3 }}>
              <form onSubmit={(e) => submit(e)}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      onChange={(e) => handle(e)}
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      name="UName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={(e) => handle(e)}
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      onChange={(e) => handle(e)}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
              </form>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link to="/Login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default Register;
