import { useRef, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Badge } from "react-bootstrap";
import {
  doc,
  query,
  collection,
  orderBy,
  limit,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import PlantContext from "../../context/PlantContext";

const PlantCard = ({ plant, searchTerm, filters }) => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const { initializeFirestore } = useContext(PlantContext);
  const [temperature, setTemperature] = useState(null);
  const [desiredRange, setDesiredRange] = useState(null);
  const [light, setLight] = useState(null);
  const [lightRange, setLightRange] = useState(null);
  const [moisture, setMoisture] = useState(null);
  const [moistureRange, setMoistureRange] = useState(null);
  const [soilHumidity, setSoilHumidity] = useState(null);
  const [soilHumidityRange, setSoilHumidityRange] = useState(null);

  useEffect(() => {
    const fetchDesiredRange = async () => {
      const db = initializeFirestore();
      const planDocRef = doc(db, "Plant_Plan", plant.SerialID);

      try {
        const docSnap = await getDoc(planDocRef);
        if (docSnap.exists()) {
          const planData = docSnap.data().Plan;
          if (planData?.StatRanges?.Temperature) {
            const { min, max } = planData.StatRanges.Temperature;
            setDesiredRange({ min, max });
          }
        }
      } catch (error) {
        console.error("Error fetching plant plan:", error);
      }
    };

    fetchDesiredRange();
  }, [plant.SerialID, initializeFirestore]);

  useEffect(() => {
    const db = initializeFirestore();
    const logsRef = collection(db, "Plant_Temperature", plant.SerialID, "Logs");
    const q = query(logsRef, orderBy("Time", "desc"), limit(1));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const latestEntry = querySnapshot.docs[0].data();
        setTemperature(latestEntry.Value);
      }
    });

    return () => unsubscribe();
  }, [plant.SerialID, initializeFirestore]);

  useEffect(() => {
    const fetchLightRange = async () => {
      const db = initializeFirestore();
      const planDocRef = doc(db, "Plant_Plan", plant.SerialID);

      try {
        const docSnap = await getDoc(planDocRef);
        if (docSnap.exists()) {
          const planData = docSnap.data().Plan;
          if (planData?.StatRanges?.Light) {
            const { min, max } = planData.StatRanges.Light;
            setLightRange({ min, max });
          }
        }
      } catch (error) {
        console.error("Error fetching plant plan:", error);
      }
    };

    fetchLightRange();
  }, [plant.SerialID, initializeFirestore]);

  useEffect(() => {
    const db = initializeFirestore();
    const logsRef = collection(db, "Plant_Light", plant.SerialID, "Logs");
    const q = query(logsRef, orderBy("Time", "desc"), limit(1));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const latestEntry = querySnapshot.docs[0].data();
        setLight(latestEntry.Value);
      }
    });

    return () => unsubscribe();
  }, [plant.SerialID, initializeFirestore]);

  useEffect(() => {
    const fetchMoistureRange = async () => {
      const db = initializeFirestore();
      const planDocRef = doc(db, "Plant_Plan", plant.SerialID);

      try {
        const docSnap = await getDoc(planDocRef);
        if (docSnap.exists()) {
          const planData = docSnap.data().Plan;
          if (planData?.StatRanges?.Moisture) {
            const { min, max } = planData.StatRanges.Moisture;
            setMoistureRange({ min, max });
          }
        }
      } catch (error) {
        console.error("Error fetching plant plan:", error);
      }
    };

    fetchMoistureRange();
  }, [plant.SerialID, initializeFirestore]);

  useEffect(() => {
    const db = initializeFirestore();
    const logsRef = collection(db, "Plant_Moisture", plant.SerialID, "Logs");
    const q = query(logsRef, orderBy("Time", "desc"), limit(1));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const latestEntry = querySnapshot.docs[0].data();
        setMoisture(latestEntry.Value);
      }
    });

    return () => unsubscribe();
  }, [plant.SerialID, initializeFirestore]);

  useEffect(() => {
    const fetchSoilHumidityRange = async () => {
      const db = initializeFirestore();
      const planDocRef = doc(db, "Plant_Plan", plant.SerialID);

      try {
        const docSnap = await getDoc(planDocRef);
        if (docSnap.exists()) {
          const planData = docSnap.data().Plan;
          if (planData?.StatRanges?.SoilHumidity) {
            const { min, max } = planData.StatRanges.SoilHumidity;
            setSoilHumidityRange({ min, max });
          }
        }
      } catch (error) {
        console.error("Error fetching plant plan:", error);
      }
    };

    fetchSoilHumidityRange();
  }, [plant.SerialID, initializeFirestore]);

  useEffect(() => {
    const db = initializeFirestore();
    const logsRef = collection(
      db,
      "Plant_SoilHumidity",
      plant.SerialID,
      "Logs"
    );
    const q = query(logsRef, orderBy("Time", "desc"), limit(1));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        const latestEntry = querySnapshot.docs[0].data();
        setSoilHumidity(latestEntry.Value);
      }
    });

    return () => unsubscribe();
  }, [plant.SerialID, initializeFirestore]);

  const hoverStyles = {
    transform: "scale(1.05)",
    boxShadow: "0px 4px 15px rgba(52, 152, 219, 0.5)",
    outline: "3px solid ",
    cursor: "pointer",
  };

  const clickStyles = {
    transform: "scale(0.96)",
    boxShadow: "0px 4px 20px rgba(52, 152, 219, 0.8)",
    outline: "2px solid ",
    cursor: "pointer",
  };

  const resetStyles = {
    transform: "scale(1)",
    boxShadow: "none",
    outline: "none",
  };

  const highlightText = (text, term) => {
    if (!term) return text;
    const parts = text.split(new RegExp(`(${term})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === term.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "yellow" }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const shouldShow = () => {
    if (Object.values(filters).every(v => !v)) return true;
    
    let showTemp = true;
    let showLight = true;
    let showMoisture = true;
    let showSoil = true;

    if (temperature !== null && desiredRange) {
      const tempStatus = 
        temperature < desiredRange.min ? 'cold' :
        temperature > desiredRange.max ? 'hot' : 'tempOk';
      
      if (filters.cold || filters.hot || filters.tempOk) {
        showTemp = filters[tempStatus];
      }
    }

    if (light !== null && lightRange) {
      const lightStatus = 
        light < lightRange.min ? 'dark' :
        light > lightRange.max ? 'bright' : 'lightOk';
      
      if (filters.dark || filters.bright || filters.lightOk) {
        showLight = filters[lightStatus];
      }
    }

    if (moisture !== null && moistureRange) {
      const moistureStatus = 
        moisture < moistureRange.min ? 'moistureDry' :
        moisture > moistureRange.max ? 'moistureSaturated' : 'moistureOk';
      
      if (filters.moistureDry || filters.moistureSaturated || filters.moistureOk) {
        showMoisture = filters[moistureStatus];
      }
    }

    if (soilHumidity !== null && soilHumidityRange) {
      const soilStatus = 
        soilHumidity < soilHumidityRange.min ? 'soilDry' :
        soilHumidity > soilHumidityRange.max ? 'soilSoggy' : 'soilOk';
      
      if (filters.soilDry || filters.soilSoggy || filters.soilOk) {
        showSoil = filters[soilStatus];
      }
    }

    return showTemp && showLight && showMoisture && showSoil;
  };

  if (!shouldShow()) return null;

  return (
    <Card
      ref={ref}
      onMouseEnter={() => {
        Object.assign(ref.current.style, hoverStyles);
      }}
      onMouseLeave={() => {
        Object.assign(ref.current.style, resetStyles);
      }}
      onMouseDown={() => {
        Object.assign(ref.current.style, clickStyles);
      }}
      onMouseUp={() => {
        Object.assign(ref.current.style, hoverStyles);
      }}
      onClick={() => {
        navigate("/plants/" + plant.SerialID);
      }}
      style={{ width: 200 + "px", maxHeight: 450 + "px", cursor: "pointer" }}
    >
      <Card.Img
        style={{ width: "100%", maxHeight: 200 + "px" }}
        variant="top"
        src="https://img.freepik.com/premium-vector/vector-art-small-plant-white-background_1266257-12018.jpg?semt=ais_hybrid"
      />
      <Card.Body>
        <Card.Title>{highlightText(plant.Name, searchTerm)}</Card.Title>
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {/* Thông tin sơ bộ */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                {temperature !== null && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <i className="fa-solid fa-temperature-three-quarters"></i>
                    {desiredRange && (
                      <Badge
                        bg={
                          temperature >= desiredRange.min &&
                          temperature <= desiredRange.max
                            ? "success"
                            : "danger"
                        }
                      >
                        {temperature >= desiredRange.min &&
                        temperature <= desiredRange.max
                          ? "OK"
                          : temperature < desiredRange.min
                          ? "Cold"
                          : "Hot"}
                      </Badge>
                    )}
                  </div>
                )}
              </Box>
              <Box>
                {light !== null && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fa-solid fa-sun"></i>
                    {lightRange && (
                      <Badge
                        bg={
                          light >= lightRange.min && light <= lightRange.max
                            ? "success"
                            : "danger"
                        }
                      >
                        {light >= lightRange.min && light <= lightRange.max
                          ? "OK"
                          : light < lightRange.min
                          ? "Dark"
                          : "Bright"}
                      </Badge>
                    )}
                  </div>
                )}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Box>
                {soilHumidity !== null && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <i className="fa-solid fa-glass-water"></i>
                    {soilHumidityRange && (
                      <Badge
                        bg={
                          soilHumidity >= soilHumidityRange.min &&
                          soilHumidity <= soilHumidityRange.max
                            ? "success"
                            : "danger"
                        }
                      >
                        {soilHumidity >= soilHumidityRange.min &&
                        soilHumidity <= soilHumidityRange.max
                          ? "OK"
                          : soilHumidity < soilHumidityRange.min
                          ? "Dry"
                          : "Soggy"}
                      </Badge>
                    )}
                  </div>
                )}
              </Box>
              <Box>
                {moisture !== null && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <i className="fa-solid fa-droplet"></i>
                    {moistureRange && (
                      <Badge
                        bg={
                          moisture >= moistureRange.min &&
                          moisture <= moistureRange.max
                            ? "success"
                            : "danger"
                        }
                      >
                        {moisture >= moistureRange.min &&
                        moisture <= moistureRange.max
                          ? "OK"
                          : moisture < moistureRange.min
                          ? "Dry"
                          : "Saturated"}
                      </Badge>
                    )}
                  </div>
                )}
              </Box>
            </Box>
          </Box>
          {/* Serial ID */}
          
        </Box>
      </Card.Body>
      <Card.Footer>
        <Typography variant="body2">
          Serial ID: {highlightText(plant.SerialID, searchTerm)}
        </Typography>
      </Card.Footer>
    </Card>
  );
};

PlantCard.propTypes = {
  plant: PropTypes.shape({
    SerialID: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string,
    Location: PropTypes.string,
  }).isRequired,
  searchTerm: PropTypes.string,
  filters: PropTypes.object.isRequired,
};
export default PlantCard;
