"use client";
import WaterLevelCalibrationForm from "@/app/components/water-level/calibration-form";
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
            <WaterLevelCalibrationForm isSelectedLogger={isSelectedLogger} helpContent={helpContent.waterLevel} selectedLogger={selectedLogger}/>
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
