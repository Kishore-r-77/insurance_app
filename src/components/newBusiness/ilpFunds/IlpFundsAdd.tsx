import { IlpFundsModalType } from "../../../reducerUtilities/types/ilpFund/ilpFundsTypes";
//import { paramItem } from "../ilpFundApi/ilpFundsApis";
// *** Attention: Check the path and change it if required ***
import Policy from "../../policy/Policy";
import Benefit from "../../policy/policyModal/benefit/Benefit";
import { getApi } from "../../admin/companies/companiesApis/companiesApis";
import useHttp from "../../../hooks/use-http";
import { getData } from "../../../services/http-service";
import CustomModal from "../../../utilities/modal/CustomModal";

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
    <div>
        Blah
    </div>
    </CustomModal>
  )
}   

export default IlpFundsAdd