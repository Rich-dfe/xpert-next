"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLoggers } from "@/app/store/user-loggers-context";
import { useChartData } from "@/app/store/chart-data-context";
import ChartDatePickerBar from "@/app/components/charts/chart-date-picker-bar";
import DualAxisChart from "@/app/components/charts/primary/chart-dual-axis";
import DualAxisAreaChart from "@/app/components/charts/primary/chart-dual-axis-area";
import ChartDiagnosticAll from "@/app/components/charts/diagnostic/chart-diagnostic-all";
import chartDataService from "@/app/service/chartDataService";
import { useModal } from "@/app/hooks/useModal";
import ModalAlert from "@/app/components/Modal-alert";
import { useLicenseChecker } from "@/app/hooks/useLicenseChecker";
import FormStripError from "@/app/components/Form-strip-error";
import Spinner from "@/app/components/spinner";
import loggersService from "@/app/service/loggersService";

export default function WlCharts() {
  const {
    chartDataTop,
    chartDataBottom,
    chartDataDiagnostic,
    calData,
    updateCalData,
    chartAttributes,
    updateChartAttributes,
    startDate, //ISO 8601 date format required for the datepicker ui to display the start date
    endDate, //ISO 8601 date format required for the datepicker ui to display the end date
    updateChartDataTop,
    updateChartDataBottom,
    updateChartDataDiagnostic,
    updateStartDate,
    updateEndDate,
    updateUnixStartDate,
    unixStartDate, //Required to fetch the chart data from the api
    unixEndDate, //Required to fetch the chart data from the api
    updateUnixEndDate,
  } = useChartData();

  //Firstly check whether the logger uid is available as this is requied for getiing the license data
  const { selectedLogger } = useLoggers();

  if (selectedLogger[0].logger_uid === undefined) {
    return (
      <FormStripError text="Please Select a logger from the loggers page."></FormStripError>
    );
  }

  const [isLoading, setIsLoading] = useState(false);
  const [displayChartType, setDisplayChartType] = useState(0);
  const [isDataReady, setIsDataReady] = useState(false);
  const [chartType, setChartType] = useState(0); //Primary or diagnostic data
  const { isOpen, message, title, type, openModal, closeModal } = useModal();
  const { licensePeriods, getLicensePeriods, checkLicenseValid } =
    useLicenseChecker();
  const chartSelect = useRef(0); // 0 = top chart, 1= bottom chart

  useEffect(() => {
    async function setChartParams() {
      //1. SET THE CHART ATTRIBUTES FOR DISPLAY
      if (selectedLogger[0].product_id <= 7) {
        updateChartAttributes({
          chartType: 1,
          chartTitle: "Water Level & Temperature",
          primaryAxisText: "Water Level (mm)",
          secondaryAxisText: "Temperature",
        });
      } else if (selectedLogger[0].product_id == 18) {
        updateChartAttributes({
          chartType: 2,
          chartTitle: "PAR & Temperature",
          primaryAxisText: "PAR",
          secondaryAxisText: "Temperature",
        });
      } else if (
        selectedLogger[0].product_id >= 15 &&
        selectedLogger[0].product_id <= 17
      ) {
        updateChartAttributes({
          chartType: 1,
          chartTitle: "Temperature",
          primaryAxisText: "Temperature Ext",
          secondaryAxisText: "Temperature Int",
        });
      }
      //2. GET THE CAL DATA FOR THE SELECTED LOGGER SO THE CHART DATA CAN BE CALIBRATED
      const apiCalData = await loggersService.fetchUserCalibrationData(
        selectedLogger[0].id,
        4132
      );
      updateCalData(apiCalData);
    }
    setChartParams();
  }, []);

  // const [chartData, setChartDataTop] = useState([
  //   {
  //     name: chartAttributes.primaryAxisText,
  //     data: [],
  //   },
  //   {
  //     name: chartAttributes.secondaryAxisText,
  //     data: [],
  //   },
  // ]);

  // const [chartDataTwo, setChartDataBottom] = useState([
  //   {
  //     name: chartAttributes.primaryAxisText,
  //     data: [],
  //   },
  //   {
  //     name: chartAttributes.secondaryAxisText,
  //     data: [],
  //   },
  // ]);

  const chartDataObj = [
    [
      {
        name: chartAttributes.primaryAxisText,
        data: [],
      },
    ],
    [
      {
        name: chartAttributes.secondaryAxisText,
        data: [],
      },
    ],
  ];

  //Use the license period checker hook to get the licenses for the slected logger
  getLicensePeriods(selectedLogger[0].logger_uid);

  const handleDates = async (event) => {
    // console.log("EVENT", event.target.id);
    // console.log("Start Date = ", startDate.getTime());
    // console.log("End Date = ", endDate.getTime());
    // console.log("Chart = ", chartType.current);
    let timeRange = [];
    setIsDataReady(false);
    chartType == 0 ? setDisplayChartType(0) : setDisplayChartType(1);
    //Was the date chosen by the using the date fields
    if (event.target.id === "selected") {
      getChartData(unixStartDate, unixEndDate);
    } else if (event.target.id === "1day") {
      //LAST DAY BUTTON
      timeRange = getTimeStampRange(1);
      console.log("TR", timeRange);
      if (!checkLicenseValid(timeRange)) {
        openInvalidLicenseModal();
      } else {
        getChartData(timeRange[0], timeRange[1]);
      }
    } else if (event.target.id === "7days") {
      //LAST 7 DAYS BUTTON
      timeRange = getTimeStampRange(7);
      if (!checkLicenseValid(timeRange)) {
        openInvalidLicenseModal();
      } else {
        getChartData(timeRange[0], timeRange[1]);
      }
    } else if (event.target.id === "30days") {
      //LAST 30 DAYS BUTTON
      timeRange = getTimeStampRange(30);
      if (!checkLicenseValid(timeRange)) {
        openInvalidLicenseModal();
      } else {
        getChartData(timeRange[0], timeRange[1]);
      }
    }
    setIsDataReady(true);
  };

  const openInvalidLicenseModal = () => {
    openModal("Notice!", "The selected date range is not licensed.", "red");
  };

  const getTimeStampRange = (offset) => {
    const dateObject = new Date();
    const endTimestamp = Date.now(); //current timestamp
    const endTimestampSeconds = Math.floor(endTimestamp);

    dateObject.setDate(dateObject.getDate() - offset);
    const fromTimestamp = dateObject.getTime();
    const fromTimestampSeconds = Math.floor(fromTimestamp);
    return [fromTimestampSeconds, endTimestampSeconds];
  };

  //USE EFFECT HERE WITH WITH 'displayChartType' AS A DEPENDENCY.

  const getChartData = async (startDate, endDate) => {
    console.log('CHART CAL DATA',startDate, endDate,displayChartType);
    //setIsLoading(true);
    if (startDate >= endDate) {
      openModal(
        "Error!",
        "Start date must be earlier than the end date.",
        "red"
      );
      return;
    }

    //HERE WE NEED TO PUT CONDITIONAL CHART DATA FETCHING
    if (displayChartType == 0) {
      //Primary data chart
      const chartDataResponse = await chartDataService.fetchChartData(
        selectedLogger[0].logger_uid,
        startDate,
        endDate,
        selectedLogger[0].product_id,
        calData
      );

      if (chartDataResponse.length === 0) {
        openModal(
          "Notice!",
          "There are no data points for the selected period.",
          "red"
        );
      }

      chartDataObj[0].name = chartAttributes.primaryAxisText;
      chartDataObj[0].data = chartDataResponse[0];
      chartDataObj[1].name = chartAttributes.secondaryAxisText;
      chartDataObj[1].data = chartDataResponse[1];

      //IS THE DATA ARRAY FOR A PAR LOGGER (THE PAR DATA CONTAINS EXTRA INFORMATION LIKE LIMIT VALUES )
      if (selectedLogger[0].product_id == 18) {
        chartDataObj[0].limits = chartDataResponse[3];
      }

      //console.log("CHARTDATAOBJ", chartDataObj);
      //LOAD THE DATA INTO THE RELEVANT OBJECT FOR THE TOP OR BOTTOM CHART
      if (chartSelect.current == 0) {
        console.log("CHARTOBJ", chartDataObj);
        updateChartDataTop(chartDataObj);
        //setChartDataTop(chartDataObj);
      } else if (chartSelect.current == 1) {
        //setChartDataBottom(chartDataObj);
        updateChartDataBottom(chartDataObj);
      }
      //setIsLoading(false);
      //console.log("CHART DATA RESP", chartDataResponse[0].length);
    } else if (displayChartType == 1) {
      console.log("GETTING DX DATA");
      const chartDataResponse = await chartDataService.fetchChartDiagnosticData(
        selectedLogger[0].logger_uid,
        startDate,
        endDate
      );
      console.log('DX DATA RESPONSE - 250',chartDataResponse);
      updateChartDataDiagnostic(chartDataResponse);
    }
  };

  const setStartDate = (sd) => {
    updateStartDate(sd);
    updateUnixStartDate(sd.getTime());
  };

  const setEndDate = (ed) => {
    updateEndDate(ed);
    updateUnixEndDate(ed.getTime());
  };

  //View primary or diagnostic data
  const updateChartType = (event) => {
    setChartType(event.target.value);
    console.log("CHART TYPE", chartType);
  };

  //View on the top or bottom chart
  const updateChartSelect = (event) => {
    chartSelect.current = event.target.value;
    console.log("CHART SELECT", chartSelect.current);
  };

  return (
    <>
      <ChartDatePickerBar
        handleDates={handleDates}
        currentStartDate={startDate}
        currentEndDate={endDate}
        onChangeStartDate={setStartDate}
        onChangeEndDate={setEndDate}
        currentChartType={chartType}
        onChangeChartType={updateChartType}
        loggerUid={selectedLogger[0].logger_uid}
        licensePeriods={licensePeriods}
        onChangeChartSelect={updateChartSelect}
      />
      {displayChartType == 0 ? (
        <div>
          {isLoading ? <Spinner /> : null}
          {chartAttributes.chartType === 1 && (
            <div>
              <DualAxisChart
                chartData={chartDataTop}
                title={chartAttributes.chartTitle}
                primaryAxisText={chartAttributes.primaryAxisText}
                secondaryAxisText={chartAttributes.secondaryAxisText}
                dataPoints={chartDataTop[0].data.length}
              />
              <DualAxisChart
                chartData={chartDataBottom}
                title={chartAttributes.chartTitle}
                primaryAxisText={chartAttributes.primaryAxisText}
                secondaryAxisText={chartAttributes.secondaryAxisText}
                dataPoints={chartDataBottom[0].data.length}
              />
            </div>
          )}

          {chartAttributes.chartType === 2 && (
            <div>
              <DualAxisAreaChart
                chartData={chartDataTop}
                title={chartAttributes.chartTitle}
                primaryAxisText={chartAttributes.primaryAxisText}
                secondaryAxisText={chartAttributes.secondaryAxisText}
                dataPoints={chartDataTop[0].data.length}
                //limits={limits}
              />
              <DualAxisAreaChart
                chartData={chartDataBottom}
                title={chartAttributes.chartTitle}
                primaryAxisText={chartAttributes.primaryAxisText}
                secondaryAxisText={chartAttributes.secondaryAxisText}
                dataPoints={chartDataBottom[0].data.length}
                //limits={limits}
              />
            </div>
          )}
        </div>
      ) : (
        <ChartDiagnosticAll chartData={chartDataDiagnostic} />
      )}
      <ModalAlert
        onClose={closeModal}
        isOpen={isOpen}
        title={title}
        text={message}
        type={type}
      />
    </>
  );
}
