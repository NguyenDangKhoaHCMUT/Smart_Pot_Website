import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Form } from "react-bootstrap";
import PlantContext from "../../context/PlantContext";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import SettingsIcon from '@mui/icons-material/Settings';

const PlantSettings = () => {
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

  const handleApplySettings = (e) => {
    e.preventDefault();

    let potID = null;
    for (const obj of plantList) {
      if (obj.SerialID === serialID) {
        potID = obj.id;
      }
    }

    const body = {
      planID: e.target.planID.value,
      potID,
      Name: e.target.Name.value,
    };
    sendRequest(body, "apply_settings");
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Tooltip title="Pot Setting">
        <Button 
          onClick={handleOpen} 
          sx={{ 
            backgroundColor: 'primary.main',
            '&:hover': { backgroundColor: 'primary.dark' },
          }}>
          <SettingsIcon sx={{ color: 'white' }} />
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
              paddingTop: 10 + "px",
              paddingBottom: 15 + "px",
            }}
            onSubmit={(e) => handleApplySettings(e)}
          >
            <p
              className="text-center"
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                margin: 0 + "px",
                marginBottom: 5 + "px",
                color: "black",
              }}
            >
              <i className="fa-solid fa-gear"></i> Pot settings
            </p>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label
                style={{
                  color: "black",
                }}
              >
                <i className="fa-solid fa-seedling"></i> Plant Name
              </Form.Label>
              <Form.Control
                type="text"
                name="Name"
                placeholder="Enter pot's name"
                defaultValue={plantName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label
                style={{
                  marginTop: 20 + "px",
                  color: "black",
                }}
              >
                <i className="fa-solid fa-solar-panel"></i> Plan
              </Form.Label>
              <Form.Select
                name="planID"
                defaultValue={plantName}
                aria-label="Default select example"
              >
                <option value="">Choose a plan...</option>
                {planList.map((plan, index) => (
                  <option key={index} value={plan.id}>
                    {plan.Name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button
              sx={{
                mt: 4,
                backgroundColor: 'primary.main',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                width: '100%',
              }}
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
};

export default PlantSettings;
