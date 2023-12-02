import React, { useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import CustomTooltip from "../../../utilities/cutomToolTip/customTooltip";
import useHttp from "../../../hooks/use-http";
import { getData, modData } from "../../../services/http-service";
import { TextField } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import "./paramItemCloneModal.css";
import { Button } from "react-bootstrap";

const ParamItemClone = (props: any) => {
  const {
    sendRequest: sendModDataRequest,
    status: modDataResponseStatus,
    data: modDataResponse,
    error: modDataResponseError,
    resetStatus: resetModDataRequestStatus,
  } = useHttp(modData, false);

  const companyInputRef: any = useRef();
  const paramnameInputRef: any = useRef();
  const longdescInputRef: any = useRef();
  const shortdescInputRef: any = useRef();
  const languageIdInputRef: any = useRef();

  const paramFromitemInputRef: any = useRef();
  const paramToitemInputRef: any = useRef();

  useEffect(() => {
    if (props.show) {
      if (modDataResponseError) {
        resetModDataRequestStatus();
      }

    }
  }, [props.show]);

  useEffect(() => {
    if (modDataResponseStatus === "completed" && !modDataResponseError) {
      props.handleModal({
        show: false,
        status: "save",
        
      });
    }
  }, [modDataResponseStatus, modDataResponseError]);

  const submitHandler = (event: any) => {
      let requestBody: any = {
        companyId: Number(companyInputRef.current.value),
        name: paramnameInputRef.current.value,
        fromItem: paramFromitemInputRef.current.value,
        toItem: paramToitemInputRef.current.value,
        languageId: Number(languageIdInputRef.current.value),
        longdesc: longdescInputRef.current.value,
        shortdesc: shortdescInputRef.current.value,
      };
      
      sendModDataRequest({
        apiUrlPathSuffix: "/basicservices/cloneParamItem",
        requestBody: requestBody,
        mode: "create",
      });
    

  
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.handleModal({
          status: "cancel",
          data: { mode: props.data.mode },
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Clone Param Item
        </Modal.Title>
      </Modal.Header>

  
        
          <Modal.Body>
            <form>
         

              <Grid2 container spacing={2}>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="CompanyID"
                    name="CompanyID"
                    inputRef={companyInputRef}
                    placeholder="From Company"
                    label="From Company"
                    defaultValue={props.data.companyId}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ParamName"
                    name="ParamName"
                    placeholder="From Param Name"
                    label="From Param Name"
                    inputRef={paramnameInputRef}
                    defaultValue={props.data.name}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ItemName"
                    name="ItemName"
                    placeholder="From Item Name"
                    label="From Item Name"
                    inputRef={paramFromitemInputRef}
                    defaultValue={props.data.item}                     
                    inputProps={{
                      readOnly: true
                        
                    }}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    inputProps={{ readOnly: true }}
                    id="CompanyID1"
                    name="CompanyID1"
                    placeholder="To Company"
                    label="To Company"
                    defaultValue={props.data.companyId}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ParamName1"
                    name="ParamName1"
                    placeholder="To Param Name"
                    label="To Param Name"
                    defaultValue={props.data.name}
                    fullWidth
                    inputProps={{ readOnly: true }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="ItemName1"
                    name="ItemName1"
                    placeholder="To Item Name"
                    label="To Item Name"
                    inputRef={paramToitemInputRef}
                    defaultValue=""                    
                    //inputProps={{  readOnly: true       
                    //}}
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                
                

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="longdesc"
                    name="longdesc"
                    placeholder="Long Description"
                    label="Long Description"
                    inputRef={longdescInputRef}
                    defaultValue=""
                    fullWidth
                  //  inputProps={{ readOnly: false }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="shortdesc"
                    name="shortdesc"
                    placeholder="Short Description"
                    label="Short Description"
                    inputRef={shortdescInputRef}
                    defaultValue=""
                    fullWidth
                   // inputProps={{ readOnly: false }}
                    margin="dense"
                  />
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="LanguageId"
                    name="LanguageId"
                    placeholder="Language Id"
                    label="Language Id"
                    inputRef={languageIdInputRef}
                    inputProps={{ readOnly: true }}
                    fullWidth
                    defaultValue={props.data.languageId}
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </form>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "flex-start" }}>
            {props.data.mode !== "delete" && (
              <CustomTooltip text="Update">
                <Button
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
                  {/*<i className="fa fa-check-circle" style={{fontSize : '1.33333em', lineHeight : '0.75em', verticalAlign : '-0.0667em'}}></i>*/}
                  <CheckCircleIcon style={{ marginBottom: "0.5em" }} />
                </Button>
              </CustomTooltip>
            )}

            {props.data.mode === "delete" && (
              <CustomTooltip text="Delete">
                <Button
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
                  {/*<i className="fa fa-trash" style={{fontSize : '1.33333em', lineHeight : '0.75em', verticalAlign : '-0.0667em'}}></i>*/}
                  <DeleteIcon style={{ marginBottom: "0.5em" }} />
                </Button>
              </CustomTooltip>
            )}
            <CustomTooltip text="Cancel">
              <Button
                type="button"
                style={{ marginRight: "0.5em", width: "3em", height: "2.4em" }}
                className="btn btn-default btn-custom  "
                onClick={() => {
                  props.handleModal({
                    status: "cancel",
                    data: { mode: props.data.mode },
                  });
                }}
              >
                {/*<i className="fa fa-times-circle" style={{fontSize : '1.33333em', lineHeight : '0.75em', verticalAlign : '-0.0667em'}}></i>*/}

                <CancelIcon style={{ marginBottom: "0.5em" }} />
              </Button>
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
        
      
  
    </Modal>
  );
};

export default ParamItemClone;
