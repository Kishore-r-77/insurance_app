import {
  FormControl,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../../redux/app/hooks";

import { getApi } from "../../companies/companiesApis/companiesApis";

import styles from "./tdfParamModal.module.css";

//Attention: Check the path below
import { TdfParamsModalType } from "../../../../reducerUtilities/types/admin/tdfParam/tdfParamsTypes";

function TdfParamsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  editFormSubmit,
}: TdfParamsModalType) {
  const addTitle: string = "TdfParams Add";
  const editTitle: string = "TdfParams Edit";
  const infoTitle: string = "TdfParams Info";
  const size: string = "x1";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  useEffect(() => {
    getCompanyData(companyId);

    return () => {};
  }, []);

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
        handleFormSubmit={
          state.addOpen
            ? () => handleFormSubmit()
            : state.editOpen
            ? () => editFormSubmit()
            : null
        }
      >
        <form>
          <Grid2
            container
            spacing={4}
            style={{ width: "95%", margin: "0px auto" }}
          >
            <Grid2 xs={10} md={8}>
              <TextField
                InputProps={{ readOnly: true }}
                id="CompanyID"
                name="CompanyID"
                value={companyData?.CompanyName}
                placeholder="Company"
                label="Company"
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6}>
              <TextField
                type="number"
                id="FromPolicy"
                name="FromPolicy"
                value={state.addOpen ? state.FromPolicy : record.FromPolicy}
                placeholder="From Policy"
                label="From Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "FromPolicy",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>

            <Grid2 xs={8} md={6}>
              <TextField
                type="number"
                id="ToPolicy"
                name="ToPolicy"
                value={state.addOpen ? state.ToPolicy : record.ToPolicy}
                placeholder="To Policy"
                label="To Policy"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ToPolicy",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default TdfParamsModal;
