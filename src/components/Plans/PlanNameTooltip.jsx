import { Row, Col, Card } from "react-bootstrap";

const PlanNameTooltip = () => {

    return <Card
        className="p-2"
        style={{
            width: "24.5rem",
            height: "auto",
            boxShadow: "1px 1px 5px"
        }}
    >
        <Row
            className="m-0"
        >
            <p className="mb-1 px-1"><i className="fa-solid fa-lightbulb"></i> Plant name helps you distinguishes between plans</p>
        </Row>
    </Card>;
};

export default PlanNameTooltip;