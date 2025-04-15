import { useState, useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Badge } from "react-bootstrap";
import {
  collection,
  doc,
  query,
  orderBy,
  limit,
  onSnapshot,
  getDoc,
} from "firebase/firestore";

import PlantContext from "../../context/PlantContext";

const PlantSoilHumidity = () => {
  const ref = useRef(null);
  const { serialID } = useParams();
  const { initializeFirestore, changeGraph } = useContext(PlantContext);

  let [value, setValue] = useState(null);
  const [desiredRange, setDesiredRange] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchdesiredRange = async () => {
      const db = initializeFirestore();
      const planDocRef = doc(db, "Plant_Plan", serialID);

      try {
        const docSnap = await getDoc(planDocRef);
        if (docSnap.exists()) {
          const planData = docSnap.data().Plan;
          if (planData?.StatRanges?.SoilHumidity) {
            const { min, max } = planData.StatRanges.SoilHumidity;
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
  }, [serialID]);

  useEffect(() => {
    const db = initializeFirestore();
    const logsRef = collection(db, "Plant_SoilHumidity", serialID, "Logs");
    const q = query(logsRef, orderBy("Time", "desc"), limit(1));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        if (!querySnapshot.empty) {
          const latestEntry = querySnapshot.docs[0].data();
          setValue(latestEntry.Value);
        } else {
          setValue(null);
        }
      },
      (err) => {
        console.error("Error listening to logs:", err);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [serialID]);

  const handleGraphChange = () => {
    changeGraph("SoilHumidity");
  };

  const roundToOneDecimal = (num) => Math.round(num * 10) / 10;

  return (
    <Card
      ref={ref}
      onClick={handleGraphChange}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        backgroundColor: "#D2A679",
        transition: "transform 0.15s ease, box-shadow 0.15s ease",
        cursor: "pointer",
        transform: isHovered ? 'scale(1.03)' : 'scale(1)',
        boxShadow: isHovered ? '0px 10px 20px rgba(0, 0, 0, 0.2)' : '1px 1px 3px',
      }}
      className="p-3 px-3"
    >
      <Row className="align-items-center h-100">
        <Col xs={8} className="d-flex align-items-center h-100 d-none d-xl-flex">
          <div>
            <h4
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
                margin: 0,
                display: "flex",
                alignItems: "center",
                gap: "7px",
                whiteSpace: "nowrap",
                maxWidth: "100%",
              }}
            >
              <i className="fa-solid fa-glass-water"></i> Soil Humidity
              {value != null && desiredRange != null ? (
                value >= desiredRange.min && value <= desiredRange.max ? (
                  <Badge style={{ fontSize: "14px", minWidth: "50px" }} bg="success">
                    OK
                  </Badge>
                ) : value < desiredRange.min ? (
                  <Badge style={{ fontSize: "14px", minWidth: "50px" }} bg="danger">
                    Dry
                  </Badge>
                ) : (
                  <Badge style={{ fontSize: "14px", minWidth: "50px" }} bg="danger">
                    Soggy
                  </Badge>
                )
              ) : (
                ""
              )}
            </h4>
            <small style={{ fontSize: "1rem", fontWeight: 500 }}>
              Desired range: {desiredRange ? desiredRange.min : ""}ml - {desiredRange ? desiredRange.max : ""}ml
            </small>
          </div>
        </Col>
        <Col xs={12} md={4} className="d-flex align-items-center justify-content-center h-100">
          <p
            style={{
              fontSize: "2.0rem",
              fontWeight: 600,
              margin: 0,
              textAlign: "center",
              whiteSpace: "nowrap",
              maxWidth: "100%",
              paddingRight: "10px",
            }}
          >
            {value != null ? roundToOneDecimal(value) + "ml" : ""}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default PlantSoilHumidity;
