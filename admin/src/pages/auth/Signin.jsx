import { React, useRef, useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  signin,
  createTable,
  restoreDefaultBackup,
} from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const theme = createTheme();
export default function SignIn() {
  const initialValue = {
    UserEmail: "",
    Password: "",
  };
  const formRef = useRef();
  const [formData, setFormData] = useState(initialValue);
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign in";
    document.body.classList.remove("dark-theme");
    if (currentUser) {
      return navigate("/");
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    signin(dispatch, {
      UserEmail: formData.UserEmail,
      PasswordHash: formData.Password,
    });
  };

  const onChange = (e) => {
    const { value, id } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleCreateTable = () => {
    createTable();
  };

  const handleImportData = () => {
    restoreDefaultBackup();
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit} ref={formRef}>
            <TextField
              onChange={(e) => onChange(e)}
              margin="normal"
              required
              fullWidth
              id="UserEmail"
              type="email"
              label="Email"
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
              autoComplete="current-password"
              autoFocus
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={() => formRef.current.reportValidity()}
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <ReactLink
                  className="MuiTypography-root MuiTypography-body2 MuiLink-root MuiLink-underlineAlways css-wpssva-MuiTypography-root-MuiLink-root"
                  style={{ cursor: "pointer" }}
                  to={"/signup"}
                  variant="body2"
                >
                  Don't have an account? Sign Up
                </ReactLink>
              </Grid>
            </Grid>
          </form>
        </Box>
        <div
          style={{
            marginTop: "5rem",
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            style={{
              backgroundColor: "gray",
              padding: "10px",
              color: "#fff",
              borderRadius: "3px",
              fontSize: "16px",
            }}
            onClick={handleCreateTable}
          >
            1. Create Table
          </button>
          <button
            style={{
              backgroundColor: "gray",
              padding: "10px",
              color: "#fff",
              borderRadius: "3px",
              fontSize: "16px",
            }}
            onClick={handleImportData}
          >
            2. Import Data
          </button>
        </div>
      </Container>
    </ThemeProvider>
  );
}
