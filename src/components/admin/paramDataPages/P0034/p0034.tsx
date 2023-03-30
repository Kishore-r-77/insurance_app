import React, { forwardRef, useImperativeHandle, useState } from "react";
import { MenuItem, TextField } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteIcon from "@mui/icons-material/Delete";
import Table from "react-bootstrap/Table";
import "./p0034.css";
import CustomTooltip from "../../../../utilities/cutomToolTip/customTooltip";
const P0034 = forwardRef((props: any, ref) => {
  const [inputdata, setInputdata] = useState(props.data ? props.data : {});

  useImperativeHandle(ref, () => ({
    getData() {
      let retData = inputdata;
      retData.letters = retData.letters.filter(
        (value: any) => value.templates !== ""
      );

      setInputdata((inputdata: any) => ({
        ...inputdata,
        letters: inputdata.letters.filter(
          (value: any) => value.templates !== ""
        ),
      }));

      return retData;
    },
  }));

  const deleteItemHandler = (index: Number) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      letters: inputdata.letters.filter((_: any, ind: number) => ind !== index),
    }));
  };

  const fieldChangeHandler = (index: number, fieldname: string, value: any) => {
    setInputdata((inputdata: any) => ({
      ...inputdata,
      letters: inputdata.letters.map((val: any, ind: number) => {
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
      <h1>
        {" "}
        <center>LETTER TEMPLATES </center>
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
          <th>Template Name </th>
          <th>HTML Location</th>
            <th>PDF Location </th>
          {(props.mode === "update" || props.mode === "create") && (
            <>
            


            </>
          )}
        </tr>
      </thead>
      <tbody>
        {inputdata.letters?.map((value: any, index: number) => (
          <tr key={index}>
            <td>
              <TextField
                inputProps={{
                  readOnly: props.mode === "display" || props.mode === "delete",
                }}
                id="templates"
                name="templates"
                value={value.templates}
                onChange={(e) =>
                  fieldChangeHandler(index, "templates", e.target.value)
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
                id="reporttemplatelocation"
                name="reporttemplatelocation"
                value={value.reporttemplatelocation}
                onChange={(e) =>
                  fieldChangeHandler(index, "reporttemplatelocation", e.target.value)
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
                id="pdflocation"
                name="pdflocation"
                value={value.pdflocation}
                onChange={(e) =>
                  fieldChangeHandler(index, "pdflocation", e.target.value)
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
                  {index === inputdata.letters.length - 1 && (
                    <CustomTooltip text="Add">
                      <AddBoxIcon
                        onClick={() => {
                          setInputdata((inputdata: any) => ({
                            ...inputdata,
                            letters: [
                              ...inputdata.letters,
                              {
                                templates: "",
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

export default P0034;

