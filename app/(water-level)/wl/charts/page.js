"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLoggers } from "@/app/store/user-loggers-context";
import ChartDatePickerBar from "@/app/components/charts/chart-date-picker-bar";
import DualAxisChart from "@/app/components/charts/primary/chart-dual-axis";
import ChartDiagnosticAll from "@/app/components/charts/diagnostic/chart-diagnostic-all";
import chartDataService from "@/app/service/chartDataService";
import { useModal } from "@/app/hooks/useModal";
import ModalAlert from "@/app/components/Modal-alert";
import { useLicenseChecker } from "@/app/hooks/useLicenseChecker";
import FormStripError from "@/app/components/Form-strip-error";

export default function WlCharts() {
  const { selectedLogger } = useLoggers();
//const [isLoading, setIsLoading] = useState(false);
  if(selectedLogger[0].logger_uid === undefined){
    return(
      <FormStripError text="Please Select a logger from the loggers page."></FormStripError>
    )
  }

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [displayChartType, setDisplayChartType] = useState(0);
  const chartType = useRef(0);
  
  const {isOpen,message,title,type,openModal,closeModal} = useModal();
  const { licensePeriods, getLicensePeriods, checkLicenseValid } = useLicenseChecker();
  const chartSelect = useRef(0); // 0 = top chart, 1= bottom chart

  

  const chartTitle = "Water Level & Temperature";
  const primaryAxisText = "Water Level (mm)";
  const secondaryAxisText = "Temperature";

  const [chartData, setChartDataTop] = useState([
    {
      name: primaryAxisText,
      data: [],
    },
    {
      name: secondaryAxisText,
      data: [],
    },
  ]);

  const [chartDataTwo, setChartDataBottom] = useState([
    {
      name: primaryAxisText,
      data: [],
    },
    {
      name: secondaryAxisText,
      data: [],
    },
  ]);

  const chartDataObj = [
    [
      {
        name: primaryAxisText,
        data: [],
      },
    ],
    [
      {
        name: secondaryAxisText,
        data: [],
      },
    ],
  ];

  
  console.log('SELECT',selectedLogger[0].logger_uid);
  //Use the license period checker hook to get the licenses for the slected logger 
  getLicensePeriods(selectedLogger[0].logger_uid);

  const handleDates = async (event) => {
    // console.log("EVENT", event.target.id);
    // console.log("Start Date = ", startDate.getTime());
    // console.log("End Date = ", endDate.getTime());
    // console.log("Chart = ", chartType.current);
    chartType.current == 0 ? setDisplayChartType(0) : setDisplayChartType(1);
    //Was the date chosen by the using the date fields
    if (event.target.id === "selected") {
      getChartData(startDate.getTime(),endDate.getTime());
    } else if (event.target.id === "1day") {
      //LAST DAY BUTTON
      const timeRange = getTimeStampRange(1);
      if(!checkLicenseValid(timeRange)){
        openInvalidLicenseModal();
      }else {getChartData(timeRange[0],timeRange[1]);}
    } else if (event.target.id === "7days") {
      //LAST 7 DAYS BUTTON
      const timeRange = getTimeStampRange(7);
      if(!checkLicenseValid(timeRange)){
        openInvalidLicenseModal();
      }else {getChartData(timeRange[0],timeRange[1]);}
    } else if (event.target.id === "30days") {
      //LAST 30 DAYS BUTTON
      const timeRange = getTimeStampRange(30);
      if(!checkLicenseValid(timeRange)){
        openInvalidLicenseModal();
      }else {getChartData(timeRange[0],timeRange[1]);}
    }
  };

  const openInvalidLicenseModal = () =>{
    openModal('Notice!','The selected date range is not licensed.','red');
  }

  const getTimeStampRange = (offset) => {
    const dateObject = new Date();
    const endTimestamp = Date.now(); //current timestamp
    const endTimestampSeconds = Math.floor(endTimestamp);

    dateObject.setDate(dateObject.getDate() - offset);
    const fromTimestamp = dateObject.getTime();
    const fromTimestampSeconds = Math.floor(fromTimestamp);
    return [fromTimestampSeconds,endTimestampSeconds];
  };

  const getChartData = async (startDate, endDate) => {
    if(startDate >= endDate){
      openModal('Error!','Start date must be earlier than the end date.','red');
      return;
    }
    
    const chartDataResponse = await chartDataService.fetchWaterLevelChartData(
        selectedLogger[0].logger_uid,
        startDate,
        endDate
      );

      if(chartDataResponse[0].length === 0){
        openModal('Notice!','There are no data points for the selected period.','red');
      }

      chartDataObj[0].name = primaryAxisText;
      chartDataObj[0].data = chartDataResponse[0];
      chartDataObj[1].name = secondaryAxisText;
      chartDataObj[1].data = chartDataResponse[1];
      if(chartSelect.current == 0){
        setChartDataTop(chartDataObj);
      }else if(chartSelect.current == 1){
        setChartDataBottom( chartDataObj);
      }
      
      //console.log("CHART DATA RESP", chartDataResponse[0].length);
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

  const updateChartSelect = (event) => {
    chartSelect.current = event.target.value;
    console.log('ChartSELECT',chartSelect.current);
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
        loggerUid={selectedLogger[0].logger_uid}
        licensePeriods={licensePeriods}
        onChangeChartSelect={updateChartSelect}
      />
      {displayChartType == 0 ? (
        <div>
        <DualAxisChart
          chartData={chartData}
          title={chartTitle}
          primaryAxisText={primaryAxisText}
          secondaryAxisText={secondaryAxisText}
        />
        <DualAxisChart
          chartData={chartDataTwo}
          title={chartTitle}
          primaryAxisText={primaryAxisText}
          secondaryAxisText={secondaryAxisText}S
        />
        </div>
      ) : (
        <ChartDiagnosticAll />
      )}
      <ModalAlert onClose={closeModal} isOpen={isOpen} title={title} text={message} type={type}/>
    </>
  );
}
