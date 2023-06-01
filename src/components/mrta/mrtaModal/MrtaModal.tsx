// import {
//   FormControl,
//   InputAdornment,
//   MenuItem,
//   TextField,
// } from "@mui/material";
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import React, { useEffect, useState } from "react";
// import CustomModal from "../../../utilities/modal/CustomModal";
// import { useAppSelector } from "../../../redux/app/hooks";

// import { getApi } from "/src/components/admin/companies/companiesApis/companiesApis";


// import styles from "./mrtaModal.module.css";

// //Attention: Check the path below 
// import { MrtaModalType } from "../../../reducerUtilities/types/mrta/mrtaTypes";
// import { paramItem } from "../mrtaApi/mrtaApis";
// // *** Attention: Check the path and change it if required ***
// import Policy from "../../policy/Policy";
// import Client from "../../clientDetails/client/Client";
// function MrtaModal({
//   state,
//   record,
//   dispatch,
//   ACTIONS,
//   handleFormSubmit,
// }: MrtaModalType) {
//   const addTitle: string = "Mrta Add"; 
//   const editTitle: string = "Mrta Edit";
//   const infoTitle: string = "Mrta Info";
//   const size: string = "x1";


//     // ,[])


//   const companyId = useAppSelector(
//     (state) => state.users.user.message.companyId
//   );

//   const languageId = useAppSelector(
//     (state) => state.users.user.message.languageId
//   );


//   const [pproductData, setPproductData] = useState([]);
//   const getPproduct= (
//     companyId: number,
//     name: string,
//     languageId: number
//   ) => {
//     paramItem(companyId, name, languageId)
//       .then((resp) => {
//         setPproductData(resp.data.data);
//         return resp.data.data;
//       })
//       .catch((err) => err);
//       };



//   const [bcoverageData, setBcoverageData] = useState([]);
//   const getBcoverage      = (
//     companyId: number,
//     name: string,
//     languageId: number
//   ) => {
//     paramItem(companyId, name, languageId)
//       .then((resp) => {
//         setBcoverageData(resp.data.data);
//         return resp.data.data;
//       })
//       .catch((err) => err);
//       };


//   useEffect(() => {
//     getPproduct(companyId, "Q0005", languageId);
//     getBcoverage      (companyId, "Q0011", languageId);

//     return () => {};
//   }, []);

// // *** Attention: Check the Lookup table  OPenFunc details below ***
//   const policyOpenFunc = (item: any) => {
//     if (state.addOpen) {
//       state.PolicyID = item.ID;
//     } else record.PolicyID = item.ID;
//     dispatch({ type: ACTIONS.POLICYCLOSE });
//   };

//   const clientOpenFunc = (item: any) => {
//     if (state.addOpen) {
//       state.Clientid        = item.ID;
//     } else record.Clientid        = item.ID;
//     dispatch({ type: ACTIONS.CLIENTID.CLOSE });
//   };

//   return (
//     <div className={styles.modal}>
//       <CustomModal
//         open={
//           state.addOpen
//             ? state.addOpen
//             : state.editOpen
//             ? state.editOpen
//             : state.infoOpen
//         }
// 		size={size}
//         handleClose={            state.policyOpen
//               ? () => dispatch({ type: ACTIONS.POLICYCLOSE })
//               :

//             state.clientOpen
//               ? () => dispatch({ type: ACTIONS.CLIENTCLOSE })
//               :

//           state.addOpen
//             ? () => dispatch({ type: ACTIONS.ADDCLOSE })
//             : state.editOpen
//             ? () => dispatch({ type: ACTIONS.EDITCLOSE })
//             : () => dispatch({ type: ACTIONS.INFOCLOSE })
//         }
//         title={
//           state.addOpen
//             ? addTitle
//             : state.editOpen
//             ? editTitle
//             : state.infoOpen
//             ? infoTitle
//             : null
//         }
//         ACTIONS={ACTIONS}
//         handleFormSubmit={() => handleFormSubmit()}
//       >
//         <form>
//           <Grid2 container spacing={2}>
// // *** Attention: Check the below Lookup modal function  details ***
//             {state.policyOpen ? (
//               <Policy modalFunc={policyOpenFunc} />
//             ) : 
//             state.clientOpen ? (
//               <Client modalFunc={clientOpenFunc} />
//             ) : 
//                 (
//               <>

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 InputProps={{ readOnly: true }}
//                 id="Benefitid      "
//                 name="Benefitid      "
//                 // Attention: *** Check the value details  ***
//                 value={benefitidData?.BenefitidName}
//                 placeholder="Benefit ID"
//                 label="Benefit ID"
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               />
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 InputProps={{ readOnly: true }}
//                 id="PolicyID"
//                 name="PolicyID"
//                 placeholder="Policy Number"
//                 label="Policy Number"
//                 // Attention: *** Check the value details  ***
//                 onClick={() => dispatch({ type: ACTIONS.POLICYOPEN })}
//                     value={
//                       state.addOpen
//                         ? state.PolicyID
//                         : record.PolicyID
//                     }
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "PolicyID",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               />
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 select
//                 id="Pproduct"
//                 name="Pproduct"
//                     value={
//                       state.addOpen
//                         ? state.Pproduct
//                         : record.Pproduct
//                     }
//                 placeholder="Product Code"
//                 label="Product Code"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE 
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "Pproduct",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               >
//                 {pproductData.map((val: any) => (
//                   <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 select
//                 id="Bcoverage      "
//                 name="Bcoverage      "
//                     value={
//                       state.addOpen
//                         ? state.Bcoverage      
//                         : record.Bcoverage      
//                     }
//                 placeholder="Coverage Code"
//                 label="Coverage Code"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE 
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "Bcoverage      ",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               >
//                 {bcoverageData.map((val: any) => (
//                   <MenuItem value={val.item}>{val.shortdesc}</MenuItem>
//                 ))}
//               </TextField>
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 InputProps={{ readOnly: true }}
//                 id="Clientid       "
//                 name="Clientid       "
//                 placeholder="Client ID"
//                 label="Client ID"
//                 // Attention: *** Check the value details  ***
//                 onClick={() => dispatch({ type: ACTIONS.CLIENTOPEN })}
//                     value={
//                       state.addOpen
//                         ? state.Clientid       
//                         : record.Clientid       
//                     }
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "Clientid       ",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               />
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <FormControl style={{ marginTop: "0.5rem" }} fullWidth>
//                 <LocalizationProvider dateAdapter={AdapterDayjs}>
//                   <DesktopDatePicker
//                     readOnly={state.infoOpen}
//                     label="Start Date"
//                     inputFormat="DD/MM/YYYY"
//                     value={
//                       state.addOpen
//                         ? state.Bstartdate
//                         : record.Bstartdate
//                     }
//                     onChange={(
//                       date: React.ChangeEvent<HTMLInputElement> | any
//                     ) =>
//                       dispatch({
//                         type: state.addOpen
//                           ? ACTIONS.ONCHANGE
//                           : ACTIONS.EDITCHANGE,
//                         payload: date.$d,
//                         fieldName: "Bstartdate",
//                       })
//                     }
//                     renderInput={(params) => <TextField {...params} />}
//                   />
//                 </LocalizationProvider>
//               </FormControl>
//             </Grid2>

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 type="number"
//                 //InputProps={{
//                   //startAdornment: (
//                     //<InputAdornment position="start">+91</InputAdornment>
//                   // ),
//                 //}}
//                 id="Bterm           "
//                 name="Bterm           "
//                     value={
//                       state.addOpen
//                         ? state.Bterm           
//                         : record.Bterm           
//                     }
//                 placeholder="Term"
//                 label="Term"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE 
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "Bterm           ",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               />
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 type="number"
//                 //InputProps={{
//                   //startAdornment: (
//                     //<InputAdornment position="start">+91</InputAdornment>
//                   // ),
//                 //}}
//                 id="Prempayingterm "
//                 name="Prempayingterm "
//                     value={
//                       state.addOpen
//                         ? state.Prempayingterm 
//                         : record.Prempayingterm 
//                     }
//                 placeholder="Premium Paying Term"
//                 label="Premium Paying Term"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE 
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "Prempayingterm ",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               />
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 type="number"
//                 //InputProps={{
//                   //startAdornment: (
//                     //<InputAdornment position="start">+91</InputAdornment>
//                   // ),
//                 //}}
//                 id="Bsumassured"
//                 name="Bsumassured"
//                     value={
//                       state.addOpen
//                         ? state.Bsumassured
//                         : record.Bsumassured
//                     }
//                 placeholder="Initial Sum Assured"
//                 label="Initial Sum Assured"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE 
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "Bsumassured",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               />
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 type="number"
//                 //InputProps={{
//                   //startAdornment: (
//                     //<InputAdornment position="start">+91</InputAdornment>
//                   // ),
//                 //}}
//                 id="Interest       "
//                 name="Interest       "
//                     value={
//                       state.addOpen
//                         ? state.Interest       
//                         : record.Interest       
//                     }
//                 placeholder="Interest Rate"
//                 label="Interest Rate"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE 
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "Interest       ",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               />
//             </Grid2> 

//             <Grid2 xs={8} md={6} lg={4}>
//               <TextField
//                 type="number"
//                 //InputProps={{
//                   //startAdornment: (
//                     //<InputAdornment position="start">+91</InputAdornment>
//                   // ),
//                 //}}
//                 id="Interimperiod  "
//                 name="Interimperiod  "
//                     value={
//                       state.addOpen
//                         ? state.Interimperiod  
//                         : record.Interimperiod  
//                     }
//                 placeholder="Interim Period"
//                 label="Interim Period"
//                 onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//                   dispatch({
//                     type: state.addOpen
//                       ? ACTIONS.ONCHANGE 
//                       : ACTIONS.EDITCHANGE,
//                     payload: e.target.value,
//                     fieldName: "Interimperiod  ",
//                   })
//                 }
//                 fullWidth
//                 inputProps={{ readOnly: state.infoOpen }}
//                 margin="dense"
//               />
//             </Grid2> 

//               </>
//             )}
//           </Grid2>
//         </form>
//       </CustomModal>
//     </div>
//   );
// }
// export default MrtaModal;

