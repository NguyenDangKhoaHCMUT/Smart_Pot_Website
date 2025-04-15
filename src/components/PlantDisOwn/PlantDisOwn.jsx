import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Form } from "react-bootstrap";
import PlantContext from "../../context/PlantContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import CancelIcon from "@mui/icons-material/Cancel";
function PlantDisOwn() {
  const { serialID } = useParams();

  const { sendRequest, plantList, planList } = useContext(PlantContext);

  const [plantName, setPlantName] = useState(null);

  useEffect(() => {
    sendRequest(0, "get_all_plant");
    sendRequest(0, "get_all_plans");
  }, []);

  useEffect(() => {
    if (plantList && planList) {
      let element;
      const fieldList = ["Name", "planID"];
      for (let i of fieldList) {
        element = document.getElementsByName(i)[0];
        if (i == "Name") {
          for (let j = 0; j < plantList.length; j++) {
            if (plantList[j].SerialID == serialID) {
              setPlantName(plantList[j].Name);
              break;
            }
          }
        } else {
          // TODO
        }
      }
    }
  }, [plantList, planList]);

  const handleDisownPot = (e) => {
    e.preventDefault();
    sendRequest(e, "disown_pot");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Tooltip title="Disown pot">
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: "#e74c3c",
            "&:hover": { backgroundColor: "red" },
          }}
        >
          <CancelIcon sx={{ color: "white" }} />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "white",
            border: "2px solid #000",
            borderRadius: 10 + "px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Form
            style={{
              borderRadius: 10 + "px",
              padding: 20 + "px",
              paddingTop: 0 + "px",
              paddingBottom: 15 + "px",
              height: 15 + "rem",
            }}
            onSubmit={(e) => handleDisownPot(e)}
          >
            <p
              className="text-center"
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                margin: 0 + "px",
                color: "red",
              }}
            >
              <i className="fa-solid fa-triangle-exclamation"></i> Disown pot
            </p>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                style={{
                  color: "black",
                  paddingTop: 30 + "px",
                }}
              >
                <i className="fa-solid fa-fingerprint"></i> Serial ID
              </Form.Label>
              <Form.Control
                type="text"
                name="serialID"
                placeholder="Enter pot's serial ID"
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button
                sx={{
                  mt: 4,
                  backgroundColor: "red",
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  width: "100%",
                }}
                variant="contained"
                type="submit"
              >
                Accept
              </Button>
            </div>
          </Form>
        </Box>
      </Modal>
    </>
  );
}

export default PlantDisOwn;
