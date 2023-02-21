import { Box, Paper } from "@mui/material";
import { ReactNode } from "react";
import styles from "./authform.module.css";

type authform = {
  children: ReactNode;
};

function AuthForm({ children }: authform) {
  return (
    <div className={styles.background}>
      <Paper elevation={12} className={styles.container}>
        <Box>{children}</Box>
      </Paper>
    </div>
  );
}

export default AuthForm;
