import React, { forwardRef, useImperativeHandle, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import "./p0027.css";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
const P0027 = forwardRef((props: any, ref) => {
  const [inputdata, setInputdata] = useState(props.data ? props.data : {});

  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.glMovements = retData.glMovements.filter(
        (value: any) => value.accountCode !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        glMovements: inputdata.glMovements.filter(
          (value: any) => value.accountCode !== ""
        ),
      }));

      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      glMovements: inputdata.glMovements.filter(
        (_: any, ind: number) => ind !== index
      ),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      glMovements: inputdata.glMovements.map((val: any, ind: number) => {
        if (index === ind) {
          val[fieldname] = value;
          return val;
        } else {
          return val;
        }
      }),
    }));
  };

  return (
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
          <th>Account Code</th>

          <th>Account Amount</th>

          <th>Seq Number</th>

          <th>GL Sign</th>

          {(props.mode === "update" || props.mode === "create") &&
            inputdata.glMovements?.length > 0 && <th>Actions</th>}
          {(props.mode === "update" || props.mode === "create") &&
            (!inputdata.glMovements || inputdata.glMovements?.length === 0) && (
              <th>
                <CustomTooltip text="Add">
                  <AddBoxIcon
                    onClick={() => {
                      setInputdata((inputdata: any) => ({
                        ...inputdata,
                        glMovements: [
                          {
                            accountCode: "",
                            accountAmt: 0,
                            seqNo: 0,
                            glSign: "+",
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
        {inputdata.glMovements?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="Accountcode"
                name="Accountcode"
                value={value.accountCode}
                onChange={(e) =>
                  fieldChangeHandler(index, "accountCode", e.target.value)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              />
            </td>
            <td>
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="AccountAmount"
                name="AccountAmount"
                value={value.accountAmt}
                onChange={(e) =>
                  fieldChangeHandler(index, "accountAmt", e.target.value)
                }
                fullWidth
                size="small"
                type="number"
                margin="dense"
              />
            </td>
            <td>
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="seqNo"
                name="seqNo"
                size="small"
                value={value.seqNo}
                onChange={(e) =>
                  fieldChangeHandler(index, "seqNo", e.target.value)
                }
                fullWidth
                type="number"
                margin="dense"
              />
            </td>

            <td>
              <TextField
                select
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="glSign"
                name="glSign"
                value={value.glSign}
                onChange={(e) =>
                  fieldChangeHandler(index, "glSign", e.target.value)
                }
                fullWidth
                size="small"
                type="text"
                margin="dense"
              >
                <MenuItem value="+">+</MenuItem>
                <MenuItem value="-">-</MenuItem>
              </TextField>
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
                  {index === inputdata.glMovements.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            glMovements: [
                              ...inputdata.glMovements,
                              {
                                accountCode: "",
                                accountAmt: 0,
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

export default P0027;
