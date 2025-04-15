import ReactDOM from "react-dom/client";

// Import main App and global styles
import App from "./App.jsx";

// Import react-helmet tag to insert into header
import { Helmet } from "react-helmet";

// Import toastify assets
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from './theme.js'

ReactDOM.createRoot(document.getElementById("root")).render(
  // Deleted react strictmode tag
  <>
  <CssVarsProvider theme={theme}>
    <CssBaseline />
    <App />
    <ToastContainer />
    <Helmet>
      <script
        src="https://kit.fontawesome.com/047f0f123d.js"
        crossOrigin="anonymous"
      ></script>
      <link
        rel="stylesheet"
        href="../node_modules/@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
      />
    </Helmet>
  </CssVarsProvider>
    
  </>
);