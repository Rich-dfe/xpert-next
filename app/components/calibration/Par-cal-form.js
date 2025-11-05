import { useState } from "react";
import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import ModalHelp from "../Modal-help";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { isNumber, isValuePresent, isInputEmpty } from "@/app/utils.js/validation";

const initialErrors = {
  loggerReadingsTotal: null,
  referenceAverage: null,
  testDuration: null,
}

function ParCalibrationForm({ isSelectedLogger, helpContent, selectedLogger }) {
  const [preCalStatus, setPreCalStatus] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const [formData, setFormData] = useState({
    loggerReadingsTotal:"",
    referenceAverage: "",
    loggingInterval:"",
    testDuration: "",
    sensitivity:"",
    units:"",
    preCalToggle:false,
  });

  //This is necessary for the api fetch function to ensure it receives the latest data in case the async state update hasn't finished 
  // const sanitizedData = {
  //   loggerReadingsTotal: "",
  //   referenceAverage: "",
  //   loggingInterval:"",
  //   testDuration: "",
  //   sensitivity:"",
  //   units:"",
  // };

  const validateForm = (data) =>{
    let newErrors = {};

    if(preCalStatus === false){
      //Validate loggerReadingsTotal
      if(isInputEmpty(data.loggerReadingsTotal)){
        newErrors.loggerReadingsTotal = "Reading is required.";
      } else if(isNumber(data.loggerReadingsTotal)){
        newErrors.loggerReadingsTotal = "Must be a valid number"
      }

      if(isInputEmpty(data.referenceAverage)){
        newErrors.referenceAverage = "Reading is required.";
      } else if(isNumber(data.referenceAverage)){
        newErrors.referenceAverage = "Must be a valid number"
      }

      if(isInputEmpty(data.testDuration)){
        newErrors.testDuration = "Reading is required.";
      } else if(isNumber(data.testDuration)){
        newErrors.testDuration = "Must be a valid number"
      }
    }

    // For fields not requiring validation when preCalStatus is false, ensure no error is present
    //if (newErrors.loggerReadingsTotal === undefined) newErrors.loggerReadingsTotal = null;
    //if (newErrors.referenceAverage === undefined) newErrors.referenceAverage = null;
    //if (newErrors.testDuration === undefined) newErrors.testDuration = null;

    setErrors(newErrors);
    // Returns true if there are NO errors
    return Object.keys(newErrors).length === 0;
  }

  const handlePreCalToggle =(e) => {
    const { name, checked } = e.target;
    setPreCalStatus(checked);
    setFormData((prevData) => ({ ...prevData, [name]: checked}))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value}))
  };

  //handleBlur for field-by-field validation
  const handleInputBlur = () => {
    validateForm(formData);
  };

  const handleCalibrationForm = async (e) => {
    e.preventDefault();
    
    
    if (isFormValid) {
      // 3. Form is valid, proceed with API call
      console.log("Form is valid. Submitting data:", formData);
      // ... API call logic here ...
      const isFormValid = validateForm(formData);
      console.log('SUBMITTED FORM', formData);

    } else {
      // Form is invalid, errors state is updated, display errors to user
      console.log("Form is invalid. Displaying errors.");
    }
    
  }

  return (
    <>
      <FormCard>
        <FormStrip text="PAR Calibration" />
        <form 
          className="grid space-y-3 grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-1" 
          onSubmit={handleCalibrationForm}
          >
          <div>
            <label
              htmlFor="loggerReadingsTotal"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logger Readings Total
            </label>
            <input
              type="text"
              id="loggerReadingsTotal"
              name="loggerReadingsTotal"
              onChange={handleInputChange}
              onBlur={handleInputBlur} // Add onBlur for per-field validation after focus leaves
              // Use ternary operator to apply error styling
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${errors.loggerReadingsTotal 
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10' // Error styles
                  : 'border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400' // Normal styles
                }`
              }
              placeholder="Readings Total"
            />
            <div className="text-red-400">
              {errors.loggerReadingsTotal && <p>{errors.loggerReadingsTotal}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="referenceAverage"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Reference Average
            </label>
            <input
              type="text"
              id="referenceAverage"
              name="referenceAverage"
              onChange={handleInputChange}
              onBlur={handleInputBlur} // Add onBlur for per-field validation after focus leaves
              // Use ternary operator to apply error styling
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${errors.referenceAverage 
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10' // Error styles
                  : 'border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400' // Normal styles
                }`
              }
              placeholder="Reference Average"
              //required
            />
            <div className="text-red-400">
              {errors.referenceAverage && <p>{errors.referenceAverage}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="loggingInterval"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logging Interval (mins)
            </label>
            <input
              type="text"
              id="loggingInterval"
              name="loggingInterval"
              value={10}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300"
              placeholder="Ref 2"
              //required
            />
          </div>
          <div>
            <label
              htmlFor="testDuration"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Test Duration (mins)
            </label>
            <input
              type="text"
              id="testDuration"
              name="testDuration"
              onChange={handleInputChange}
              onBlur={handleInputBlur} // Add onBlur for per-field validation after focus leaves
              // Use ternary operator to apply error styling
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${errors.testDuration 
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10' // Error styles
                  : 'border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400' // Normal styles
                }`
              }
              placeholder="Reading 2"
              //required
            />
            <div className="text-red-400">
              {errors.testDuration && <p>{errors.testDuration}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="sensitivity"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Sensitivity
            </label>
            <select
              id="sensitivity"
              name="sensitivity"
              onChange={handleInputChange}
              className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
            >
              <option>Low</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="units"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Reference Units
            </label>
            <select
              id="units"
              name="units"
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
              // value={userCalData.sensor_length}
              // onChange={handleInputChange}
            >
              <option value="1">umol m-² s-¹</option>
              <option value="2">mmol m-² s-¹</option>
              <option value="3">W m-²</option>
              <option value="4">lux</option>
            </select>
          </div>
          <div>
            {/* APPLY TO GROUP SWITCH */}
            <div className="block text-gray-300 text-sm font-medium mb-2 mt-3">
              Pre-Calibration Reset
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                value="1"
                className="sr-only peer"
                onChange={handlePreCalToggle}
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
          <div></div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 border border-transparent text-sm font-semibold rounded-md text-gray-700 bg-green-400 hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
        <ModalHelp title={"PAR Calibration"} modalContent={helpContent} />
      </FormCard>
    </>
  );
}

export default ParCalibrationForm;
