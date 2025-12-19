import { useState } from "react";
import dynamic from "next/dynamic";
import ChartCard from "../chart-card";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartDiagnosticLine = ({chartData, chartTitle}) => {
  const [chartOptions, setChartOptions] = useState({
    options: {
      chart: {
        id: "diagnostic-voltage",
        type: 'line',
        background: '#f0f0f0',
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
        text: chartTitle,
        align: "left",
        margin: 0,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      xaxis: {
        type: "datetime",
        axisBorder: {
          show: true,
          color: "black",
        },
      },
      yaxis: [
        {
          axisBorder: {
            show: true,
            color: "#247BA0",
          },
          labels: {
            style: {
              colors: "#247BA0",
            },
          },
          tooltip: {
            enabled: true,
          },
        }
      ],
      colors: ["#247BA0", "#FF1654"],
      stroke: {
        curve: "smooth",
        width: 1.5,
      },
    },
    series: [
      {
        name: chartTitle,
        data: chartData,
      },
    ],
  });

  return (
    <div className="m-2 md:m-10">
      <div>
        <ChartCard>
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            height="300"
            width="100%"
          />
        </ChartCard>
      </div>
    </div>
  );
};

export default ChartDiagnosticLine;
