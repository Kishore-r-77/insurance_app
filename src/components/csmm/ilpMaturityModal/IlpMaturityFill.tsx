import { FormControl, MenuItem, Select, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomModal from "../../../utilities/modal/CustomModal";
import CustomfillIlpMaturityModal from "./CustomfillIlpMaturityModal";

function IlpMaturityFill({
    open,
    handleClose,
    handleFormSubmit,
    MaturityHobj,
    saveMaturity,
    handlereasonchange,
    reasondes
}: any) {
    const infoTitle: string = "IlpMaturity";
    const size: string = "xl";

    return (
        <div>
            <CustomfillIlpMaturityModal
                size={size}
                open={open}
                handleClose={handleClose}
                title={infoTitle}
                handleFormSubmit={saveMaturity}
            >
                <form>
                    <Grid2 container spacing={2}>
                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                id="AplAmount"
                                name="AplAmount"
                                value={MaturityHobj?.AplAmount}
                                placeholder="AplAmount"
                                label="AplAmount"
                                inputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                            />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                id="LoanAmount"
                                name="LoanAmount"
                                value={MaturityHobj?.LoanAmount}
                                placeholder="LoanAmount"
                                label="LoanAmount"
                                inputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                            />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                id="PolicyDepost"
                                name="PolicyDepost"
                                value={MaturityHobj?.PolicyDepost}
                                placeholder="PolicyDepost"
                                label="PolicyDepost"
                                inputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                            />
                        </Grid2>

                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                id="CashDeposit"
                                name="CashDeposit"
                                value={MaturityHobj?.CashDeposit}
                                placeholder="CashDeposit"
                                label="CashDeposit"
                                inputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                            />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                id="RefundPrem"
                                name="RefundPrem"
                                value={MaturityHobj?.RefundPrem}
                                placeholder="RefundPrem"
                                label="RefundPrem"
                                inputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                            />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                id="PremTolerance"
                                name="PremTolerance"
                                value={MaturityHobj?.PremTolerance}
                                placeholder="PremTolerance"
                                label="PremTolerance"
                                inputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                            />
                        </Grid2>

                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                id="AdjustedAmount"
                                name="AdjustedAmount"
                                value={MaturityHobj?.AdjustedAmount}
                                placeholder="AdjustedAmount"
                                label="AdjustedAmount"
                                inputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                            />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                id="TotalMaturityPayable"
                                name="TotalMaturityPayable"
                                value={MaturityHobj?.TotalMaturityPayable}
                                placeholder="TotalMaturityPayable"
                                label="Total Maturity Payable"
                                inputProps={{ readOnly: true }}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin="dense"
                            />
                        </Grid2>
                        <Grid2 xs={8} md={6} lg={4}>
                            <TextField
                                multiline
                                id="ReasonDescription"
                                name="ReasonDescription"
                                value={reasondes.ReasonDescription}
                                placeholder="Reason Description"
                                label="Reseon Description"
                                fullWidth
                                margin="dense"
                                onChange={(e) => handlereasonchange(e)}
                            />
                        </Grid2>
                    </Grid2>
                </form>
            </CustomfillIlpMaturityModal>
        </div>
    );
}
export default IlpMaturityFill;
