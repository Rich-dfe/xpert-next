import { useState } from "react";
import dynamic from "next/dynamic";
import ChartCard from "../chart-card";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const ChartDiagnosticBar = ({chartData,chartTitle}) => {
  const [chartOptions, setChartOptions] = useState({
    options: {
        chart: {
          id: "basic-bar",
          background: '#f0f0f0',
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
      colors: ["#FF1654"],
      },
      series: [
        {
          name: chartTitle,
          data: chartData,
        }
      ]
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
            type="bar"
          />
        </ChartCard>
      </div>
    </div>
  );
};

export default ChartDiagnosticBar;
