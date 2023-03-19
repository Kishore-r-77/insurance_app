import { Route, Routes } from "react-router-dom";
import "./App.css";
import Address from "./components/admin/address/Address";
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
import Bank from "./components/bank/Bank";
import Client from "./components/client/Client";
import Hompage from "./components/homepage/Hompage";
import Nbmm from "./components/nbmm/Nbmm";
import NewBusiness from "./components/newBusiness/NewBusiness";
import Policy from "./components/policy/Policy";
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
      <Routes>
        <Route element={<CustomNavbar />}>
          <Route element={<SideBar />}>
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
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
