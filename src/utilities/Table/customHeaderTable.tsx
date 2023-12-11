import { Paper } from "@mui/material";
import Table from "react-bootstrap/Table";
import styles from "./customHeaderTable.module.css";

function CustomHeaderTable({ data }: any) {
  return (
    <Paper className={styles.paperStyle}>
      <Table striped>
        <thead className={styles.header}>
          <tr>
            {data?.map((value: any, index: number) => (
              <th
                key={index}
                style={{ borderStyle: "none" }}
                className={styles.header}
              >
                {value}
              </th>
            ))}
          </tr>
        </thead>
      </Table>
    </Paper>
  );
}

export default CustomHeaderTable;
