import React, { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import DashboardIcon from '@mui/icons-material/Dashboard';

import PlantSettings from "../PlantSetting/PlantSettings";
import PlantDisOwn from "../PlantDisOwn/PlantDisOwn";

import PlantContext from "../../context/PlantContext";

const PlantHeader = () => {
  const navigate = useNavigate();
  const { serialID } = useParams();
  const { getPlantName } = useContext(PlantContext);

  return (
    <div className="d-flex align-items-center">
      <h1>Plant Data - {getPlantName(serialID)}</h1>
      <div className="ms-auto d-flex gap-2">
        <Tooltip title="Dashboard">
          <Button
            onClick={() => navigate("/plants/" + serialID )}
            sx={{
              backgroundColor: "primary.main",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            <DashboardIcon sx={{ color: "white" }} />
          </Button>
        </Tooltip>
        <PlantSettings />
        <PlantDisOwn />
      </div>
    </div>
  );
};

export default PlantHeader;
