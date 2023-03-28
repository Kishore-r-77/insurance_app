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
import { useState } from "react";
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

function NbmmTable({
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
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [afiOpen, setafiOpen] = useState(false);
  const [policyId, setpolicyId] = useState(0);
  const handleAfiOpen = (ID: any) => {
    setafiOpen(true);
    setpolicyId(ID);
    handleClose();
  };

  const handleAfiClose = () => {
    setafiOpen(false);
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
                      onClick={handleClick}
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
                      <MenuItem onClick={() => handleAfiOpen(row.ID)}>
                        Afi
                      </MenuItem>
                      <MenuItem onClick={() => handleCfiOpen(row.ID)}>
                        Cfi
                      </MenuItem>
                      <MenuItem onClick={() => handleFreeLookOpen(row.ID)}>
                        Free Look
                      </MenuItem>
                      <MenuItem onClick={() => handlePostponeOpen(row.ID)}>
                        Postpone
                      </MenuItem>
                      <MenuItem onClick={() => handleDeclineOpen(row.ID)}>
                        Decline
                      </MenuItem>
                      <MenuItem onClick={() => handleWithdrawnOpen(row.ID)}>
                        Withdrawn
                      </MenuItem>
                      <MenuItem
                        onClick={() => handlePostponeWithdrawnOpen(row.ID)}
                      >
                        PostPone Withdrawn
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
      />

      <CfiScrModal
        open={cfiOpen}
        handleClose={handleCfiClose}
        policyId={policyId}
      />

      <FreeLookScrModal
        open={FreeLookOpen}
        handleClose={handleFreeLookClose}
        policyId={policyId}
      />
      <PostponeScrModal
        open={PostponeOpen}
        handleClose={handlePostponeClose}
        policyId={policyId}
      />
      <DeclineScrModal
        open={DeclineOpen}
        handleClose={handleDeclineClose}
        policyId={policyId}
      />
      <PostponeWithdrawnScrModal
        open={PostponeWithdrawnOpen}
        handleClose={handlePostponeWithdrawnClose}
        policyId={policyId}
      />
      <WithdrawnScrModal
        open={WithdrawnOpen}
        handleClose={handleWithdrawnClose}
        policyId={policyId}
      />
    </Paper>
  );
}

export default NbmmTable;
