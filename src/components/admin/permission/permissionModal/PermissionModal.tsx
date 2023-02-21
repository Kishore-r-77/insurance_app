import { MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { PermissionModalType } from "../../../../reducerUtilities/types/admin/permissionTypes";
import { useAppSelector } from "../../../../redux/app/hooks";
import CustomModal from "../../../../utilities/modal/CustomModal";
import { getApi } from "../../companies/companiesApis/companiesApis";
import UserGroup from "../../usergroup/UserGroup";
import Users from "../../users/Users";
import styles from "./permissionModal.module.css";

function PermissionModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
}: PermissionModalType) {
  //Modal Titles
  const addTitle = "Permission Add";
  const editTitle = "Permission Edit";
  const infoTitle = "Permission Info";

  const [userData, setUserData] = useState({} as any);
  const [userGroupData, setUserGroupData] = useState({} as any);

  const userGroupDataFunc = (item: any) => {
    setUserGroupData(item);
    if (state.addOpen) {
      state.UserGroupID = item.ID;
    } else record.UserGroupID.Int64 = item.ID;
    dispatch({ type: ACTIONS.USERGROUPCLOSE });
  };
  const userDataFunc = (item: any) => {
    setUserData(item);
    if (state.addOpen) {
      state.UserID = item.Id;
    } else record.UserID.Int64 = item.Id;
    dispatch({ type: ACTIONS.USERCLOSE });
  };

  const [userOrGroup, setUserOrGroup] = useState(
    record.UserID?.Valid === "true"
      ? "user"
      : record.UserGroupID?.Valid === "true"
      ? "userGroup"
      : ""
  );

  const [companyData, setCompanyData] = useState<any>({});
  const companyId = useAppSelector(
    (state) => state.users.user.message.CompanyId
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
          state.userOpen
            ? state.userOpen
            : state.userGroupOpen
            ? state.userGroupOpen
            : state.addOpen
            ? state.addOpen
            : state.editOpen
            ? state.editOpen
            : state.infoOpen
        }
        handleClose={
          state.userOpen
            ? () => dispatch({ type: ACTIONS.USERCLOSE })
            : state.userGroupOpen
            ? () => dispatch({ type: ACTIONS.USERGROUPCLOSE })
            : state.addOpen
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
          {state.userOpen ? (
            <Users modalFunc={userDataFunc} />
          ) : state.userGroupOpen ? (
            <UserGroup modalFunc={userGroupDataFunc} />
          ) : (
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
                  id="ModelName"
                  name="ModelName"
                  value={state.addOpen ? state.ModelName : record.ModelName}
                  placeholder="ModelName"
                  label="Model Name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "ModelName",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="Method"
                  name="Method"
                  value={state.addOpen ? state.Method : record.Method}
                  placeholder="Model Name"
                  label="Method"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "Method",
                    })
                  }
                  fullWidth
                  inputProps={{ readOnly: state.infoOpen }}
                  margin="dense"
                />
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  id="TransCode"
                  name="TransCode"
                  value={state.addOpen ? state.TransCode : record.TransCode}
                  placeholder="Trans Code"
                  label="TransCode"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    dispatch({
                      type: state.addOpen
                        ? ACTIONS.ONCHANGE
                        : ACTIONS.EDITCHANGE,
                      payload: e.target.value,
                      fieldName: "TransCode",
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
                  label="User (or) UserGroup"
                  id="userOrGroup"
                  value={userOrGroup}
                  placeholder="User (or) UserGroup"
                  name="userOrGroup"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setUserOrGroup(e.target.value);
                    dispatch({
                      type: ACTIONS.ONCHANGE,
                      payload: e.target.value,
                      fieldName: "userOrGroup",
                    });
                  }}
                  fullWidth
                  variant="outlined"
                  margin="dense"
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="userGroup">UserGroup</MenuItem>
                </TextField>
              </Grid2>
              {userOrGroup === "user" ? (
                <>
                  <Grid2 xs={8} md={6} lg={4}>
                    <TextField
                      disabled
                      onClick={() => dispatch({ type: ACTIONS.USEROPEN })}
                      label="User ID"
                      className="formtext"
                      id="UserID"
                      value={
                        state.addOpen ? userData?.Id : record.UserID?.Int64
                      }
                      placeholder="User ID"
                      name="UserID"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        dispatch({
                          type: state.addOpen
                            ? ACTIONS.ONCHANGE
                            : ACTIONS.EDITCHANGE,
                          payload: e.target.value,
                          fieldName: "UserID",
                        })
                      }
                      fullWidth
                      variant="outlined"
                      margin="dense"
                    />
                  </Grid2>
                </>
              ) : null}

              {userOrGroup === "userGroup" ? (
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    disabled
                    onClick={() => dispatch({ type: ACTIONS.USERGROUPOPEN })}
                    label="User Group ID"
                    className="formtext"
                    id="UserGroupID"
                    value={
                      state.addOpen
                        ? userGroupData.ID
                        : record.UserGroupID?.Int64
                    }
                    placeholder="User Group ID"
                    name="UserGroupID"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "UserGroupID",
                      })
                    }
                    fullWidth
                    variant="outlined"
                    margin="dense"
                  />
                </Grid2>
              ) : null}
            </Grid2>
          )}
        </form>
      </CustomModal>
    </div>
  );
}

export default PermissionModal;
