import CustomNavbar from "./utilities/navbar/CustomNavbar";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/auth/signin/Signin";
import UserGroup from "./components/admin/usergroup/UserGroup";
import Permission from "./components/admin/permission/Permission";
import SideBar from "./utilities/sidebar/Sidebar";
import Users from "./components/admin/users/Users";
import moment from "moment";
import Errors from "./components/admin/errors/Errors";
import Companies from "./components/admin/companies/Companies";
import Client from "./components/client/Client";
import Address from "./components/admin/address/Address";
import Bank from "./components/bank/Bank";
import Hompage from "./components/homepage/Hompage";
import Params from "./components/admin/params/Params";
import Policy from "./components/policy/Policy";
import Footer from "./utilities/footer/Footer";
import ParamItems from "./components/admin/paramItems/ParamItems";
import ParamData from "./components/admin/paramData/paramData";
import Agency from "./components/agency/Agency";
import Transaction from "./components/transaction/Transaction";
import NewBusiness from "./components/newBusiness/NewBusiness";
import Receipts from "./components/receipts/Receipts";
import AfiScr from "./components/afiscr/AfiScr";

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
              <Route path="/afiscr" element={<AfiScr />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
