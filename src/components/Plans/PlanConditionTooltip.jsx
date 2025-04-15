import { Row, Col, Card } from "react-bootstrap";
import {
    Form,
    InputNumber,
    Button,
    Space,
    TimePicker,
    Select,
    Input,
} from "antd";
import dayjs from "dayjs";

const PlanConditionTooltip = () => {

    return <Card
        className="p-2"
        style={{
            width: "48rem",
            height: "auto",
            boxShadow: "1px 1px 5px"
        }}
    >
        <Row
            className="m-0"
        >
            <p className="mb-1 px-1"><i className="fa-solid fa-lightbulb"></i> Plant conditions help you water your plants automatically when a condition is met</p>
            <p className="mb-1 px-1">Each plant condition have:</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Target Stat</b>: Which plant stat is being tracked</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Type</b>: The type of comparison</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Target Value </b>: The target value of the tracked stat to trigger condition</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Target soil humidity</b>: Automatically water to a certain soil humidity level</p>
            <p className="mb-1 px-1 mx-4"><i className="fa-solid fa-arrow-right"></i> <b>Cooldown</b>: This condition cannot reactivates after a certain amount of time</p>
            <p className="mb-1 px-1">For example:</p>
            <Select
                style={{ width: "8rem", marginLeft: "1.2rem", marginRight: "0.6rem", marginBottom: "0.5rem", padding: 0 }}
                options={[
                    {
                        value: "Temperature",
                        label: "Temperature",
                    },
                    {
                        value: "Moisture",
                        label: "Moisture",
                    },
                    {
                        value: "Light",
                        label: "Light",
                    },
                    {
                        value: "SoilHumidity",
                        label: "SoilHumidity",
                    },
                ]}
                value={"Temperature"}
            />
            <Select
                style={{
                    width: 8 + "rem",
                    padding: 0,
                    marginBottom: "0.5rem",
                    marginRight: "0.6rem"
                }}
                options={[
                    {
                        value: "",
                        label: "",
                    },
                    {
                        value: ">",
                        label: "Higher",
                    },
                    {
                        value: "<",
                        label: "Lower",
                    },
                ]}
                value={">"}
            />
            <InputNumber
                value={35}
                style={{
                    width: 8 + "rem",
                    padding: 0,
                    marginBottom: "0.5rem",
                    marginRight: "0.6rem"
                }}
            />
            <InputNumber
                style={{
                    width: 8 + "rem",
                    padding: 0,
                    marginBottom: "0.5rem",
                    marginRight: "0.6rem"
                }}
                value={50}
            />
            <TimePicker
                format={"HH:mm"}
                style={{
                    width: 8 + "rem",
                    marginBottom: "0.5rem"
                }}
                showNow={false}
                value={dayjs("02:00", "HH:mm")}
            />
            <p className="mb-1 mx-2">Means when <b>Temperature</b> is <b>higher</b> than <b>35</b>, your plant will be watered to <b>50ml</b> soil humidity</p>
            <p className="mb-1 mx-2">This condition cannot reactivate until <b>2 hours  </b> later</p>
        </Row>
    </Card>;
};

export default PlanConditionTooltip;