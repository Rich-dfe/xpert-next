import { useEffect, useState } from "react";
import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import FormStripError from "../Form-strip-error";
import loggersService from "@/app/service/loggersService";
import ModalHelp from "../Modal-help";
import { useModal } from "@/app/hooks/useModal";
import ModalAlertHook from "../Modal-alert-hook";
import Spinner from "../spinner";
import {
  isWaterLevelLoggerReadingValid,
  isWaterLevelRefReadingValid,
  isTemperatureValid,
  roundToDecimalPlace
} from "@/app/utils.js/validation";
import {
  XMarkIcon,
  CheckIcon
} from "@heroicons/react/24/solid";

function WaterLevelCalibrationForm({
  isSelectedLogger,
  helpContent,
  selectedLogger,
}) {
  const [userCalData, setUserCalData] = useState({
    readingA: " ",
    readingB: " ",
    actualA: " ",
    actualB: " ",
    sensor_length: " ",
    calibration_temperature: " ",
    resolution: " ",
    temperature_compensation: " ",
    server_side_cal_flag: 0
  });

  //This is necessary for the api fetch function to ensure it receives the latest data in case the async state update hasn't finished 
  const sanitizedData = {
    readingA: " ",
    readingB: " ",
    actualA: " ",
    actualB: " ",
    sensor_length: " ",
    calibration_temperature: " ",
    resolution: " ",
    temperature_compensation: " ",
    server_side_cal_flag: 0
  };

  const [isLoading, setIsLoading] = useState(false);
  const [refOneIsInvalid, setRefOneIsInvalid] = useState(false);
  const [refTwoIsInvalid, setRefTwoIsInvalid] = useState(false);
  const [readingOneIsInvalid, setReadingOneIsInvalid] = useState(false);
  const [readingTwoIsInvalid, setReadingTwoIsInvalid] = useState(false);
  const [temperatureIsInvalid, setTemperatureIsInvalid] = useState(false);
  const [setToDefault, setSetToDefault] = useState(false);
  const loggerId  = selectedLogger[0].id;
  const loggerType = 4131;
  const {isOpen,message,title,type,openModal,closeModal} = useModal();

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
              calData[0][key] = "";
            }
          }
        }

        setUserCalData(calData[0]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    //Attemp to get the dignostic data only if a logger has been selected.
    if (isSelectedLogger) {
      initialCalibrationData();
    }
  }, [selectedLogger]);

  //console.log('SELECTED',selectedLogger);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "ref1") {
      setUserCalData((prevData) => ({...prevData, actualA: value}) );
    } else if (name === "ref2") {
      setUserCalData((prevData) => ({...prevData, actualB: value}) );
    } else if (name === "reading1") {
      setUserCalData((prevData) => ({...prevData, readingA: value}) );
    } else if (name === "reading2") {
      setUserCalData((prevData) => ({...prevData, readingB: value}) );
    } else if (name === "sensorLength") {
      setUserCalData((prevData) => ({...prevData, sensor_length: value}) );
    } else if (name === "temperature") {
      setUserCalData((prevData) => ({...prevData, calibration_temperature: value}) );
    } else if (name === "setToDefault") {
      setSetToDefault(!setToDefault);
    }
  };

  const handleCalibrationForm = async (e) => {
    e.preventDefault();

    //The form only need to be sanitzed if the reset calibration switch is set to false
    if(setToDefault === false){
    //Sanitize Reference Values
    if (!isWaterLevelRefReadingValid(userCalData.actualA)) {
      setRefOneIsInvalid(true);
      return;
    } else {
      setRefOneIsInvalid(false);
      sanitizedData.actualA = userCalData.actualA;
    }

    if (!isWaterLevelRefReadingValid(userCalData.actualB)) {
      setRefTwoIsInvalid(true);
      return;
    } else {
      setRefTwoIsInvalid(false);
      sanitizedData.actualB = userCalData.actualB;
    }
    //------------------------

    // Sanitize Logger Reading Values
    if (!isWaterLevelLoggerReadingValid(userCalData.readingA)) {
      setReadingOneIsInvalid(true);
      return;
    } else {
      setReadingOneIsInvalid(false);
      //If the logger reading values are not enterd with a decimal place they need to be converted. 
      const readingARounded = roundToDecimalPlace(userCalData.readingA);
      setUserCalData((prevData) => ({...prevData, readingA: readingARounded}) );
      sanitizedData.readingA = readingARounded;
    }

    if (!isWaterLevelLoggerReadingValid(userCalData.readingB)) {
      setReadingTwoIsInvalid(true);
      return;
    } else {
      setReadingTwoIsInvalid(false);
      //If the logger reading values are not enterd with a decimal place they need to be converted. 
      const readingBRounded = roundToDecimalPlace(userCalData.readingB);
      setUserCalData((prevData) => ({...prevData, readingB: readingBRounded}) );
      sanitizedData.readingB = readingBRounded;
    }
    //------------------------

    //Sanitize Temperature Value 
    if (!isTemperatureValid(userCalData.calibration_temperature)) {
      setTemperatureIsInvalid(true);
      return;
    } else {
      setTemperatureIsInvalid(false);
      sanitizedData.calibration_temperature = userCalData.calibration_temperature
    }
    //------------------------
    }

    //Add extra data required by the api function to the sanitzed object
    sanitizedData.sensor_length = parseInt(userCalData.sensor_length,10);
    sanitizedData.loggerId = loggerId;
    sanitizedData.loggerType = loggerType;
    sanitizedData.setToDefault = setToDefault; 
    
    apiUpdateCalData(sanitizedData);
    //If set to default is true reset it back to false
    //setUserCalData({...userCalData, setToDefault: !userCalData.setToDefault});
  };

  const apiUpdateCalData = async (formData) => {
    const calUpdateResponse = await loggersService.updateUserCalibrationData(formData);
    console.log(calUpdateResponse);
    if(calUpdateResponse.affectedRows === 1){
      openModal('Succcess','Your settings have been saved.','green');
    }

  }

  return (
    <>
      <FormCard>
        {isLoading ? <Spinner /> : null}
        {!isSelectedLogger ? (
          <FormStripError text="Error: No Logger Selected!" />
        ) : (
          <FormStrip text="Water Level Calibration" />
        )}
        <div className="text-center text-sm font-medium text-gray-400 mb-2">{selectedLogger[0].logger_name}</div>
        <form
          className="grid space-y-3 grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-1"
          onSubmit={handleCalibrationForm}
        >
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
              value={setToDefault ? " " : userCalData.actualA}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Ref 1"
            />
            <div className="text-red-600">
              {refOneIsInvalid && <p>Limits= 100 to 5000!</p>}
            </div>
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
              value={setToDefault ? " " : userCalData.readingA}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Reading 1"
            />
            <div className="text-red-600">
              {readingOneIsInvalid && <p>Limits= 1000.0 to 6553.5!</p>}
            </div>
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
              value={setToDefault ? " " : userCalData.actualB}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Ref 2"
            />
            <div className="text-red-600">
              {refTwoIsInvalid && <p>Limits= 100 to 5000!</p>}
            </div>
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
              value={setToDefault ? " " : userCalData.readingB}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Reading 2"
            />
            <div className="text-red-600">
              {readingTwoIsInvalid && <p>Limits= 1000.0 to 6553.5!</p>}
            </div>
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
              value={setToDefault ? " " : userCalData.calibration_temperature}
              onChange={handleInputChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Temperature"
            />
            <div className="text-red-600">
              {temperatureIsInvalid && <p>Limits= 0.00 - 99.99!</p>}
            </div>
          </div>
          <div>
             {/* APPLY TO GROUP SWITCH */}
          <div className="block text-gray-300 text-sm font-medium mb-2 mt-3">
            Reset Calibration
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value={setToDefault}
              className="sr-only peer"
              onChange={handleInputChange}
              name="setToDefault"
              id="setToDefault"
              checked={setToDefault}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300 dark:peer-checked:bg-blue-500"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {setToDefault ? (
                <CheckIcon className="size-6 text-green-300" />
              ) : (
                <XMarkIcon className="size-6 text-red-400" />
              )}
            </span>
          </label>
          </div>
          <div>
            <div className="text-green-400 p-0.5 mt-2">{setToDefault ? "Press Submit then update your logger settings." : ""}</div>
          </div>

          <div className="flex flex-col lg:col-span-2">
            <span className="block text-sm font- font-medium text-gray-400">
              Resolution = {userCalData.resolution} mm
            </span>
            <span className="block text-sm font-medium text-gray-400">
              Temperature Compensation = {userCalData.temperature_compensation}{" "}
              mm/°C
            </span>
            <span className="block text-sm font-medium text-gray-400">
              Last Updated: {userCalData.updated_at}
            </span>
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
        <ModalHelp title={"Water Level Calibration"} modalContent={helpContent} />
        <ModalAlertHook onClose={closeModal} isOpen={isOpen} title={title} text={message} type={type}/>
      </FormCard>
    </>
  );
}

export default WaterLevelCalibrationForm;
