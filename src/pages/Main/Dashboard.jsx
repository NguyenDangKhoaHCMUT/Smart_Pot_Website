/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import theme from "../../theme";
import Typography from "@mui/material/Typography";
import { LineChart } from "@mui/x-charts/LineChart";
import { Badge } from "react-bootstrap";

// import FilterAltIcon from "@mui/icons-material/FilterAlt";
// import ButtonMUI from "@mui/material/Button";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";

import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import PlantContext from "../../context/PlantContext";

import { dataset, unhealthyPlants, listPlans } from "../../apis/mock-data.js";

const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <span key={index} style={{ backgroundColor: "yellow" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
};

function Dashboard() {
  // const navigate = useNavigate();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const { plantList, sendRequest } = useContext(PlantContext);

  useEffect(() => {
    sendRequest(null, "get_all_plant");
  }, []);

  const navigate = useNavigate();
  const handleOnClickUnhealthyPlant = (serialID) => {
    console.log("Unhealthy plant clicked:", serialID);
    navigate("/plants/" + serialID);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUnhealthyPlants, setFilteredUnhealthyPlants] = useState([]);

  useEffect(() => {
    if (unhealthyPlants) {
      const filtered = unhealthyPlants.filter((plant) =>
        plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.serialID.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUnhealthyPlants(filtered);
    }
  }, [searchTerm, unhealthyPlants]);

  if (!plantList.length) {
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
        width: "100%",
        overflowY: "auto",
        backgroundColor: "background.main",
        display: "flex",
        flexWrap: "wrap",
        gap: 10,
        p: 4,
        px: 4,
      }}
    >
      {/* Box tren */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
          minHeight: "150px",
        }}
      >
        {/* Healthy Plants and Unhealthy Plants */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 5,
            maxWidth: "100%",
          }}
        >
          <Box
            sx={{
              minWidth: "250px",
              border: "5px solid",
              borderColor: "primary.main",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Healthy Plants
            </Typography>
            <Typography
              variant="h2"
              gutterBottom
              sx={{ color: "primary.main", fontWeight: "bold" }}
            >
              {plantList &&
                unhealthyPlants &&
                plantList?.length - unhealthyPlants?.length}
            </Typography>
          </Box>
          <Box
            sx={{
              minWidth: "250px",
              border: "5px solid",
              borderColor: "primary.main",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" gutterBottom>
              Unhealthy Plants
            </Typography>
            <Typography
              variant="h2"
              gutterBottom
              sx={{ color: "#FF0B55", fontWeight: "bold" }}
            >
              {unhealthyPlants && unhealthyPlants.length}
            </Typography>
          </Box>
        </Box>
        {/* Calendar */}
        <Box
          sx={{
            borderRadius: 3,
            flexGrow: 1,
            height: "350px",
            display: "flex",
            maxWidth: "70%",
            color: "black",
          }}
        >
          <Box
            sx={{
              border: "1px solid #ddd",
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "1px 1px 3px",
            }}
          >
            {/* Title */}
            <Box
              sx={{
                background: "#e6e6e6",
                width: "100%",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                padding: "8px 16px",
                height: "15%",
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                  fontWeight: "bold",
                }}
                variant="h5"
              >
                Plans List
              </Typography>
            </Box>
            {/* Content */}
            <Box
              sx={{
                padding: "16px",
                height: "85%",
                overflowX: "auto",
                overflowY: "hidden",
                maxWidth: "100%",
                backgroundColor: "white",
                display: "flex",
                flexDirection: "row",
                gap: 2,
              }}
            >
              {listPlans &&
                listPlans.before.map((plan, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: "5px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      width: "350px",
                      flex: "0 0 auto",
                      overflowY: "auto",
                      borderRight: "5px solid #ddd",
                    }}
                  >
                    <Typography variant="h6">{plan.name}</Typography>
                    <Typography variant="body2">
                      Plant type: {plan.type}
                    </Typography>
                    <Typography variant="body2">From: {plan.from}</Typography>
                    <Typography variant="body2">To: {plan.to}</Typography>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        p: 1,
                      }}
                    >
                      {plan.plants.map((plant, index) => (
                        <Typography key={index} variant="body2">
                          {plant.name} - {plant.serialID}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                ))}
              <Box
                sx={{
                  borderRadius: "4px",
                  width: "50px",
                  bgcolor: "primary.main",
                  flex: "0 0 auto",
                }}
              >
                <Box sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography 
                    sx={{
                      transform: 'rotate(-90deg)',
                      color: 'white',
                      fontWeight: 'bold'
                    }}
                  >
                    NOW
                  </Typography>
                </Box>
              </Box>
              {listPlans &&
                listPlans.after.map((plan, index) => (
                  <Box
                    key={index}
                    sx={{
                      padding: "5px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      width: "350px",
                      flex: "0 0 auto",
                      overflowY: "auto",
                      borderLeft: "5px solid #ddd",
                    }}
                  >
                    <Typography variant="h6">{plan.name}</Typography>
                    <Typography variant="body2">
                      Plant type: {plan.type}
                    </Typography>
                    <Typography variant="body2">From: {plan.from}</Typography>
                    <Typography variant="body2">To: {plan.to}</Typography>
                    <Box
                      sx={{
                        mt: 2,
                        display: "flex",
                        flexDirection: "column",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        p: 1,
                      }}
                    >
                      {plan.plants.map((plant, index) => (
                        <Typography key={index} variant="body2">
                          {plant.name} - {plant.serialID}
                        </Typography>
                      ))}
                    </Box>
                  </Box>
                ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Box duoi */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {/* Unhealthy Plants List */}
        <Box
          sx={{
            width: "500px",
            border: "1px solid #ddd",
            borderRadius: 3,
            overflow: "hidden",
            height: "550px",
            boxShadow: "1px 1px 3px",
          }}
        >
          {/* Title */}
          <Box
            sx={{
              background: "#e6e6e6",
              width: "100%",
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              padding: "8px 16px",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#FF0B55",
                fontWeight: "bold",
                width: '30%'
              }}
              variant="h5"
            >
              Unhealthy Plants List
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                ml: "auto",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                alignItems: "center",
                width: '70%'
              }}
            >
              <TextField
                sx={{
                  minWidth: "200px",
                  backgroundColor: "white",
                  borderRadius: 1,
                }}
                size="small"
                id="outlined-search"
                label="Serial ID or Name"
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* <ButtonMUI
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <FilterAltIcon />
              </ButtonMUI>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>All</MenuItem>
                <MenuItem>Temperature</MenuItem>
                <MenuItem>Light</MenuItem>
                <MenuItem>Moisture</MenuItem>
                <MenuItem>Soil Humidity</MenuItem>
              </Menu> */}
            </Box>
          </Box>
          {/* Content */}
          <Box
            sx={{
              padding: "16px",
              maxHeight: "500px",
              overflowY: "auto",
              backgroundColor: "white",
            }}
          >
            {filteredUnhealthyPlants &&
              filteredUnhealthyPlants.map((unhealthyPlant, index) => (
                <Box
                  key={index}
                  sx={{
                    padding: "10px",
                    marginBottom: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    cursor: "pointer",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transform: "scale(1.02)",
                      transition: "transform 0.2s",
                      border: "3px solid",
                      borderColor: "primary.main",
                    },
                  }}
                  onClick={() =>
                    handleOnClickUnhealthyPlant(unhealthyPlant.serialID)
                  }
                >
                  <Typography variant="h6">
                    {highlightText(unhealthyPlant.name, searchTerm)}
                  </Typography>
                  <Typography variant="body2">
                    Serial ID: {highlightText(unhealthyPlant.serialID, searchTerm)}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mt: 2,
                    }}
                  >
                    <Typography variant="body2">
                      <i className="fa-solid fa-temperature-three-quarters"></i>{" "}
                      <Badge
                        bg={unhealthyPlant.temp === "OK" ? "success" : "danger"}
                      >
                        {unhealthyPlant.temp}
                      </Badge>
                    </Typography>
                    <Typography variant="body2">
                      <i className="fa-solid fa-sun"></i>{" "}
                      <Badge
                        bg={
                          unhealthyPlant.light === "OK" ? "success" : "danger"
                        }
                      >
                        {unhealthyPlant.light}
                      </Badge>
                    </Typography>
                    <Typography variant="body2">
                      <i className="fa-solid fa-glass-water"></i>{" "}
                      <Badge
                        bg={
                          unhealthyPlant.humidity === "OK"
                            ? "success"
                            : "danger"
                        }
                      >
                        {unhealthyPlant.humidity}
                      </Badge>
                    </Typography>
                    <Typography variant="body2">
                      <i className="fa-solid fa-droplet"></i>{" "}
                      <Badge
                        bg={
                          unhealthyPlant.moisture === "OK"
                            ? "success"
                            : "danger"
                        }
                      >
                        {unhealthyPlant.moisture}
                      </Badge>
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>

        {/* Graph */}
        <Box
          sx={{
            flex: "1 1 50%", // Thêm flex basis và growth
            minWidth: "300px", // Thêm min-width
            border: "1px solid #ddd",
            borderRadius: 3,
            p: 2,
          }}
        >
          <LineChart
            dataset={dataset}
            xAxis={[
              {
                id: "Years",
                dataKey: "date",
                scaleType: "time",
                valueFormatter: (date) => date.getFullYear().toString(),
              },
            ]}
            series={[
              {
                id: "OK",
                label: "OK",
                dataKey: "OK",
                stack: "total",
                area: true,
                showMark: false,
                color: "#00B300",
              },
              {
                id: "Not_OK",
                label: "Not OK",
                dataKey: "not_OK",
                stack: "total",
                area: true,
                showMark: false,
                color: "#FF0B55",
              },
            ]}
            height={500}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Dashboard;
