"use client"

import { createContext, useState, useEffect, useContext } from "react";
import loggersService from "@/app/service/loggersService";

export const UserLoggersContext = createContext({item:[]});

//The provider component
export const LoggersProvider = ({ children }) => {
  const [allLoggers, setAllLoggers] = useState([]);
  const [waterLevelLoggers, setWaterLevelLoggers] = useState([]);
  const [parLoggers, setParLoggers] = useState([]);
  const [conductivityLoggers, setConductivityLoggers] = useState([]);
  const [depthLoggers, setDepthLoggers] = useState([]);
  const [temperatureLoggers, setTemperatureLoggers] = useState([]);
  const [rainGaugeLoggers, setRainGaugeLoggers] = useState([]);
  const [soilMoistureLoggers, setSoilMoistureLoggers] = useState([]);
  const [wipers, setWipers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLogger, setSelectedLogger] = useState([{"model":"", "lat":-43.5950, "lng":170.1418, product_id:null}]);
  const [isSelectedLogger, setIsSelectedLogger] = useState(false);
  const [selectedLoggerCategory, setSelectedLoggerCategory] = useState([]);


  const handleSetLoggerCategory = (categoryId) => {
    //console.log('Incoming Category ID:', categoryId);
    let selectedCategory = [];
    
    // Ensure categoryId is a number for range checks
    const id = Number(categoryId);

    // Use a switch statement for clean range-based mapping
    switch (true) {
        case id >= 1 && id <= 7: // Maps to Water Level Loggers
            selectedCategory = waterLevelLoggers;
            break;
        case id >= 31 && id <= 34: // Maps to Conductivity Loggers
            selectedCategory = conductivityLoggers;
            break;
        case id >= 12 && id <= 14: // Maps to Depth Loggers
            selectedCategory = depthLoggers;
            break;
        case id >= 15 && id <= 17: // Maps to Temperature Loggers
            selectedCategory = temperatureLoggers;
            break;
        case id === 18: // Maps to PAR Loggers
            selectedCategory = parLoggers;
            break;
        case id === 19: // Maps to Rain Gauge Loggers
            selectedCategory = rainGaugeLoggers;
            break;
        case id === 22: // Maps to Soil Moisture Loggers
            selectedCategory = soilMoistureLoggers;
            break;
        case id === 23: // Maps to Wipers
            selectedCategory = wipers;
            break;
        default:
            //console.warn(`Unknown categoryId received: ${categoryId}`);
            selectedCategory = []; // Default to an empty array
    }

    setSelectedLoggerCategory(selectedCategory);
    console.log(`Set selectedLoggerCategory to array of length: ${selectedCategory.length}`);
  };

  useEffect(() => {
    const fetchLoggers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await loggersService.fetchLoggersByUserId(32);
        
        setAllLoggers(data);
        //Filter Water Level Loggers
        const wlLoggersArray = data.filter((item) => item.product_id <= 7);
        setWaterLevelLoggers(wlLoggersArray);

        //Filter Conductivity Loggers
        const ctLoggersArray = data.filter(
          (item) => item.product_id >= 8 && item.product_id <= 11
        );
        setConductivityLoggers(ctLoggersArray);

        //Filter Depth Loggers
        const dtLoggersArray = data.filter(
          (item) => item.product_id >= 12 && item.product_id <= 14
        );
        setDepthLoggers(dtLoggersArray);

        //Filter Depth Loggers
        const tempLoggersArray = data.filter(
          (item) => item.product_id >= 15 && item.product_id <= 17
        );
        setTemperatureLoggers(tempLoggersArray);

        //Filter PAR Loggers
        const parLoggersArray = data.filter((item) => item.product_id === 18);
        setParLoggers(parLoggersArray);

        //Filter Rain Gauge Loggers
        const rgLoggersArray = data.filter((item) => item.product_id === 19);
        setRainGaugeLoggers(rgLoggersArray);

        //Filter Soil Moisture Loggers
        const smLoggersArray = data.filter((item) => item.product_id === 22);
        setSoilMoistureLoggers(smLoggersArray);

        //Filter Wipers
        const wipersArray = data.filter((item) => item.product_id === 23);
        setWipers(wipersArray);

      } catch (e) {
        console.log("Fetching error", e);
        throw new Error("Failed to fetch loggers from API");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLoggers();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <UserLoggersContext
      value={{
        allLoggers,
        waterLevelLoggers,
        parLoggers,
        conductivityLoggers,
        depthLoggers,
        temperatureLoggers,
        rainGaugeLoggers,
        soilMoistureLoggers,
        wipers,
        isLoading,
        error,
        selectedLogger,
        setSelectedLogger,
        isSelectedLogger,
        setIsSelectedLogger,
        selectedLoggerCategory,
        handleSetLoggerCategory,
      }}
    >
      {children}
    </UserLoggersContext>
  );
};

export const useLoggers = () => {
  const context = useContext(UserLoggersContext);
  if (!context) {
    throw new Error("useLoggers must be used inside a LoggersProvider");
  }
  return context;
};
