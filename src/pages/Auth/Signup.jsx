import { useEffect, useContext } from "react";

import Button from "@mui/material/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Box from "@mui/material/Box";

import AuthContext from "../../context/UserauthContext";
import theme from "../../theme";

function Writing({ labelName, type, name, placeholder, loading, icon }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label style={{ color: "white", fontSize: "20px" }}>
        {icon && <i className={icon}></i>} {labelName}
      </Form.Label>

      {type === "select" ? (
        <Form.Select name={name} disabled={loading}>
          <option value="">Select Gender</option>
          <option value="male">M</option>
          <option value="female">F</option>
        </Form.Select>
      ) : (
        <Form.Control type={type} name={name} placeholder={placeholder} disabled={loading} />
      )}
    </Form.Group>
  );
}



const Signup = () => {
  let { sendRequest, loading } = useContext(AuthContext);

  useEffect(() => { }, [loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest(e, "signup");
  };

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        backgroundColor: "background.main",
        width: "100%",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      <Container
        style={{
          maxWidth: 100 + "%",
        }}
      >
        <Row>
          <div
            className="col-4 mx-auto"
            style={{
              minWidth: 600 + "px",
              margin: 40 + "px",
              padding: 30 + "px",
              paddingTop: 12 + "px",
              paddingBottom: 12 + "px",
              borderRadius: 10 + "px",
              backgroundColor: "rgba(0,0,0,0.5)",
              backdropFilter: "blur(2px)",
            }}
          >
            <Form onSubmit={(e) => handleSubmit(e)}>
              <p
                className="text-center"
                style={{
                  fontWeight: "bold",
                  fontSize: "40px",
                  margin: 10 + "px",
                  marginBottom: 30 + "px",
                  color: "white",
                }}
              >
                Sign up
              </p>

              <Row>
                <Col md={8}>
                  <Writing labelName="Name" type="text" name="name" placeholder="Enter your name" loading={loading} icon="fa-solid fa-user" />
                </Col>
                <Col md={4}>
                  <Writing labelName="Gender" type="select" name="gender" loading={loading} icon="fa-solid fa-venus-mars" />
                </Col>
              </Row>

              <Writing labelName="Email" type="email" name="email" placeholder="Enter your email" loading={loading} icon="fa-solid fa-envelope" />

              <Row>
                <Col md={6}>
                  <Writing labelName="Phone number" type="text" name="phone_number" placeholder="Enter your phone number" loading={loading} icon="fa-solid fa-phone" />
                </Col>
                <Col md={6}>
                  <Writing labelName="Date of birth" type="date" name="date_of_birth" placeholder="Enter your date of birth" loading={loading} icon="fa-solid fa-calendar" />
                </Col>
              </Row>

              <Writing labelName="Password" type="password" name="password" placeholder="Enter your password" loading={loading} icon="fa-solid fa-key" />
              <Writing labelName="Confirm password" type="password" name="re_password" placeholder="Re-enter your password" loading={loading} icon="fa-solid fa-lock" />

              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  backgroundColor: "primary.main",
                  marginTop: "10px",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
                type="submit"
                disabled={loading}
              >
                Submit
              </Button>

              <p
                style={{
                  marginTop: 12 + "px",
                  color: "white",
                }}
              >
                Already have an account?{" "}
                <a
                  href="/login"
                  style={{
                    color: "white",
                  }}
                >
                  Login here!
                </a>
              </p>
            </Form>
          </div>
        </Row>
      </Container>
    </Box>
  );
};

export default Signup;
