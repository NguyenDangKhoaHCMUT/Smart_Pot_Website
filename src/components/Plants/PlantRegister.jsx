import { useContext, useEffect } from "react";
import { Form } from "react-bootstrap";
import Button from '@mui/material/Button';

import PlantContext from "../../context/PlantContext";

const PlantRegister = () => {
  const { sendRequest, loading } = useContext(PlantContext);

  useEffect(() => {}, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(e, "register_plant");
  };

  return (
    <Form
      style={{
        borderRadius: 20 + "px",
        padding: 20 + "px",
        paddingTop: 10 + "px",
        paddingBottom: 15 + "px",
      }}
      onSubmit={(e) => handleSubmit(e)}
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
        Register a pot
      </p>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label
          style={{
            color: "black",
          }}
        >
          <i className="fa-solid fa-fingerprint"></i> Serial ID
        </Form.Label>
        <Form.Control
          type="text"
          name="SerialID"
          placeholder="Enter pot's serial ID"
          disabled={loading}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label
          style={{
            color: "black",
          }}
        >
          <i className="fa-solid fa-key"></i> Key
        </Form.Label>
        <Form.Control
          type="text"
          name="Key"
          placeholder="Enter pot's key"
          disabled={loading}
        />
      </Form.Group>
      <div className="d-flex justify-content-center">
      <Button variant="contained" sx={{ width:'50%', m: 3}}>Submit</Button>
      </div>
    </Form>
  );
};

export default PlantRegister;
