import { useEffect, useState } from "react";
import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import FormStripError from "../Form-strip-error";
import loggersService from "@/app/service/loggersService";
import ModalHelp from "../Modal-help";
import { useModal } from "@/app/hooks/useModal";
import { useSettingsVersion } from "@/app/hooks/useSettingsVersion";
import ModalAlert from "../Modal-alert";
import useAuditTrail from "@/app/hooks/useAudit";
import { formatISO6801Date } from "@/app/utils.js/formatters/formatDate";
import Spinner from "../spinner";
import {
  isWaterLevelLoggerReadingValid,
  isWaterLevelRefReadingValid,
  isTemperatureValid,
  roundToDecimalPlace,
  isInputEmpty,
} from "@/app/utils.js/validation";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";

const initialErrors = {
  readingA:null,
  readingB:null,
  actualA:null,
  actualB:null,
  sensorLength:null,
  temperature:null,
};

function WaterLevelCalibrationForm({
  isSelectedLogger,
  helpContent,
  selectedLogger,
}) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [showServerSideCalOption, setShowServerSideCalOption] = useState(false);
  //The fetchCalData toggle state is used as a way of triggering a re-render when the form is submitted.
  //This allows the calculated resolution and temp compensation to be immediately displayed.
  const [fetchCalData, setFetchCalData] = useState(false);
  const [serverSideCalFlag, setServerSideCalFlag] = useState(false);
  const [preCalStatus, setPreCalStatus] = useState(false);
  const loggerId = selectedLogger[0].id;
  const loggerType = 4131;
  const { isOpen, message, title, type, openModal, closeModal } = useModal();
  const { version, fetchSettingsVersion } = useSettingsVersion();
  const [errors, setErrors] = useState(initialErrors);
  const recordAction = useAuditTrail();
  const [formData, setFormData] = useState({
    loggerType: 4131,
    readingA: "",
    readingB: "",
    actualA: "",
    actualB: "",
    sensor_length: "",
    calibration_temperature: "",
    resolution: "",
    temperature_compensation: "",
    server_side_cal_flag: 0,
    updated_at: "",
  });

/** GET CURRENT SETTINGS */ 
useEffect(() => {
    async function initialCalibrationData() {
      try {
        setIsLoading(true);
        const calData = await loggersService.fetchUserCalibrationData(
          selectedLogger[0].id,
          4131
        );
        
        
        const isCalOptionVisible = selectedLogger[0].firmwareVersionInUse >126 && calData[0].server_side_cal_flag === 0;
        setShowServerSideCalOption(isCalOptionVisible);

        //console.log('SHOW SSC',showServerSideCalOption);  
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

        //console.log("3. Cal Data", calData);
        setFormData(calData[0]);
        fetchSettingsVersion(selectedLogger[0].id);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    //Attemp to get the dignostic data only if a logger has been selected.
    if (isSelectedLogger) {
      initialCalibrationData();
    }
  }, [selectedLogger,fetchCalData]);
  /** END OF GET CURRENT SETTINGS */
  
  const validateForm = (data) => {
    let newErrors = {};
    //console.log('DATA',data);

    //if (setToDefault === false) {
      if (isInputEmpty(data.actualA)) {
        newErrors.actualA = "Reading is required.";
      } else if (!isWaterLevelRefReadingValid(data.actualA)) {
        newErrors.actualA = "Limits= 100 to 5000!";
      }

      if (isInputEmpty(data.actualB)) {
        newErrors.actualB = "Reading is required.";
      } else if (!isWaterLevelRefReadingValid(data.actualB)) {
        newErrors.actualB = "Limits= 100 to 5000!";
      }

      if (isInputEmpty(data.readingA)) {
        newErrors.readingA = "Reading is required.";
      } else if (!isWaterLevelLoggerReadingValid(data.readingA)) {
        newErrors.readingA = "Limits= 1000.0 to 6553.5!";
      }

      if (isInputEmpty(data.readingB)) {
        newErrors.readingB = "Reading is required.";
      } else if (!isWaterLevelLoggerReadingValid(data.readingB)) {
        newErrors.readingB = "Limits= 1000.0 to 6553.5!";
      }

      if (isInputEmpty(data.calibration_temperature)) {
        newErrors.temperature = "Reading is required.";
      } else if (!isTemperatureValid(data.calibration_temperature)) {
        newErrors.temperature = "Limits= 0.00 - 99.99!";
      }
    //}
    //console.log('ERRORS', newErrors);  
    setErrors(newErrors);
    // Returns true if there are NO errors
    return Object.keys(newErrors).length === 0;
  };

  const handlePreCalToggle =(e) => {
    const { name, checked } = e.target;
    setPreCalStatus(checked);
    setFormData((prevData) => ({ ...prevData, [name]: checked}))
  }

  const handleServerSideCalFlag = (e) =>{
    const { name, checked } = e.target;
    setServerSideCalFlag(checked);
    setFormData((prevData) => ({ ...prevData, [name]: checked}))
  }

  //handleBlur for field-by-field validation
  const handleInputBlur = () => {
    validateForm(formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCalibrationForm = async (e) => {
    e.preventDefault();

    //If the logger reading values are not entered with a decimal place they need to be converted. 
    const readingARounded = roundToDecimalPlace(formData.readingA);
    const readingBRounded = roundToDecimalPlace(formData.readingB);

    //Create a data object for validation and submission
    const dataForValidation = { ...formData, readingA: readingARounded, readingB: readingBRounded, loggerType: 4131, loggerId: loggerId, setToDefault: preCalStatus };

    //Add extra data required by the api function to the sanitzed object
    // sanitizedData.sensor_length = parseInt(userCalData.sensor_length,10);
    // sanitizedData.loggerId = loggerId;
    // sanitizedData.loggerType = loggerType;
    // sanitizedData.setToDefault = setToDefault; 

    const isFormValid = validateForm(dataForValidation);
    
    if (isFormValid || preCalStatus) {
      setFormData(dataForValidation);
      // 3. Form is valid, proceed with API call
      console.log("Form is valid. Submitting data:", dataForValidation);
      // ... API call logic here ...
      apiUpdateCalData(dataForValidation);
    } else {
      // Form is invalid, errors state is updated, display errors to user
      console.log("Form is invalid. Displaying errors.");
    }

    
    //If set to default is true reset it back to false
    setPreCalStatus(false);
  };

  const apiUpdateCalData = async (formData) => {
    const calUpdateResponse = await loggersService.updateUserCalibrationData(formData);
    //console.log(calUpdateResponse);
    if(calUpdateResponse.affectedRows === 1){
      recordAction('Water Level Calibration',formData,selectedLogger[0].logger_uid);
      fetchSettingsVersion(selectedLogger[0].id);
      setFetchCalData(!fetchCalData);
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
        <div className="text-center text-sm font-medium text-gray-400 mb-2">
          {selectedLogger[0].logger_name}
        </div>
        <form
          className="grid space-y-3 grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-1"
          onSubmit={handleCalibrationForm}
        >
          <div>
            <label
              htmlFor="actualA"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Ref Value A
            </label>
            <input
              type="text"
              id="actualA"
              name="actualA"
              value={preCalStatus ? " " : formData.actualA}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${errors.actualA && !preCalStatus
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10' // Error styles
                  : 'border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400' // Normal styles
                }`
              }
              placeholder="Reference 1"
            />
            <div className="text-red-400">
              {preCalStatus ? " " : errors.actualA && <p>{errors.actualA}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="readingA"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logger Reading A
            </label>
            <input
              type="text"
              id="readingA"
              name="readingA"
              value={preCalStatus ? " " : formData.readingA}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${errors.readingA && !preCalStatus
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10' // Error styles
                  : 'border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400' // Normal styles
                }`
              } 
              placeholder="Reading A"
            />
            <div className="text-red-400">
              {preCalStatus ? " " : errors.readingA && <p>{errors.readingA}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="actualB"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Ref Value B
            </label>
            <input
              type="text"
              id="actualB"
              name="actualB"
              value={preCalStatus ? " " : formData.actualB}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${errors.actualB && !preCalStatus
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10' // Error styles
                  : 'border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400' // Normal styles
                }`
              }
              placeholder="Ref 2"
            />
            <div className="text-red-400">
              {preCalStatus ? " " : errors.actualB && <p>{errors.actualB}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="readingB"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logger Reading B
            </label>
            <input
              type="text"
              id="readingB"
              name="readingB"
              value={preCalStatus ? " " : formData.readingB}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${errors.readingB && !preCalStatus
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10' // Error styles
                  : 'border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400' // Normal styles
                }`
              }
              placeholder="Reading B"
            />
            <div className="text-red-400">
              {preCalStatus ? " " : errors.readingB && <p>{errors.readingB}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="sensorLength"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Sensor Length
            </label>
            <select
              id="sensorLength"
              name="sensorLength"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
              value={formData.sensor_length}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
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
              id="calibration_temperature"
              name="calibration_temperature"
              value={preCalStatus ? " " : formData.calibration_temperature}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${errors.temperature && !preCalStatus
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10' // Error styles
                  : 'border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400' // Normal styles
                }`
              }
              placeholder="Temperature"
            />
            <div className="text-red-400">
              {preCalStatus ? " " : errors.temperature && <p>{errors.temperature}</p>}
            </div>
          </div>
          <div>
            {/* RESET CALIBRATION SWITCH */}
            <div className="block text-gray-300 text-sm font-medium mb-2 mt-3">
              Reset Calibration
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={preCalStatus}
                className="sr-only peer"
                onChange={(handlePreCalToggle)}
                name="preCalToggle"
                id="preCalToggle"
                checked={preCalStatus}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300 dark:peer-checked:bg-blue-500"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {preCalStatus ? (
                  <CheckIcon className="size-6 text-green-300" />
                ) : (
                  <XMarkIcon className="size-6 text-red-400" />
                )}
              </span>
            </label>
          </div>
          <div>
            <div className="text-green-400 p-0.5 mt-2">
              {preCalStatus
                ? "Press Submit then update your logger settings."
                : ""}
            </div>
          </div>
          <div>
             {/* ONLY SHOW THE SSC SWITCH IF FW VERSION >126 AND SSC IS NOT YET SET */}
             {showServerSideCalOption && (
            <div>
            <div className="block text-gray-300 text-sm font-medium mb-2 mt-3">
              Server Side Calibration
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value={serverSideCalFlag}
                className="sr-only peer"
                onChange={handleServerSideCalFlag}
                name="server_side_cal_flag"
                id="server_side_cal_flag"
                checked={serverSideCalFlag}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300 dark:peer-checked:bg-blue-500"></div>
              <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                {serverSideCalFlag ? (
                  <CheckIcon className="size-6 text-green-300" />
                ) : (
                  <XMarkIcon className="size-6 text-red-400" />
                )}
              </span>
            </label>
            </div>
             )}
          </div>
          <div>
            {showServerSideCalOption && (
            <div className="text-green-400 p-0.5 mt-2">
              {serverSideCalFlag
                ? "Server side calibration is recommended but cannot be reverted."
                : ""}
            </div>
            )}
          </div>      
          <div className="flex flex-col lg:col-span-2">
            <span className="block text-sm font- font-medium text-gray-400">
              Resolution = {formData.resolution} mm
            </span>
            <span className="block text-sm font-medium text-gray-400">
              Temperature Compensation = {formData.temperature_compensation}{" "}
              mm/°C
            </span>
            <span className="block text-sm font-medium text-gray-400">
              Last Updated: {formatISO6801Date(formData.updated_at, "local")}
            </span>
            <span className="block text-sm font-bold text-gray-400">
              Server Settings: {`v${version[0].x002F}`}
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
        <ModalHelp
          title={"Water Level Calibration"}
          modalContent={helpContent}
        />
        <ModalAlert
          onClose={closeModal}
          isOpen={isOpen}
          title={title}
          text={message}
          type={type}
        />
      </FormCard>
    </>
  );
}

export default WaterLevelCalibrationForm;
