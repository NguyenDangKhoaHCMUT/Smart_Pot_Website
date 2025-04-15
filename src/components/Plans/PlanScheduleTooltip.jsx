import { Row, Col, Card } from "react-bootstrap";
import {
    InputNumber,
    TimePicker
} from "antd";
import dayjs from "dayjs";

const PlanScheduleTooltip = () => {

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
            <p className="mb-1 px-1"><i className="fa-solid fa-lightbulb"></i> Plant schedules help you water your plants automatically throughout the day</p>
            <p className="mb-1 px-1">Each plant schedule have:</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Time</b>: The time of day to start watering</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Target soil humidity</b>: Automatically water to a certain soil humidity level</p>
            <p className="mb-1 px-1">For example:</p>
            <TimePicker
                style={{ width: "8rem", marginLeft: "1.2rem", marginRight: "0.6rem", marginBottom: "0.5rem" }}
                format="HH:mm"
                use12Hours={false}
                value={dayjs("09:30", "HH:mm")}
            />
            <InputNumber
                style={{
                    width: 8 + "rem",
                    padding: 0,
                    marginBottom: "0.5rem"
                }}
                value={50}
            />
            <p className="mb-1 mx-2">Means at <b>9:30</b>, your plant will be watered to <b>50ml</b> soil humidity</p>
        </Row>
    </Card>;
};

export default PlanScheduleTooltip;