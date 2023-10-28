import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Companies from "./components/admin/companies/Companies";
import Errors from "./components/admin/errors/Errors";
import ParamData from "./components/admin/paramData/paramData";
import ParamItems from "./components/admin/paramItems/ParamItems";
import Params from "./components/admin/params/Params";
import Permission from "./components/admin/permission/Permission";
import UserGroup from "./components/admin/usergroup/UserGroup";
import Users from "./components/admin/users/Users";
import Agency from "./components/agency/Agency";
import Signin from "./components/auth/signin/Signin";
import Signup from "./components/auth/signup/Signup";
import CampaignComps from "./components/campaignDetails/campaignComps/CampaignComps";
import Campaigns from "./components/campaignDetails/campaigns/Campaigns";
import Address from "./components/clientDetails/address/Address";
import Bank from "./components/clientDetails/bank/Bank";
import Client from "./components/clientDetails/client/Client";
import DeathH from "./components/death/deathH/DeathH";
import Hompage from "./components/homepage/Hompage";
import LeadAllocations from "./components/lead/leadAllocations/LeadAllocations";
import LeadChannels from "./components/lead/leadChannels/LeadChannels";
import LeadDetails from "./components/lead/leadDetails/LeadDetails";
import LeadFollowups from "./components/lead/leadFollowups/LeadFollowups";
import Levels from "./components/levels/Levels";
import Nbmm from "./components/nbmm/Nbmm";
import NewBusiness from "./components/newBusiness/NewBusiness";
import Nominee from "./components/nominee/nomineeTable/Nominee";
import Policy from "./components/policy/Policy";
import Receipts from "./components/receipts/Receipts";
import Transaction from "./components/transaction/Transaction";
import Footer from "./utilities/footer/Footer";
import CustomNavbar from "./utilities/navbar/CustomNavbar";
import SideBar from "./utilities/sidebar/Sidebar";
import Assignee from "./components/assignee/Assignee";
import Csmm from "./components/csmm/Csmm";
import QHeaderQDetail from "./components/quotation/QHeaderQDetail";
import QBenIllValue from "./components/qBenIllValues/QBenIllValue";
import BusinessDates from "./components/admin/businessDate/BusinessDates";
import TdfParams from "./components/admin/tdfParam/TdfParams";
import BatchModal from "./components/batchProcess/batchModal/BatchModal";
import Payments from "./components/payments/Payments";
import IlpPrices from "./components/ilpPrices/IlpPrices";
import Claims from "./components/claims/Claims";
import PolicyUploadDemo from "./components/policyUploadDemo/PolicyUploadDemo";
import { UnitStatementModal } from "./components/batchProcess/unitStProcess/unitModel/UnitStatementModal";
import PremiumStatementModal from "./components/batchProcess/premiumstateModal/PremstModal";

function App() {
  const { pathname } = useLocation();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {pathname !== "/" && pathname !== "/signup" && (
        <SideBar>
          <Routes>
            <Route element={<CustomNavbar />}>
              {/* <Route element={<SideBar />}> */}
              <Route element={<Footer />}>
                <Route path="/home" element={<Hompage />} />
                <Route path="/usergroup" element={<UserGroup />} />
                <Route path="/permission" element={<Permission />} />
                <Route path="/users" element={<Users />} />
                <Route path="/errors" element={<Errors />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/client" element={<Client />} />
                <Route path="/address" element={<Address />} />
                <Route path="/bank" element={<Bank />} />
                <Route path="/params" element={<Params />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/paramItems" element={<ParamItems />} />
                <Route path="/paramData" element={<ParamData />} />
                <Route path="/agency" element={<Agency />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/newBusiness" element={<NewBusiness />} />
                <Route
                  path="/policyUploadDemo"
                  element={<PolicyUploadDemo />}
                />
                <Route path="/receipts" element={<Receipts />} />
                <Route path="/nbmm" element={<Nbmm />} />
                <Route path="/campaigns" element={<Campaigns />} />
                <Route path="/campaignComps" element={<CampaignComps />} />
                <Route path="/leadAllocation" element={<LeadAllocations />} />
                <Route path="/leadChannel" element={<LeadChannels />} />
                <Route path="/leadDetails" element={<LeadDetails />} />
                <Route path="/leadFollowups" element={<LeadFollowups />} />
                <Route path="/levels" element={<Levels />} />
                <Route path="/qHeaderqDetail" element={<QHeaderQDetail />} />
                <Route path="/qBenIllValue" element={<QBenIllValue />} />
                <Route path="/deathH" element={<DeathH />} />
                <Route path="/nominee" element={<Nominee />} />
                <Route path="/assignee" element={<Assignee />} />
                <Route path="/csmm" element={<Csmm />} />
                <Route path="/businessDate" element={<BusinessDates />} />
                <Route path="/tdfParam" element={<TdfParams />} />
                <Route path="/batch" element={<BatchModal />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/ilpPrices" element={<IlpPrices />} />
                <Route path="/claims" element={<Claims />} />
                <Route path="/unitst" element={<UnitStatementModal />} />
                <Route path="/premst" element={<PremiumStatementModal />} />
              </Route>
              {/* </Route> */}
            </Route>
          </Routes>
        </SideBar>
      )}
    </div>
  );
}

export default App;
