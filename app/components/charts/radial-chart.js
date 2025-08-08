import { useState } from "react";
import dynamic from "next/dynamic";
import ChartCard from "./chart-card";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const RadialChart = ({ chartData, title }) => {
  const [series, setSeries] = useState([20]);
  const [chartOptions, setChartOptions] = useState({
    options: {
      colors: ["#ff3300"],
      plotOptions: {
        radialBar: {
          startAngle: -100,
          endAngle: 100,

          track: {
            background: "#f2f2f2",
            strokeWidth: "97%",
            dropShadow: {
              enabled: true,
              top: 4,
              left: 6,
              blur: 1,
              opacity: 0.35,
            },
          },
          dataLabels: {
            show: true,
            value: {
              show: true,
              fontSize: "26px",
            },
            total: {
              show: true,
              label: "Inside",
              color: "#373d3f",
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: ["#3399ff"],
          stops: [-5, 120],
        },
      },
    },
  });

  return (
    <div className="m-2 lg:m-20 lg:mt-7">
      <div>
        <ChartCard>
          <Chart
            options={chartOptions.options}
            series={series}
            height="700"
            width="100%"
            type="radialBar"
          />
        </ChartCard>
      </div>
    </div>
  );
};

export default RadialChart;
