import { Row, Col, Card } from "react-bootstrap";
import {
    InputNumber,
} from "antd";

const unitMapper = {
    "temperature": "°C",
    "light": "%",
    "soil humidity": "ml",
    "moisture": "%"
};

const PlanRangeTooltip = ({ type }) => {

    const unit = unitMapper[type];

    let lower = Math.floor(Math.random() * 21) + 40;
    let higher = Math.floor(Math.random() * 21) + 40;
    if (lower > higher) [lower, higher] = [higher, lower];

    return <Card
        className="p-2"
        style={{
            width: "39rem",
            height: "auto",
            boxShadow: "1px 1px 5px"
        }}
    >
        <Row
            className="m-0"
        >
            <p className="mb-1 px-1"><i className="fa-solid fa-lightbulb"></i> Plant ranges help you keep track of plant {type} throughout the day. Warning notification will be sent if plant {type} exceeds the specified range</p>
            <p className="mb-1 px-1">Each plant {type} range have:</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Lowest ideal {type}</b>: Lowest value of {type} ideal for the plant</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Highest ideal {type}</b>: Highest value of {type} ideal for the plant</p>
            <p className="mb-1 px-1">For example:</p>
            <Row className="mb-1 mx-1 px-1" style={{ width: "80%" }}>
                <Col>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={lower}
                    />
                </Col>
                <Col className="d-flex align-items-center justify-content-center" xs={1}>
                    <i className="fa-solid fa-arrow-right fs-3"></i>
                </Col>
                <Col>
                    <InputNumber
                        style={{ width: "100%" }}
                        value={higher}
                    />
                </Col>
            </Row>
            <p className="mb-1 mx-2">Means if {type} value is measured outside of <b>{lower}{unit}</b> and <b>{higher}{unit}</b>, a notification will be sent</p>
        </Row>
    </Card>;
};

export default PlanRangeTooltip;