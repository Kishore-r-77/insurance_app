import { FormControl, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function BenefitModal({
  open,
  handleClose,
  ACTIONS,
  state,
  companyData,
  dispatch,
  record,
}: any) {
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 xs={8} md={6} lg={4}>
          <TextField
            disabled
            id="CompanyID"
            name="CompanyID"
            value={companyData?.CompanyName}
            placeholder="Company"
            label="Company"
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            //   dispatch({
            //     type: state.addOpen
            //       ? ACTIONS.ONCHANGE
            //       : ACTIONS.EDITCHANGE,
            //     payload: e.target.value,
            //     fieldName: "CompanyID",
            //   })
            // }
            fullWidth
            inputProps={{ readOnly: state.infoOpen }}
            margin="dense"
          />
        </Grid2>
        <Grid2 xs={8} md={6} lg={4}>
          <TextField
            id="BTerm"
            name="BTerm"
            value={state.BTerm}
            placeholder="BTerm"
            label="BTerm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                payload: e.target.value,
                fieldName: "BTerm",
              })
            }
            fullWidth
            inputProps={{ readOnly: state.infoOpen }}
            margin="dense"
          />
        </Grid2>
        <Grid2 xs={8} md={6} lg={4}>
          <TextField
            id="BPTerm"
            name="BPTerm"
            value={state.BPTerm}
            placeholder="BPTerm"
            label="BPTerm"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                payload: e.target.value,
                fieldName: "BPTerm",
              })
            }
            fullWidth
            inputProps={{ readOnly: state.infoOpen }}
            margin="dense"
          />
        </Grid2>
        <Grid2 xs={8} md={6} lg={4}>
          <TextField
            id="BCoverage"
            name="BCoverage"
            value={state.BCoverage}
            placeholder="BCoverage"
            label="BCoverage"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                payload: e.target.value,
                fieldName: "BCoverage",
              })
            }
            fullWidth
            inputProps={{ readOnly: state.infoOpen }}
            margin="dense"
          />
        </Grid2>
        <Grid2 xs={8} md={6} lg={4}>
          <TextField
            id="BSumAssured"
            name="BSumAssured"
            value={state.BSumAssured}
            placeholder="BSumAssured"
            label="BSumAssured"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                payload: e.target.value,
                fieldName: "BSumAssured",
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
                label="Start Date"
                inputFormat="DD/MM/YYYY"
                value={state.addOpen ? state.BStartDate : record.BStartDate}
                onChange={(date: React.ChangeEvent<HTMLInputElement> | any) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: date.$d,
                    fieldName: "BStartDate",
                  })
                }
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </FormControl>
        </Grid2>

        <Grid2 xs={8} md={6} lg={4}>
          <TextField
            disabled
            onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
            id="ClientID"
            name="ClientID"
            value={state.addOpen ? state.ClientID : record.ClientID}
            placeholder="Owner Id"
            label="Owner Id"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                payload: e.target.value,
                fieldName: "ClientID",
              })
            }
            fullWidth
            inputProps={{ readOnly: state.infoOpen }}
            margin="dense"
          />
        </Grid2>
        <Grid2 xs={8} md={6} lg={4}>
          <TextField
            disabled
            onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
            id="PolicyID"
            name="PolicyID"
            value={state.addOpen ? state.PolicyID : record.PolicyID}
            placeholder="Owner Id"
            label="Owner Id"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                payload: e.target.value,
                fieldName: "PolicyID",
              })
            }
            fullWidth
            inputProps={{ readOnly: state.infoOpen }}
            margin="dense"
          />
        </Grid2>
      </Grid2>
    </div>
  );
}

export default BenefitModal;
