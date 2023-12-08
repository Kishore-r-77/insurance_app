import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

import React, { useEffect, useState } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useAppSelector } from "../../../redux/app/hooks";

import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import { addApi } from "../nomineeApi/nomineeApi";
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
import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import axios from "axios";
import CustomNomineeModal from "./CustomNomineeModal";

function NomineeModal({
  open,
  handleClose,
  policyId,
  data,
  clientOpen,
  clientClose,
  nomineeClient,
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

  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [selecteNomineeIndex, setselecteNomineeIndex] = useState<any>("");

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

  const [nomineesData, setNomineesData] = useState([
    {
      PolicyID: 0,
      ClientID: 0,
      NomineeRelationship: "",
      NomineeLongName: "",
      NomineePercentage: 0,
      Gender: "",
      ClientShortName: "",
    },
  ]);

  const handleNomineesAdd = () => {
    setNomineesData([
      ...nomineesData,
      {
        PolicyID: 0,
        ClientID: 0,
        NomineeRelationship: "",
        NomineeLongName: "",
        NomineePercentage: 0,
        Gender: "",
        ClientShortName: "",
      },
    ]);
  };

  const handleNomineeRemove = (index: number) => {
    const list = [...nomineesData];
    list.splice(index, 1);
    setNomineesData(list);
  };

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
  console.log(nomineesData, "nomineesDataaa");

  const [nomineeClientId, setnomineeClientId] = useState<any>({
    "0": "",
  });
  const handleNomineeClientIdUpdate = (index: number) => {
    setselecteNomineeIndex(index.toString());
    nomineeClient();
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
            ClientShortName: newNomineeClientData?.ClientShortName,
          };
        } else return nominees;
      })
    );
    clientClose();
    setNomineesData((prev) => [...prev]);
  };

  const [allNomineeData, setAllNomineeData] = useState<any>();
  const getAllNominees = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/deathservices/nomineesbypol/${policyId}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setAllNomineeData(resp.data?.Nominees);
      });
  };
  useEffect(() => {
    getAllNominees();
    return () => {};
  }, [open]);

  const [newNomineeClientData, setNewNomineeClientData] = useState<any>([]);
  const getNewNomineeClient = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/clientget/${nomineeClientId[selecteNomineeIndex]}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setNewNomineeClientData(resp.data["Client"]);
      });
  };

  console.log(newNomineeClientData, "newNomineeclientData");
  const [policyData, setPolicyData] = useState<any>([]);
  const getPolicy = () => {
    axios
      .get(`http://localhost:3000/api/v1/nbservices/policyget/${policyId}`, {
        withCredentials: true,
      })
      .then((resp) => {
        setPolicyData(resp.data["Policy"]);
      });
  };

  const [clientData, setClientData] = useState<any>([]);
  const getClients = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/clientget/${policyData?.ClientID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setClientData(resp.data["Client"]);
      });
  };
  useEffect(() => {
    getPolicy();
    getAllNominees();
    setAllNomineeData("");
    setNewNomineeClientData("");
    setNomineesData([
      {
        PolicyID: 0,
        ClientID: 0,
        NomineeRelationship: "",
        NomineeLongName: "",
        NomineePercentage: 0,
        Gender: "",
        ClientShortName: "",
      },
    ]);
    return () => {};
  }, [open === true]);

  useEffect(() => {
    getNewNomineeClient();
    return () => {};
  }, [clientClose]);

  useEffect(() => {
    setnomineeClientId({
      "0": "",
    });
    setNomineesData([
      {
        PolicyID: 0,
        ClientID: 0,
        NomineeRelationship: "",
        NomineeLongName: "",
        NomineePercentage: 0,
        Gender: "",
        ClientShortName: "",
      },
    ]);
    setNewNomineeClientData("");

    return () => {};
  }, [open === false]);

  useEffect(() => {
    getClients();

    return () => {};
  }, [policyData]);

  // useEffect(() => {
  //   nomineesData[selecteNomineeIndex].ClientShortName =
  //     newNomineeClientData?.ClientShortName;

  //   return () => {};
  // }, [handleNomineeClientIdUpdate]);

  const handleFormSubmit = () => {
    return addApi(open, companyId, policyId, nomineesData)
      .then((resp) => {
        handleClose();
        setNotify({
          isOpen: true,
          message: `Created:${resp.data?.Created}`,
          type: "success",
        });
      })
      .catch((err) => {
        setNotify({
          isOpen: true,
          message: err?.response?.data?.error,
          type: "error",
        });
      });
  };

  // *** Attention: Check the Lookup table  OPenFunc details below ***

  return (
    <div className={styles.modal}>
      <CustomNomineeModal
        size={size}
        open={open}
        handleClose={handleClose}
        handleFormSubmit={() => handleFormSubmit()}
      >
        <form>
          <TreeView
            style={{ width: "100%", margin: "0px auto" }}
            aria-label="file system navigator"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            defaultExpanded={["1", "2", "3"]}
          >
            <TreeItem nodeId="1" label={`Policies Details`}>
              <Grid2
                container
                spacing={2}
                style={{ width: "95%", margin: "0px auto" }}
              >
                <Grid2 xs={6} md={4} lg={2}>
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
                <Grid2 xs={6} md={4} lg={2}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="PolicyID"
                    name="PolicyID"
                    value={policyId}
                    placeholder="Policy ID"
                    label="Policy ID"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
                <Grid2 xs={6} md={4} lg={2}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="Policy OwnerName"
                    name="Policy OwnerName"
                    value={clientData?.ClientShortName}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Policy OwnerName"
                    label="Policy OwnerName"
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              </Grid2>
            </TreeItem>

            <div style={{ display: "flex" }}>
              {allNomineeData != "" ? (
                <TreeItem
                  nodeId="2"
                  label={open ? `Existing Nominee` : `Existing Nominee`}
                  style={{ minWidth: "95%", margin: "0px 1rem" }}
                >
                  {allNomineeData?.map((nominee: any, index: number) => {
                    return (
                      <>
                        <Grid2 container spacing={2}>
                          <Grid2 xs={6} md={4} lg={2}>
                            <TextField
                              InputProps={{ readOnly: true }}
                              id="ClientID"
                              name="ClientID"
                              InputLabelProps={{ shrink: true }}
                              value={nominee?.ClientID}
                              placeholder="client_id"
                              label="client_id"
                              fullWidth
                              margin="dense"
                            />
                          </Grid2>
                          <Grid2 xs={6} md={4} lg={2}>
                            <TextField
                              InputProps={{ readOnly: true }}
                              id="ShortName"
                              name="ShortName"
                              InputLabelProps={{ shrink: true }}
                              value={nominee?.ShortName}
                              placeholder="Client ShortName"
                              label="Client ShortName"
                              fullWidth
                              margin="dense"
                            />
                          </Grid2>
                          <Grid2 xs={6} md={4} lg={2}>
                            <TextField
                              InputProps={{ readOnly: true }}
                              id="ClientName"
                              name="ClientName"
                              InputLabelProps={{ shrink: true }}
                              value={nominee?.NomineeLongName}
                              placeholder="Client Name"
                              label="Client Name"
                              fullWidth
                              margin="dense"
                            />
                          </Grid2>
                          <Grid2 xs={6} md={4} lg={2}>
                            <TextField
                              InputProps={{ readOnly: true }}
                              id="Gender"
                              name="Gender"
                              InputLabelProps={{ shrink: true }}
                              value={nominee?.Gender}
                              placeholder="Gender"
                              label="Gender"
                              fullWidth
                              margin="dense"
                            />
                          </Grid2>
                          <Grid2 xs={6} md={4} lg={2}>
                            <TextField
                              select
                              id="NomineeRelationship"
                              name="NomineeRelationship"
                              value={nominee?.NomineeRelationship}
                              placeholder="Nominee Relationship"
                              label="Nominee Relationship"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(e, index)}
                              fullWidth
                              inputProps={{ readOnly: true }}
                              margin="dense"
                            >
                              {nomineeRelationshipData.map((val: any) => (
                                <MenuItem key={val.item} value={val.item}>
                                  {val.shortdesc}
                                </MenuItem>
                              ))}
                            </TextField>
                          </Grid2>
                          <Grid2 xs={6} md={4} lg={2}>
                            <TextField
                              type="number"
                              id="NomineePercentage"
                              name="NomineePercentage"
                              value={nominee.NomineePercentage}
                              placeholder="Percentage"
                              label="Percentage"
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => handleChange(e, index)}
                              fullWidth
                              inputProps={{ readOnly: true }}
                              margin="dense"
                            />
                          </Grid2>
                          {/* {nomineesData?.length - 1 === index &&
                          nomineesData?.length < 100 && (
                            <IconButton onClick={handleNomineesAdd}>
                              <AddCircleIcon color="success" />
                            </IconButton>
                          )}
                        {nomineesData?.length !== 1 && (
                          <IconButton
                            onClick={() => handleNomineeRemove(index)}
                          >
                            <RemoveCircleIcon color="error" />
                          </IconButton>
                        )} */}
                        </Grid2>
                      </>
                    );
                  })}
                </TreeItem>
              ) : null}
            </div>
            <div style={{ display: "flex" }}>
              <TreeItem
                nodeId="3"
                label={open ? `Nominee Add` : `Nominee Edit`}
                style={{ minWidth: "95%", margin: "0px 1rem" }}
              >
                {nomineesData?.map((nominees: any, index: number) => {
                  return (
                    <>
                      {clientOpen ? (
                        <CustomModal
                          size={size}
                          open={nomineeClient}
                          handleClose={clientClose}
                        >
                          <Client modalFunc={nomineeClientOpenFunc} />
                        </CustomModal>
                      ) : null}
                      <Grid2 container spacing={2}>
                        <Grid2 xs={6.2} md={4.2} lg={2.2}>
                          <TextField
                            id="ClientID"
                            name="ClientID"
                            InputLabelProps={{ shrink: true }}
                            value={nomineeClientId[index]}
                            onClick={() => handleNomineeClientIdUpdate(index)}
                            placeholder="client_id"
                            label="client_id"
                            fullWidth
                            margin="dense"
                          />
                        </Grid2>
                        <Grid2 xs={6.2} md={4.2} lg={2.2}>
                          <TextField
                            InputProps={{ readOnly: true }}
                            id="ClientShortName"
                            name="ClientShortName"
                            InputLabelProps={{ shrink: true }}
                            value={nominees.ClientShortName}
                            placeholder="Client Name"
                            label="Client Name"
                            fullWidth
                            margin="dense"
                          />
                        </Grid2>
                        <Grid2 xs={6.2} md={4.2} lg={2.2}>
                          <TextField
                            InputProps={{ readOnly: true }}
                            id="Gender"
                            name="Gender"
                            InputLabelProps={{ shrink: true }}
                            value={nominees.Gender}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            placeholder="Gender"
                            label="Gender"
                            fullWidth
                            margin="dense"
                          />
                        </Grid2>
                        <Grid2 xs={6.2} md={4.2} lg={2.2}>
                          <TextField
                            select
                            id="NomineeRelationship"
                            name="NomineeRelationship"
                            value={nominees.NomineeRelationship}
                            placeholder="Nominee Relationship"
                            label="Nominee Relationship"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          >
                            {nomineeRelationshipData.map((val: any) => (
                              <MenuItem value={val.item}>
                                {val.longdesc}
                              </MenuItem>
                            ))}
                          </TextField>
                        </Grid2>
                        <Grid2 xs={6.2} md={4.2} lg={2.2}>
                          <TextField
                            type="number"
                            id="NomineePercentage"
                            name="NomineePercentage"
                            value={nominees.NomineePercentage}
                            placeholder="Percentage"
                            label="Percentage"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleChange(e, index)}
                            fullWidth
                            margin="dense"
                          />
                        </Grid2>
                        {nomineesData?.length - 1 === index &&
                          nomineesData?.length < 100 && (
                            <IconButton onClick={handleNomineesAdd}>
                              <AddCircleIcon color="success" />
                            </IconButton>
                          )}
                        {nomineesData?.length !== 1 && (
                          <IconButton
                            onClick={() => handleNomineeRemove(index)}
                          >
                            <RemoveCircleIcon color="error" />
                          </IconButton>
                        )}
                      </Grid2>
                    </>
                  );
                })}
              </TreeItem>
            </div>
          </TreeView>
        </form>
      </CustomNomineeModal>
    </div>
  );
}
export default NomineeModal;
