import WaterLevelCalibrationForm from "@/app/components/water-level/calibration-form";

export default function WlHome() {
  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-center">
          <div className="min-h-[500px] min-w-[380px]">
            <WaterLevelCalibrationForm />
          </div>
        </div>
      </div>
    </>
  );
}
