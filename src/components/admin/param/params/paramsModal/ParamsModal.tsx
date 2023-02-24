import { TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import styles from "./paramssModal.module.css";

import CustomModal from "../../../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../../../redux/app/hooks";
import { getApi } from "../../../companies/companiesApis/companiesApis";
import { ParamsModalType } from "../../../../../reducerUtilities/types/admin/parameterTypes";

function ParamsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: ParamsModalType) {
  const addTitle: string = "Params Add";
  const editTitle: string = "Params Edit";
  const infoTitle: string = "Params Info";

  const [companyData, setCompanyData] = useState<any>({});
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
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
                disabled
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
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                id="languageId"
                name="languageId"
                value={state.addOpen ? state.languageId : record.languageId}
                placeholder="Language Id"
                label="Language Id"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "languageId",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                type="number"
                id="longdesc"
                name="longdesc"
                value={state.addOpen ? state.longdesc : record.longdesc}
                placeholder="Long Desc"
                label="Long Desc"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "longdesc",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="name"
                name="name"
                value={state.addOpen ? state.name : record.name}
                placeholder="Name"
                label="Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "name",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="type"
                name="type"
                value={state.addOpen ? state.type : record.type}
                placeholder="Type"
                label="Type"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "type",
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

export default ParamsModal;
