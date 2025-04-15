import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

import PlantContext from "../../context/PlantContext";

import PlantSettings from "../PlantSetting/PlantSettings";
import PlantDisOwn from "../PlantDisOwn/PlantDisOwn";

const PlantHeader = () => {
  const navigate = useNavigate();
  const { serialID } = useParams();
  const { getPlantName } = useContext(PlantContext);

  return (
    <div className="d-flex align-items-center">
      <h1>Plant Dashboard - {getPlantName(serialID)}</h1>
      <div className="ms-auto d-flex gap-2">
        <Tooltip title="Detailed data">
          <Button
            onClick={() => navigate("/plants/" + serialID + "/data")}
            sx={{
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            <RemoveRedEyeIcon sx={{ color: "white" }} />
          </Button>
        </Tooltip>
        <PlantSettings />
        <PlantDisOwn />
      </div>
    </div>
  );
};

export default PlantHeader;
