import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import contexts
import { UserauthProvider } from "./context/UserauthContext";
import { PlantProvider } from "./context/PlantContext";

// Import private route/link check
import PrivateRouteCheck from "./hocs/PrivateRouteCheck";

// Import hocs
import Layout from "./hocs/Layout";
// Import main pages
// import Home from "./pages/Home";
import ChatBubbleLayout from "./hocs/ChatBubbleLayout";

// Import introduction pages
import Features from "./pages/Intro/Features";
import Pricing from "./pages/Intro/Pricing";

// Import authentication pages
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import Activate from "./pages/Auth/Activate";

// Import main pages
import Dashboard from "./pages/Main/Dashboard";
import Plants from "./pages/Main/Plants";
import Plans from "./pages/Main/Plans";
import Info from "./pages/Main/Info";
import PlantInfo from "./pages/Main/PlantInfo";
import PlantData from "./pages/Main/PlantData";
import PlantSettings from "./pages/Main/PlantSettings";
import CreatePlan from "./pages/Main/CreatePlan";
import EditPlan from "./pages/Main/EditPlan";

// Import special pages
import PageNotFound from "./pages/Error/PageNotFound";

// Import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<UserauthProvider />}>
        <Route exact path="/" element={<PrivateRouteCheck />}>
          <Route exact path="/" element={<Layout />}>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/features" element={<Features />} />
            <Route exact path="/pricing" element={<Pricing />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/activate/:uid/:token" element={<Activate />} />

            <Route exact path="/" element={<PlantProvider />}>
              <Route exact path="/" element={<ChatBubbleLayout />}>
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/info" element={<Info />} />

                <Route exact path="/plants" element={<Plants />} />
                <Route exact path="/plants/:serialID" element={<PlantInfo />} />
                <Route exact path="/plants/:serialID/data" element={<PlantData />} />
                <Route exact path="/plants/:serialID/settings" element={<PlantSettings />} />

                <Route exact path="/plans" element={<Plans />} />
                <Route exact path="/plans/createplan" element={<CreatePlan />} />
                <Route exact path="/plans/editplan/:id" element={<EditPlan />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route exact path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
