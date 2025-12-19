"use client"

import { useMemo } from "react";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DualAxisAreaChart = ({
  chartData,
  title,
  primaryAxisText,
  secondaryAxisText,
  dataPoints,
}) => {
    //console.log('IN PAR CHART', chartData?.[0]?.limits?.[0]);
    console.log('IN PAR CHART', chartData);
    //console.log('IN PAR CHART POINTS', dataPoints);
    if (chartData && chartData.length > 0) {
  }
  if (chartData && chartData.length > 1) {
    chartData[1].type = 'line';
  }

  const chartOptions = {
    chart: {
      type: "line",
      //height: 350,
      zoom: {
        enabled: true,
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
    colors: ['#FFD700', '#fc3d03'],
    fill: {
    type: 'gradient',
    gradient: {
      shade: 'light', // 'light' or 'dark'
      type: "vertical", // Set to vertical
    //   shadeIntensity: 0.5,
    //   opacityFrom: 0.7,
    //   opacityTo: 0.9,
      stops: [0, 100], // Global stops for the whole chart, but colors are per series
      //colorStops allows per-series gradient definitions
      colorStops: [
        // Gradient for Series 1 (Blue gradient)
        [
          { offset: 0, color: '#FFD700', opacity: 0.9 },
          { offset: 100, color: '#FFDB58 ', opacity: 0.2 }
        ],
        // // Gradient for Series 2 (Green gradient)
        [
          { offset: 100, color: '#fc3d03', opacity: 1 },
          { offset: 100, color: '#fc3d03', opacity: 1 }
        ]
      ]
    }
  },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 1,
    },

    title: {
      text: `${title}`,
      align: "left",
    },
    subtitle: {
      text: `${dataPoints} data points`,
      align: "left",
    },
    tooltip: {
      x: {
        format: "dd/MM/yy hh:mm:ss",
      },
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
    legend: {
      horizontalAlign: "left",
    },
    annotations: {
    yaxis: [
      {
        y: chartData?.[0]?.limits?.[1],           // Start of the shaded area (lower bound)
        y2: chartData?.[0]?.limits?.[0],         // End of the shaded area (upper bound)
        borderColor: '#00000000', // Optional: Set border to transparent if you only want the fill
        fillColor: '#FFC7C7', // A light red/pink color to indicate danger
        opacity: 0.5,    // Make the area semi-transparent
        yAxisIndex: 0,
        label: {
          borderColor: '#FF0000',
          style: {
            color: '#000',
            background: '#FFC7C7',
            fontSize: '10px'
          },
          text: 'Saturation Zone', 
          position: 'right', 
        }
      }
    ]
  },
};

  

// Check if series is a non-empty array AND its first item has valid data
//if (chartData && chartData.length > 0 && chartData[0].data && chartData[0].data.length > 0) {
  return (
    <div className="mt-5 lg:m-20 lg:mt-10 border-2 border-gray-200 p-1">
      <Chart
        options={chartOptions}
        series={chartData}
        height="700"
        width="100%"
        type="area"
      />
    </div>
  );
//}

return <div>Loading chart data...</div>;
};

export default DualAxisAreaChart;
