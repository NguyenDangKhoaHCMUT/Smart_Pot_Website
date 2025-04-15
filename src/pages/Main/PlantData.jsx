import PlantHeader from "../../components/PlantData/PlantHeader";
import PlantGraph from "../../components/PlantData/PlantGraph";
import PlantNotifications from "../../components/PlantData/PlantNotifications";

import Box from "@mui/material/Box";
import theme from "../../theme";

const PlantData = () => {
  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        backgroundColor: "background.main",
        display: "flex",
        flexDirection: "column",
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'auto',
        p: 2
      }}
    >
      <PlantHeader />
      <Box
        sx={{
          flexGrow: 1,
          p: 0,
          pt: 2,
          display: "grid",
          gridTemplateColumns: "2fr 1fr"
        }}
      >
        <PlantGraph />
        <PlantNotifications />
      </Box>
    </Box>
  );
};
export default PlantData;
