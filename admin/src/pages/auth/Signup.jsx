import { React, useRef, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signup } from "../../redux/apiCalls";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const theme = createTheme();

export default function SignUp() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    document.body.classList.remove("dark-theme");
    document.title = "Sign up";
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser, navigate]);

  const initialValue = {
    UserEmail: "",
    Password: "",
    BirthDay: "",
    FullName: "",
  };
  const formRef = useRef();

  const [formData, setFormData] = useState(initialValue);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(dispatch, {
      UserEmail: formData.UserEmail,
      PasswordHash: formData.Password,
      FullName: formData.FullName,
      DateOfBirth: formData.BirthDay,
    });
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" noValidate maxWidth="xs">
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
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Sign up
          </Typography>
          <form autoComplete="off" onSubmit={handleSubmit} ref={formRef}>
            <TextField
              onChange={(e) => onChange(e)}
              required
              fullWidth
              label="FullName"
              type="text"
              id="FullName  "
              autoFocus
              InputLabelProps={{ shrink: true }}
              placeholder="Full Name"
            />
            <TextField
              onChange={(e) => onChange(e)}
              margin="normal"
              required
              fullWidth
              id="UserEmail"
              type="email"
              label="Email"
              sx={{ mb: 3 }}
              InputLabelProps={{ shrink: true }}
              placeholder="Email"
              autoFocus
            />
            <TextField
              onChange={(e) => onChange(e)}
              required
              fullWidth
              label="BirthDay"
              type="date"
              id="BirthDay"
              placeholder="BirthDay"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
              autoFocus
            />
            <TextField
              onChange={(e) => onChange(e)}
              required
              fullWidth
              label="Password"
              type="password"
              id="Password"
              placeholder="Password"
              autoComplete="current-password"
              sx={{ mb: 3 }}
              InputLabelProps={{ shrink: true }}
              autoFocus
              inputProps={{
                pattern:
                  "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
                title:
                  "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
              }}
            />
            <TextField
              onChange={(e) => onChange(e)}
              required
              fullWidth
              label="Password Confirm"
              placeholder="Password Confirm"
              type="password"
              id="ConfirmPassword"
              InputLabelProps={{ shrink: true }}
              autoComplete="current-password"
              inputProps={{
                pattern: formData.Password,
                title: "Password confirm doesn't match Password",
              }}
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => formRef.current.reportValidity()}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <ReactLink
                  className="MuiTypography-root MuiTypography-body2 MuiLink-root MuiLink-underlineAlways css-wpssva-MuiTypography-root-MuiLink-root"
                  style={{ cursor: "pointer" }}
                  to={"/signin"}
                  variant="body2"
                >
                  Already an account? Sign In
                </ReactLink>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
