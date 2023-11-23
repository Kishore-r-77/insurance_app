import { IlpFundsModalType } from "../../../reducerUtilities/types/ilpFund/ilpFundsTypes";
//import { paramItem } from "../ilpFundApi/ilpFundsApis";
// *** Attention: Check the path and change it if required ***
import Policy from "../../policy/Policy";
import Benefit from "../../policy/policyModal/benefit/Benefit";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import useHttp from "../../../hooks/use-http";
import { getData } from "../../../services/http-service";
import CustomModal from "../../../utilities/modal/CustomModal";
import Grid2 from "@mui/material/Unstable_Grid2";
import { TextField } from "@mui/material";

function IlpFundsAdd({open, handleClose}:any) {
    
  const size: string = "xl";
  return (
    <CustomModal
        open={open}
        size={size}
        handleClose={handleClose}
        title={"ILP Test"}
        //ACTIONS={ACTIONS}
        //handleFormSubmit={state.infoOpen ? null : () => handleFormSubmit()}
      >
        <form>
          <Grid2 container spacing={2}>
            {
              <>
                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    select
                    id="FundCode"
                    name="FundCode"
                    //value={state.addOpen ? state.FundCode : record.FundCode}
                    placeholder="Fund Code"
                    label="Fund Code"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   dispatch({
                    //     type: state.addOpen
                    //       ? ACTIONS.ONCHANGE
                    //       : ACTIONS.EDITCHANGE,
                    //     payload: e.target.value,
                    //     fieldName: "FundCode",
                    //   })
                    // }
                    fullWidth
                    //inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                    SelectProps={{
                      multiple: false,
                    }}
                  >
                    {/* {getUlpfundsResponse?.param.data.dataPairs.map(
                      (value: any) => (
                        <MenuItem key={value.code} value={value.code}>
                          {value.code} - {value.description}
                        </MenuItem>
                      )
                    )} */}
                  </TextField>
                </Grid2>

                <Grid2 xs={8} md={6} lg={4}>
                  <TextField
                    type="number"
                    id="FundPercentage"
                    name="FundPercentage"
                    // value={
                    //   state.addOpen
                    //     ? state.FundPercentage
                    //     : record.FundPercentage
                    // }
                    placeholder="Fund Percentage"
                    label="Fund Percentage"
                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    //   dispatch({
                    //     type: state.addOpen
                    //       ? ACTIONS.ONCHANGE
                    //       : ACTIONS.EDITCHANGE,
                    //     payload: e.target.value,
                    //     fieldName: "FundPercentage",
                    //   })
                    // }
                    fullWidth
                    //inputProps={{ readOnly: state.infoOpen }}
                    margin="dense"
                  />
                </Grid2>
              </>
            }
          </Grid2>
        </form>
    </CustomModal>
  )
}   

export default IlpFundsAdd