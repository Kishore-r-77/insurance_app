import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../../utilities/auth/AuthForm";
import styles from "./signup.module.css";

function Signup() {
  const initialValues = {
    Email: "",
    password: "",
    Name: "",
    Phone: "",
    loading: "",
    Profile: "",
    LanguageID: "",
    UserGroupID: "",
    CompanyID: "",
    UserStatusID: "",
    Gender: "",
    isSignedUp: "",
  };

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case "ONCHANGE":
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialValues);

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/auth/signup`,
        {
          Email: state.Email,
          Name: state.Name,
          Phone: `+91${state.Phone}`,
          password: state.password,
          Profile: state.Profile,
          VerficationCode: state.VerficationCode,
          LanguageID: parseInt(state.LanguageID),
          UserGroupID: parseInt(state.UserGroupID),
          CompanyID: parseInt(state.CompanyID),
          // UserStatusID: parseInt(state.UserStatusID),
          UserStatusID: 1,
          Gender: state.Gender,
        },
        { withCredentials: true }
      );
      console.log(response);

      navigate("/");
      return response;
    } catch (err: any) {
      console.log(err.message);

      return err.message;
    }
  };
  return (
    <div>
      <AuthForm>
        <h1 id={styles.title}>Sign Up</h1>
        {state.loading ? (
          <CircularProgress color="secondary" />
        ) : (
          <form
            className={styles.formContainer}
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <TextField
              value={state.Email}
              label="Email"
              placeholder="Email"
              onChange={(e) =>
                dispatch({
                  type: "ONCHANGE",
                  payload: e.target.value,
                  fieldName: "Email",
                })
              }
            />
            <TextField
              value={state.Name}
              label="Name"
              placeholder="Name"
              onChange={(e) =>
                dispatch({
                  type: "ONCHANGE",
                  payload: e.target.value,
                  fieldName: "Name",
                })
              }
            />
            <TextField
              type="number"
              value={state.Phone}
              label="Phone"
              placeholder="Phone"
              onChange={(e) =>
                dispatch({
                  type: "ONCHANGE",
                  payload: e.target.value,
                  fieldName: "Phone",
                })
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">+91</InputAdornment>
                ),
              }}
            />
            <FormControl
              variant="outlined"
              fullWidth
              //   error={error ? true : false}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                value={state.password}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) =>
                  dispatch({
                    type: "ONCHANGE",
                    payload: e.target.value,
                    fieldName: "password",
                  })
                }
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
              {/* <FormHelperText error={!!error} id="accountId-error">
                {error ? error : null}
              </FormHelperText> */}
            </FormControl>
            <TextField
              value={state.LanguageID}
              label="LanguageID"
              placeholder="LanguageID"
              onChange={(e) =>
                dispatch({
                  type: "ONCHANGE",
                  payload: e.target.value,
                  fieldName: "LanguageID",
                })
              }
            />
            <TextField
              value={state.UserGroupID}
              label="UserGroupID"
              placeholder="UserGroupID"
              onChange={(e) =>
                dispatch({
                  type: "ONCHANGE",
                  payload: e.target.value,
                  fieldName: "UserGroupID",
                })
              }
            />
            <TextField
              value={state.CompanyID}
              label="CompanyID"
              placeholder="CompanyID"
              onChange={(e) =>
                dispatch({
                  type: "ONCHANGE",
                  payload: e.target.value,
                  fieldName: "CompanyID",
                })
              }
            />
            <TextField
              value={state.Gender}
              label="Gender"
              placeholder="Gender"
              onChange={(e) =>
                dispatch({
                  type: "ONCHANGE",
                  payload: e.target.value,
                  fieldName: "Gender",
                })
              }
            />
            <Button
              className={styles["btn-grad"]}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </Button>
            <h5>
              Already have an Account?{" "}
              <a href="#" onClick={() => navigate("/")}>
                Sign In
              </a>
            </h5>
          </form>
        )}
      </AuthForm>
    </div>
  );
}

export default Signup;
