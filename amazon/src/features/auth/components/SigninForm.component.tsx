import {
  Box,
  Grid,
  TextField,
  InputLabel,
  Typography,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { FC, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../../../hooks/input/use-input";
import { validateEmail } from "../../../shared/utils/validation/email";
import { login, reset } from "../authSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { LoginUser } from "../models/LoginUser.interface";
import { validatePasswordLength } from "../../../shared/utils/validation/length";

const SigninFormComponent: FC = () => {
  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess, isAuthenticated } = useAppSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);
  useEffect(() => {
    if (!isAuthenticated) return;
    navigate("/");
  }, [isAuthenticated]);

  const onSumbitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailHasError || passwordHasError) return;

    if (email.length === 0 || password.length === 0) return;

    const loginUser: LoginUser = {
      email,
      password,
    };
    dispatch(login(loginUser));
  };

  if (isLoading)
    return (
      <CircularProgress
        sx={{ marginTop: "64px" }}
        color="primary"
      />
    );

  return (
    <>
      <Box
        sx={{
          border: 1,
          padding: 2,
          borderColor: "#cccccc",
          width: "350px",
          marginTop: 2,
        }}>
        <form onSubmit={onSumbitHandler}>
          <Grid
            container
            direction="column"
            justifyContent="flex-start">
            <Typography
              variant="h4"
              component="h1">
              Sign-in
            </Typography>

            <InputLabel
              sx={{ fontWeight: 500, margin: 1, color: "#000000" }}
              htmlFor="email">
              Email
            </InputLabel>
            <TextField
              type="email"
              name="email"
              value={email}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
              error={emailHasError}
              helperText={emailHasError ? "Enter your email" : ""}
              id="email"
              variant="outlined"
              size="small"
            />
            <InputLabel
              sx={{ fontWeight: 500, margin: 1, color: "#000000" }}
              htmlFor="password">
              Password
            </InputLabel>
            <TextField
              value={password}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              error={passwordHasError}
              helperText={
                passwordHasError ? "Minimun 6 characters required" : ""
              }
              type="text"
              name="password"
              id="password"
              variant="outlined"
              size="small"
              placeholder="Minimum 6 characters required"
            />

            <Button
              variant="contained"
              disabled={
                !validatePasswordLength(password) || !validateEmail(email)
              }
              style={{
                marginTop: "16px",
                height: "31px",
                backgroundColor: "#f0c14b",
                color: "black",
                borderColor: "#a88734 #9c7e31 #846a29",
                textTransform: "none",
              }}
              id="signin-btn"
              type="submit">
              Sign-in
            </Button>
          </Grid>
        </form>

        <Box>
          <div style={{ marginTop: "30px" }}>
            <small>
              <span> By creating an account, you agree to Amazon's</span>
            </small>
          </div>

          <div>
            <small>
              <a
                href="#"
                style={{ textDecoration: "none" }}>
                {" "}
                Conditions of use{" "}
              </a>{" "}
              and{" "}
              <a
                href="#"
                style={{ textDecoration: "none" }}>
                Privacy policy
              </a>
            </small>
          </div>
        </Box>
      </Box>

      <div style={{ marginTop: "16px" }}>
        <Divider>
          <small style={{ textDecoration: "none", color: "#767676" }}>
            New to Amazon?
          </small>
        </Divider>
        <Link
          to="/register"
          id="register-link">
          <Button
            variant="contained"
            style={{
              width: "100%",
              marginTop: "12px",
              height: "31px",
              backgroundColor: "#f1f1f1",
              color: "black",
              textTransform: "none",
            }}>
            Register
          </Button>
        </Link>
      </div>
    </>
  );
};

export default SigninFormComponent;
