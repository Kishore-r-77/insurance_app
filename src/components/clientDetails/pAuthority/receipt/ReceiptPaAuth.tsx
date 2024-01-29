import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";

import styles from "./ReceiptPaAuth.module.css";
import axios from "axios";
import CustomFullModal from "../../../../utilities/modal/CustomFullModal";
import CommunicationEnquiry from "../../../policy/policyModal/enquiry/CommunicationEnquiry";
import { PauthType } from "../../../../reducerUtilities/types/pa/paTypes";

function ReceiptPaAuth({ state, record, dispatch, ACTIONS }: PauthType) {
  const title: string = "Receipt Pa Auth";

  const [communicationData, setcommunicationData] = useState([]);
  const getCommunicationByReceiptfor = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/receiptforcom/02/${record.ID}`,
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setcommunicationData(resp.data?.Comm);
      })
      .catch((err) => console.log(err.message));
  };
  console.log(record.ID, "Bharani karthci");
  useEffect(() => {
    getCommunicationByReceiptfor();

    return () => {};
  }, [state.receiptOpen]);

  // useEffect(() => {
  //   setcommunicationData([]);
  //   return () => {};
  // }, [state.receiptClose]);

  return (
    <div>
      <CustomFullModal
        open={state.receiptOpen}
        handleClose={
          state.receiptOpen
            ? () => dispatch({ type: ACTIONS.RECEIPTCLOSE })
            : null
        }
        title={title}
      >
        <TreeView
          style={{ width: "100%", margin: "0px auto" }}
          aria-label="file system navigator"
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          defaultExpanded={["1"]}
        >
          <TreeItem nodeId="1" label={`Communication`}>
            <Paper className={styles.paperStyle}>
              <CommunicationEnquiry
                communicationData={communicationData}
                state={state}
              />
            </Paper>
          </TreeItem>
        </TreeView>
      </CustomFullModal>
    </div>
  );
}

export default ReceiptPaAuth;
