import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import styles from "./companiesModal.module.css";

import { CompaniesModalType } from "../../../../reducerUtilities/types/admin/companies/companiesTypes";
import CustomModal from "../../../../utilities/modal/CustomModal";

function CompaniesModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: CompaniesModalType) {
  const addTitle: string = "Company Add";
  const editTitle: string = "Company Edit";
  const infoTitle: string = "Company Info";
  const size: string = "xl";

  return (
    <div className={styles.modal}>
      <CustomModal
        open={
          state.addOpen
            ? state.addOpen
            : state.editOpen
            ? state.editOpen
            : state.infoOpen
        }
        size={size}
        handleClose={
          state.addOpen
            ? () => dispatch({ type: ACTIONS.ADDCLOSE })
            : state.editOpen
            ? () => dispatch({ type: ACTIONS.EDITCLOSE })
            : () => dispatch({ type: ACTIONS.INFOCLOSE })
        }
        title={
          state.addOpen
            ? addTitle
            : state.editOpen
            ? editTitle
            : state.infoOpen
            ? infoTitle
            : null
        }
        ACTIONS={ACTIONS}
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
          <Grid2 container spacing={2}>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyName"
                name="CompanyName"
                value={state.addOpen ? state.CompanyName : record.CompanyName}
                placeholder="Company Name"
                label="Company Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyName",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyAddress1"
                name="CompanyAddress1"
                value={
                  state.addOpen ? state.CompanyAddress1 : record.CompanyAddress1
                }
                placeholder="Company Address 1"
                label="Company Address 1"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyAddress1",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyAddress2"
                name="CompanyAddress2"
                value={
                  state.addOpen ? state.CompanyAddress2 : record.CompanyAddress2
                }
                placeholder="Company Address 2"
                label="Company Address 2"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyAddress2",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyAddress3"
                name="CompanyAddress3"
                value={
                  state.addOpen ? state.CompanyAddress3 : record.CompanyAddress3
                }
                placeholder="Company Address 3"
                label="Company Address 3"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyAddress3",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyAddress4"
                name="CompanyAddress4"
                value={
                  state.addOpen ? state.CompanyAddress4 : record.CompanyAddress4
                }
                placeholder="Company Address 4"
                label="Company Address 4"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyAddress4",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyAddress5"
                name="CompanyAddress5"
                value={
                  state.addOpen ? state.CompanyAddress5 : record.CompanyAddress5
                }
                placeholder="Company Address 5"
                label="Company Address 5"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyAddress5",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyPostalCode"
                name="CompanyPostalCode"
                value={
                  state.addOpen
                    ? state.CompanyPostalCode
                    : record.CompanyPostalCode
                }
                placeholder="Company Postal Code"
                label="Company Postal Code"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyPostalCode",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyCountry"
                name="CompanyCountry"
                value={
                  state.addOpen ? state.CompanyCountry : record.CompanyCountry
                }
                placeholder="Company Country"
                label="Company Country"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyCountry",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyUid"
                name="CompanyUid"
                value={state.addOpen ? state.CompanyUid : record.CompanyUid}
                placeholder="Company Uid"
                label="Company Uid"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyUid",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyGst"
                name="CompanyGst"
                value={state.addOpen ? state.CompanyGst : record.CompanyGst}
                placeholder="Company Gst"
                label="Company Gst"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyGst",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyPan"
                name="CompanyPan"
                value={state.addOpen ? state.CompanyPan : record.CompanyPan}
                placeholder="Company Pan"
                label="Company Pan"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyPan",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyTan"
                name="CompanyTan"
                value={state.addOpen ? state.CompanyTan : record.CompanyTan}
                placeholder="Company Tan"
                label="Company Tan"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyTan",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="CompanyStatusID"
                name="CompanyStatusID"
                value={
                  state.addOpen ? state.CompanyStatusID : record.CompanyStatusID
                }
                placeholder="Company Status Id"
                label="Company Status Id"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "CompanyStatusID",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly={state.infoOpen}
                    label="Company Incorporation Date"
                    inputFormat="DD/MM/YYYY"
                    value={
                      state.addOpen
                        ? state.CompanyIncorporationDate
                        : record.CompanyIncorporationDate
                    }
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date.$d,
                        fieldName: "CompanyIncorporationDate",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>

            <Grid2 xs={8} md={6} lg={4}>
              <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    readOnly={state.infoOpen}
                    label="Company Termination Date"
                    inputFormat="DD/MM/YYYY"
                    value={
                      state.addOpen
                        ? state.CompanyTerminationDate
                        : record.CompanyTerminationDate
                    }
                    onChange={(
                      date: React.ChangeEvent<HTMLInputElement> | any
                    ) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: date.$d,
                        fieldName: "CompanyTerminationDate",
                      })
                    }
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </FormControl>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <div className="col" style={{ marginLeft: 23 }}>
                <label>
                  {" "}
                  <h5> Company Logo </h5>{" "}
                </label>
                <br /> <br />
                <input
                  type="file"
                  onChange={(e: any) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.files[0],
                      fieldName: "CompanyLogo",
                    })
                  }
                />
              </div>
            </Grid2>
            {!state.addOpen && (
              <Grid2 xs={8} md={6} lg={4}>
                <img
                  style={{
                    height: "5rem",
                    width: "5rem",
                    marginLeft: "1rem",
                  }}
                  src={record.CompanyLogo}
                ></img>
              </Grid2>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}

export default CompaniesModal;
