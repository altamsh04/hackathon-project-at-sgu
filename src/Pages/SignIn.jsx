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

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signin/", formValues);
      console.log("Response:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.id);
  
      setMessage("Sign In Successful!");
      setSeverity("success");
      setOpen(true);
      setFormValues({ email: "", password: "" });
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.error("Error signing in:", error);
      setMessage("Sign In Failed. Please check your credentials.");
      setSeverity("error");
      setOpen(true);
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
          <Typography component="h1" variant="h5" sx={{ color: "#333" }}>
            Sign In
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
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={formValues.password}
              onChange={handleChange}
              sx={{ mt: 2, bgcolor: "#fafafa" }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, color: "#fff", background: '#611f69' }}
            >
              Sign In
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 2, color: "#555" }}
            >
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: '#611f69' }}>
                Sign Up
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
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SignIn;
