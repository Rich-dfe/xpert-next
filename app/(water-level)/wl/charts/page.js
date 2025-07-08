"use client";

import React, { useState, useRef } from "react";
import ChartDatePickerBar from "@/app/components/charts/chart-date-picker-bar";
import DualAxisChart from "@/app/components/charts/primary/chart-dual-axis";
import ChartDiagnosticAll from "@/app/components/charts/diagnostic/chart-diagnostic-all";

export default function WlCharts() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [displayChartType, setDisplayChartType] = useState(0);
  const chartType = useRef(0);
  const [chartData, setChartData] = useState([
    [
      [1486684800000, 343],
      [1486771200000, 432],
      [1486857600000, 311],
      [1486944000000, 435],
      [1487030400000, 334],
      [1487116800000, 528],
    ],
    [
      [1486684800000, 24],
      [1486771200000, 53],
      [1486857600000, 11],
      [1486944000000, 63],
      [1487030400000, 53],
      [1487116800000, 32],
    ],
  ]);

  const chartTitle = "Water Level & Temperature";
  const primaryAxisText = "Water Level (mm)";
  const secondaryAxisText = "Temperature";

  const handleDates = () => {
    console.log("Start Date = ", startDate.getTime());
    console.log("End Date = ", endDate.getTime());
    console.log("Chart = ", chartType.current);
    chartType.current == 0 ? setDisplayChartType(0) : setDisplayChartType(1);
  };

  const updateStartDate = (sd) => {
    setStartDate(sd);
  };

  const updateEndDate = (ed) => {
    setEndDate(ed);
  };

  const updateChartType = (event) => {
    chartType.current = event.target.value;
    console.log(chartType.current);
  };

  return (
    <>
      <ChartDatePickerBar
        handleDates={handleDates}
        currentStartDate={startDate}
        currentEndDate={endDate}
        onChangeStartDate={updateStartDate}
        onChangeEndDate={updateEndDate}
        currentChartType={chartType}
        onChangeChartType={updateChartType}
      />
      {displayChartType == 0 ? (
        <DualAxisChart
          chartData={chartData}
          title={chartTitle}
          primaryAxisText={primaryAxisText}
          secondaryAxisText={secondaryAxisText}
        />
      ) : (
        <ChartDiagnosticAll />
      )}
    </>
  );
}
