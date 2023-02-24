import React, { useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
import useHttp from "../../../../hooks/use-http";
import { getData, modData } from "../../../../services/http-service";
import "./param.css";

const Param = (props: any) => {
  const {
    sendRequest: sendGetDataRequest,
    status: getDataResponseStatus,
    data: getDataResponse,
    error: getDataResponseError,
  } = useHttp(
    getData,
    props.data.mode === "update" || props.data.mode === "delete"
  );
  const {
    sendRequest: sendModDataRequest,
    status: modDataResponseStatus,
    data: modDataResponse,
    error: modDataResponseError,
    resetStatus: resetModDataRequestStatus,
  } = useHttp(modData, false);

  const companyInputRef = useRef<any>();
  const paramnameInputRef = useRef<any>();
  const longdescInputRef = useRef<any>();
  const languageIdInputRef = useRef<any>();
  const paramTypeInputRef = useRef<any>();

  useEffect(() => {
    if (props.show) {
      if (modDataResponseError) {
        resetModDataRequestStatus();
      }

      if (props.data.mode === "update" || props.data.mode === "delete") {
        sendGetDataRequest({
          apiUrlPathSuffix: "/param",
          getDataParams: {
            companyId: props.data.companyId,
            name: props.data.name,
            languageId: props.data.languageId,
          },
        });
      }
    }
  }, [props.show]);

  useEffect(() => {
    if (modDataResponseStatus === "completed" && !modDataResponseError) {
      props.handleModal({
        show: false,
        status: "save",
        data: { mode: props.data.mode },
      });
    }
  }, [modDataResponseStatus, modDataResponseError]);

  const submitHandler = (event: any) => {
    //sendSignInRequest({phone : usernameInputRef.current.value , password: passwordInputRef.current.value });

    if (props.data.mode === "create" || props.data.mode === "update") {
      let paramType = "";
      let extraDataExist = false;
      if (paramTypeInputRef.current.value === "D") {
        paramType = "dated";
        extraDataExist = true;
      }

      if (paramTypeInputRef.current.value === "1") {
        extraDataExist = true;
      }

      sendModDataRequest({
        apiUrlPathSuffix: "/param",
        requestBody: {
          companyId: Number(companyInputRef.current.value),
          name: paramnameInputRef.current.value,
          languageId: Number(languageIdInputRef.current.value),
          longdesc: longdescInputRef.current.value,
          extraDataExist: extraDataExist,
          type: paramType,
        },
        mode: props.data.mode,
      });
    }

    if (props.data.mode === "delete") {
      sendModDataRequest({
        apiUrlPathSuffix: "/param",
        getDataParams: {
          companyId: props.data.companyId,
          name: props.data.name,
          languageId: props.data.languageId,
        },
        mode: props.data.mode,
      });
    }
  };

  let paramType = "0";

  if (
    (props.data.mode === "update" || props.data.mode === "delete") &&
    getDataResponseStatus === "completed" &&
    !getDataResponseError
  ) {
    if (getDataResponse.param.type === "dated") {
      paramType = "D";
    } else {
      if (getDataResponse.param.extraDataExist) {
        paramType = "1";
      }
    }
  }

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.handleModal({
          show: false,
          status: "cancel",
          data: { mode: props.data.mode },
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Param Header Maintenance</Modal.Title>
      </Modal.Header>

      {(((props.data.mode === "update" || props.data.mode === "delete") &&
        getDataResponseStatus === "completed" &&
        !getDataResponseError) ||
        props.data.mode === "create") && (
        <>
          <Modal.Body>
            <form>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="itemcoy">Company</label>

                  <input
                    type="number"
                    id="itemcoy"
                    ref={companyInputRef}
                    defaultValue={
                      props.data.mode === "update" ||
                      props.data.mode === "delete"
                        ? getDataResponse.param.companyId
                        : "0"
                    }
                    disabled={
                      props.data.mode === "update" ||
                      props.data.mode === "delete"
                    }
                    className="form-control form-control-sm rounded-1"
                  />
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="itemtabl">Param Name</label>
                  <input
                    type="text"
                    ref={paramnameInputRef}
                    defaultValue={
                      props.data.mode === "update" ||
                      props.data.mode === "delete"
                        ? getDataResponse.param.name
                        : ""
                    }
                    disabled={
                      props.data.mode === "update" ||
                      props.data.mode === "delete"
                    }
                    className="form-control form-control-sm rounded-1"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="longdesc">Long Desc</label>
                <input
                  type="text"
                  ref={longdescInputRef}
                  defaultValue={
                    props.data.mode === "update" || props.data.mode === "delete"
                      ? getDataResponse.param.longdesc
                      : ""
                  }
                  disabled={props.data.mode === "delete"}
                  className="form-control form-control-sm rounded-1"
                />
              </div>

              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="languageid">Language Id</label>
                  <input
                    type="number"
                    ref={languageIdInputRef}
                    defaultValue={
                      props.data.mode === "update" ||
                      props.data.mode === "delete"
                        ? getDataResponse.param.languageId
                        : "0"
                    }
                    disabled={props.data.mode === "delete"}
                    className="form-control form-control-sm rounded-1"
                    name="languageid"
                    id="languageid"
                  />
                </div>

                <div className="form-group col-sm-6">
                  <label htmlFor="paramType">Param Type</label>
                  <select
                    className="form-control form-control-sm rounded-1"
                    defaultValue={paramType}
                    ref={paramTypeInputRef}
                    disabled={props.data.mode === "delete"}
                    name="paramType"
                    id="paramType"
                  >
                    <option value="0">Simple</option>
                    <option value="1">Data</option>
                    <option value="D">Effective Date</option>
                  </select>
                </div>
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "flex-start" }}>
            {props.data.mode !== "delete" && (
              <CustomTooltip text="Update">
                <button
                  type="button"
                  style={{
                    marginRight: "0.5em",
                    width: "3em",
                    height: "2.4em",
                  }}
                  className="btn btn-default btn-custom  "
                  disabled={modDataResponseStatus === "pending"}
                  onClick={submitHandler}
                >
                  <i
                    className="fa fa-check-circle"
                    style={{
                      fontSize: "1.33333em",
                      lineHeight: "0.75em",
                      verticalAlign: "-0.0667em",
                    }}
                  ></i>
                </button>
              </CustomTooltip>
            )}

            {props.data.mode === "delete" && (
              <CustomTooltip text="Delete">
                <button
                  type="button"
                  style={{
                    marginRight: "0.5em",
                    width: "3em",
                    height: "2.4em",
                  }}
                  className="btn btn-danger"
                  disabled={modDataResponseStatus === "pending"}
                  onClick={submitHandler}
                >
                  <i
                    className="fa fa-trash"
                    style={{
                      fontSize: "1.33333em",
                      lineHeight: "0.75em",
                      verticalAlign: "-0.0667em",
                    }}
                  ></i>
                </button>
              </CustomTooltip>
            )}
            <CustomTooltip text="Cancel">
              <button
                type="button"
                style={{ marginRight: "0.5em", width: "3em", height: "2.4em" }}
                className="btn btn-default btn-custom  "
                onClick={() => {
                  props.handleModal({
                    show: false,
                    status: "cancel",
                    data: { mode: props.data.mode },
                  });
                }}
              >
                <i
                  className="fa fa-times-circle"
                  style={{
                    fontSize: "1.33333em",
                    lineHeight: "0.75em",
                    verticalAlign: "-0.0667em",
                  }}
                ></i>
              </button>
            </CustomTooltip>

            {modDataResponseError && modDataResponseStatus === "completed" && (
              <div
                className="alert alert-danger"
                style={{ fontSize: "95%", padding: "0rem" }}
              >
                <strong>Failed to update!</strong>
                <span className="pl-1">{modDataResponseError}</span>
              </div>
            )}
            {modDataResponseStatus === "pending" && (
              <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
            )}
          </Modal.Footer>
        </>
      )}
      {(props.data.mode === "update" || props.data.mode === "delete") &&
        getDataResponseStatus === "pending" && (
          <Modal.Body>
            <div
              className="d-flex justify-content-center"
              style={{ marginTop: "10%" }}
            >
              <div
                className="spinner-border "
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </Modal.Body>
        )}

      {(props.data.mode === "update" || props.data.mode === "delete") &&
        getDataResponseError &&
        getDataResponseStatus === "completed" && (
          <div
            className="alert alert-danger"
            style={{ fontSize: "95%", padding: "0rem" }}
          >
            <strong>Failed to get data!</strong>
            <span className="pl-1">{getDataResponseError}</span>
          </div>
        )}
    </Modal>
  );
};

export default Param;
