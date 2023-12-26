import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import HomeIcon from "@mui/icons-material/Home";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PolicyIcon from "@mui/icons-material/Policy";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import ReduceCapacityIcon from "@mui/icons-material/ReduceCapacity";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EditRoadRoundedIcon from "@mui/icons-material/EditRoadRounded";
import BatchPredictionIcon from "@mui/icons-material/BatchPrediction";
import PaymentIcon from "@mui/icons-material/Payment";
import { GiCoffin } from "react-icons/gi";
import RedeemIcon from "@mui/icons-material/Redeem";
import SafetyCheckIcon from "@mui/icons-material/SafetyCheck";

const routes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: <HomeIcon />,
  },

  {
    path: "#",
    name: "Admin",
    icon: <AdminPanelSettingsIcon />,
    subRoutes: [
      {
        path: "/usergroup",
        name: "User Group ",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/permission",
        name: "Permissions",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/users",
        name: "Users",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/errors",
        name: "Errors",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/companies",
        name: "Companies",
        icon: <ArrowRightAltIcon />,
      },

      {
        path: "/params",
        name: "Business Rules",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/transaction",
        name: "Transaction",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/businessDate",
        name: "BusinessDate",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/tdfParam",
        name: "TDFParam",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },
  {
    path: "#",
    name: "Clients Details",
    icon: <PeopleAltIcon />,
    subRoutes: [
      {
        path: "/client",
        name: "Client",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/bank",
        name: "Bank",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/address",
        name: "Address",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/payerauth",
        name: "Paying Authority",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },
  {
    path: "#",
    name: "Policy Details",
    icon: <PolicyIcon />,
    subRoutes: [
      {
        path: "/policy",
        name: "Policy",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/newBusiness",
        name: "New Business",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/policyUploadDemo",
        name: "Policy Upload Demo",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/nbmm",
        name: "NBMM",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/csmm",
        name: "CSMM",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },
  {
    path: "#",
    name: "Ilp",
    icon: <SafetyCheckIcon />,
    subRoutes: [
      {
        path: "ilpPrices",
        name: "Ilp Prices",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },
  {
    path: "#",
    name: "Death Header",
    icon: <GiCoffin size="23px" />,
    subRoutes: [
      {
        path: "deathH",
        name: "Death",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },
  {
    path: "#",
    name: "Agency Details",
    icon: <ReduceCapacityIcon />,
    subRoutes: [
      {
        path: "/agency",
        name: "Agency",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },
  {
    path: "#",
    name: "Receipts",
    icon: <ReceiptIcon />,
    subRoutes: [
      {
        path: "/receipts",
        name: "Receipts",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },

  {
    path: "#",
    name: "Payments",
    icon: <PaymentIcon />,
    subRoutes: [
      {
        path: "/payments",
        name: "Payments",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },

  {
    path: "#",
    name: "Lead Management",
    icon: <ManageAccountsIcon />,
    subRoutes: [
      {
        path: "/leadChannel",
        name: "Lead Channels",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/leadDetails",
        name: "Lead Details",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/leadAllocation",
        name: "Lead Allocation",
        icon: <ArrowRightAltIcon />,
      },

      {
        path: "/leadFollowups",
        name: "Lead Followups",
        icon: <ArrowRightAltIcon />,
      },

      {
        path: "/campaigns",
        name: "Campaigns",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/campaignComps",
        name: "Campaign Comps",
        icon: <ArrowRightAltIcon />,
      },
      {
        path: "/levels",
        name: "Levels",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },

  {
    path: "#",
    name: "Quotations",
    icon: <EditRoadRoundedIcon />,
    subRoutes: [
      {
        path: "/qHeaderqDetail",
        name: "Quotation",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },
  {
    path: "batchMenu",
    name: "Batch Jobs",
    icon: <BatchPredictionIcon />,
    // subRoutes: [
    //   {
    //     path: "/batch",
    //     name: "Allocate Rev Bonus by Date",
    //     icon: <ArrowRightAltIcon />,
    //   },
    //   {
    //     path: "/premst",
    //     name: "Premium Statement by Date",
    //     icon: <ArrowRightAltIcon />,
    //   },
    //   {
    //     path: "/receipt",
    //     name: "Receipt Create By Bank",
    //     icon: <ArrowRightAltIcon />,
    //   },
    //   {
    //     path: "/unitst",
    //     name: "UnitStatement by Date",
    //     icon: <ArrowRightAltIcon />,
    //   },
    // ],
  },
  {
    path: "#",
    name: "Claims",
    icon: <RedeemIcon />,
    subRoutes: [
      {
        path: "claims",
        name: "Claims",
        icon: <ArrowRightAltIcon />,
      },
    ],
  },
];

const SideBar = ({ children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "300px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Futura
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={route.path}
                    toggle={toggle}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                //   activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
      <Outlet />
    </>
  );
};

export default SideBar;
