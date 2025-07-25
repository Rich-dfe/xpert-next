import { useEffect, useState } from "react";
import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import FormStripError from "../Form-strip-error";
import loggersService from "@/app/service/loggersService";
import Modal from "../Modal";
import Spinner from "../spinner";

function WaterLevelCalibrationForm({
  isSelectedLogger,
  helpContent,
  selectedLogger,
}) {
  const [userCalData, setUserCalData] = useState(
    {
      readingA: " ",
      readingB: " ",
      actualA: " ",
      actualB: " ",
      sensor_length: " ",
      calibration_temperature: " ",
      resolution: " ",
      temperature_compensation: " ",
      server_side_cal_flag: " ",
      updated_at: " ",
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function initialCalibrationData() {
      try {
        setIsLoading(true);
        const calData = await loggersService.fetchUserCalibrationData(
          selectedLogger[0].id,
          4131
        );
        //console.log("3. Cal Data", calData);

        //iterate over the api request object and set the null values so the inputs remain controlled by useState
        for (const key in calData[0]) {
          // Ensure the property is an own property of the object
          // and not inherited from the prototype chain
          if (Object.hasOwnProperty.call(calData[0], key)) {
            if (calData[0][key] === null) {
              calData[0][key] = '';
            }
          }
        }

        setUserCalData(calData[0]);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }
    //Attemp to get the dignostic data only if a logger has been selected.
    if (isSelectedLogger) {
      initialCalibrationData();
    }
  }, [selectedLogger]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "ref1") {
      setUserCalData({...userCalData, actualA:value} );
    } else if(name === "ref2"){
      setUserCalData({...userCalData, actualB:value} );
    } else if(name === "reading1"){
      setUserCalData({...userCalData, readingA:value} );
    } else if(name === "reading2"){
      setUserCalData({...userCalData, readingB:value} );
    } else if(name === "sensorLength"){
      setUserCalData({...userCalData, sensor_length:value} );
    } else if(name === "temperature"){
      setUserCalData({...userCalData, calibration_temperature:value} );
    }
  };

  const handleCalibrationForm = (event) =>{
    event.preventDefault();
    console.log('HANDLING CALIBRATION FORM', userCalData);
  }

  return (
    <>
      <FormCard>
        {(isLoading) ? <Spinner /> : null}
        {!isSelectedLogger ? (
          <FormStripError text="Error: No Logger Selected!" />
        ) : (
          <FormStrip text="Water Level Calibration" />
        )}
        <form className="grid space-y-3 grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-1" onSubmit={handleCalibrationForm}>
          <div>
            <label
              htmlFor="ref1"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Ref Value 1
            </label>
            <input
              type="text"
              id="ref1"
              name="ref1"
              value={userCalData.actualA}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Ref 1"
              required
            />
          </div>
          <div>
            <label
              htmlFor="logger1"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logger Reading 1
            </label>
            <input
              type="text"
              id="reading1"
              name="reading1"
              value={userCalData.readingA}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Reading 1"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ref2"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Ref Value 2
            </label>
            <input
              type="text"
              id="ref2"
              name="ref2"
              value={userCalData.actualB}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Ref 2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="logger2"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logger Reading 2
            </label>
            <input
              type="text"
              id="readng2"
              name="reading2"
              value={userCalData.readingB}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Reading 2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Sensor Length
            </label>
            <select
              id="sensorLength"
              name="sensorLength"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
              value={userCalData.sensor_length}
              onChange={handleInputChange}
            >
              <option value="150">0.5m</option>
              <option value="110">1.0m</option>
              <option value="86">1.5m</option>
              <option value="71">2.0m</option>
              <option value="53">3.0m</option>
              <option value="42">4.0m</option>
              <option value="35">5.0m</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="temperature"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Temperature
            </label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              value={userCalData.calibration_temperature}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Temperature"
              required
            />
          </div>

          <div className="flex flex-col lg:col-span-2">
              <span className="block text-sm font- font-medium text-gray-400">
                Resolution = {userCalData.resolution} mm</span>
              <span className="block text-sm font-medium text-gray-400">
                Temperature Compensation = {userCalData.temperature_compensation} mm/°C</span>
              <span className="block text-sm font-medium text-gray-400">
                Last Updated: {userCalData.updated_at}</span>
          </div>

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 border border-transparent text-sm font-semibold rounded-md text-gray-700 bg-green-400 hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
        <Modal title={"Water Level Calibration"} modalContent={helpContent} />
      </FormCard>
    </>
  );
}

export default WaterLevelCalibrationForm;
