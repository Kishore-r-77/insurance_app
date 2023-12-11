import { Button, IconButton, Paper } from "@mui/material";
import Table from "react-bootstrap/Table";
import styles from "./nbmmtable.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AfiScrModal from "./nbmmModal/AfiModel/AfiScrModal";
import CfiScrModal from "./nbmmModal/CfiModel/CfiScrModal";
import FreeLookScrModal from "./nbmmModal/FreeLookModel/FreeLookScrModal";
import PostponeScrModal from "./nbmmModal/PostponeModel/PostponeScrModal";
import DeclineScrModal from "./nbmmModal/DeclineModel/DeclineScrModal";
import WithdrawnScrModal from "./nbmmModal/WithdrawnModel/WithdrawnScrModal";
import PostponeWithdrawnScrModal from "./nbmmModal/PostponeWithdrawnModel/PostponeWithdrawnScrModal";
import { useAppSelector } from "../../redux/app/hooks";
import { getBusinessDateApi } from "./nbmmApis/afiScrApis";
import { useBusinessDate } from "../contexts/BusinessDateContext";

var initialValues = {
  ReasonDescription: "",
  RequestedDate: "",
};

function NbmmTable({
  issueOpen,
  confirmOpen,
  data,
  columns,
  dispatch,
  ACTIONS,
  sortParam,
  getData,
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
  const record = useRef();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: any) => {
    record.current = id;
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const companyId = useAppSelector(
    (state) => state.users.user.message.companyId
  );
  const userId = useAppSelector((state) => state.users.user.message.id);
  // const [businessData, setBusinessData] = useState<any>({});
  // const getBusinessDate = (companyId: number, userId: number) => {
  //   return getBusinessDateApi(companyId, userId)
  //     .then((resp) => {
  //       setBusinessData(resp.data);
  //     })
  //     .catch((err) => err.message);
  // };

  // useEffect(() => {
  //   getBusinessDate(companyId, userId);
  //   return () => {};
  // }, []);
  const {
    businessDate,
    businessDateToggle,
    setbusinessDateToggle,
    getBusinessDate,
  } = useBusinessDate();

  const [afiOpen, setafiOpen] = useState(false);
  const [policyId, setpolicyId] = useState(0);
  const [AfiData, setAfiData] = useState(initialValues);
  const handleAfiOpen = (ID: any) => {
    setAfiData((pre) => ({ ...pre, RequestedDate: businessDate }));
    setafiOpen(true);
    setpolicyId(ID);
    handleClose();
  };

  const handleAfiClose = () => {
    setafiOpen(false);
    setAfiData(initialValues);
  };

  const [cfiOpen, setcfiOpen] = useState(false);
  const handleCfiOpen = (ID: any) => {
    setcfiOpen(true);
    setpolicyId(ID);
    handleClose();
  };
  const handleCfiClose = () => {
    setcfiOpen(false);
  };

  const [FreeLookOpen, setFreeLookOpen] = useState(false);
  const handleFreeLookOpen = (ID: any) => {
    setFreeLookOpen(true);
    setpolicyId(ID);
    handleClose();
  };
  const handleFreeLookClose = () => {
    setFreeLookOpen(false);
  };

  const [PostponeOpen, setPostponeOpen] = useState(false);
  const handlePostponeOpen = (ID: any) => {
    setPostponeOpen(true);
    setpolicyId(ID);
    handleClose();
  };
  const handlePostponeClose = () => {
    setPostponeOpen(false);
  };

  const [DeclineOpen, setDeclineOpen] = useState(false);
  const handleDeclineOpen = (ID: any) => {
    setDeclineOpen(true);
    setpolicyId(ID);
    handleClose();
  };
  const handleDeclineClose = () => {
    setDeclineOpen(false);
  };

  const [WithdrawnOpen, setWithdrawnOpen] = useState(false);
  const handleWithdrawnOpen = (ID: any) => {
    setWithdrawnOpen(true);
    setpolicyId(ID);
    handleClose();
  };
  const handleWithdrawnClose = () => {
    setWithdrawnOpen(false);
  };

  const [PostponeWithdrawnOpen, setPostponeWithdrawnOpen] = useState(false);
  const handlePostponeWithdrawnOpen = (ID: any) => {
    setPostponeWithdrawnOpen(true);
    setpolicyId(ID);
    handleClose();
  };
  const handlePostponeWithdrawnClose = () => {
    setPostponeWithdrawnOpen(false);
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
            {ACTIONS.EDITOPEN && <th>Actions</th>}
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
              {ACTIONS.EDITOPEN && (
                <td>
                  <span className={styles.flexButtons}>
                    <IconButton
                      onClick={() =>
                        dispatch({ type: ACTIONS.INFOOPEN, payload: row })
                      }
                    >
                      {" "}
                      <InfoIcon />
                    </IconButton>

                    <IconButton
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={(e) => handleClick(e, row.ID)}
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
                      <MenuItem onClick={() => handleAfiOpen(record.current)}>
                        Afi
                      </MenuItem>
                      <MenuItem onClick={() => handleCfiOpen(record.current)}>
                        Cfi
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleFreeLookOpen(record.current)}
                      >
                        Free Look
                      </MenuItem>
                      <MenuItem
                        onClick={() => handlePostponeOpen(record.current)}
                      >
                        Postpone
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleDeclineOpen(record.current)}
                      >
                        Decline
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleWithdrawnOpen(record.current)}
                      >
                        Withdrawn
                      </MenuItem>
                      <MenuItem
                        onClick={() =>
                          handlePostponeWithdrawnOpen(record.current)
                        }
                      >
                        Reverse pd/wd
                      </MenuItem>
                    </Menu>
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <AfiScrModal
        open={afiOpen}
        handleClose={handleAfiClose}
        policyId={policyId}
        getData={getData}
        initialValues={initialValues}
        AfiData={AfiData}
        setAfiData={setAfiData}
      />

      <CfiScrModal
        open={cfiOpen}
        handleClose={handleCfiClose}
        policyId={policyId}
        getData={getData}
        businessDate={businessDate}
      />

      <FreeLookScrModal
        open={FreeLookOpen}
        handleClose={handleFreeLookClose}
        policyId={policyId}
        getData={getData}
        businessDate={businessDate}
      />
      <PostponeScrModal
        open={PostponeOpen}
        handleClose={handlePostponeClose}
        policyId={policyId}
        getData={getData}
        businessDate={businessDate}
      />
      <DeclineScrModal
        open={DeclineOpen}
        handleClose={handleDeclineClose}
        policyId={policyId}
        getData={getData}
        businessDate={businessDate}
      />
      <PostponeWithdrawnScrModal
        open={PostponeWithdrawnOpen}
        handleClose={handlePostponeWithdrawnClose}
        policyId={policyId}
        getData={getData}
        businessDate={businessDate}
      />
      <WithdrawnScrModal
        open={WithdrawnOpen}
        handleClose={handleWithdrawnClose}
        policyId={policyId}
        getData={getData}
        businessDate={businessDate}
      />
    </Paper>
  );
}

export default NbmmTable;
