import WaterLevelCalibrationForm from "@/app/components/water-level/calibration-form";

export default function WlHome() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="mt-8 mb-3 ml-4 mr-4">Logger Dropdown Menu</div>
        <div className="mt-8 mb-3 ml-4 mr-4">
          Info Box
        </div>
        <div className="mt-8 mb-3 ml-4 mr-4"></div>
        <div className="mt-8 mb-3 ml-4 mr-4"></div>
        <div className="mt-8 mb-3 ml-4 mr-4">
            <WaterLevelCalibrationForm />
        </div>
        <div className="mt-8 mb-3 ml-4 mr-4">
          Sensor config
        </div>
      </div>
    </>
  );
}

// grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4
