import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import BusinessIcon from "@mui/icons-material/Business";
import InfoIcon from "@mui/icons-material/Info";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { IconButton, Paper } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { useAppSelector } from "../../redux/app/hooks";
import styles from "./newbussinesstable.module.css";
import CustomModal from "../../utilities/modal/CustomModal";
import OwnerModal from "./ownerModal/OwnerModal";
import Payer from "../payer/Payer";
import Assignee from "../assignee/Assignee";
function NewBussinessTable({
  issueOpen,
  confirmOpen,
  data,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  hardDelete,
  modalFunc,
}: any) {
  const [sort, setsort] = useState(
    sortParam && sortParam.fieldName
      ? sortParam
      : { fieldName: columns[0].dbField, order: "asc" }
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const policyId = useRef(0);
  const enquiryRecord = useRef<any>();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: any
  ) => {
    policyId.current = value.ID;
    enquiryRecord.current = value;
    setAnchorEl(event.currentTarget);
    clientMenu();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );

  const [clientData, setclientData] = useState([]);
  const [isClientOpen, setisClientOpen] = useState(false);

  const getClient = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/basicservices/clientget/${enquiryRecord?.current?.ClientID}`,
        { withCredentials: true }
      )
      .then((resp) => setclientData(resp.data?.Client))
      .catch((err) => err.message);
  };

  const clientOpen = () => {
    setisClientOpen(true);
  };

  const clientClose = () => {
    setisClientOpen(false);
  };

  useEffect(() => {
    getClient();
    return () => {};
  }, [isClientOpen === true]);

  const [clientMenuData, setclientMenuData] = useState([]);
  const clientMenu = () => {
    axios
      .get(`http://localhost:3000/api/v1/basicservices/paramextradata`, {
        withCredentials: true,
        params: {
          name: "P0044",
          date: "20220101",
          item: "CLIENTMM",
          company_id: companyId,
        },
      })
      .then((resp) => {
        setclientMenuData(resp.data?.AllowedMenus);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [isPayer, setisPayer] = useState(false);

  const [PolicyID, setPolicyID] = useState(0);
  const [payerObj, setpayerObj] = useState<any>({});
  const payerOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setisPayer(true);
    setpayerObj(value);
    console.log(policyId, "policy Id");

    handleClose();
  };

  const payerClose = () => {
    setisPayer(false);
  };

  const [payerByPolicyData, setpayerByPolicyData] = useState([]);

  const getPayerByPolicy = (id: number) => {
    axios
      .get(`http://${payerObj?.URL}${id}`, { withCredentials: true })
      .then((resp) => {
        setpayerByPolicyData(resp?.data?.Payer);
      })
      .catch((err) => {
        console.log(err);

        setpayerByPolicyData([]);
      });
  };

  useEffect(() => {
    getPayerByPolicy(PolicyID);
    return () => {};
  }, [isPayer]);

  const [isAssignee, setisAssignee] = useState(false);
  const [assigneeObj, setassigneeObj] = useState<any>({});
  const assigneeOpen = (policyId: number, value: any) => {
    setPolicyID(policyId);
    setisAssignee(true);
    setassigneeObj(value);
    console.log(policyId, "policy Id");

    handleClose();
  };

  const assigneeClose = () => {
    setisAssignee(false);
  };

  const [assigneeByPolicyData, setassigneeByPolicyData] = useState([]);

  const getAssigneeByPolicy = (id: number) => {
    axios
      .get(`http://${assigneeObj?.URL}${id}`, { withCredentials: true })
      .then((resp) => {
        setassigneeByPolicyData(resp?.data?.asignee);
      })
      .catch((err) => {
        console.log(err);

        setassigneeByPolicyData([]);
      });
  };

  useEffect(() => {
    getAssigneeByPolicy(PolicyID);
    return () => {};
  }, [isAssignee]);

  const clientMenuClick = (value: any) => {
    switch (value.Action) {
      case "Nominee":
        dispatch({
          type: ACTIONS.NOMINEEOPEN,
          payload: enquiryRecord?.current,
        });
        handleClose();
        break;
      case "Payer":
        payerOpen(policyId.current, value);
        handleClose();

        break;
      case "Owner":
        clientOpen();
        handleClose();
        break;

      case "Assignee":
        assigneeOpen(policyId.current, value);
        handleClose();
        break;

      default:
        return;
    }
  };

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
            <th>Benefit</th>
            <th>Clients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row: any) => (
            <tr
              onClick={() => modalFunc(row)}
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

              <td>
                <BusinessIcon
                  onClick={() =>
                    dispatch({
                      type: ACTIONS.BENEFITOPEN,
                      payload: row,
                    })
                  }
                />
              </td>
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
                    {clientMenuData.map((clientValue: any) => (
                      <MenuItem onClick={() => clientMenuClick(clientValue)}>
                        {clientValue?.Action}
                      </MenuItem>
                    ))}
                  </Menu>
                </span>
              </td>

              {ACTIONS.EDITOPEN && (
                <td>
                  <span className={styles.flexButtons}>
                    {/* <EditIcon
                      color="primary"
                      onClick={() =>
                        dispatch({ type: ACTIONS.EDITOPEN, payload: row })
                      }
                    />
                    <DeleteIcon
                      color="error"
                      onClick={() => hardDelete(row.ID)}
                    /> */}
                    <InfoIcon
                      onClick={() =>
                        dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                      }
                    />
                    <VerifiedUserIcon
                      color="primary"
                      onClick={() => confirmOpen(row.ID)}
                    />
                    <SendIcon
                      color="success"
                      onClick={() => issueOpen(row.ID)}
                    />
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <OwnerModal
        record={clientData}
        open={isClientOpen}
        handleClose={clientClose}
      />
      <CustomModal open={isPayer} handleClose={payerClose} size="xl">
        <Payer
          lookup={isPayer}
          payerByPolicyData={payerByPolicyData}
          policyId={PolicyID}
          getPayerByPolicy={getPayerByPolicy}
        />
      </CustomModal>
      <CustomModal open={isAssignee} handleClose={assigneeClose} size="xl">
        <Assignee
          lookup={isAssignee}
          assigneeByPolicyData={assigneeByPolicyData}
          policyId={PolicyID}
          getAssigneeByPolicy={getAssigneeByPolicy}
        />
      </CustomModal>
    </Paper>
  );
}

export default NewBussinessTable;
