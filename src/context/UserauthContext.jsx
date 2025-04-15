import { createContext, useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import notify from "../functions/toastify/notify";

const UserauthContext = createContext();

export default UserauthContext;

export const UserauthProvider = () => {
  // SETUP
  const navigate = useNavigate();

  // VARIABLES
  let [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
      ? localStorage.getItem("accessToken")
      : null
  );

  let [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken")
      ? localStorage.getItem("refreshToken")
      : null
  );

  let [sessionExpireTime, setSessionExpireTime] = useState(() =>
    localStorage.getItem("sessionExpireTime")
      ? localStorage.getItem("sessionExpireTime")
      : null
  );

  let [user, setUser] = useState(null);

  let [loading, setLoading] = useState(false);

  // FUNCTIONS
  const sendRequest = async (e, requestType) => {
    setLoading(true);
    let result = null;

    try {
      switch (requestType) {
        case "login":
          await login(e);
          break;
        case "signup":
          await signup(e);
          break;
        case "activate":
          await activate(e);
          break;
        case "info":
          await info(e);
          break;
        case "update_info_user":
          result = await update_info_user(e);
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

  const login = async (e) => {
    const body = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_LOGIN_ENDPOINT,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.status == 200) {
      // console.log("access token: " + response.data.access);
      // console.log("refresh token: " + response.data.refresh);
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);

      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);

      notify("success", "Welcome back!");

      if (!e.target.rememberMe.checked) {
        setSessionExpireTime(
          Date.now() + Number(import.meta.env.VITE_SESSION_TIME)
        );
        localStorage.setItem(
          "sessionExpireTime",
          Date.now() + Number(import.meta.env.VITE_SESSION_TIME)
        );
      }

      navigate("/dashboard");
    } else {
      throw e;
    }
  };

  const signup = async (e) => {
    const body = {
      Name: e.target.name.value,
      email: e.target.email.value,
      PhoneNumber: e.target.phone_number.value,
      DateOfBirth: e.target.date_of_birth.value,
      Gender: e.target.gender.value,
      password: e.target.password.value,
      re_password: e.target.re_password.value,
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_SIGNUP_ENDPOINT,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.status == 201) {
      notify(
        "success",
        "Verification email has been sent, please check your email"
      );
      navigate("/login");
    } else {
      throw e;
    }
  };

  const info = async (e) => {
    const response = await axios.get(import.meta.env.VITE_BACKEND_USER_INFO_ENDPOINT, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (response && response.status == 200) {
      setUser(response.data);
    } else {
      throw e;
    }
  };

  const update_info_user = async (e) => {
    if (!e.avatar) {
      e.avatar = null;
    }
    const body = {
      Name: e.target.Name.value,
      PhoneNumber: e.target.PhoneNumber.value,
      DateOfBirth: e.target.DateOfBirth.value,
      Gender: e.target.Gender.value,
      Address: e.target.Address.value,
      Avatar: e.avatar, // Include avatar in the request body
    };
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_USER_UPDATE_ENDPOINT,
      body,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.status == 200) {
      notify("success", "User info updated!");
      info();
      return true;
    } else {
      throw e;
    }
  };



  const activate = async (e) => {
    const body = {
      uid: e.uid,
      token: e.token,
    };

    const response = await axios.post(
      import.meta.env.VITE_BACKEND_ACTIVATE_ENDPOINT,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response && response.status == 204) {
      notify("default", "Navigating to login...");
    } else {
      throw e;
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("sessionExpireTime");

    setAccessToken(null);
    setRefreshToken(null);
    setSessionExpireTime(null);

    navigate("/");
    notify("warning", "Logged out!");
  };

  // EXPORT
  const contextData = {
    // Variables
    accessToken: accessToken,
    user: user,
    loading: loading,

    // Functions
    sendRequest: sendRequest,
    logout: logout,
  };

  useEffect(() => {
    if (sessionExpireTime && Date.now() >= sessionExpireTime) logout();
  }, []);

  return (
    <UserauthContext.Provider value={contextData}>
      {<Outlet />}
    </UserauthContext.Provider>
  );
};
