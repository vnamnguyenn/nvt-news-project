import * as React from "react";
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
import { login, createTable, restoreDefaultBackup } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { color } from "@mui/system";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>
      {new Date().getFullYear()}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    event.preventDefault();

    if (email == "") {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    if (password == "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    login(dispatch, { UserEmail: email, PasswordHash: password });
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
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              sx={{ mb: 3 }}
              autoFocus
              error={emailError}
              helperText={emailError === true ? "Enter your email!" : ""}
            />
            <TextField
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              helperText={passwordError === true ? "Enter your password!" : ""}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
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
              onClick={handleClick}
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
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
