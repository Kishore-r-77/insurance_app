import React, { forwardRef, useImperativeHandle, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import "./q0020.css";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
const Q0020 = forwardRef((props: any, ref) => {
  const [inputdata, setInputdata] = useState(props.data ? props.data : {});

  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.WaiverCoverages = retData.WaiverCoverages.filter(
        (value: any) => value.Coverage !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        WaiverCoverages: inputdata.WaiverCoverages.filter(
          (value: any) => value.Coverage !== ""
        ),
      }));

      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      WaiverCoverages: inputdata.WaiverCoverages.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      WaiverCoverages: inputdata.WaiverCoverages.map(
        (val: any, ind: number) => {
          if (index === ind) {
            val[fieldname] = value;
            return val;
          } else {
            return val;
          }
        }
      ),
    }));
  };

  return (
    <Table striped bordered hover>
      <h1>
        {" "}
        <center>Coverages Allowed for Waiver </center>
      </h1>
      <thead
        style={{
          backgroundColor: "rgba(71, 11, 75, 1)",
          color: "white",
          position: "sticky",
          top: "0",
        }}
      >
        <tr>
          <th>Coverages </th>

          {(props.mode === "update" || props.mode === "create") && <th>sa</th>}
        </tr>
      </thead>
      <tbody>
        {inputdata.WaiverCoverages?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="Coverage"
                name="Coverage"
                value={value.Coverage}
                onChange={(e) =>
                  fieldChangeHandler(index, "Coverage", e.target.value)
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
                  {index === inputdata.WaiverCoverages.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            WaiverCoverages: [
                              ...inputdata.WaiverCoverages,
                              {
                                term: "",
                                rate: 0,
                                seqNo: 0,
                                glSign: "+",
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
  );
});

export default Q0020;
