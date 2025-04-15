import { useRef } from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

const Notification = ({ type, message, timeStamp, seen }) => {
  const ref = useRef();
  const date = new Date(timeStamp * 1000);

  const hoverStyles = {
    transform: "scale(1.01)",
    boxShadow: "0px 4px 10px rgb(0, 102, 255, 0.5)",
    outline: "2px solid rgb(0, 102, 255)",
  };

  const resetStyles = {
    transform: "scale(1)",
    boxShadow: "none",
    outline: "none",
  };


  return (
    <Card
      ref={ref}
      onMouseEnter={() => {
        Object.assign(ref.current.style, hoverStyles);
      }}
      onMouseLeave={() => {
        Object.assign(ref.current.style, resetStyles);
      }}
      className="mb-2"
      bg={type}
    >
      <Card.Body className="pt-2 pb-2 px-4">
        <Row>
          <p className="mb-0 p-0">
            {type == "warning" ? (
              <i className="fa-solid fa-triangle-exclamation"></i>
            ) : type == "info" ? (
              <i className="fa-solid fa-circle-info"></i>
            ) : (
              ""
            )}
            {" " + message + " "}
            {!seen ? (
              <Badge
                className="p-0 px-1 pb-1"
                style={{
                  fontSize: 15 + "px",
                  height: 23 + "px",
                  lineHeight: 23 + "px",
                }}
                bg="danger"
              >
                new
              </Badge>
            ) : (
              ""
            )}
          </p>
        </Row>
        <Row>{date.toLocaleString("en-US", options)}</Row>
      </Card.Body>
    </Card>
  );
};

export default Notification;
