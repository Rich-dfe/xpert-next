"use client";

import { useState } from "react";
import ChartDatePickerBar from "@/app/components/charts/chart-date-picker-bar";

export default function WlHelp() {
  
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleDates = () => {
    console.log("Start Date = ", startDate.getTime());
    console.log("End Date = ", endDate.getTime());
  };

  const updateStartDate = (sd) => {
    setStartDate(sd);
  };

  const updateEndDate = (ed) => {
    setEndDate(ed);
  }


  return (
    <>
      <ChartDatePickerBar 
        handleDates={handleDates}
        currentStartDate={startDate}
        currentEndDate={endDate}
        onChangeStartDate={updateStartDate}
        onChangeEndDate={updateEndDate}
      />
    </>
  );
}
