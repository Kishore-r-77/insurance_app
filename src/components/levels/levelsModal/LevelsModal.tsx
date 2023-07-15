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
import CustomModal from "../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../redux/app/hooks";

import { getApi } from "../../admin/companies/companiesApis/companiesApis";

import styles from "./levelsModal.module.css";

//Attention: Check the path below
import { LevelsModalType } from "../../../reducerUtilities/types/levels/levelsTypes";
import { paramItem } from "../levelsApis/levelsApis";
// *** Attention: Check the path and change it if required ***
//import Levels from "../../../levels/Levels";
function LevelsModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: LevelsModalType) {
  const addTitle: string = "Levels Add";
  const editTitle: string = "Levels Edit";
  const infoTitle: string = "Levels Info";
  const size: string = "xl";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );
  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };

  const [longNameData, setLongNameData] = useState([]);
  const getLongName = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setLongNameData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  // const [levelData, setLevelIDData] = useState<any>({});
  // const getLevelIDData = (id: number) => {
  //   getApi(id).then((resp) => {
  //     setLevelIDData(resp.data["LevelID"]);
  //   });
  // };

  useEffect(() => {
    getCompanyData(companyId);
    getLongName(companyId, "P0018", languageId);
    //getLevelIDData(levelId);

    return () => {};
  }, []);

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const levelsOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.LevelID = item.ID;
    } else record.LevelID = item.ID;
    dispatch({ type: ACTIONS.LEVELSCLOSE });
  };

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
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="ShortCode"
                name="ShortCode"
                value={state.addOpen ? state.ShortCode : record.ShortCode}
                placeholder="Short code"
                label="Short code"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "ShortCode",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                select
                id="LongName"
                name="LongName"
                value={state.addOpen ? state.LongName : record.LongName}
                placeholder="Office"
                label="Office"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "LongName",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              >
                {longNameData.map((val: any) => (
                  <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                ))}
              </TextField>
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                id="LevelCode"
                name="LevelCode"
                value={state.addOpen ? state.LevelCode : record.LevelCode}
                placeholder="Parent Code"
                label="Parent Code"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "LevelCode",
                  })
                }
                fullWidth
                inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
              />
            </Grid2>
            <Grid2 xs={8} md={6} lg={4}>
              <TextField
                InputProps={{ readOnly: true }}
                id="LevelID"
                name="LevelID"
                placeholder="Parent Level ID"
                label="Parent Level ID"
                onClick={() => dispatch({ type: ACTIONS.LEVELSOPEN })}
                value={state.addOpen ? state.LevelID : record.LevelID}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: state.addOpen ? ACTIONS.ONCHANGE : ACTIONS.EDITCHANGE,
                    payload: e.target.value,
                    fieldName: "LevelID",
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
export default LevelsModal;
