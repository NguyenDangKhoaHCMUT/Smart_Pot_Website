import { Row, Col, Form, Button } from "react-bootstrap";

const ChooseDateTime = ({ content, initialValue, submitFunction }) => {
    const getDefaultDateTime = () => {
        let date = new Date(initialValue ? initialValue * 1000 : Date.now());

        if (!initialValue) {
            date.setHours(0, 0, 0, 0);
        }

        const localISOTime = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
            .toISOString()
            .slice(0, 16);

        return localISOTime;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedDate = e.target.from.value;
        const timestamp = Math.floor(new Date(selectedDate).getTime() / 1000);
        if (submitFunction) {
            submitFunction(timestamp);
        }
    };


    return (
        <Form onSubmit={handleSubmit} className="p-3">
            <Row>
                <Col xs={9} className="px-1 d-flex align-items-center">
                    <span className="me-2">{content}</span>
                    <input
                        type="datetime-local"
                        className="form-control"
                        name="from"
                        defaultValue={getDefaultDateTime()}
                    />
                </Col>
                <Col xs={3}>
                    <Button type="submit" variant="primary w-100">Accept</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ChooseDateTime;
