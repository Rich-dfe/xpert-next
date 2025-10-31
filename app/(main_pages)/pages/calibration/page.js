"use client";
import WaterLevelCalibrationForm from "@/app/components/calibration/Water-level-cal-form";
import ParCalibrationForm from "@/app/components/calibration/Par-cal-form";
import { useLoggers } from "@/app/store/user-loggers-context";
import helpContent from "@/app/content/calibration-help.json"


export default function WlHome() {
  //Get the loggers context
const { waterLevelLoggers, selectedLogger, setSelectedLogger, isSelectedLogger, setIsSelectedLogger } = useLoggers();

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div></div>
          <div>
            {selectedLogger[0].product_id >= 1 && selectedLogger[0].product_id <=7 && <WaterLevelCalibrationForm isSelectedLogger={isSelectedLogger} helpContent={helpContent.waterLevel} selectedLogger={selectedLogger}/>}
            {selectedLogger[0].product_id == 18 && <ParCalibrationForm isSelectedLogger={isSelectedLogger} helpContent={helpContent.par} selectedLogger={selectedLogger}/>}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
