import { useState } from "react";
import ChartDiagnosticLine from "./chart-diagnostic-line";
import ChartDiagnosticBar from "./chart-diagnostic-bar";

const ChartDiagnosticAll = ({chartData}) => {
  //console.log("IN DIAGNOSTC ALL",chartData);
    const [batteryVoltageData, setBatteryVoltageData] = useState(chartData[2]);
    const [daysRemainingData, setDaysRemainingData] = useState(chartData[3]);
    const [resetCountData, setResetCountData] = useState([
          [1486684800000, 343],
          [1486771200000, 432],
          [1486857600000, 311],
          [1486944000000, 435],
          [1487030400000, 334],
          [1487116800000, 528],
        ]);
    const [clockChangeData, setClockChangeData] = useState([
          [1486684800000, 343],
          [1486771200000, 432],
          [1486857600000, 311],
          [1486944000000, 435],
          [1487030400000, 334],
          [1487116800000, 528],
        ]);
    const [loggerSettingsData, setLoggerSettingsData] = useState([
          [1486684800000, 343],
          [1486771200000, 432],
          [1486857600000, 311],
          [1486944000000, 435],
          [1487030400000, 334],
          [1487116800000, 528],
        ]);
    const [rssiData, setRssiData] = useState([
          [1486684800000, 343],
          [1486771200000, 432],
          [1486857600000, 311],
          [1486944000000, 435],
          [1487030400000, 334],
          [1487116800000, 528],
        ]);
    const [firmwareVersionData, setFirmwareVersionData] = useState([
          [1486684800000, 343],
          [1486771200000, 432],
          [1486857600000, 311],
          [1486944000000, 435],
          [1487030400000, 334],
          [1487116800000, 528],
        ]);


    return(
    <>
    <div className="grid grid-cols-1 md:grid-cols-2">
        <div>
        <ChartDiagnosticLine chartData={batteryVoltageData} chartTitle="Battery Voltage"/>
        </div>
        <div>
        <ChartDiagnosticLine chartData={daysRemainingData} chartTitle="Days Remaining"/>
        </div>
        <div>
        <ChartDiagnosticBar chartData={resetCountData} chartTitle="Reset Count"/>
        </div>
        <div>
        <ChartDiagnosticLine chartData={clockChangeData} chartTitle="Clock Change" />
        </div>
        <div>
        <ChartDiagnosticBar chartData={loggerSettingsData} chartTitle="Logger Setting Version"/>
        </div>
        <div>
        <ChartDiagnosticBar chartData={rssiData} chartTitle="RSSI"/>
        </div>
        <div>
        <ChartDiagnosticBar chartData={firmwareVersionData} chartTitle="Firmware Version"/>
        </div>
    </div>
    </>
    )
}

export default ChartDiagnosticAll;