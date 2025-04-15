import { useContext } from "react";
import { Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import theme from "../../theme";
import ButtonMUI from '@mui/material/Button';

import {
  Form,
  InputNumber,
  Button,
  Space,
  TimePicker,
  Select,
  Input,
} from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import Popup from "reactjs-popup";

import PlantContext from "../../context/PlantContext";
import hhmmToSeconds from "../../functions/dateConversion/hhmmToSeconds";
import PlanScheduleTooltip from "../../components/Plans/PlanScheduleTooltip";
import PlanConditionTooltip from "../../components/Plans/PlanConditionTooltip";
import PlanNameTooltip from "../../components/Plans/PlanNameTooltip";
import PlanTypeTooltip from "../../components/Plans/PlanTypeTooltip";
import PlanRangeTooltip from "../../components/Plans/PlanRangeTooltip";

const CreatePlan = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { sendRequest, loading } = useContext(PlantContext);

  const handleSubmit = (plan) => {
    if (Array.isArray(plan.Schedules)) {
      plan.Schedules = plan.Schedules.map((schedule) => ({
        ...schedule,
        Time: schedule.Time ? schedule.Time.format("HH:mm") : "",
      }));
    }
    if (Array.isArray(plan.Conditions)) {
      plan.Conditions = plan.Conditions.map((condition) => ({
        ...condition,
        Cooldown: condition.Cooldown
          ? hhmmToSeconds(condition.Cooldown.format("HH:mm"))
          : 0,
      }));
    }
    sendRequest(plan, "create_plan");
  };

  return (
    <Box
      sx={{
        height: theme.trello.homeHeight,
        backgroundColor: "background.main",
        width: "100%",
      }}
    >
      <Box
        sx={{
          height: "100%",
          padding: "30px",
          px: "50px",
          backdropFilter: "blur(2px)",
          overflowY: "auto",
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={loading}
        >
          <p
            className="text-center"
            style={{
              fontWeight: "bold",
              fontSize: "30px",
              margin: 0,
              marginBottom: "5px",
            }}
          >
            Create a plan
          </p>

          {/* Basic Information Section */}
          <Row>
            <Col xs={8}>
              <Form.Item
                label={
                  <Box className="fs-6">
                    <Popup
                      trigger={
                        <Box>
                          <i
                            style={{ marginRight: 0.25 + "rem" }}
                            className="fa-solid fa-solar-panel"
                          ></i>
                          Plan name{" "}
                        </Box>
                      }
                      on={["hover", "focus"]}
                      position="right center"
                      closeOnDocumentClick
                      contentStyle={{
                        padding: 0,
                        backgroundColor: "rgba(0,0,0,0.0)",
                        border: "none",
                        boxShadow: "0px 0px 0px",
                      }}
                    >
                      <PlanNameTooltip />
                    </Popup>
                  </Box>
                }
                name="Name"
                rules={[{ required: true, message: "Enter plan name" }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="Enter your plan's name"
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item
                label={
                  <Box className="fs-6">
                    <Popup
                      trigger={
                        <Box>
                          <i
                            style={{ marginRight: 0.25 + "rem" }}
                            className="fa-solid fa-seedling"
                          ></i>
                          Plan type
                        </Box>
                      }
                      on={["hover", "focus"]}
                      position="right center"
                      closeOnDocumentClick
                      contentStyle={{
                        padding: 0,
                        backgroundColor: "rgba(0,0,0,0.0)",
                        border: "none",
                        boxShadow: "0px 0px 0px",
                      }}
                    >
                      <PlanTypeTooltip />
                    </Popup>
                  </Box>
                }
                name="PlantType"
                rules={[{ required: true, message: "Enter plan type" }]}
              >
                <Select
                  style={{
                    width: 100 + "%",
                  }}
                  options={[
                    {
                      value: "",
                      label: "",
                    },
                    {
                      value: "Rose",
                      label: "Rose",
                    },
                    {
                      value: "Basil",
                      label: "Basil",
                    },
                    {
                      value: "Lily",
                      label: "Lily",
                    },
                    {
                      value: "Cactus",
                      label: "Cactus",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <hr />

          {/* Environmental Parameters Section */}
          <p className="fs-5 fw-bold mt-3 mb-3">Environmental Parameters</p>

          <Form.Item
            style={{ marginBottom: "2rem" }}
            label={
              <Box className="fs-6">
                <Popup
                  trigger={
                    <Box>
                      <i
                        style={{ marginRight: "0.25rem" }}
                        className="fa-solid fa-temperature-three-quarters"
                      ></i>
                      Temperature range (°C)
                    </Box>
                  }
                  on={["hover", "focus"]}
                  position="right center"
                  closeOnDocumentClick
                  contentStyle={{
                    padding: 0,
                    backgroundColor: "rgba(0,0,0,0.0)",
                    border: "none",
                    boxShadow: "0px 0px 0px",
                  }}
                >
                  <PlanRangeTooltip type={"temperature"} />
                </Popup>
              </Box>
            }
            rules={[{ required: true, message: "Enter temperature range" }]}
          >
            <Row>
              <Col>
                <Form.Item name={["Temperature", "min"]} noStyle>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter lowest temperature"
                  />
                </Form.Item>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                xs={1}
              >
                <i className="fa-solid fa-arrow-right fs-3"></i>
              </Col>
              <Col>
                <Form.Item name={["Temperature", "max"]} noStyle>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter highest temperature"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "2rem" }}
            label={
              <Box className="fs-6">
                <Popup
                  trigger={
                    <Box>
                      <i
                        style={{ marginRight: "0.25rem" }}
                        className="fa-solid fa-sun"
                      ></i>
                      Light level range (%)
                    </Box>
                  }
                  on={["hover", "focus"]}
                  position="right center"
                  closeOnDocumentClick
                  contentStyle={{
                    padding: 0,
                    backgroundColor: "rgba(0,0,0,0.0)",
                    border: "none",
                    boxShadow: "0px 0px 0px",
                  }}
                >
                  <PlanRangeTooltip type={"light"} />
                </Popup>
              </Box>
            }
            rules={[{ required: true, message: "Enter light level range" }]}
          >
            <Row>
              <Col>
                <Form.Item name={["Light", "min"]} noStyle>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter lowest light level"
                  />
                </Form.Item>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                xs={1}
              >
                <i className="fa-solid fa-arrow-right fs-3"></i>
              </Col>
              <Col>
                <Form.Item name={["Light", "max"]} noStyle>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter highest light level"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "2rem" }}
            label={
              <Box className="fs-6">
                <Popup
                  trigger={
                    <Box>
                      <i
                        style={{ marginRight: "0.25rem" }}
                        className="fa-solid fa-glass-water"
                      ></i>
                      Soil humidity range (ml)
                    </Box>
                  }
                  on={["hover", "focus"]}
                  position="right center"
                  closeOnDocumentClick
                  contentStyle={{
                    padding: 0,
                    backgroundColor: "rgba(0,0,0,0.0)",
                    border: "none",
                    boxShadow: "0px 0px 0px",
                  }}
                >
                  <PlanRangeTooltip type={"soil humidity"} />
                </Popup>
              </Box>
            }
            rules={[{ required: true, message: "Enter soil humidity range" }]}
          >
            <Row>
              <Col>
                <Form.Item name={["SoilHumidity", "min"]} noStyle>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter lowest soil humidity"
                  />
                </Form.Item>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                xs={1}
              >
                <i className="fa-solid fa-arrow-right fs-3"></i>
              </Col>
              <Col>
                <Form.Item name={["SoilHumidity", "max"]} noStyle>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter highest soil humidity"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            style={{ marginBottom: "2rem" }}
            label={
              <Box className="fs-6">
                <Popup
                  trigger={
                    <Box>
                      <i
                        style={{ marginRight: "0.25rem" }}
                        className="fa-solid fa-droplet"
                      ></i>
                      Moisture range (%)
                    </Box>
                  }
                  on={["hover", "focus"]}
                  position="right center"
                  closeOnDocumentClick
                  contentStyle={{
                    padding: 0,
                    backgroundColor: "rgba(0,0,0,0.0)",
                    border: "none",
                    boxShadow: "0px 0px 0px",
                  }}
                >
                  <PlanRangeTooltip type={"moisture"} />
                </Popup>
              </Box>
            }
            rules={[{ required: true, message: "Enter moisture range" }]}
          >
            <Row>
              <Col>
                <Form.Item name={["Moisture", "min"]} noStyle>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter lowest moisture"
                  />
                </Form.Item>
              </Col>
              <Col
                className="d-flex align-items-center justify-content-center"
                xs={1}
              >
                <i className="fa-solid fa-arrow-right fs-3"></i>
              </Col>
              <Col>
                <Form.Item name={["Moisture", "max"]} noStyle>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter highest moisture"
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>

          <hr />
          {/* Irrigation Settings Section */}
          <Form.Item
            label={
              <Box className="fs-6">
                <Popup
                  trigger={
                    <Box>
                      <i
                        style={{ marginRight: 0.25 + "rem" }}
                        className="fa-solid fa-clock"
                      ></i>
                      Irrigation schedules{" "}
                      <i className="fa-solid fa-question"></i>
                    </Box>
                  }
                  on={["hover", "focus"]}
                  position="right center"
                  closeOnDocumentClick
                  contentStyle={{
                    padding: 0,
                    backgroundColor: "rgba(0,0,0,0.0)",
                    border: "none",
                    boxShadow: "0px 0px 0px",
                  }}
                >
                  <PlanScheduleTooltip />
                </Popup>
              </Box>
            }
            style={{ marginTop: 1.25 + "rem" }}
          >
            <Form.List name="Schedules">
              {(fields, { add, remove }) => (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 8,
                  }}
                >
                  {fields.map((field, index) => (
                    <Space key={`${field.key}-${index}`} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, "Time"]}
                        rules={[
                          { required: true, message: "Please select a time" },
                        ]}
                      >
                        <TimePicker
                          style={{ width: "8rem" }}
                          format="HH:mm"
                          use12Hours={false}
                          showNow={false}
                          minuteStep={1}
                        />
                      </Form.Item>

                      <Form.Item
                        {...field}
                        name={[field.name, "TargetSoilHumidity"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter value",
                          },
                        ]}
                      >
                        <InputNumber
                          style={{
                            width: 8 + "rem",
                          }}
                          placeholder="Target humidity"
                          min={0}
                        />
                      </Form.Item>

                      <CloseOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Schedule
                  </Button>
                </Box>
              )}
            </Form.List>
          </Form.Item>

          <hr />

          <Form.Item
            label={
              <Box className="fs-6">
                <Popup
                  trigger={
                    <Box>
                      <i
                        style={{ marginRight: 0.25 + "rem" }}
                        className="fa-solid fa-fan"
                      ></i>
                      Irrigation conditions{" "}
                      <i className="fa-solid fa-question"></i>
                    </Box>
                  }
                  on={["hover", "focus"]}
                  position="right center"
                  closeOnDocumentClick
                  contentStyle={{
                    padding: 0,
                    backgroundColor: "rgba(0,0,0,0.0)",
                    border: "none",
                    boxShadow: "0px 0px 0px",
                  }}
                >
                  <PlanConditionTooltip />
                </Popup>
              </Box>
            }
            style={{ marginBottom: "1.25rem" }}
          >
            <Form.List name="Conditions">
              {(fields, { add, remove }) => (
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 8,
                  }}
                >
                  {fields.map((field, index) => (
                    <Space key={`${field.key}-${index}`} align="baseline">
                      <Form.Item
                        {...field}
                        name={[field.name, "TargetStat"]}
                        rules={[
                          { required: true, message: "Please choose a stat" },
                        ]}
                      >
                        <Select
                          style={{
                            width: 8 + "rem",
                          }}
                          options={[
                            {
                              value: "",
                              label: "",
                            },
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
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "Type"]}
                        rules={[
                          {
                            required: true,
                            message: "Please select type",
                          },
                        ]}
                      >
                        <Select
                          style={{
                            width: 8 + "rem",
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
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "TargetValue"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter value",
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="Target value"
                          min={0}
                          style={{
                            width: 8 + "rem",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "TargetSoilHumidity"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter value",
                          },
                        ]}
                      >
                        <InputNumber
                          placeholder="Target humidity"
                          min={0}
                          style={{
                            width: 8 + "rem",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        {...field}
                        name={[field.name, "Cooldown"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter value",
                          },
                        ]}
                      >
                        <TimePicker
                          placeholder="Cooldown"
                          format={"HH:mm"}
                          style={{
                            width: 8 + "rem",
                          }}
                          showNow={false}
                        />
                      </Form.Item>
                      <CloseOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Condition
                  </Button>
                </Box>
              )}
            </Form.List>
          </Form.Item>

          {/* Action Buttons */}
          <Row>
            <Col>
              {/* <BootstrapButton
                style={{
                  width: "100%",
                }}
                variant="danger"
                className="mt-3 mb-3"
                onClick={() => navigate("/plans")}
              >
                Cancel
              </BootstrapButton> */}
              <ButtonMUI
                variant="outlined"
                onClick={() => navigate("/plans")}
                sx={{
                  width: "100%",
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                  bgcolor: '#e74c3c',
                  color: '#fff',
                }}
              >
                Cancel
              </ButtonMUI>
            </Col>
            <Col>
              {/* <BootstrapButton
                style={{
                  width: "100%",
                }}
                variant="primary"
                type="submit"
                className="mt-3 mb-3"
              >
                Accept
              </BootstrapButton> */}
              <ButtonMUI
                variant="contained"
                type="submit"
                sx={{
                  width: "100%",
                  marginTop: "1.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                Accept
              </ButtonMUI>
            </Col>
          </Row>
        </Form>
      </Box>
    </Box>
  );
};

export default CreatePlan;
