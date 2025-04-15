import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";

import { Row, Col, Form, Dropdown } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import Popup from "reactjs-popup";

import ChooseDateTime from "./ChooseDateTime";

import { format } from "date-fns";

import PlantContext from "../../context/PlantContext";

const upperLineLegendMap = {
  Temperature: "Hot",
  Light: "Bright",
  SoilHumidity: "Soggy",
  Moisture: "Saturated",
};

const lowerLineLegendMap = {
  Temperature: "Cold",
  Light: "Dark",
  SoilHumidity: "Dry",
  Moisture: "Dry",
};

const PlantGraph = () => {
  const { serialID } = useParams();
  const { initializeFirestore, changeGraph, currentGraph } =
    useContext(PlantContext);

  const [data, setData] = useState([]);

  const [range, setRange] = useState({ from: null, to: null });

  const [desiredRange, setDesiredRange] = useState(null);

  const [showReferenceLines, setShowReferenceLines] = useState(true);

  useEffect(() => {
    const fetchdesiredRange = async () => {
      const db = initializeFirestore();
      const planDocRef = doc(db, "Plant_Plan", serialID);

      try {
        const docSnap = await getDoc(planDocRef);
        if (docSnap.exists()) {
          const planData = docSnap.data().Plan;
          if (planData?.StatRanges?.[currentGraph]) {
            const { min, max } = planData.StatRanges[currentGraph];
            setDesiredRange({ min, max });
          } else {
            setDesiredRange(null);
          }
        } else {
          setDesiredRange(null);
        }
      } catch (error) {
        console.error("Error fetching plant plan:", error);
      }
    };

    fetchdesiredRange();
  }, [serialID, currentGraph]);

  useEffect(() => {
    let db = initializeFirestore();
    const logsRef = collection(db, "Plant_" + currentGraph, serialID, "Logs");

    let conditions = [orderBy("Time", "asc")];

    if (range.from !== null) {
      conditions.push(where("Time", ">=", range.from));
    }
    if (range.to !== null) {
      conditions.push(where("Time", "<=", range.to));
    }

    const q = query(logsRef, ...conditions);

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let logs = querySnapshot.docs.map((doc) => doc.data());
        setData(logs);
      },
      (err) => {
        console.error("Error fetching temperature logs:", err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [serialID, currentGraph, range]);

  const handleFromChange = (from) => {
    setRange((prevRange) => ({
      ...prevRange,
      from: from,
    }));
  };

  const handleToChange = (to) => {
    setRange((prevRange) => ({
      ...prevRange,
      to: to,
    }));
  };

  const handleStatChange = (e) => {
    changeGraph(e.target.value);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "10px",
        marginRight: 15 + "px",
        border: "1px solid #ccc",
        boxShadow: "1px 1px 3px"
      }}
      className="p-1 pt-3"
    >
      <Row className="px-4 mb-3">
        <Col className="px-1 d-flex align-items-center">
          <span className="me-2">Stat</span>
          <Form.Select onChange={handleStatChange} value={currentGraph}>
            <option>Temperature</option>
            <option>Light</option>
            <option>SoilHumidity</option>
            <option>Moisture</option>
          </Form.Select>
        </Col>
        <Col className="px-1 d-flex align-items-center">
          <span className="me-2">From</span>
          <Dropdown className="flex-grow-1">
            <Dropdown.Toggle variant="light" className="w-100 text-start">
              {range.from === null
                ? "Past"
                : format(new Date(range.from * 1000), "yyyy MMM dd, HH:mm")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFromChange(null)}>
                Past
              </Dropdown.Item>
              <Dropdown.Divider />
              <Popup
                trigger={<Dropdown.Item>Choose a time...</Dropdown.Item>}
                modal
                contentStyle={{ width: "40%" }}
              >
                <ChooseDateTime
                  content="From"
                  initialValue={range.from}
                  submitFunction={handleFromChange}
                />
              </Popup>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="px-1 d-flex align-items-center">
          <span className="me-2">To</span>
          <Dropdown className="flex-grow-1">
            <Dropdown.Toggle variant="light" className="w-100 text-start">
              {range.to === null
                ? "Now"
                : format(new Date(range.to * 1000), "yyyy MMM dd, HH:mm")}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleToChange(null)}>
                Now
              </Dropdown.Item>
              <Dropdown.Divider />
              <Popup
                trigger={<Dropdown.Item>Choose a time...</Dropdown.Item>}
                modal
                contentStyle={{ width: "40%" }}
              >
                <ChooseDateTime
                  content="To"
                  initialValue={range.to}
                  submitFunction={handleToChange}
                />
              </Popup>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col
          xs={12}
          sm={6}
          md={4}
          lg={2}
          className="px-2 d-flex align-items-center"
          style={{ gap: "0.65rem", whiteSpace: "nowrap" }}
        >
          <span className="me-2">Range</span>
          <div className="form-check form-switch d-flex align-items-center">
            <input
              checked={showReferenceLines}
              onChange={() => setShowReferenceLines((prev) => !prev)}
              className="form-check-input"
              type="checkbox"
              style={{ width: "2.5rem", height: "1.25rem" }}
            />
          </div>
        </Col>
      </Row>
      <ResponsiveContainer width="95%" height="87%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="Time"
            tickFormatter={(time) => format(new Date(time * 1000), "HH:mm")}
          />
          <YAxis
            tickFormatter={(value) => (Math.round(value * 10) / 10).toFixed(1)}
          />
          <Tooltip
            formatter={(value) => (Math.round(value * 10) / 10).toFixed(1)}
            labelFormatter={(time) =>
              format(new Date(time * 1000), "yyyy MMM dd, HH:mm")
            }
          />

          {showReferenceLines && (
            <>
              <ReferenceLine
                y={desiredRange ? desiredRange.min : 0}
                stroke="blue"
                strokeDasharray="5 5"
                label={lowerLineLegendMap[currentGraph]}
              />
              <ReferenceLine
                y={desiredRange ? desiredRange.max : 0}
                stroke="red"
                strokeDasharray="5 5"
                label={upperLineLegendMap[currentGraph]}
              />
            </>
          )}

          <Line type="monotone" dataKey="Value" stroke="#FF5733" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlantGraph;
