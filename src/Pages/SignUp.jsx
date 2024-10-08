import {
  Alert,
  Box,
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
    mobile: "",
  });

  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup/", formValues);
      console.log("Response:", response.data);
      setOpen(true);
      setFormValues({ username: "", password: "", email: "", mobile: "" }); 
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#f5f5f5",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          bgcolor: "transparent",
          color: "#000",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#ffffff",
            padding: 3,
            borderRadius: 2,
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography component="h1" variant="h5" sx={{ color: "#333",  }}>
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 2 }}
            onSubmit={handleSubmit}
          >
            <TextField
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={formValues.username}
              onChange={handleChange}
              sx={{ bgcolor: "#fafafa" }}
            />
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={formValues.password}
              onChange={handleChange}
              sx={{ mt: 2, bgcolor: "#fafafa" }}
            />
            <TextField
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              autoComplete="email"
              value={formValues.email}
              onChange={handleChange}
              sx={{ mt: 2, bgcolor: "#fafafa" }}
            />
            <TextField
              required
              fullWidth
              name="mobile"
              label="Mobile"
              type="tel"
              autoComplete="tel"
              value={formValues.mobile}
              onChange={handleChange}
              sx={{ mt: 2, bgcolor: "#fafafa" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3,  background: '#611f69', color: "#fff" }}
            >
              Sign Up
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "#555" }}
            >
              Already have an account?{" "}
              <Link to="/signin" style={{ color:'#611f69' }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          Sign Up Successful!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignUp;
