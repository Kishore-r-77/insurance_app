import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { TreeItem, TreeView } from "@mui/x-tree-view";
import { FormControl, MenuItem, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import moment from "moment";
import { useEffect, useLayoutEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { useAppSelector } from "../../../redux/app/hooks";
import Notification from "../../../utilities/Notification/Notification";
import CustomModal from "../../../utilities/modal/CustomModal";
import { useBusinessDate } from "../../contexts/BusinessDateContext";
import CustomIlpMaturityModal from "./CustomIlpMaturityModal";
import styles from "./IlpMaturityModal.module.css";
import IlpMaturityFill from "./IlpMaturityFill";


function IlpMaturityModal({
    open,
    handleClose,
    data,
    completed,
    setcompleted,
    getData,
    polid,
}: any) {
    const size: string = "xl";
    const title: string = "ILP Maturity";
    const [ilpfunc, setilpfunc] = useState<any>("Calculate");
    const [notify, setNotify] = useState({
        isOpen: false,
        message: "",
        type: "",
    });
    const { businessDate } = useBusinessDate();

    const [ilpBenefits, setilpBenefits] = useState<any>([]);
    const [funds, setfunds] = useState<any>([]);

    const [ilpMaturityfillOpen, setilpMaturityfillOpen] = useState(false);

    const fillMaturityOpen = () => {
        setilpMaturityfillOpen(true);
        postMaturity()
    };

    const fillMaturityClose = () => {
        setilpMaturityfillOpen(false);
    };


    useEffect(() => {
        return () => { };
    }, [open === false]);

    const getbenefitsbypol = () => {
        axios
            .get(`http://localhost:3000/api/v1/nbservices/benefitgetbypol/${polid}`, {
                withCredentials: true,
            })
            .then((resp) => {
                setilpBenefits(resp.data?.Benefit);
            });
    };

    const getfundsbybenefitandpol = () => {
        axios
            .get(
                `http://localhost:3000/api/v1/ilpservices/ilpsummarybypol/${polid}`,
                {
                    withCredentials: true,
                }
            )
            .then((resp) => {
                setfunds(resp?.data?.IlpSummary);

            });
    };
    const companyId = useAppSelector(
        (state) => state.users.user.message.companyId
    );

    const today = new Date();
    const yyyy = today.getFullYear();
    let mm: any = today.getMonth() + 1; // Months start at 0!
    let dd: any = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;

    const [MaturityDobj, setMaturityDobj] = useState<any>([]);
    const [MaturityHobj, setMaturityHobj] = useState<any>({})
    const postMaturity = () => {
        axios
            .post(
                `http://localhost:3000/api/v1/customerservice/ilpmatcreate/${polid}`,
                {
                    CompanyID: companyId,
                    PolicyID: polid,
                    EffectiveDate: currentDate.EffectiveDate?.length === 0
                        ? ""
                        : moment(currentDate.EffectiveDate).format("YYYYMMDD").toString(),

                    Function: "Fill",
                    MaturityDs: [
                        {

                        }
                    ],
                },
                { withCredentials: true }
            )
            .then((resp) => {
                setMaturityDobj(resp.data?.MaturityDs);
                setMaturityHobj(resp.data?.MaturityH);
                setNotify({
                    isOpen: true,
                    message: "Calculated Successfully",
                    type: "success",
                });
            })
            .catch((err) =>
                setNotify({
                    isOpen: true,
                    message: err?.response?.data?.error,
                    type: "error",
                })
            );
    };
    const saveMaturity = () => {
        axios
            .post(
                `http://localhost:3000/api/v1/customerservice/ilpmatcreate/${polid}`,
                {
                    MaturityDs: [
                        {
                            CompanyID: companyId,
                            PolicyID: polid,
                            ClientID: MaturityDobj[0].ClientID,
                            BenefitID: MaturityDobj[0].BenefitID,
                            BCoverage: MaturityDobj[0].BCoverage,
                            BSumAssured: MaturityDobj[0].BSumAssured,
                            MaturityAmount: MaturityDobj[0].MaturityAmount,
                            RevBonus: MaturityDobj[0].RevBonus,
                            AddlBonus: MaturityDobj[0].AddlBonus,
                            TerminalBonus: MaturityDobj[0].TerminalBonus,
                            InterimBonus: MaturityDobj[0].InterimBonus,
                            LoyaltyBonus: MaturityDobj[0].LoyaltyBonus,
                            OtherAmount: MaturityDobj[0].OtherAmount,
                            AccumDividend: MaturityDobj[0].AccumDividend,
                            AccumDivInt: MaturityDobj[0].AccumDivInt,
                            TotalFundValue: MaturityDobj[0].TotalFundValue,
                            TotalMaturityAmount: MaturityDobj[0].TotalMaturityAmount,
                        }
                    ],
                    CompanyID: MaturityHobj.CompanyID,
                    PolicyID: MaturityHobj.PolicyID,
                    ClientID: MaturityHobj.ClientID,
                    EffectiveDate: MaturityHobj.EffectiveDate,
                    MaturityDate: MaturityHobj.MaturityDate,
                    Status: MaturityHobj.Status,
                    BillDate: MaturityHobj.BillDate,
                    PaidToDate: MaturityHobj.PaidToDate,
                    Product: MaturityHobj.Product,
                    AplAmount: MaturityHobj.AplAmount,
                    LoanAmount: MaturityHobj.LoanAmount,
                    PolicyDepost: MaturityHobj.PolicyDepost,
                    CashDeposit: MaturityHobj.CashDeposit,
                    RefundPrem: MaturityHobj.RefundPrem,
                    PremTolerance: MaturityHobj.PremTolerance,
                    TotalMaturityPayable: MaturityHobj.TotalMaturityPayable,
                    AdjustedAmount: MaturityHobj.AdjustedAmount,
                    ReasonDescription: reasondes.ReasonDescription,
                    Function: "Commit",
                },
                { withCredentials: true }
            )

            .then((resp) => {
                fillMaturityClose();
                getData();
                handleClose();
                setNotify({
                    isOpen: true,
                    message: `Surrender record  id: ${resp.data?.Created}`,
                    type: "success",
                });
            })
            .catch((err) =>
                setNotify({
                    isOpen: true,
                    message: err?.response?.data?.error,
                    type: "error",
                })
            );
    };

    const [currentDate, setcurrentDate] = useState<any>("");

    const handleCurrentDate = (date: any) => {
        setcurrentDate((prev: any) => ({ ...prev, EffectiveDate: date }));
    };
    const [reasondes, setreasondes] = useState<any>("")
    const handlereasonchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setreasondes((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    useLayoutEffect(() => {
        getbenefitsbypol();
        return () => { };
    }, [open]);

    useLayoutEffect(() => {
        getfundsbybenefitandpol();
        return () => { };
    }, [open]);

    useEffect(() => {
        setfunds([]);
        setilpfunc("Calculate");
        setcurrentDate((prev: any) => ({
            ...prev,
            EffectiveDate: businessDate,
        }));

        return () => { };
    }, [open === false]);


    return (
        <div>
            <CustomIlpMaturityModal
                open={open}
                handleClose={handleClose}
                handleFormSubmit={fillMaturityOpen}
                size={size}
                title={title}
                completed={completed}
            // isResult={isResult}
            >
                <TreeView
                    style={{ width: "100%", margin: "0px auto" }}
                    aria-label="file system navigator"
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpandIcon={<ChevronRightIcon />}
                    defaultExpanded={["1", "2", "3"]}
                >
                    <TreeItem nodeId="1" label={`Policies`}>
                        <Grid2 container spacing={2}>
                            <Grid2 lg={4}>
                                <TextField
                                    id="PolicyID"
                                    name="PolicyID"
                                    value={data?.PolicyId}
                                    placeholder="PolicyID"
                                    label="PolicyID"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                            <Grid2 lg={4}>
                                <TextField
                                    id="OwnerName"
                                    name="OwnerName"
                                    value={data?.OwnerName}
                                    placeholder="OwnerName"
                                    label="OwnerName"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                            <Grid2 lg={4}>
                                <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DesktopDatePicker
                                            label="Current Date"
                                            inputFormat="DD/MM/YYYY"
                                            value={currentDate.EffectiveDate}
                                            onChange={(date: any) => handleCurrentDate(date?.$d)}
                                            renderInput={(params) => (
                                                <TextField {...params} error={false} />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid2>
                            <Grid2 lg={4}>
                                <TextField
                                    id="Premium Risk Cessastion Date"
                                    name="Premium Risk Cessastion Date"
                                    value={data?.Rcd}
                                    placeholder="Premium Risk Cessastion Date"
                                    label="Premium Risk Cessastion Date"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                            <Grid2 lg={4}>
                                <TextField
                                    id="Product"
                                    name="Product"
                                    value={data?.Product}
                                    placeholder="Product"
                                    label="Product"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                            <Grid2 lg={4}>
                                <TextField
                                    id="Intallment Premium"
                                    name="Intallment Premium"
                                    value={data?.InstalmentPrem}
                                    placeholder="Intallment Premium"
                                    label="Intallment Premium"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                            <Grid2 lg={4}>
                                <TextField
                                    id="Frequency"
                                    name="Frequency"
                                    value={data?.Frequency}
                                    placeholder="Frequency"
                                    label="Frequency"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                            <Grid2 lg={4}>
                                <TextField
                                    id="Bill To Date"
                                    name="Bill To Date"
                                    value={data?.Btdate}
                                    placeholder="Bill To Date"
                                    label="Bill To Date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                            <Grid2 lg={4}>
                                <TextField
                                    id="Paid To Date"
                                    name="Paid To Date"
                                    value={data?.Ptdate}
                                    placeholder="Paid To Date"
                                    label="Paid To Date"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2> <Grid2 lg={4}>
                                <TextField
                                    id="Paid To Date"
                                    name="Paid To Date"
                                    value={data?.Ptdate}
                                    placeholder="Paid To Date"
                                    label="Paid To Date"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                            {/* <Grid2 lg={4}>
                                <TextField
                                    id="PolicyDeposit"
                                    name="PolicyDeposit"
                                    value={data?.PolicyDeposit}
                                    placeholder="PolicyDeposit"
                                    label="PolicyDeposit"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2> */}
                            <Grid2 lg={4}>
                                <TextField
                                    id="Status"
                                    name="Status"
                                    value={data?.Status}
                                    placeholder="SwitchFee"
                                    label="PolicyStatus"
                                    fullWidth
                                    inputProps={{ readOnly: true }}
                                    InputLabelProps={{ shrink: true }}
                                    margin="dense"
                                ></TextField>
                            </Grid2>
                        </Grid2>
                    </TreeItem>
                    <TreeItem nodeId="2" label={`Benefits`}>
                        <Table
                            striped
                            bordered
                            hover
                            style={{
                                width: "100%",
                                tableLayout: "fixed",
                                position: "relative",
                            }}
                        >
                            <thead className={styles.header}>
                                <tr>
                                    <th style={{ width: "100%" }}>Policy ID</th>
                                    <th style={{ width: "100%" }}>Benefit ID</th>
                                    <th style={{ width: "100%" }}>Client ID</th>
                                    <th style={{ width: "100%" }}>BCoverage</th>
                                    <th style={{ width: "100%" }}>BStart Date</th>
                                    <th style={{ width: "100%" }}>BSumAssured</th>
                                    <th style={{ width: "100%" }}>BTerm</th>
                                    <th style={{ width: "100%" }}>BRiskCessDate</th>
                                    <th style={{ width: "100%" }}>BPTerm</th>
                                    <th style={{ width: "100%" }}>BPrem</th>
                                    <th style={{ width: "100%" }}>BPremCessDate</th>
                                </tr>
                            </thead>
                            {ilpBenefits?.map((val: any, index: number) => {
                                return (
                                    <>
                                        <CustomModal size="xl"></CustomModal>
                                        <tr>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.PolicyID}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val.ID}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.ClientID}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.BCoverage}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={moment(val?.BStartDate).format("DD-MM-YYYY")}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    name="BSumAssured"
                                                    disabled={val?.Select === ""}
                                                    style={{
                                                        backgroundColor:
                                                            val.Select === "X" ? "#caccca" : "",
                                                    }}
                                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    //     handleChange(e, index)
                                                    // }
                                                    value={val?.BSumAssured}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    name="BTerm"
                                                    disabled={val?.Select === ""}
                                                    style={{
                                                        backgroundColor:
                                                            val.Select === "X" ? "#caccca" : "",
                                                    }}
                                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    //     handleChange(e, index)
                                                    // }
                                                    value={val?.BTerm}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    name="BPTerm"
                                                    disabled={val?.Select === ""}
                                                    style={{
                                                        backgroundColor:
                                                            val.Select === "X" ? "#caccca" : "",
                                                    }}
                                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    //     handleChange(e, index)
                                                    // }
                                                    value={moment(val?.BRiskCessDate).format("DD-MM-YYYY")}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    name="BPrem"
                                                    disabled={val?.Select === ""}
                                                    style={{
                                                        backgroundColor:
                                                            val.Select === "X" ? "#caccca" : "",
                                                    }}
                                                    // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                    //     handleChange(e, index)
                                                    // }
                                                    value={val?.BPTerm}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.BPrem}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={moment(val?.BPremCessDate).format("DD-MM-YYYY")}
                                                />
                                            </td>
                                        </tr>
                                    </>
                                );
                            })}
                        </Table>
                    </TreeItem>
                    <TreeItem nodeId="3" label={`FundDetails`}>
                        <Table
                            striped
                            bordered
                            hover
                            style={{
                                width: "100%",
                                tableLayout: "fixed",
                                position: "relative",
                            }}
                        >
                            <thead className={styles.header}>
                                <tr>
                                    <th style={{ width: "100%" }}>Policy ID</th>
                                    <th style={{ width: "100%" }}>Benefit ID</th>
                                    <th style={{ width: "100%" }}>FundCode</th>
                                    <th style={{ width: "100%" }}>FundType</th>
                                    <th style={{ width: "100%" }}>FundUnits</th>
                                    <th style={{ width: "100%" }}>FundPrice</th>
                                    <th style={{ width: "100%" }}>opfundvalue</th>
                                </tr>
                            </thead>
                            {funds?.map((val: any, index: number) => {
                                return (
                                    <>
                                        <CustomModal size="xl"></CustomModal>
                                        <tr>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.PolicyID}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val.BenefitID}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.FundCode}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.FundType}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.FundUnits}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.FundPrice}
                                                />
                                            </td>
                                            <td className={styles["td-class"]}>
                                                <input
                                                    className={styles["input-form"]}
                                                    type="text"
                                                    disabled
                                                    value={val?.opfundvalue}
                                                />
                                            </td>

                                        </tr>
                                    </>
                                );
                            })}
                        </Table>
                    </TreeItem>
                </TreeView>
            </CustomIlpMaturityModal>
            <Notification notify={notify} setNotify={setNotify} />
            <IlpMaturityFill
                open={ilpMaturityfillOpen}
                handleClose={fillMaturityClose}
                MaturityDobj={MaturityDobj}
                MaturityHobj={MaturityHobj}
                saveMaturity={saveMaturity}
                handlereasonchange={handlereasonchange}
                reasondes={reasondes}
            />
        </div>
    );
}

export default IlpMaturityModal;
