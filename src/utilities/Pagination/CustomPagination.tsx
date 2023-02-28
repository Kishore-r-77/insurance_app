import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { IconButton } from "@mui/material";
import { Form } from "react-bootstrap";
import styles from "./customPagination.module.css";

function CustomPagination({
  pageNum,
  totalPages,
  totalRecords,
  isLast,
  pageSize,
  setpageSize,
  prevPage,
  hidePageSizeChange,
  nexPage,
}: any) {
  return (
    <div>
      <div className={styles.pagination}>
        <h4>Page No: {pageNum}</h4>
        <h4>Total Pages: {totalPages}</h4>
        <h4>Total Elements: {totalRecords}</h4>
        <h4>Last Page: {isLast ? "True" : "False"}</h4>
        {  !hidePageSizeChange &&
        <Form.Select
          size="sm"
          name="pageSize"
          value = {pageSize}
          className={styles["form-select"]}
          onChange={(e: any) => setpageSize(parseInt(e.target.value))}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="25">25</option>
        </Form.Select>
}
        <span>
          <IconButton onClick={prevPage} disabled={pageNum < 1 ? true : false}>
            <ArrowBackIosIcon
              className={pageNum <= 1 ? styles["icon-disabled"] : styles.icon}
            />
          </IconButton>
          <IconButton onClick={nexPage} disabled={isLast}>
            <ArrowForwardIosIcon
              className={isLast ? styles["icon-disabled"] : styles.icon}
            />
          </IconButton>
        </span>
      </div>
    </div>
  );
}

export default CustomPagination;
