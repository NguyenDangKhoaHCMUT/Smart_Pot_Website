import PlantGraph from "../../components/PlantInfo/PlantGraph";

import PlantTemperature from "../../components/PlantInfo/PlantTemperature";
import PlantLight from "../../components/PlantInfo/PlantLight";
import PlantMoisture from "../../components/PlantInfo/PlantMoisture";
import PlantSoilHumidity from "../../components/PlantInfo/PlantSoilHumidity";
import PlantNotifications from "../../components/PlantInfo/PlantNotifications";
import PlantHeader from "../../components/PlantInfo/PlantHeader";
import Box from "@mui/material/Box";

import theme from "../../theme";

const PlantInfo = () => {
  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        padding: '20px 20px 20px 20px',
        backgroundColor: "background.main",
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'auto'
      }}
    >
      <PlantHeader></PlantHeader>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr" /* Chia thành 2 cột: 2 phần thông số - 1 phần Notifications */,
          gap: 15 + " px",
        }}
      >
        {/* Cột trái: Các thông số cây (Plant Parameters) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "15px",
            marginRight: 15 + "px",
          }}
        >
          <PlantTemperature />
          <PlantLight />
          <PlantSoilHumidity />
          <PlantMoisture />
        </Box>

        {/* Cột phải: Notifications */}
        <PlantNotifications />
      </Box>

      {/* Graph nằm hàng dưới, chiếm toàn bộ chiều rộng */}
      <Box sx={{ marginTop: "20px", boxShadow: "1px 1px 3px", borderRadius: "0.375rem" }}>
        <PlantGraph />
      </Box>
    </Box>
  );
};

export default PlantInfo;
