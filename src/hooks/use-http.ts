import { useReducer, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../services/http-service";

function httpReducer(state: any, action: any) {
  if (action.type === "SEND") {
    return {
      data: null,
      error: null,
      status: "pending",
    };
  }

  if (action.type === "SUCCESS") {
    return {
      data: action.responseData,
      error: null,
      status: "completed",
    };
  }

  if (action.type === "ERROR") {
    return {
      data: null,
      error: action.errorMessage,
      status: "completed",
    };
  }

  if (action.type === "RESET") {
    return {
      data: null,
      error: null,
      status: null,
    };
  }

  return state;
}

function useHttp(requestFunction: any, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? "pending" : null,
    data: null,
    error: null,
  });

  const navigate = useNavigate();

  const sendRequest = useCallback(
    async function (requestData: any) {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error: any) {
        if (error.message === "401_token_expired") {
          alert("session has expired please login again..");
          try {
            await signOut();
            localStorage.clear();
            navigate("/", { replace: true });
          } catch (error: any) {
            dispatch({
              type: "ERROR",
              errorMessage:
                "session expired , failed to logout!" || error.message,
            });
          }
        } else {
          console.log(error);
          dispatch({
            type: "ERROR",
            errorMessage: error.message || "Something went wrong!",
          });
        }
      }
    },
    [requestFunction]
  );

  const resetStatus = useCallback(function () {
    dispatch({ type: "RESET" });
  }, []);

  return {
    sendRequest,
    ...httpState,
    resetStatus,
  };
}

export default useHttp;
