import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SortIcon from "@mui/icons-material/Sort";
import Typography from '@mui/material/Typography';

import PlantContext from "../../context/PlantContext";

const PlanListElement = ({ sortedPlanList, setSortedPlanList, searchTerm }) => {
  const navigate = useNavigate();
  const { sendRequest } = useContext(PlantContext);
  const [sortOrder, setSortOrder] = useState("asc"); // asc for ascending, desc for descending

  const handleDelete = (planID) => {
    sendRequest(planID, "delete_plan");
  };

  const handleCopy = (data) => {
    sendRequest(data, "copy_plan");
  };

  const handleEdit = (planID, planData) => {
    navigate(`/plans/editplan/${planID}`, { state: { planData } });
  };

  const sortBy = (key) => {
    const sorted = [...sortedPlanList].sort((a, b) => {
      const valueA =
        key === "PlantType" || key === "Name"
          ? JSON.parse(a.JSON)[key]
          : JSON.parse(a.JSON).Irrigation[key].length;
      const valueB =
        key === "PlantType" || key === "Name"
          ? JSON.parse(b.JSON)[key]
          : JSON.parse(b.JSON).Irrigation[key].length;

      if (typeof valueA === "string") {
        return sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
    setSortedPlanList(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc"); // Toggle sort order
  };

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'hidden' }}>
      <Table sx={{ minWidth: 650 }} aria-label="plan table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ cursor: "pointer", fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Name
                </Typography>
                <SortIcon
                  onClick={() => sortBy("Name")}
                  fontSize="small"
                  sx={{ mr: 1, transform: sortOrder === "asc" ? "rotate(0deg)" : "rotate(180deg)" }}
                />
              </Box>
            </TableCell>
            <TableCell
              sx={{ cursor: "pointer", fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Plant Type
                </Typography>
                <SortIcon
                  onClick={() => sortBy("PlantType")}
                  fontSize="small"
                  sx={{ mr: 1, transform: sortOrder === "asc" ? "rotate(0deg)" : "rotate(180deg)" }}
                />
              </Box>
            </TableCell>
            <TableCell
              align="center"
              sx={{ cursor: "pointer", fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Schedules
                </Typography>
                <SortIcon
                  onClick={() => sortBy("Schedules")}
                  fontSize="small"
                  sx={{ mr: 1, transform: sortOrder === "asc" ? "rotate(0deg)" : "rotate(180deg)" }}
                />
              </Box>
            </TableCell>
            <TableCell
              align="center"
              sx={{ cursor: "pointer", fontWeight: "bold", borderRight: "1px solid rgba(224, 224, 224, 1)" }}
            >
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Conditions
                </Typography>
                <SortIcon
                  onClick={() => sortBy("Conditions")}
                  fontSize="small"
                  sx={{ mr: 1, transform: sortOrder === "asc" ? "rotate(0deg)" : "rotate(180deg)" }}
                />
              </Box>
            </TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedPlanList.map((plan, index) => {
            const data = JSON.parse(plan.JSON);
            return (
              <TableRow
                key={index}
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 102, 255, 0.1)",
                    cursor: "pointer",
                    scale: 1.01,
                    transition: "all 0.2s ease-in-out",
                  },
                }}
              >
                <TableCell>{highlightText(data.Name, searchTerm)}</TableCell>
                <TableCell>{data.PlantType}</TableCell>
                <TableCell>
                  {data.Irrigation.Schedules.length}
                </TableCell>
                <TableCell>
                  {data.Irrigation.Conditions.length}
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2.5,
                      justifyContent: "right",
                      alignItems: "center",
                      color: "primary.main",
                    }}
                  >
                    <Tooltip title="Edit">
                      <EditIcon
                        onClick={() => handleEdit(plan.id, plan)}
                        sx={{ cursor: "pointer", fontSize: 30 }}
                      />
                    </Tooltip>
                    <Tooltip title="Copy">
                      <ContentCopyIcon
                        onClick={() => handleCopy(data)}
                        sx={{ cursor: "pointer", fontSize: 30 }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete">
                      <DeleteIcon
                        onClick={() => handleDelete(plan.id)}
                        sx={{ cursor: "pointer", fontSize: 30 }}
                      />
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlanListElement;
