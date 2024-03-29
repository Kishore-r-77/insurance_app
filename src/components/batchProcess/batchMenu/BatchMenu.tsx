import { Paper } from "@mui/material";
import { useReducer } from "react";
import {
  ACTIONS,
  initialValues,
} from "../../../reducerUtilities/actions/batch/batchAction";
import { BatchStateType } from "../../../reducerUtilities/types/batch/batchTypes";
import BatchModal from "../batchModal/BatchModal";
import PremiumStatementModal from "../premiumstateModal/PremstModal";
import ReceiptModal from "../receiptModal/ReceiptModal";
import { UnitStatementModal } from "../unitStProcess/unitModel/UnitStatementModal";
import styles from "./batchMenu.module.css";
import ExtraModal from "../../extra/extraModal/ExtraModal";
import ExtractionModal from "../extractionModal/extractionModel/ExtractionModal";

function BatchMenu() {
  const reducer = (state: BatchStateType, action: any) => {
    switch (action.type) {
      case ACTIONS.ONCHANGE:
        return {
          ...state,
          [action.fieldName]: action.payload,
        };
      case ACTIONS.BATCHOPEN:
        return {
          ...state,
          batchOpen: true,
        };
      case ACTIONS.BATCHCLOSE:
        state = initialValues;
        return {
          ...state,
          batchOpen: false,
        };
      case ACTIONS.PTOPEN:
        return {
          ...state,
          premStOpen: true,
        };
      case ACTIONS.PTCLOSE:
        state = initialValues;
        return {
          ...state,
          premStOpen: false,
        };
      case ACTIONS.RECEIPTOPEN:
        return {
          ...state,
          receiptOpen: true,
        };
      case ACTIONS.RECEIPTCLOSE:
        state = initialValues;
        return {
          ...state,
          receiptOpen: false,
        };
      case ACTIONS.UNITSTOPEN:
        return {
          ...state,
          unitStOpen: true,
        };
      case ACTIONS.UNITSTCLOSE:
        state = initialValues;
        return {
          ...state,
          unitStOpen: false,
        };
      case ACTIONS.EXTRACTOPEN:
        return {
          ...state,
          extractionOpen: true,
        };
      case ACTIONS.EXTRACTCLOSE:
        state = initialValues;
        return {
          ...state,
          extractionFalse: false,
        };

      default:
        return initialValues;
    }
  };
  let [state, dispatch] = useReducer(reducer, initialValues);

  return (
    <div className={styles["batch-body"]}>
      <h1 id={styles["batch-title"]}>Batch Menu</h1>
      <span className={styles["batch-main"]}>
        <Paper
          onClick={() => dispatch({ type: ACTIONS.BATCHOPEN })}
          elevation={12}
          className={`${styles["batch-menus"]} ${styles["batch"]}`}
        >
          <h2>Allocate Rev Bonus by Date</h2>
        </Paper>
        <Paper
          onClick={() => dispatch({ type: ACTIONS.PTOPEN })}
          elevation={12}
          className={`${styles["batch-menus"]} ${styles["premst"]}`}
        >
          <h2>Premium Statement by Date</h2>
        </Paper>
      </span>
      <span className={styles["batch-main"]}>
        <Paper
          onClick={() => dispatch({ type: ACTIONS.RECEIPTOPEN })}
          elevation={12}
          className={`${styles["batch-menus"]} ${styles["receipt"]}`}
        >
          <h2>Receipt Create By Bank</h2>
        </Paper>
        <Paper
          onClick={() => dispatch({ type: ACTIONS.UNITSTOPEN })}
          elevation={12}
          className={`${styles["batch-menus"]} ${styles["unitst"]}`}
        >
          <h2>UnitStatement by Date</h2>
        </Paper>
        <Paper
          onClick={() => dispatch({ type: ACTIONS.EXTRACTOPEN })}
          elevation={12}
          className={`${styles["batch-menus"]} ${styles["extract"]}`}
        >
          <h2>Extraction by Date</h2>
        </Paper>
      </span>
      <BatchModal state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
      <PremiumStatementModal
        state={state}
        dispatch={dispatch}
        ACTIONS={ACTIONS}
      />
      <ReceiptModal state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
      <UnitStatementModal state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
      <ExtractionModal state={state} dispatch={dispatch} ACTIONS={ACTIONS} />
    </div>
  );
}

export default BatchMenu;
