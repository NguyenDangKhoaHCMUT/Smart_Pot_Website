import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Badge, Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";

import Notification from "./Notification";

import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";

import PlantContext from "../../context/PlantContext";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import ButtonMUI from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications'
import Typography from "antd/es/typography/Typography";

const PlantNotifications = () => {
  const { serialID } = useParams();
  const { initializeFirestore } = useContext(PlantContext);

  const [notifications, setNotifications] = useState([]);
  const [unseenCount, setUnseenCount] = useState(0);

  useEffect(() => {
    let db = initializeFirestore();
    const documentRef = doc(db, "Plant_Notifications", serialID);

    const unsubscribe = onSnapshot(
      documentRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const logs = docSnapshot.data().Logs || [];

          const revsersedLogs = logs.slice().reverse();
          setNotifications(revsersedLogs);

          const unseen = revsersedLogs.filter((log) => !log.Seen).length;
          setUnseenCount(unseen);
        }
      },
      (err) => {
        console.error("Error listening to document:", err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [serialID]);

  const handleMarkAsRead = async () => {
    try {
      let db = initializeFirestore();
      const documentRef = doc(db, "Plant_Notifications", serialID);

      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        let updatedLogs = docSnap.data().Logs.map((log) => ({
          ...log,
          Seen: true,
        }));

        await updateDoc(documentRef, { Logs: updatedLogs });
      }
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  const handleFilter = async (type) => {
    try {
      let db = initializeFirestore();
      const documentRef = doc(db, "Plant_Notifications", serialID);
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        const logs = docSnap.data().Logs || [];
        const filteredLogs =
          type === "all" ? logs : logs.filter((log) => log.Type === type);
        setNotifications(filteredLogs);
        localStorage.setItem("filter", type);
      }
    } catch (error) {
      console.error("Error updating notifications:", error);
    }
  };

  useEffect(() => {
    const savedFilter = localStorage.getItem("filter");
    if (savedFilter) {
      handleFilter(savedFilter);
    } else {
      handleFilter("all");
    }
  }, [initializeFirestore, serialID]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box 
      sx={{
        width: "100%", border: "1px solid #ddd", borderRadius: "4px", overflow: "hidden", height: "200px", boxShadow: "1px 1px 3px"
      }}
    >
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
          }}
        >
          <CircleNotificationsIcon
            sx={{
              fontSize: "20px",
              marginRight: "5px",
            }}
          />
          Notifications
        </Typography>
        {unseenCount != 0 ? (
          <Badge
            className="p-0 px-1 pb-1"
            style={{
              fontSize: 15 + "px",
              height: 23 + "px",
              lineHeight: 23 + "px",
              marginLeft: "5px",
            }}
            bg="danger"
          >
            {unseenCount}
          </Badge>
        ) : (
          ""
        )}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            ml: "auto",
            flexWrap: "wrap",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <ButtonMUI
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
            <MenuItem onClick={() => handleFilter("all")}>All</MenuItem>
            <MenuItem onClick={() => handleFilter("info")}>Info</MenuItem>
            <MenuItem onClick={() => handleFilter("warning")}>Warning</MenuItem>
          </Menu>

          {unseenCount != 0 && (
            <Button
              data-tooltip-id="markAsReadTooltip"
              data-tooltip-content="Mark as read"
              onClick={handleMarkAsRead}
              style={{ width: 25 + "px", height: 25 + "px" }}
              className="p-1 d-flex justify-content-center align-items-center"
            >
              <Tooltip id="markAsReadTooltip" />
              <i className="fa-solid fa-check"></i>
            </Button>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          padding: "16px",
          maxHeight: "195px",
          overflowY: "auto",
          backgroundColor: 'white'
        }}
      >
        {notifications && notifications.length != 0
          ? notifications.map((notification, index) => (
              <Notification
                key={index}
                type={notification.Type}
                message={notification.Content}
                timeStamp={notification.Time}
                seen={notification.Seen}
              ></Notification>
            ))
          : ""}
      </Box>
    </Box>
  );
};

export default PlantNotifications;
