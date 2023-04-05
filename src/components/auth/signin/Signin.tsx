import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import {
  fetchUserDetails,
  onChangePassword,
  onChangePhone,
} from "../../../redux/features/siginin/signinSlice";
import AuthForm from "../../../utilities/auth/AuthForm";
import styles from "./signin.module.css";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  const username = useAppSelector((state) => state.users.phone);
  const password = useAppSelector((state) => state.users.password);
  const error = useAppSelector((state) => state.users.error);
  const isLogged = useAppSelector((state) => state.users.isLogged);
  const loading = useAppSelector((state) => state.users.loading);

  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    dispatch(fetchUserDetails());
  };

  useEffect(() => {
    if (isLogged) navigate("home");
    return () => {};
  }, [isLogged]);

  return (
    <div>
      <AuthForm>
        <h1 id={styles.title}>Sign in</h1>
        {loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <form className={styles.formContainer} onSubmit={handleFormSubmit}>
            <TextField
              id="phone"
              name="phone"
              value={username}
              onChange={(e) => dispatch(onChangePhone(e.target.value))}
              variant="outlined"
              label="Phone"
              placeholder="Phone"
              required
              error={!!error}
              helperText={!!error && "Incorrect Entry"}
              fullWidth
            />
            <FormControl
              variant="outlined"
              fullWidth
              error={error ? true : false}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => dispatch(onChangePassword(e.target.value))}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText error={!!error} id="accountId-error">
                {error ? error : null}
              </FormHelperText>
            </FormControl>

            <Button
              className={styles["btn-grad"]}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign In
            </Button>
            <h5>
              Don't have an Account?{" "}
              <a href="#" onClick={() => navigate("signup")}>
                Sign up
              </a>
            </h5>
          </form>
        )}
      </AuthForm>
    </div>
  );
}

export default Signin;
