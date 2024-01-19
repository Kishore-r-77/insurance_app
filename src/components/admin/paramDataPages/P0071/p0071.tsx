import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useEffect,
  useState,
} from "react";
import {
  TextField,
  MenuItem,
  Checkbox,
  ListItemText,
  Autocomplete,
  Box,
  Paper,
} from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
import UserGroup from "../../usergroup/UserGroup";
import useHttp from "../../../../hooks/use-http";
import { getData } from "../../../../services/http-service";
import axios from "axios";

import InfoIcon from "@mui/icons-material/Info";

import "./p0071.css";
import P0071Enq from "./p0071Enq";

const P0071 = forwardRef((props: any, ref) => {
  const {
    sendRequest: sendBendatatypeRequest,
    status: getBendatatypeResponseStatus,
    data: getBendatatypeResponse,
    error: getBendatatypeResponseError,
  } = useHttp(getData, true);
  const {
    sendRequest: sendManoroptRequest,
    status: getManoroptResponseStatus,
    data: getManoroptResponse,
    error: getManoroptResponseError,
  } = useHttp(getData, true);

  useEffect(() => {
    let getDataParams: any = {};
    getDataParams.companyId = 1;
    getDataParams.languageId = 1;
    getDataParams.seqno = 0;

    getDataParams.name = "P0050";

    getDataParams.item = "BENDATATYPE";
    sendBendatatypeRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });

    getDataParams.item = "MANOROPT";
    sendManoroptRequest({
      apiUrlPathSuffix: "/basicservices/paramItem",
      getDataParams: getDataParams,
    });
  }, []);

  const [inputdata, setInputdata] = useState(props.data ? props.data : {});
  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.p0071Array = retData.p0071Array.filter(
        (value: any) => value.benDataType !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        p0071Array: inputdata.p0071Array.filter(
          (value: any) => value.benDataType !== ""
        ),
      }));
      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      p0071Array: inputdata.p0071Array.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (
    index: number,
    fieldname: string,
    value: any,
    isnumber: boolean
  ) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      p0071Array: inputdata.p0071Array.map((val: any, ind: number) => {
        if (index === ind) {
          if (isnumber) {
            val[fieldname] = Number(value);
          } else {
            val[fieldname] = value;
          }
          return val;
        } else {
          return val;
        }
      }),
    }));
  };

  const [enq, setEnq] = useState(false);

  const enqOpen = () => {
    setEnq(true);
  };

  const enqClose = () => {
    setEnq(false);
  };

  return (
    <>
      <InfoIcon onClick={() => enqOpen()} />

      <Table striped bordered hover>
        <thead
          style={{
            backgroundColor: "rgba(71, 11, 75, 1)",
            color: "white",
            position: "sticky",
            top: "0",
          }}
        >
          <tr>
            <th>Benefit DataType</th>
            <th>Mandatory Or Optional</th>
            <th>Icon</th>
            {(props.mode === "update" || props.mode === "create") &&
              inputdata.p0071Array?.length > 0 && <th>Actions</th>}
            {(props.mode === "update" || props.mode === "create") &&
              (!inputdata.p0071Array || inputdata.p0071Array?.length === 0) && (
                <th>
                  <CustomTooltip text="Add">
                    <AddBoxIcon
                      onClick={() => {
                        setInputdata((inputdata: any) => ({
                          ...inputdata,
                          p0071Array: [
                            {
                              benDataType: "",
                              manOrOpt: "",
                              icon: "",
                            },
                          ],
                        }));
                      }}
                    />
                  </CustomTooltip>
                </th>
              )}
          </tr>
        </thead>
        <tbody>
          {inputdata.p0071Array?.map((value: any, index: number) => (
            <tr key={index}>
              <td>
                <TextField
                  select
                  inputProps={{
                    readOnly:
                      props.mode === "display" || props.mode === "delete",
                  }}
                  id="benDataType"
                  name="benDataType"
                  value={value.benDataType}
                  onChange={(e) =>
                    fieldChangeHandler(
                      index,
                      "benDataType",
                      e.target.value,
                      false
                    )
                  }
                  fullWidth
                  size="small"
                  type="text"
                  margin="dense"
                  SelectProps={{
                    multiple: false,
                  }}
                >
                  {getBendatatypeResponse?.param.data.dataPairs.map(
                    (value: any) => (
                      <MenuItem key={value.code} value={value.code}>
                        {value.code} - {value.description}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </td>

              <td>
                <TextField
                  select
                  inputProps={{
                    readOnly:
                      props.mode === "display" || props.mode === "delete",
                  }}
                  id="manOrOpt"
                  name="manOrOpt"
                  value={value.manOrOpt}
                  onChange={(e) =>
                    fieldChangeHandler(index, "manOrOpt", e.target.value, false)
                  }
                  fullWidth
                  size="small"
                  type="text"
                  margin="dense"
                  SelectProps={{
                    multiple: false,
                  }}
                >
                  {getManoroptResponse?.param.data.dataPairs.map(
                    (value: any) => (
                      <MenuItem key={value.code} value={value.code}>
                        {value.code} - {value.description}
                      </MenuItem>
                    )
                  )}
                </TextField>
              </td>

              <td>
                <TextField
                  inputProps={{
                    readOnly:
                      props.mode === "display" || props.mode === "delete",
                  }}
                  id="icon"
                  name="icon"
                  value={value.icon}
                  onChange={(e) =>
                    fieldChangeHandler(index, "icon", e.target.value, false)
                  }
                  fullWidth
                  size="small"
                  type="text"
                  margin="dense"
                />
              </td>

              {(props.mode === "update" || props.mode === "create") && (
                <td>
                  <span
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginTop: "0.9rem",
                    }}
                  >
                    <CustomTooltip text="Remove">
                      <DeleteIcon
                        color="error"
                        onClick={() => {
                          deleteItemHandler(index);
                        }}
                      />
                    </CustomTooltip>
                    {index === inputdata.p0071Array.length - 1 && (
                      <CustomTooltip text="Add">
                        <AddBoxIcon
                          onClick={() => {
                            setInputdata((inputdata: any) => ({
                              ...inputdata,
                              p0071Array: [
                                ...inputdata.p0071Array,
                                {
                                  benDataType: "",
                                  manOrOpt: "",
                                  icon: "",
                                },
                              ],
                            }));
                          }}
                        />
                      </CustomTooltip>
                    )}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <P0071Enq open={enq} handleClose={enqClose} />
    </>
  );
});

export default P0071;
