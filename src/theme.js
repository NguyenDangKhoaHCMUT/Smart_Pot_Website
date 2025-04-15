import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const APP_BAR_HEIGHT = 70;
const HOME_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT}px)`;

// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    homeHeight: HOME_HEIGHT,
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#809D3C",
          dark: "#5D8736",
        },
        background: {
          main: "white",
        },
        
      },
    },
    dark: {
      palette: {
        primary: { 
          main: "#34495e" 
        },
        background: {
          main: "#a4b0be",
        },
      },
    },
  },
});

export default theme;
