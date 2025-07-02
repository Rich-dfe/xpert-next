import WaterLevelCalibrationForm from "@/app/components/water-level/calibration-form";

export default function WlHome() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div></div>
          <div>
            <WaterLevelCalibrationForm />
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
