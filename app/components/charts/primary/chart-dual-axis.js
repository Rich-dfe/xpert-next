import { useState } from "react";
import dynamic from "next/dynamic";
import ChartCard from "../chart-card";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const DualAxisChart = ({chartData}) => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: true,
        borderColor: "#90A4AE",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      title: {
        text: "Water Level & Temperature - 16-06-2025",
        align: "center",
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      xaxis: {
        type: 'datetime',
        axisBorder: {
          show: true,
          color: "black",
        },
      },
      yaxis: [
        {
          seriesName: "Level",
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#247BA0",
          },
          labels: {
            style: {
              colors: "#247BA0",
            },
          },
          title: {
            text: "Water Level (mm)",
            style: {
              color: "#247BA0",
              fontSize: "18px",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Temperature",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#FF1654",
          },
          labels: {
            style: {
              colors: "#FF1654",
            },
          },
          title: {
            text: "Temperature",
            style: {
              color: "#FF1654",
              fontSize: "18px",
            },
          },
        },
      ],
      colors: ["#247BA0", "#FF1654"],
      stroke: {
        curve: "smooth",
        width: 1.5,
      },
    },
    series: [
      {
        name: "Water Level",
        data: chartData[0]
      },
      {
        name: "Temperature",
        data: chartData[1]
      },
    ],
  });

  return (
    <div className="m-2 lg:m-20 lg:mt-7">
      <div>
        <ChartCard>
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            height="700"
            width="100%"
            charttype="Line"
          />
        </ChartCard>
      </div>
    </div>
  );
};

export default DualAxisChart;
