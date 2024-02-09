import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { FormControl, IconButton, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useEffect, useState } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useAppSelector } from "../../../redux/app/hooks";
import { useBusinessDate } from "../../contexts/BusinessDateContext";

function ExtrasAdd({
  open,
  handleClose,
  data,
  benefitsData,
  setbenefitsData,
  benefitIndex,
}: any) {
  const size: string = "xl";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const handleAddExtras = () => {
    setbenefitsData((prev: any) => {
      const updatedData = [...prev];
      updatedData[benefitIndex].Extras.push({
        EReason: "",
        EMethod: "",
        FormData: businessDate,
        ToDate: "",
        ReasonDescription: "",
        EPrem: 0,
        EPercentage: 0,
        EAmt: 0,
        ETerm: 0,
        EAge: 0,
        EMillie: 0,
      });
      return updatedData;
    });
  };

  const handleRemoveExtras = (index: number) => {
    setbenefitsData((prev: any) => {
      const updatedData = [...prev];
      updatedData[benefitIndex].Extras.splice(index, 1); // Remove the item from Extras array
      return updatedData;
    });
  };

  const handleExtrasChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    benefitIndex: number,
    extraIndex: number
  ) => {
    const { name, value } = e.target;

    setbenefitsData((prev: any) => {
      return prev.map((benefit: any, index: number) => {
        if (index === benefitIndex) {
          const updatedExtras = benefit.Extras.map((extra: any, i: number) => {
            if (i === extraIndex) {
              return {
                ...extra,
                [name]: value,
              };
            }
            return extra;
          });
          return {
            ...benefit,
            Extras: updatedExtras,
          };
        }
        return benefit;
      });
    });
  };

  const handleFromDate = (date: any, i: number) => {
    setbenefitsData((prev: any) => {
      return prev.map((benefit: any, index: number) => {
        if (index === benefitIndex) {
          const updatedExtras = benefit.Extras.map(
            (extra: any, extraIndex: number) => {
              if (extraIndex === i) {
                return { ...extra, FromDate: date };
              }
              return extra;
            }
          );
          return {
            ...benefit,
            Extras: updatedExtras,
          };
        }
        return benefit;
      });
    });
  };

  const handleToDate = (date: any, i: number) => {
    setbenefitsData((prev: any) => {
      return prev.map((benefit: any, index: number) => {
        if (index === benefitIndex) {
          const updatedExtras = benefit.Extras.map(
            (extra: any, extraIndex: number) => {
              if (extraIndex === i) {
                return { ...extra, ToDate: date };
              }
              return extra;
            }
          );
          return {
            ...benefit,
            Extras: updatedExtras,
          };
        }
        return benefit;
      });
    });
  };

  const paramItem = (companyId: number, name: string, languageId: number) => {
    return axios.get(`http://localhost:3000/api/v1/basicservices/paramItems`, {
      withCredentials: true,
      params: {
        companyId,
        name,
        languageId,
      },
    });
  };

  const [eReasonData, setEReasonData] = useState([]);
  const getEReason = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setEReasonData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const [eMethodData, setEMethodData] = useState([]);
  const getEMethod = (companyId: number, name: string, languageId: number) => {
    paramItem(companyId, name, languageId)
      .then((resp) => {
        setEMethodData(resp.data.data);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  const p0050 = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    return axios.get(
      `http://localhost:3000/api/v1/basicservices/paramItem?companyId=${companyId}&name=${name}&languageId=${languageId}&item=${item}`,
      {
        withCredentials: true,
        params: {
          companyId,
          name,
          languageId,
          item,
        },
      }
    );
  };

  const [eMortalityData, setEMortalityData] = useState([]);
  const getEMortality = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setEMortalityData(resp.data.param.data.dataPairs);
        return resp.data.data;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getEMethod(companyId, "P0025", languageId);
    getEReason(companyId, "P0026", languageId);
    getEMortality(companyId, "P0050", languageId, "UWEMR");
    return () => {};
  }, []);

  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();

  useEffect(() => {
    getBusinessDate();
    return () => {};
  }, [open === true]);

  return (
    <CustomModal
      open={open}
      isBackground={true}
      size={size}
      saveButton="Capture"
      closeButton="Cancel"
      handleClose={() => handleClose({ operation: "cancel" })}
      title={"Add Extras"}
      handleFormSubmit={() => handleClose({ operation: "save" })}
    >
      <form>
        {benefitsData[benefitIndex]?.Extras?.map(
          (extra: any, index: number) => (
            <Grid2 container spacing={2}>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  select
                  id="EReason"
                  name="EReason"
                  placeholder="Reason for Extra"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleExtrasChange(e, benefitIndex, index)
                  }
                  label="Reason for Extra"
                  fullWidth
                  margin="dense"
                  value={extra?.EReason}
                  InputLabelProps={{ shrink: true }}
                >
                  {eReasonData.map((val: any) => (
                    <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                  ))}
                </TextField>
              </Grid2>
              <Grid2 xs={8} md={6} lg={4}>
                <TextField
                  select
                  id="EMethod"
                  name="EMethod"
                  placeholder="Method for Extra"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleExtrasChange(e, benefitIndex, index)
                  }
                  label="Method for Extra"
                  fullWidth
                  margin="dense"
                  value={extra?.EMethod}
                  InputLabelProps={{ shrink: true }}
                >
                  {" "}
                  {eMethodData.map((val: any) => (
                    <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
                  ))}
                </TextField>
              </Grid2>
              {extra?.EMethod === "01" ? (
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="EAge"
                    name="EAge"
                    value={extra?.EAge}
                    placeholder="Extra for Age"
                    label="Extra for Age"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleExtrasChange(e, benefitIndex, index)
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              ) : extra?.EMethod === "02" ? (
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="EAmt"
                    name="EAmt"
                    value={extra?.EAmt}
                    placeholder="Extra by Flat Amount"
                    label="Extra by Flat Amount"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleExtrasChange(e, benefitIndex, index)
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              ) : extra?.EMethod === "03" ? (
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="EPercentage"
                    name="EPercentage"
                    InputLabelProps={{ shrink: true }}
                    value={extra?.EPercentage}
                    placeholder="Extra by Percentage"
                    label="Extra by Percentage"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleExtrasChange(e, benefitIndex, index)
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              ) : extra?.EMethod === "04" ? (
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="ETerm"
                    name="ETerm"
                    InputLabelProps={{ shrink: true }}
                    value={extra?.ETerm}
                    placeholder="Extra for Fixed Term"
                    label="Extra for Fixed Term"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleExtrasChange(e, benefitIndex, index)
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              ) : extra?.EMethod === "05" ? (
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    //InputProps={{
                    //startAdornment: (
                    //<InputAdornment position="start">+91</InputAdornment>
                    // ),
                    //}}
                    id="EMillie"
                    name="EMillie"
                    InputLabelProps={{ shrink: true }}
                    value={extra?.EMillie}
                    placeholder="Extra Premium per Mille"
                    label="Extra Premium per Mille"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleExtrasChange(e, benefitIndex, index)
                    }
                    fullWidth
                    margin="dense"
                  />
                </Grid2>
              ) : extra?.EMethod === "06" ? (
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="EEmr"
                    name="EEmr"
                    InputLabelProps={{ shrink: true }}
                    value={extra?.EEmr}
                    placeholder="Method for Extra"
                    label="Method for Extra"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleExtrasChange(e, benefitIndex, index)
                    }
                    fullWidth
                    margin="dense"
                  >
                    {eMortalityData.map((val: any) => (
                      <MenuItem value={val.code}>{val.description}</MenuItem>
                    ))}
                  </TextField>
                </Grid2>
              ) : (
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    InputProps={{ readOnly: true }}
                    id="NO"
                    name="NO"
                    value={extra?.NO}
                    placeholder="Based On The Method"
                    label="Based On The Method"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleExtrasChange(e, benefitIndex, index)
                    }
                    fullWidth
                    margin="dense"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid2>
              )}
              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      readOnly={true}
                      label="From Date"
                      inputFormat="DD/MM/YYYY"
                      value={businessDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) => handleFromDate(date, index)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              <Grid2 xs={8} md={6} lg={4}>
                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label="To Date"
                      inputFormat="DD/MM/YYYY"
                      value={extra?.ToDate}
                      onChange={(
                        date: React.ChangeEvent<HTMLInputElement> | any
                      ) => handleToDate(date, index)}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>
                </FormControl>
              </Grid2>

              {benefitsData[benefitIndex]?.Extras?.length - 1 === index &&
                benefitsData[benefitIndex]?.Extras?.length < 10 && (
                  <IconButton onClick={handleAddExtras}>
                    <AddCircleIcon color="success" />
                  </IconButton>
                )}

              {benefitsData[benefitIndex]?.Extras?.length !== 1 && (
                <IconButton onClick={() => handleRemoveExtras(index)}>
                  <RemoveCircleIcon color="error" />
                </IconButton>
              )}
            </Grid2>
          )
        )}
      </form>
    </CustomModal>
  );
}
export default ExtrasAdd;
