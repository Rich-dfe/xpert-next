"use client";
import WaterLevelCalibrationForm from "@/app/components/calibration/Water-level-cal-form";
import ParCalibrationForm from "@/app/components/calibration/Par-cal-form";
import TemperatureCalibrationForm from "@/app/components/calibration/Temperature-cal-form";
import RainGaugeCalibrationForm from "@/app/components/calibration/Rain-gauge-cal-form";
import NoCalForm from "@/app/components/calibration/No-cal-form";
import { useLoggers } from "@/app/store/user-loggers-context";
import helpContent from "@/app/content/calibration-help.json"


export default function WlHome() {
  //Get the loggers context
const { waterLevelLoggers, selectedLogger, setSelectedLogger, isSelectedLogger, setIsSelectedLogger } = useLoggers();
console.log('SELECTED = ',selectedLogger[0]);
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div></div>
          <div>
            {selectedLogger[0].product_id >= 1 && selectedLogger[0].product_id <=7 && <WaterLevelCalibrationForm isSelectedLogger={isSelectedLogger} helpContent={helpContent.waterLevel} selectedLogger={selectedLogger}/>}
            {selectedLogger[0].product_id == 18 && <ParCalibrationForm isSelectedLogger={isSelectedLogger} helpContent={helpContent.par} selectedLogger={selectedLogger}/>}
            {selectedLogger[0].product_id == 23 && <NoCalForm loggerType="Hydro Wiper" header="No calibration required"/>}
            {selectedLogger[0].product_id >= 15 && selectedLogger[0].product_id <=17 && <TemperatureCalibrationForm isSelectedLogger={isSelectedLogger} selectedLogger={selectedLogger}/>}
            {selectedLogger[0].product_id == 19 && <RainGaugeCalibrationForm isSelectedLogger={isSelectedLogger} selectedLogger={selectedLogger}/>}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
