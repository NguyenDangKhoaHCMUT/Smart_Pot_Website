import { useContext, useEffect, useState } from "react";

import Button from "@mui/material/Button";
import PlantCard from "../../components/Plants/PlantCard";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import PlantContext from "../../context/PlantContext";
import PlantRegister from "../../components/Plants/PlantRegister";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import theme from "../../theme";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const Plants = () => {
  const { sendRequest, plantList } = useContext(PlantContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    cold: false,
    hot: false,
    tempOk: false,
    dark: false,
    bright: false,
    lightOk: false,
    moistureDry: false,
    moistureSaturated: false,
    moistureOk: false,
    soilDry: false,
    soilSoggy: false,
    soilOk: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredPlants, setFilteredPlants] = useState([]);

  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    sendRequest(0, "get_all_plant");
  }, []);

  useEffect(() => {
    // Filter plants based on search term and temperature
    const filtered = plantList.filter((plant) => {
      const matchesSearch =
        !searchTerm ||
        plant.SerialID.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plant.Name.toLowerCase().includes(searchTerm.toLowerCase());

      return matchesSearch;
    });
    setFilteredPlants(filtered);
  }, [searchTerm, filters, plantList]);

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        width: "100%",
        overflowY: "auto",
        backgroundColor: "background.main",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "background.main",
          p: 3,
        }}
      >
        {/* Plant Register */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Popup
            trigger={
              <Button variant="contained" sx={{ color: "white" }}>
                Register
              </Button>
            }
            modal
          >
            <PlantRegister></PlantRegister>
          </Popup>
        </Box>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {/* New Filter Button and Popover */}
          <Button variant="outlined" onClick={handleFilterClick}>
            Filters
          </Button>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                <i className="fa-solid fa-temperature-three-quarters"></i>
                {" Temperature"}
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.cold}
                      onChange={handleFilterChange}
                      name="cold"
                    />
                  }
                  label="Cold"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.tempOk}
                      onChange={handleFilterChange}
                      name="tempOk"
                    />
                  }
                  label="OK"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.hot}
                      onChange={handleFilterChange}
                      name="hot"
                    />
                  }
                  label="Hot"
                />
              </FormGroup>

              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                <i className="fa-solid fa-sun"></i>
                {" Light"}
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.dark}
                      onChange={handleFilterChange}
                      name="dark"
                    />
                  }
                  label="Dark"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.lightOk}
                      onChange={handleFilterChange}
                      name="lightOk"
                    />
                  }
                  label="OK"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.bright}
                      onChange={handleFilterChange}
                      name="bright"
                    />
                  }
                  label="Bright"
                />
              </FormGroup>

              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                <i className="fa-solid fa-glass-water"></i>
                {" Soil Humidity"}
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.soilDry}
                      onChange={handleFilterChange}
                      name="soilDry"
                    />
                  }
                  label="Dry"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.soilOk}
                      onChange={handleFilterChange}
                      name="soilOk"
                    />
                  }
                  label="OK"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.soilSoggy}
                      onChange={handleFilterChange}
                      name="soilSoggy"
                    />
                  }
                  label="Soggy"
                />
              </FormGroup>

              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                <i className="fa-solid fa-droplet"></i>
                {" Moisture"}
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.moistureDry}
                      onChange={handleFilterChange}
                      name="moistureDry"
                    />
                  }
                  label="Dry"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.moistureOk}
                      onChange={handleFilterChange}
                      name="moistureOk"
                    />
                  }
                  label="OK"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.moistureSaturated}
                      onChange={handleFilterChange}
                      name="moistureSaturated"
                    />
                  }
                  label="Saturated"
                />
              </FormGroup>
            </Box>
          </Popover>

          {/* Search */}
          <TextField
            sx={{
              minWidth: "250px",
            }}
            id="outlined-search"
            label="Search by Serial ID or Name"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          />
        </Box>
      </Box>

      {/* Plant List */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", // Bố trí linh hoạt
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredPlants && filteredPlants.length > 0
          ? filteredPlants.map((plant, index) => (
              <PlantCard
                key={index}
                plant={plant}
                searchTerm={searchTerm}
                filters={filters}
              />
            ))
          : "No plants found"}
      </Box>
    </Box>
  );
};

export default Plants;
