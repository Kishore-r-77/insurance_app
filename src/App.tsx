import { Route, Routes } from "react-router-dom";
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
import CampaignComps from "./components/campaignDetails/campaignComps/CampaignComps";
import Campaigns from "./components/campaignDetails/campaigns/Campaigns";
import Address from "./components/clientDetails/address/Address";
import Bank from "./components/clientDetails/bank/Bank";
import Client from "./components/clientDetails/client/Client";
import Hompage from "./components/homepage/Hompage";
import LeadAllocations from "./components/lead/leadAllocations/LeadAllocations";
import LeadChannels from "./components/lead/leadChannels/LeadChannels";
import LeadDetails from "./components/lead/leadDetails/LeadDetails";
import LeadFollowups from "./components/lead/leadFollowups/LeadFollowups";
import Levels from "./components/levels/Levels";
import Nbmm from "./components/nbmm/Nbmm";
import NewBusiness from "./components/newBusiness/NewBusiness";
import Policy from "./components/policy/Policy";
import QBenIllValues from "./components/qBenIllValues/QBenIllValues";
import QDetails from "./components/qDetails/QDetails";
import QHeaders from "./components/qHeader/QHeaders";
import Quotation from "./components/quotations/Quotation";
import Receipts from "./components/receipts/Receipts";
import Transaction from "./components/transaction/Transaction";
import Footer from "./utilities/footer/Footer";
import CustomNavbar from "./utilities/navbar/CustomNavbar";
import SideBar from "./utilities/sidebar/Sidebar";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
      </Routes>
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
              <Route path="/receipts" element={<Receipts />} />
              <Route path="/nbmm" element={<Nbmm />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaignComps" element={<CampaignComps />} />
              <Route path="/leadAllocation" element={<LeadAllocations />} />
              <Route path="/leadChannel" element={<LeadChannels />} />
              <Route path="/leadDetails" element={<LeadDetails />} />
              <Route path="/leadFollowups" element={<LeadFollowups />} />
              <Route path="/levels" element={<Levels />} />
              <Route path="/qBenIllValues" element={<QBenIllValues />} />
              <Route path="/qDetails" element={<QDetails />} />
              <Route path="/qHeader" element={<QHeaders />} />
              <Route path="/quotations" element={<Quotation />} />
            </Route>
            {/* </Route> */}
          </Route>
        </Routes>
      </SideBar>
    </div>
  );
}

export default App;
