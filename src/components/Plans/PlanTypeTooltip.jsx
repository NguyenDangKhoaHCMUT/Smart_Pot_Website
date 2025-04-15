import { Row, Card } from "react-bootstrap";

const PlanTypeTooltip = () => {

    return <Card
        className="p-2"
        style={{
            width: "24.7rem",
            height: "auto",
            boxShadow: "1px 1px 5px"
        }}
    >
        <Row
            className="m-0"
        >
            <p className="mb-1 px-1"><i className="fa-solid fa-lightbulb"></i> Plant type helps you specify a plant for your plan</p>
        </Row>
    </Card>;
};

export default PlanTypeTooltip;