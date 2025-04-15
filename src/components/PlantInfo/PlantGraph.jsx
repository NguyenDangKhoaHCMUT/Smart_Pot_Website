import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";

import Breadcrumb from "react-bootstrap/Breadcrumb";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";

import PlantContext from "../../context/PlantContext";

const PlantGraph = () => {
  const { serialID } = useParams();
  const { initializeFirestore, currentGraph } = useContext(PlantContext);

  const [hoursAgo, setHoursAgo] = useState(1);

  const [data, setData] = useState([]);

  useEffect(() => {
    let db = initializeFirestore();
    const logsRef = collection(db, "Plant_" + currentGraph, serialID, "Logs");

    const ticksAgo = Date.now() / 1000 - hoursAgo * 60 * 60;

    const q = query(
      logsRef,
      orderBy("Time", "asc"),
      where("Time", ">=", ticksAgo)
    );

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
  }, [serialID, currentGraph, hoursAgo]);

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "15px",
        borderRadius: "10px",
        color: "black" // Added this line to make text color black
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-2">
        <h4>
          <i className="fa-solid fa-clock-rotate-left"></i>
          {" " + currentGraph} History ({hoursAgo} Hours)
        </h4>
        <Breadcrumb className="mb-0">
          <Breadcrumb.Item onClick={() => setHoursAgo(1)}>
            1 Hour
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => setHoursAgo(6)}>
            6 Hours
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => setHoursAgo(24)}>
            24 Hours
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <ResponsiveContainer width="95%" height={300}>
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
            labelFormatter={(time) => format(new Date(time * 1000), "HH:mm")}
          />
          <Line type="monotone" dataKey="Value" stroke="#FF5733" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PlantGraph;
