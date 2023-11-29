//import { paramItem } from "../ilpFundApi/ilpFundsApis";
// *** Attention: Check the path and change it if required ***
import { Button, IconButton, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CustomModal from "../../../utilities/modal/CustomModal";
import { ChangeEvent, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveIcon from "@mui/icons-material/Remove";

function IlpFundsAdd({ open, handleClose, data }: any) {
  const size: string = "xl";

  console.log(data?.fundData, "Fund Dataaaa");

  const [fundDetails, setfundDetails] = useState(
    data?.fundData === undefined
      ? [
          {
            FundCode: "",
            FundPercentage: 0,
          },
        ]
      : data.fundData
  );

  console.log(fundDetails, "Fund Details");

  const handleAddFunds = () => {
    setfundDetails((prev: any) => [
      ...prev,
      { FundCode: "", FundPercentage: "" },
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

  return (
    <CustomModal
      open={open}
      size={size}
      handleClose={() => handleClose({ operation: "cancel" })}
      title={"ILP Test"}
      handleFormSubmit={() =>
        handleClose({ operation: "save", data: fundDetails })
      }
    >
      <form>
        {fundDetails?.map((fund: any, index: number) => (
          <Grid2 container spacing={2}>
            <Grid2 xs={12} md={12} lg={4}>
              <TextField
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
              ></TextField>
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
