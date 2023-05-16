import React, { useEffect, useState } from "react";
import CustomModal from "../../../utilities/modal/CustomModal";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { freqItems } from "../../clientDetails/client/clientApis/clientApis";
import { useAppSelector } from "../../../redux/app/hooks";
import CustomFreqChangeModal from "./CustomFreqChangeModal";
import ResultModal from "./ResultModal";

function FreqChangeModal({ open, handleClose, policyId }: any) {
  const size: string = "xl";
  const title: string = "Frequency Change";
  const [frequency, setfrequency] = useState<any>("");
  const [func, setfunc] = useState<any>("Calculate");
  const [premium, setpremium] = useState<any>("");

  const [result, setresult] = useState("");

  const getFreqChange = () => {
    axios
      .post(
        `http://localhost:3000/api/v1/deathservices/changefreq`,
        {
          PolicyID: policyId,
          Frequency: frequency,
          Function: func,
          Premium: parseInt(premium),
        },
        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setresult(resp.data?.result);
        setIsResult(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [policyData, setpolicyData] = useState<any>("");

  const [isPolicy, setisPolicy] = useState(false);

  const getByPolicy = () => {
    axios
      .get(
        `http://localhost:3000/api/v1/nbservices/policyget/${policyId}`,

        {
          withCredentials: true,
        }
      )
      .then((resp) => {
        setpolicyData(resp.data?.Policy);
        setisPolicy(!isPolicy);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const [pFreqData, setPFreqData] = useState([]);
  const getPFreq = (
    companyId: number,
    name: string,
    item: string,
    languageId: number,
    func: string
  ) => {
    freqItems(companyId, name, item, languageId, func)
      .then((resp) => {
        setPFreqData(resp.data?.AllowedFrequencies);
        return resp.data?.AllowedFrequencies;
      })
      .catch((err) => err);
  };

  useEffect(() => {
    getByPolicy();

    return () => {};
  }, [open]);
  const languageId = useAppSelector(
    (state) => state.users.user.message.languageId
  );

  useEffect(() => {
    getPFreq(
      policyData?.CompanyID,
      "Q0005",
      policyData?.PProduct,
      languageId,
      "FREQ"
    );
    return () => {};
  }, [isPolicy]);

  const [isResult, setIsResult] = useState(false);

  const resultOpen = () => {
    setIsResult(true);
  };
  const resultClose = () => {
    setIsResult(true);
  };

  return (
    <div>
      <CustomFreqChangeModal
        open={open}
        handleClose={handleClose}
        handleFormSubmit={getFreqChange}
        size={size}
        title={title}
      >
        <Grid2 container spacing={2}>
          <Grid2 lg={3}>
            <TextField
              id="PolicyID"
              name="PolicyID"
              value={policyId}
              placeholder="PolicyID"
              label="PolicyID"
              fullWidth
              inputProps={{ readOnly: true }}
              InputLabelProps={{ shrink: true }}
              margin="dense"
            ></TextField>
          </Grid2>
          <Grid2 lg={3}>
            <TextField
              select
              id="Frequency"
              name="Frequency"
              value={frequency}
              placeholder="Frequency"
              onChange={(e) => setfrequency(e.target.value)}
              label="Frequency"
              fullWidth
              margin="dense"
            >
              {pFreqData.map((val: any) => (
                <MenuItem value={val}>{val}</MenuItem>
              ))}
            </TextField>
          </Grid2>
          <Grid2 lg={3}>
            <TextField
              id="Function"
              name="Function"
              value={func}
              onChange={(e) => setfunc(e.target.value)}
              placeholder="Function"
              inputProps={{ readOnly: true }}
              label="Function"
              fullWidth
              margin="dense"
            />
          </Grid2>
          <Grid2 lg={3}>
            <TextField
              id="Premium"
              name="Premium"
              value={premium}
              onChange={(e) => setpremium(e.target.value)}
              placeholder="Premium"
              label="Premium"
              fullWidth
              margin="dense"
            />
          </Grid2>
        </Grid2>
      </CustomFreqChangeModal>
      <ResultModal open={isResult} handleClose={resultClose} record={result} />
    </div>
  );
}

export default FreqChangeModal;
