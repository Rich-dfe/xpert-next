import { useState, useEffect } from "react";
import chartDataService from "@/app/service/chartDataService";
import dynamic from "next/dynamic";
import ChartCard from "../chart-card";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DualAxisChart = ({
  chartData,
  title,
  primaryAxisText,
  secondaryAxisText,
  dataPoints
}) => {
  const chartOptions = {
    chart: {
      type: "line",
      //height: 100,
      //width: 500,
      zoom: {
        allowMouseWheelZoom: false,
      },
    },
    responsive: [
      {
        breakpoint: 768, // Applied on screens <= 768px wide
        options: {
          chart: {
            width: "100%", // Or a smaller fixed width
            height: 300,
          },
          title: {
            offsetY: 20,
            style: {
              fontSize: "12px",
            },
          },
          stroke: {
            width: 1,
          },
        },
      },
    ],
    legend: {
      show: true,
      position: "bottom",
    },
    fill: {
      type: "solid",
      colors: ["#0096FF", "#fc3d03"],
      opacity: [1.0, 0.8],
    },
    title: {
      text: `${title}`,
      align: "left",
    },
    subtitle: {
      text: `${dataPoints} data points`,
      align: "left",
    },
    xaxis: {
      type: "datetime", // Crucial for time series
      labels: {
        format: "dd/MM/yy",
        datetimeUTC: false,
      },
    },
    yaxis: [
      {
        axisBorder: {
          show: true,
        },
        title: {
          text: primaryAxisText,
          style: {
            fontSize: "12px",
            fontWeight: "light",
          },
        },
      },
      {
        axisBorder: {
          show: true,
        },
        title: {
          text: secondaryAxisText,
          style: {
            fontSize: "12px",
            fontWeight: "light",
          },
        },
        opposite: true,
      },
    ],
    stroke: {
      width: 2,
      curve: "smooth",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy hh:mm:ss",
      },
    },
    theme: {
      mode: "light",
      palette: "palette1",
      monochrome: {
        enabled: false,
        color: "#255aee",
        shadeTo: "light",
        shadeIntensity: 0.65,
      },
    },
  };

  return (
    <div className="mt-5 lg:m-20 lg:mt-10 border-2 border-gray-200 p-1">
      <Chart
        options={chartOptions}
        series={chartData}
        height="700"
        width="100%"
      />
    </div>
  );
};

export default DualAxisChart;