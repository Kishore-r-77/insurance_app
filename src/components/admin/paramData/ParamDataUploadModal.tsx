import Modal from "react-bootstrap/Modal";
import "./ParamDataUploadModal.css";
import CustomTooltip from "../../../utilities/cutomToolTip/customTooltip";
import { Button } from "react-bootstrap";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import { uploadFiles } from "../../../services/http-service";
import useHttp from "../../../hooks/use-http";

const ParamDataUploadModal = (props: any) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [fileError, setFileError] = useState<any>(null);

  const {
    sendRequest: sendUploadRequest,
    status: sendUploadReqStatus,
    data: sendUploadResponse,
    error: sendUploadResponseError,
  } = useHttp(uploadFiles, false);

  const onFileChange = (event: any) => {
    setFileError(null);
    setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    if (sendUploadReqStatus === "completed" && !sendUploadResponseError) {
      props.handleModal({
        operation: "success",
      });
    }
  }, [sendUploadReqStatus, sendUploadResponseError]);

  const onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    if (selectedFile) {
      if (
        selectedFile["type"] !== "application/vnd.ms-excel" &&
        selectedFile["type"] !==
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      ) {
        setFileError("not a valid MS excel file");
        return;
      }

      let files: any[] = [];
      files.push(selectedFile);
      sendUploadRequest({
        apiUrlPathSuffix: "/basicservices/paramDataUpload",
        files: files,
      });
    }

    // Request made to the backend api
    // Send formData object
    //axios.post("api/uploadfile", formData);
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.handleModal({
          operation: "cancel",
        });
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Upload Data in Excel</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <input
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          type="file"
          disabled={sendUploadReqStatus === "pending"}
          onChange={onFileChange}
          
        />
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "flex-start" }}>
        <CustomTooltip text="Upload">
          <Button
            type="button"
            style={{
              marginRight: "0.5em",
              width: "3em",
              height: "2.4em",
            }}
            disabled={sendUploadReqStatus === "pending"}
            className="btn btn-default btn-custom  "
            onClick={onFileUpload}
          >
            <FileUploadIcon style={{ marginBottom: "0.5em" }} />
          </Button>
        </CustomTooltip>

        <CustomTooltip text="Cancel">
          <Button
            type="button"
            style={{ marginRight: "0.5em", width: "3em", height: "2.4em" }}
            className="btn btn-default btn-custom  "
            onClick={() => {
              props.handleModal({
                operation: "cancel",
              });
            }}
          >
            <CancelIcon style={{ marginBottom: "0.5em" }} />
          </Button>
        </CustomTooltip>
        {fileError && (
          <div
            className="alert alert-danger"
            style={{ fontSize: "95%", padding: "0rem" }}
          >
            <strong>Failed to upload!</strong>
            <span className="pl-1"> {fileError}</span>
          </div>
        )}

        {sendUploadResponseError && sendUploadReqStatus === "completed" && (
          <div
            className="alert alert-danger"
            style={{ fontSize: "95%", padding: "0rem" }}
          >
            <strong>Failed to upload!</strong>
            <span className="pl-1"> {sendUploadResponseError}</span>
          </div>
        )}

        {sendUploadReqStatus === "pending" && (
          <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ParamDataUploadModal;
