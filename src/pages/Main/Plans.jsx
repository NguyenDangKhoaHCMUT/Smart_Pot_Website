import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PlanListElement from "../../components/Plans/PlanListElement";

import PlantContext from "../../context/PlantContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Typography from "@mui/material/Typography";
import YardIcon from '@mui/icons-material/Yard';
import TextField from '@mui/material/TextField';
import CircularProgress from "@mui/material/CircularProgress";
import theme from "../../theme";

const Plans = () => {
  const navigate = useNavigate();
  const { sendRequest, planList } = useContext(PlantContext);
  const [sortedPlanList, setSortedPlanList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    sendRequest(0, "get_all_plans");
  }, []);

  useEffect(() => {
    setSortedPlanList(planList);
  }, [planList]);

  useEffect(() => {
    const filteredPlans = planList.filter((plan) =>
      JSON.parse(plan.JSON).Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSortedPlanList(filteredPlans);
  }, [searchTerm, planList]);

  if (!planList.length) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            height: theme.trello.homeHeight,
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        backgroundColor: "background.main",
        width: "100%",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          p: 2,
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "primary.main" }}
            >
              <YardIcon fontSize="large" /> Your Plans
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Search */}
            <TextField
              id="outlined-search"
              label="Search by Name"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              onClick={() => navigate("/plans/createplan")}
              variant="contained"
              endIcon={<AddIcon />}
            >
              Add plan
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            overflowY: "auto",
            overflowX: "hidden",
            mt: 2,
            border: "3px solid",
            borderColor: "primary.main",
            borderRadius: "0.375rem",
            p: 1,
          }}
        >
          <PlanListElement
            sortedPlanList={sortedPlanList}
            setSortedPlanList={setSortedPlanList}
            searchTerm={searchTerm}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Plans;
