import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import React, { useEffect, useState } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../redux/app/hooks";

import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import styles from "./NomineeModel.module.css";
import { NomineeModalType } from "../../../reducerUtilities/types/nominee/nomineeType";
import { paramItem } from "../nomineeApi/nomineeApi";
import Policy from "../../policy/Policy";
import Client from "../../clientDetails/client/Client";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, FormControl, MenuItem, TextField } from "@mui/material";

//Attention: Check the path below
//import { NomineeModalType } from "../../../../reducerUtilities/types/nominee/nomineeTypes";
//import { paramItem } from "../nomineeApis/nomineeApis";
// *** Attention: Check the path and change it if required ***
//import Policy from "../../../policy/Policy";
//import Client from "../../../client/Client";
function NomineeModal({
  state,
  record,
  dispatch,
  ACTIONS,
  handleFormSubmit,
  policyRecord,
  nomineesData,
  setNomineesData,
}: any) {
  const addTitle: string = "Nominee Add";
  const editTitle: string = "Nominee Edit";
  const infoTitle: string = "Nominee Info";

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

  // const [policyData, setpolicyData] = useState<any>({});
  // const getpolicyData = (id: number) => {
  //   getApi(id).then((resp) => {
  //     setpolicyData(resp.data["Policy"]);
  //   });
  // };
  const [selecteNomineeIndex, setselecteNomineeIndex] = useState("");

  const [nomineeRelationshipData, setNomineeRelationshipData] = useState([]);
  const getNomineeRelationship = (
    companyId: number,
    name: string,
    languageId: number
  ) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setNomineeRelationshipData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getCompanyData(companyId);
    getNomineeRelationship(companyId, "P0045", languageId);
    // getpolicyData(ID)

    return () => {};
  }, []);

  // const [nomineesData, setNomineesData] = useState([
  //   {
  //     PolicyID: 0,
  //     ClientID: 0,
  //     NomineeRelationship: "",
  //     NomineeLongName: "",
  //     NomineePercentage: 0,
  //   },
  // ]);

  const handleNomineesAdd = () => {
    setNomineesData([
      ...nomineesData,
      {
        PolicyID: 0,
        ClientID: 0,
        NomineeRelationship: "",
        NomineeLongName: "",
        NomineePercentage: 0,
      },
    ]);
  };

  const handleNomineeRemove = (index: number) => {
    const list = [...nomineesData];
    list.splice(index, 1);
    setNomineesData(list);
  };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
  //   const { name, value } = e.target;
  //   setNomineesData(
  //     nomineesData.map((nominee, index) => {
  //       if (index === i) {
  //         return { ...nominee, [name]: value };
  //       } else return nominee;
  //     })
  //   );
  // };

  const [capturedCovg, setcapturedCovg] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    if (name === "NomineeRelationship") {
      setcapturedCovg(value);
    }

    setNomineesData(
      nomineesData?.map((nominees: any, index: number) => {
        if (index === i) {
          return { ...nominees, [name]: value };
        } else return nominees;
      })
    );
  };

  const [nomineeClientId, setnomineeClientId] = useState<any>({
    "0": "",
  });
  const handleNomineeClientIdUpdate = (index: number) => {
    setselecteNomineeIndex(index.toString());
    dispatch({ type: ACTIONS.NOMINEECLIENTOPEN });
  };
  const nomineeClientOpenFunc = (item: any) => {
    setnomineeClientId((prev: any) => {
      // if (prev === 0) {
      //   prev = {};
      //   prev[selecteNomineeIndex] = item.ID;
      //   return prev;
      // }
      prev[selecteNomineeIndex] = item.ID;
      return prev;
    });
    setNomineesData(
      nomineesData?.map((nominees: any, index: number) => {
        if (index === +selecteNomineeIndex) {
          return {
            ...nominees,
            ClientID: nomineeClientId[selecteNomineeIndex],
          };
        } else return nominees;
      })
    );
    dispatch({ type: ACTIONS.NOMINEECLIENTCLOSE });
  };

  useEffect(() => {
    setnomineeClientId({
      "0": "",
    });
    return () => {};
  }, [state.addOpen === false]);

  // *** Attention: Check the Lookup table  OPenFunc details below ***

  return (
    <div className={styles.modal}>
      <CustomModal
        size={size}
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
          <TreeView
            style={{ width: "90%", margin: "0px auto" }}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={[`2`]}
          >
            {nomineesData?.map((nominees: any, index: number) => {
              return (
                <>
                  {state.nomineeClientOpen ? (
                    <CustomModal
                      size={size}
                      open={state.nomineeClientOpen}
                      handleClose={() =>
                        dispatch({ type: ACTIONS.NOMINEECLIENTCLOSE })
                      }
                    >
                      <Client modalFunc={nomineeClientOpenFunc} />
                    </CustomModal>
                  ) : null}
                  <div style={{ display: "flex" }}>
                    <TreeItem
                      // nodeId="1"
                      nodeId={(index + 2).toString()}
                      label={
                        state.addOpen
                          ? `Nominee Add`
                          : state.editOpen
                          ? `Nominee Edit`
                          : `Nominee Info`
                      }
                      style={{ minWidth: "95%", margin: "0px 1rem" }}
                    >
                      <Grid2 container spacing={2}>
                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            InputProps={{ readOnly: true }}
                            id="CompanyID"
                            name="CompanyID"
                            value={companyData?.CompanyName}
                            placeholder="company_id"
                            label="company_id"
                            fullWidth
                            margin="dense"
                          />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            InputProps={{ readOnly: true }}
                            id="PolicyID"
                            name="PolicyID"
                            value={policyRecord?.ID}
                            placeholder="Policy ID"
                            label="Policy ID"
                            fullWidth
                            inputProps={{ readOnly: state.infoOpen }}
                            margin="dense"
                          />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            InputProps={{ readOnly: state.infoOpen }}
                            id="ClientID"
                            name="ClientID"
                            InputLabelProps={{ shrink: true }}
                            value={
                              state.addOpen
                                ? nomineeClientId[index]
                                : record.ClientID
                            }
                            // onClick={() =>
                            //   dispatch({ type: ACTIONS.NOMINEECLIENTOPEN })
                            // }
                            // value={nominees.ClientID}
                            onClick={() => handleNomineeClientIdUpdate(index)}
                            // onChange={(
                            //   e: React.ChangeEvent<HTMLInputElement>
                            // ) => handleChange(e, index)}
                            placeholder="client_id"
                            label="client_id"
                            fullWidth
                            margin="dense"
                          />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            select
                            id="NomineeRelationship"
                            name="NomineeRelationship"
                            value={
                              state.addOpen
                                ? nominees.NomineeRelationship
                                : record.NomineeRelationship
                            }
                            placeholder="Nominee Relationship"
                            label="Nominee Relationship"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            // onChange={(
                            //   e: React.ChangeEvent<HTMLInputElement>
                            // ) =>
                            //   dispatch({
                            //     type: state.addOpen
                            //       ? ACTIONS.ONCHANGE
                            //       : ACTIONS.EDITCHANGE,
                            //     payload: e.target.value,
                            //     fieldName: "NomineeRelationship",
                            //   })
                            // }
                            fullWidth
                            inputProps={{ readOnly: state.infoOpen }}
                            margin="dense"
                          >
                            {nomineeRelationshipData.map((val: any) => (
                              <MenuItem value={val.item}>
                                {val.shortdesc}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                          <TextField
                            type="number"
                            //InputProps={{
                            //startAdornment: (
                            //<InputAdornment position="start">+91</InputAdornment>
                            // ),
                            //}}
                            id="NomineePercentage"
                            name="NomineePercentage"
                            value={
                              state.addOpen
                                ? nominees.NomineePercentage
                                : record.NomineePercentage
                            }
                            placeholder="Percentage"
                            label="Percentage"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            // onChange={(
                            //   e: React.ChangeEvent<HTMLInputElement>
                            // ) =>
                            //   dispatch({
                            //     type: state.addOpen
                            //       ? ACTIONS.ONCHANGE
                            //       : ACTIONS.EDITCHANGE,
                            //     payload: e.target.value,
                            //     fieldName: "NomineePercentage",
                            //   })
                            // }
                            fullWidth
                            inputProps={{ readOnly: state.infoOpen }}
                            margin="dense"
                          />
                        </Grid2>
                      </Grid2>
                    </TreeItem>
                    {state.addOpen ? (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "baseline",
                          gap: "5px",
                        }}
                      >
                        {nomineesData?.length - 1 === index &&
                          nomineesData?.length < 10 && (
                            <Button
                              variant="contained"
                              onClick={() => handleNomineesAdd()}
                              style={{
                                maxWidth: "40px",
                                maxHeight: "40px",
                                minWidth: "40px",
                                minHeight: "40px",
                                backgroundColor: "#0a3161",
                              }}
                            >
                              <AddBoxRoundedIcon />
                            </Button>
                          )}

                        {nomineesData?.length !== 1 && (
                          <Button
                            onClick={() => handleNomineeRemove(index)}
                            variant="contained"
                            style={{
                              maxWidth: "40px",
                              maxHeight: "40px",
                              minWidth: "40px",
                              minHeight: "40px",
                              backgroundColor: "crimson",
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        )}
                      </div>
                    ) : null}
                  </div>
                </>
              );
            })}
          </TreeView>
        </form>
      </CustomModal>
    </div>
  );
}
export default NomineeModal;
