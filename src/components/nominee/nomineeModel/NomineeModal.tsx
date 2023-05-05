import {
  FormControl,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
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
      },
    ]);
  };

  const handleNomineeRemove = (index: number) => {
    const list = [...nomineesData];
    list.splice(index, 1);
    setNomineesData(list);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const { name, value } = e.target;
    setNomineesData(
      nomineesData.map((nominee, index) => {
        if (index === i) {
          return { ...nominee, [name]: value };
        } else return nominee;
      })
    );
  };

  // *** Attention: Check the Lookup table  OPenFunc details below ***
  const policyOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.PolicyID = item.ID;
    } else record.PolicyID = item.ID;
    dispatch({ type: ACTIONS.POLICYCLOSE });
  };

  const clientOpenFunc = (item: any) => {
    if (state.addOpen) {
      state.ClientID = item.ID;
    } else record.ClientID = item.ID;
    dispatch({ type: ACTIONS.CLIENTCLOSE });
  };

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
          <Grid2 container spacing={2}>
            {state.policyOpen ? (
              <Policy modalFunc={policyOpenFunc} />
            ) : state.clientOpen ? (
              <Client modalFunc={clientOpenFunc} />
            ) : (
              <>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="CompanyID"
                    name="CompanyID"
                    value={companyData?.CompanyName}
                    placeholder="Company ID"
                    label="Company ID"
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
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
                    InputProps={{ readOnly: true }}
                    id="ClientID"
                    name="ClientID"
                    placeholder="Client ID"
                    label="Client ID"
                    // Attention: *** Check the value details  ***
                    onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
                    value={state.addOpen ? state.ClientID : record.ClientID}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
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
                    select
                    id="NomineeRelationship"
                    name="NomineeRelationship"
                    value={
                      state.addOpen
                        ? state.NomineeRelationship
                        : record.NomineeRelationship
                    }
                    placeholder="Nominee Relationship"
                    label="Nominee Relationship"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "NomineeRelationship",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  >
                    {nomineeRelationshipData.map((val: any) => (
                      <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    id="NomineeLongName"
                    name="NomineeLongName"
                    value={
                      state.addOpen
                        ? state.NomineeLongName
                        : record.NomineeLongName
                    }
                    placeholder="Nominee Full Name"
                    label="Nominee Full Name"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "NomineeLongName",
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
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="NomineePercentage"
                    name="NomineePercentage"
                    value={
                      state.addOpen
                        ? state.NomineePercentage
                        : record.NomineePercentage
                    }
                    placeholder="Percentage"
                    label="Percentage"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: state.addOpen
                          ? ACTIONS.ONCHANGE
                          : ACTIONS.EDITCHANGE,
                        payload: e.target.value,
                        fieldName: "NomineePercentage",
                      })
                    }
                    fullWidth
                    inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
              </>
            )}
          </Grid2>
        </form>
      </CustomModal>
    </div>
  );
}
export default NomineeModal;
