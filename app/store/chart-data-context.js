"use client"

import { createContext, useState, useContext } from "react";

// 1. THE SAFETY SWITCH
// We initialize with 'null'. This ensures that if the Provider is missing,
// the hook will fail loudly instead of silently doing nothing.
export const ChartDataContext = createContext(null);

export const ChartDataProvider = ({ children }) => {
  // State Initialization
  const [chartDataTop, setChartDataTop] = useState([
    {
      name: "",
      data: [],
    },
    {
      name: "",
      data: [],
    },
  ]);

  const [chartDataBottom, setChartDataBottom] = useState([
    {
      name: "",
      data: [],
    },
    {
      name: "",
      data: [],
    },
  ]);

  const [chartDataDiagnostic, setChartDataDiagnostic] = useState([
    [[1608202801000,2.724],[1608202811000,2.724]],
    [[1608202801000,2.724],[1608202811000,2.724]],
    [[1608202801000,2.724],[1608202811000,2.724]],
    [[1608202801000,2.724],[1608202811000,2.724]],
    [[1608202801000,2.724],[1608202811000,2.724]],
    [[1608202801000,2.724],[1608202811000,2.724]],
    [[1608202801000,2.724],[1608202811000,2.724]],
    [[1608202801000,2.724],[1608202811000,2.724]],
    [[1608202801000,2.724],[1608202811000,2.724]]
  ]);

  const [calData, setCalData] = useState({ a: 200, b: 201, status: "LOADED" });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [unixStartDate, setUnixStartDate] = useState(new Date());
  const [unixEndDate, setUnixEndDate] = useState(new Date());
  const [chartAttributes, setChartAttributes] = useState({
      chartType: 1,
      chartTitle: "",
      primaryAxisText: "",
      secondaryAxisText: "",
    });

  const updateCalData = (newCalData) => {
    setCalData(newCalData);
  };

  const updateChartAttributes = (newAttributes) => {
    setChartAttributes(newAttributes)
  }

  const updateStartDate = (date) => {
    setStartDate(date);
  }

  const updateEndDate = (date) =>{
    setEndDate(date);
  }

  const updateUnixStartDate = (date) => {
    setUnixStartDate(date);
  }

  const updateUnixEndDate = (date) =>{
    setUnixEndDate(date);
  }

  const updateChartDataTop = (data) => {
    setChartDataTop(data);
  }

  const updateChartDataBottom = (data) => {
    setChartDataBottom(data);
  }

  const updateChartDataDiagnostic = (data) =>{
    setChartDataDiagnostic(data);
  }

  return (
    <ChartDataContext
      value={{
        chartDataTop,
        chartDataBottom,
        chartDataDiagnostic,
        calData,
        chartAttributes,
        startDate,
        unixStartDate,
        endDate,
        unixEndDate,
        updateChartDataTop,
        updateChartDataBottom,
        updateChartDataDiagnostic,
        updateCalData,
        updateChartAttributes,
        updateStartDate,
        updateUnixStartDate, 
        updateEndDate,
        updateUnixEndDate,
      }}
    >
      {children}
    </ChartDataContext>
  );
};

// 2. THE HOOK
export const useChartData = () => {
  const context = useContext(ChartDataContext);
  
  // This checks if the hook is being called outside the provider
  if (!context) {
    throw new Error("useChartData must be used within a ChartDataProvider");
  }
  
  return context;
};