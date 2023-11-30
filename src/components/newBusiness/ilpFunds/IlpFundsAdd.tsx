import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import { IconButton, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useAppSelector } from "../../../redux/app/hooks";

function IlpFundsAdd({
  open,
  handleClose,
  data,
  fundDetails,
  setfundDetails,
}: any) {
  const size: string = "xl";

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  const handleAddFunds = () => {
    setfundDetails((prev: any) => [
      ...prev,
      { FundCode: "", FundPercentage: 0 },
    ]);
  };

  const handleRemoveFunds = (index: number) => {
    const fundList = [...fundDetails];
    fundList.splice(index, 1);
    setfundDetails(fundList);
  };

  const handleFundsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const { name, value } = e.target;
    setfundDetails((prev: any) =>
      prev.map((fund: any, index: number) => {
        if (index === i) {
          return {
            ...fund,
            [name]: value,
          };
        } else return fund;
      })
    );
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

  const [fundCodeData, setFundCodeData] = useState([]);
  const getFundCode = (
    companyId: number,
    name: string,
    languageId: number,
    item: string
  ) => {
    p0050(companyId, name, languageId, item)
      .then((resp) => {
        setFundCodeData(resp.data.param.data.dataPairs);
        return resp.data.param.data.dataPairs;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getFundCode(companyId, "P0050", languageId, "ILP1FUNDCODE");
    return () => {};
  }, []);

  return (
    <CustomModal
      open={open}
      size={size}
      saveButton="Capture"
      closeButton="Cancel"
      handleClose={() => handleClose({ operation: "cancel" })}
      title={"ILP Test"}
      handleFormSubmit={() => handleClose({ operation: "save" })}
    >
      <form>
        {fundDetails?.map((fund: any, index: number) => (
          <Grid2 container spacing={2}>
            <Grid2 xs={12} md={12} lg={4}>
              <TextField
                select
                id="FundCode"
                name="FundCode"
                placeholder="Fund Code"
                label="Fund Code"
                fullWidth
                value={fund?.FundCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFundsChange(e, index)
                }
                margin="dense"
                InputLabelProps={{ shrink: true }}
              >
                {fundCodeData.map((val: any) => (
                  <MenuItem value={val.code}>{val.description}</MenuItem>
                ))}
              </TextField>
            </Grid2>

            <Grid2 xs={12} md={12} lg={4}>
              <TextField
                type="number"
                id="FundPercentage"
                name="FundPercentage"
                placeholder="Fund Percentage"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFundsChange(e, index)
                }
                label="Fund Percentage"
                fullWidth
                //inputProps={{ readOnly: state.infoOpen }}
                margin="dense"
                value={fund?.FundPercentage}
                InputLabelProps={{ shrink: true }}
              />
            </Grid2>
            {fundDetails?.length - 1 === index && fundDetails?.length < 3 && (
              <IconButton onClick={handleAddFunds}>
                <AddCircleIcon />
              </IconButton>
            )}
            {fundDetails?.length !== 1 && (
              <IconButton onClick={() => handleRemoveFunds(index)}>
                <RemoveIcon />
              </IconButton>
            )}
          </Grid2>
        ))}
      </form>
    </CustomModal>
  );
}

export default IlpFundsAdd;
