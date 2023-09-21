import { Button, IconButton, Menu, MenuItem, Paper } from "@mui/material";
import Table from "react-bootstrap/Table";
import styles from "./deathHTable.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import BusinessIcon from "@mui/icons-material/Business";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ModifyDeath from "../deathHModal/modifyDeath/ModifyDeath";
import axios from "axios";
import { useAppSelector } from "../../../../redux/app/hooks";
import { getApi } from "../../../admin/companies/companiesApis/companiesApis";
import DeathRejection from "../deathHModal/deathRejection/DeathRejection";
import DeathApproval from "../deathHModal/deathApproval/DeathApproval";

function DeathHTable({
  data,
  dataIndex,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  hardDelete,
  modalFunc,
  getData,
  setNotify,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const id = useRef(0);
  const policyId = useRef(0);
  const enquiryRecord = useRef();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: any
  ) => {
    id.current = value.ID;
    policyId.current = value.PolicyID;
    enquiryRecord.current = value;
    setAnchorEl(event.currentTarget);
    deathMenu();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [modifyDeath, setmodifyDeath] = useState(false);
  const [deathRejection, setdeathRejection] = useState(false);
  const [deathApproval, setdeathApproval] = useState(false);

  const [ID, setID] = useState(0);
  const [PolicyID, setPolicyID] = useState(0);
  const modifyDeathOpen = (id: number, policyId: number) => {
    setID(id);
    setPolicyID(policyId);
    setmodifyDeath(true);
    handleClose();
  };

  const modifyDeathClose = () => {
    setmodifyDeath(false);
  };

  const deathRejectionOpen = (id: number, policyId: number) => {
    setID(id);
    setPolicyID(policyId);
    setdeathRejection(true);
    handleClose();
  };

  const deathRejectionClose = () => {
    setdeathRejection(false);
  };
  const deathApprovalOpen = (id: number, policyId: number) => {
    setID(id);
    setPolicyID(policyId);
    setdeathApproval(true);
    handleClose();
  };

  const deathApprovalClose = () => {
    setdeathApproval(false);
  };

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const [companyData, setCompanyData] = useState<any>({});
  const getCompanyData = (id: number) => {
    getApi(id).then((resp) => {
      setCompanyData(resp.data["Company"]);
    });
  };
  const [deathMenuData, setdeathMenuData] = useState([]);
  const deathMenu = () => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/paramextradata`, {
        withCredentials: true,
        params: {
          name: "P0044",
          date: "20220101",
          item: "DEATHMM",
          company_id: companyId,
        },
      })
      .then((resp) => {
        setdeathMenuData(resp.data?.AllowedMenus);
      })
      .catch((err) => {
        
      });
  };

  const deathMenuClick = (value: any) => {
    switch (value) {
      case "Enquiry":
        dispatch({ type: ACTIONS.INFOOPEN, payload: enquiryRecord?.current });
        handleClose();
        break;
      case "Adjustment":
        modifyDeathOpen(id.current, policyId.current);
        break;
      case "Approval":
        deathApprovalOpen(id.current, policyId.current);
        break;
      case "Rejection":
        deathRejectionOpen(id.current, policyId.current);
        break;
      default:
        return;
    }
  };

  useEffect(() => {
    getCompanyData(companyId);

    return () => {};
  }, []);

  return (
    <Paper className={styles.paperStyle}>
      <Table striped bordered hover>
        <thead className={styles.header}>
          <tr>
            {columns?.map(
              (
                column: {
                  field: string;
                  header: string;
                  dbField: string;
                  sortable: boolean;
                },
                index: number
              ) => (
                <th key={column.dbField}>
                  {column.header}
                  {column?.sortable && (
                    <span>
                      <IconButton
                        onClick={() => {
                          setsort({
                            fieldName: column.dbField,
                            order: "asc",
                          });

                          return dispatch({
                            type: ACTIONS.SORT_ASC,
                            payload: column.dbField,
                          });
                        }}
                      >
                        <ArrowUpwardIcon
                          className={
                            sort.fieldName === column.dbField &&
                            sort.order === "asc"
                              ? styles.icon
                              : styles["icon-disabled"]
                          }
                        />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setsort({
                            fieldName: column.dbField,
                            order: "desc",
                          });

                          dispatch({
                            type: ACTIONS.SORT_DESC,
                            payload: column.dbField,
                          });
                        }}
                      >
                        <ArrowDownwardIcon
                          className={
                            sort.fieldName === column.dbField &&
                            sort.order === "desc"
                              ? styles.icon
                              : styles["icon-disabled"]
                          }
                        />
                      </IconButton>
                    </span>
                  )}
                </th>
              )
            )}
            {/* <th>Benefit</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr
              onClick={() => modalFunc(row, dataIndex?.index)}
              key={row.ID}
              className={styles["table-cell"]}
            >
              {columns.map((col: { field: string; type: string }) => {
                if (col.type === "date") {
                  return (
                    <td key={col.field}>
                      {moment(row[col.field]).format("DD-MM-YYYY")}
                    </td>
                  );
                }
                return <td key={col.field}>{row[col.field]}</td>;
              })}
              {/* <td>
                <BusinessIcon
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.BENEFITOPEN,
                      payload: row,
                    })
                  }
                />
              </td> */}
              <td>
                <span className={styles.flexButtons}>
                  {/* <IconButton
                    onClick={() =>
                      dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                    }
                  >
                    {" "}
                    <InfoIcon />
                  </IconButton> */}

                  <IconButton
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={(e) => handleClick(e, row)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    {deathMenuData.map((deathValue: any) => (
                      <MenuItem
                        onClick={() => deathMenuClick(deathValue.Action)}
                      >
                        {deathValue?.Action}
                      </MenuItem>
                    ))}
                  </Menu>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ModifyDeath
        open={modifyDeath}
        companyName={companyData.CompanyName}
        handleClose={modifyDeathClose}
        id={ID}
        policyId={PolicyID}
        companyId={companyId}
        getData={getData}
        setNotify={setNotify}
      />
      <DeathRejection
        open={deathRejection}
        companyName={companyData.CompanyName}
        handleClose={deathRejectionClose}
        id={ID}
        policyId={PolicyID}
        companyId={companyId}
        getData={getData}
        setNotify={setNotify}
      />
      <DeathApproval
        open={deathApproval}
        companyName={companyData.CompanyName}
        handleClose={deathApprovalClose}
        id={ID}
        policyId={PolicyID}
        companyId={companyId}
        getData={getData}
        setNotify={setNotify}
      />
    </Paper>
  );
}

export default DeathHTable;
