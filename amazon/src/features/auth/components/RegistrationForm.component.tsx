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
import { NewUser } from "../models/NewUser";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux/hooks";
import { register, reset } from "../authSlice";
import {
  validateNameLength,
  validatePasswordLength,
} from "../../../shared/utils/validation/length";

const RegistrationFormComponent: FC = () => {
  const {
    text: name,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

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

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate("/signin");
    }
  }, [isSuccess, dispatch]);

  const onSumbitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) return;
    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError
    )
      return;

    if (
      name.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    )
      return;

    const newUser: NewUser = {
      name,
      email,
      password,
    };

    dispatch(register(newUser));

    clearForm();
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: "64px", color: "primary" }} />;

  return (
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
            Create account
          </Typography>
          <InputLabel
            sx={{ fontWeight: 500, margin: 1, color: "#000000" }}
            htmlFor="name">
            Your Name
          </InputLabel>
          <TextField
            value={name}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText={nameHasError ? "Enter your name" : ""}
            type="text"
            name="name"
            id="name"
            variant="outlined"
            size="small"
          />

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
            helperText={passwordHasError ? "Enter your password" : ""}
            type="text"
            name="password"
            id="password"
            variant="outlined"
            size="small"
            placeholder="Minimum 6 characters required"
          />

          <InputLabel
            sx={{ fontWeight: 500, margin: 1, color: "#000000" }}
            htmlFor="confirm-password">
            Re-enter Password
          </InputLabel>
          <TextField
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              confirmPassword.length > 0 && password !== confirmPassword
                ? "Password must match"
                : ""
            }
            type="confirm-password"
            name="confirm-password"
            id="confirm-password"
            variant="outlined"
            size="small"
          />
          <Button
            variant="contained"
            id="register-btn"
            style={{
              marginTop: "16px",
              height: "31px",
              backgroundColor: "#f0c14b",
              color: "black",
              borderColor: "#a88734 #9c7e31 #846a29",
              textTransform: "none",
            }}
            type="submit">
            Register
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

      <Divider sx={{ marginTop: "36px", marginBottom: "36px" }} />

      <div>
        <small>
          Already have an account?{" "}
          <Link
            to="/signin"
            style={{ textDecoration: "none", color: "#0000ee" }}>
            Sign-in
          </Link>
        </small>
      </div>

      <div>
        <small>
          Buying for work?
          <a
            href="#"
            style={{ textDecoration: "none" }}>
            {" "}
            Create a free business account
          </a>{" "}
        </small>
      </div>
    </Box>
  );
};

export default RegistrationFormComponent;
