import ParCalibrationForm from "@/app/components/par/Calibration-form"

export default function ParCal(){
    return (
        <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3">
          <div></div>
          <div>
            <ParCalibrationForm />
          </div>
          <div></div>
        </div>
      </div>
    </>
    )
}