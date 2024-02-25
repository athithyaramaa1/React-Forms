import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let isvalid = true;
    const error = {};

    if (formData.firstName.trim() === "") {
      error.firstName = "First Name is required";
      isvalid = false;
    } else if (formData.firstName.length < 3) {
      error.firstName = "First Name must be atleast 3 characters";
      isvalid = false;
    } else if (formData.firstName.length > 30) {
      error.firstName = "Name must be less than 30 characters";
      isvalid = false;
    }

    if (formData.lastName.trim() == "") {
      error.lastName = "Last Name is required";
      isvalid = false;
    } else if (formData.lastName.length < 3) {
      error.lastName = "Last Name must be atleast 3 characters";
      isvalid = false;
    } else if (formData.lastName.length > 30) {
      error.lastName = "Name must be less than 30 characters";
      isvalid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      error.email = "Enter a valid email address";
      isvalid = false;
    }

    const telephoneRegex = /^\d{10}$/;
    if (
      !formData.telephone.trim() ||
      !telephoneRegex.test(formData.telephone.trim())
    ) {
      error.telephone = "Enter a valid 10-digit telephone number";
      isvalid = false;
    }

    setErrors(error);
    return isvalid;
  };

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()){
      console.log("Form is invalid. Please enter the required details as per required constraints");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
            Sign up
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
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
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
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
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
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telephone"
                  label="Phone number"
                  name="telephone"
                  autoComplete="tel"
                  type="tel"
                  value={formData.telephone}
                  onChange={handleChange}
                  error={!!errors.telephone}
                  helperText={errors.telephone}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
              {" "}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>{" "}
            <Grid container justifyContent="flex-end">
              <Grid item>
                  <Link variant="body2">
                    Already have an account? Sign in
                  </Link>{" "}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 3, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
