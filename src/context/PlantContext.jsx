import { createContext, useState, useContext, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import AuthContext from "./UserauthContext";

import notify from "../functions/toastify/notify";
// import { current } from "@reduxjs/toolkit";
import Box from "@mui/material/Box";

const PlantContext = createContext();

export default PlantContext;

export const PlantProvider = () => {
  // SETUP
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  let { accessToken, logout } = useContext(AuthContext);

  // VARIABLES
  const firestoreClientRef = useRef(null);

  let [plantList, setPlantList] = useState([]);

  let [currentGraph, setCurrentGraph] = useState("Temperature");

  let [planList, setPlanList] = useState([]);

  let [loading, setLoading] = useState(false);

  let [chatID, setChatID] = useState(null);

  // FUNCTIONS
  const sendRequest = async (e, requestType) => {
    setLoading(true);
    let result = null;

    try {
      switch (requestType) {
        case "get_all_plant":
          await getAllPlants();
          break;
        case "register_plant":
          await registerPlant(e);
          break;
        case "get_all_plans":
          await getAllPlans();
          break;
        case "create_plan":
          await createPlan(e);
          break;
        case "delete_plan":
          await deletePlan(e);
          break;
        case "copy_plan":
          await copyPlan(e);
          break;
        case "edit_plan":
          await editplan(e);
          break;
        case "apply_settings":
          await applySettings(e);
          break;
        case "disown_pot":
          await disownPot(e);
          break;
        // Chat AI
        case "send_message":
          await sendMessage(e);
          break;
        default:
          throw new Error("Request type undefined");
      }
    } catch (error) {
      handleError(error);
    }

    setLoading(false);
    return result;
  };

  const handleError = (error) => {
    if (error.response) {
      for (var prop in error.response.data) {
        if (Object.prototype.hasOwnProperty.call(error.response.data, prop)) {
          if (Array.isArray(error.response.data[prop]))
            for (const message of error.response.data[prop])
              notify("error", message);
          else
            notify("error", error.response.data[prop]);
        }
      }
    } else {
      notify("error", "Something happened");
      console.log(error);
    }
  };

  const initializeFirestore = () => {
    if (!firestoreClientRef.current) {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
        appId: import.meta.env.VITE_FIREBASE_APPID,
      };

      const app = initializeApp(firebaseConfig);
      firestoreClientRef.current = getFirestore(app);
    }
    return firestoreClientRef.current;
  };

  const changeGraph = (graph) => {
    setCurrentGraph(graph);
  };

  const getPlantName = (SerialID) => {
    if (plantList.length != 0) {
      const plant = plantList.find((p) => p.SerialID === SerialID);
      return plant.Name;
    }
    return "";
  };

  const getAllPlants = async () => {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_GET_PLANTS_ENDPOINT,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      setPlantList(response.data.data);
    } else {
      throw new Error('Failed to get plants');
    }
  };

  const registerPlant = async (e) => {
    const body = {
      SerialID: e.target.SerialID.value,
      Key: e.target.Key.value,
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_REGISTER_PLANTS_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      notify("success", response.data.detail);
      getAllPlants();
    } else {
      throw e;
    }
  };

  const getAllPlans = async () => {
    const response = await axios.get(
      import.meta.env.VITE_BACKEND_GET_PLANS_ENDPOINT,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      setPlanList(response.data.data);
    } else {
      throw new Error('Failed to get plans');
    }
  };

  const createPlan = async (plan) => {
    const body = {
      Name: plan.Name,
      PlantType: plan.PlantType,
      StatRanges: {
        Temperature: plan.Temperature,
        Light: plan.Light,
        SoilHumidity: plan.SoilHumidity,
        Moisture: plan.Moisture,
      },
      Irrigation: {
        Schedules: typeof plan.Schedules == "undefined" ? [] : plan.Schedules,
        Conditions:
          typeof plan.Conditions == "undefined" ? [] : plan.Conditions,
      },
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_CREATE_PLAN_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      notify("success", response.data.detail);
      getAllPlans();
      navigate("/plans");
    } else {
      throw new Error('Failed to create plan');
    }
  };

  const deletePlan = async (planID) => {
    const body = {
      planID
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_DELETE_PLAN_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      notify("success", response.data.detail);
      getAllPlans();
    } else {
      throw new Error('Failed to delete plan');
    }
  };

  const copyPlan = async (plan) => {
    const body = plan;
    body.Name = "(Copy) " + body.Name;

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_CREATE_PLAN_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      notify("success", response.data.detail);
      getAllPlans();
    } else {
      throw new Error('Failed to copy plan');
    }
  };

  const editplan = async (plan) => {
    const body = {
      planID: plan.planID,
      Name: plan.Name,
      PlantType: plan.PlantType,
      StatRanges: {
        Temperature: plan.Temperature,
        Light: plan.Light,
        SoilHumidity: plan.SoilHumidity,
        Moisture: plan.Moisture,
      },
      Irrigation: {
        Schedules: typeof plan.Schedules == "undefined" ? [] : plan.Schedules,
        Conditions:
          typeof plan.Conditions == "undefined" ? [] : plan.Conditions,
      },
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_EDIT_PLAN_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      notify("success", response.data.detail);
      getAllPlans();
      navigate("/plans");
    } else {
      throw new Error('Failed to edit plan');
    }
  };

  const applySettings = async (body) => {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_APPLY_SETTINGS_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      notify("success", response.data.detail);
      getAllPlants();
    } else {
      throw new Error('Failed to apply settings');
    }
  };

  const disownPot = async (e) => {
    const body = {
      serialID: e.target.serialID.value
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_DISOWN_POT_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      notify("success", response.data.detail);
      navigate("/plants");
    } else {
      throw e;
    }
  };

  const sendMessage = async (e) => {
    let body = {
      query: e
    };
    if (chatID != null) {
      body.documentID = chatID;
    }

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_ASSISTANT_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (response && response.status == 200) {
      setChatID(response.data.documentID);
    } else {
      throw e;
    }

  };

  // EXPORT
  const contextData = {
    // Variables
    loading: loading,
    plantList: plantList,
    currentGraph: currentGraph,
    planList: planList,
    chatID: chatID,

    // Functions
    sendRequest: sendRequest,
    initializeFirestore: initializeFirestore,
    changeGraph: changeGraph,
    getPlantName: getPlantName,
    setChatID: setChatID,
  };

  return (
    <Box sx={{
      width: "100%",
      overflowY: "auto",
    }}>
      <PlantContext.Provider value={contextData}>
        {<Outlet />}
      </PlantContext.Provider>
    </Box>
  );
};
