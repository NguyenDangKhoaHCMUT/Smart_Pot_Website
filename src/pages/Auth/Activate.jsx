import { useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";

import AuthContext from "../../context/UserauthContext";

const Activate = () => {
  let navigate = useNavigate();
  let { sendRequest, loading } = useContext(AuthContext);

  const { uid, token } = useParams();

  useEffect(() => {
    activate();
  }, []);

  useEffect(() => {}, [loading]);

  const activate = async () => {
    const event = {
      uid: uid,
      token: token,
    };
    sendRequest(event, "activate");
    await new Promise((r) => setTimeout(r, 3000));
    navigate("/login");
  };

  return (
    <Container
      style={{
        background: "url(/src/assets/background.jpg)",
        backgroundPosition: "center center",
        backgroundSize: "cover",
        maxWidth: 100 + "%",
        height: 120 + "dvh",
        margin: 0 + "px",
      }}
    >
      <Row>
        <div
          className="col-6 mx-auto"
          style={{
            marginTop: 180 + "px",
            padding: 30 + "px",
            paddingTop: 12 + "px",
            paddingBottom: 12 + "px",
            borderRadius: 10 + "px",
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(2px)",
          }}
        >
          <Form>
            <p
              className="text-center"
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                margin: 0 + "px",
                marginBottom: 5 + "px",
                color: "white",
              }}
            >
              {loading ? (
                <>
                  Your account is being activated...{" "}
                  <p className="rotating">
                    <i className="fa-solid fa-spinner"></i>
                  </p>
                </>
              ) : (
                <>
                  Your account has been activated...{" "}
                  <p>
                    <i className="fa-solid fa-check"></i>
                  </p>
                </>
              )}
            </p>
          </Form>
        </div>
      </Row>
    </Container>
  );
};

export default Activate;
