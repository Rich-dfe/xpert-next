import { useState, useEffect } from "react";
import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import loggersService from "@/app/service/loggersService";
import ModalHelp from "../Modal-help";
import ModalAlert from "../Modal-alert";
import { useModal } from "@/app/hooks/useModal";
import { secondsToHoursMinsSecs } from "@/app/utils.js/helpers";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import { formatISO6801Date } from "@/app/utils.js/formatters/formatDate";
import useAuditTrail from "@/app/hooks/useAudit";
import {
  isNumber,
  isValuePresent,
  isInputEmpty,
} from "@/app/utils.js/validation";

const initialErrors = {
  logger_value: null,
  reference_value: null,
  reference_interval: null,
};

function ParCalibrationForm({ isSelectedLogger, helpContent, selectedLogger }) {
  //console.log('ELECTED PAR', selectedLogger);
  const [isLoading, setIsLoading] = useState(false);
  const [preCalStatus, setPreCalStatus] = useState(false);
  const [errors, setErrors] = useState(initialErrors);
  const { isOpen, message, title, type, openModal, closeModal } = useModal();
  const recordAction = useAuditTrail();
  const [apiData, setApiData] = useState(null);
  const [formData, setFormData] = useState({
    logger_value: "",
    reference_value: "",
    reference_interval: "",
    units: "",
    updated_at: null,
    x0018: "",
    x005F: "",
  });

  const preCalDefaults = {
    logger_value: 1000,
    reference_value: 1000,
    reference_interval: "",
    units: "",
    updated_at: null,
    x0018: "",
    x005F: "",
  };

  useEffect(() => {
    async function initialCalibrationData() {
      try {
        setIsLoading(true);
        const calData = await loggersService.fetchUserCalibrationData(
          selectedLogger[0].id,
          4132
        );
        console.log("PAR CAL DATA", calData);

        const rawData = calData[0];
        // 1. CONVERSION: API SECONDS -> UI MINUTES
        const referenceIntervalInSeconds = rawData.reference_interval;
        // Convert seconds to minutes (and make it a string for input value)
        const referenceIntervalInMinutes =
          referenceIntervalInSeconds != null
            ? String(referenceIntervalInSeconds / 60)
            : "";

        const convertedData = {
          ...rawData,
          reference_interval: referenceIntervalInMinutes,
        };

        //console.log("3. Cal Data", calData);
        setApiData(convertedData);
        setFormData(convertedData);
      } catch (error) {
        console.log(error);
      }
    }
    if (isSelectedLogger) {
      initialCalibrationData();
    }
  }, []);

  //Updates the form fields depending on the preCalStatus state.
  useEffect(() => {
    if (apiData) {
      if (preCalStatus) {
        //Forces the logging interval and test duration fields to the same value
        preCalDefaults.reference_interval = secondsToHoursMinsSecs(
          formData.x0018
        ).mins;
        preCalDefaults.x0018 = formData.x0018;
        preCalDefaults.x005F = formData.x005F;
        preCalDefaults.units = formData.units;
        setFormData(preCalDefaults);
      } else {
        setFormData(apiData);
      }
    }
  }, [preCalStatus, apiData]);

  const validateForm = (data) => {
    let newErrors = {};

    //if (preCalStatus === false) {
    //Validate logger_value
    if (isInputEmpty(data.logger_value)) {
      newErrors.logger_value = "Reading is required.";
    } else if (isNumber(data.logger_value)) {
      newErrors.logger_value = "Must be a valid number";
    }

    if (isInputEmpty(data.reference_value)) {
      newErrors.reference_value = "Reading is required.";
    } else if (isNumber(data.reference_value)) {
      newErrors.reference_value = "Must be a valid number";
    }

    if (isInputEmpty(data.reference_interval)) {
      newErrors.reference_interval = "Reading is required.";
    } else if (isNumber(data.reference_interval)) {
      newErrors.reference_interval = "Must be a valid number";
    }
    //}

    // For fields not requiring validation when preCalStatus is false, ensure no error is present
    //if (newErrors.logger_value === undefined) newErrors.logger_value = null;
    //if (newErrors.reference_value === undefined) newErrors.reference_value = null;
    //if (newErrors.reference_interval === undefined) newErrors.reference_interval = null;

    setErrors(newErrors);
    // Returns true if there are NO errors
    return Object.keys(newErrors).length === 0;
  };

  const handlePreCalToggle = (e) => {
    const { name, checked } = e.target;
    setPreCalStatus(checked);
    //setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    //console.log('On Change', formData);
  };

  //handleBlur for field-by-field validation
  const handleInputBlur = () => {
    validateForm(formData);
  };

  const handleCalibrationForm = async (e) => {
    e.preventDefault();
    //Create a data object for validation and submission
    const dataForValidation = {
      ...formData,
      loggerType: 4132,
      loggerId: selectedLogger[0]?.id,
    };

    const isFormValid = validateForm(dataForValidation);

    if (isFormValid) {
      const dataForSubmission = {
        ...formData,
        loggerType: 4132,
        loggerId: selectedLogger[0]?.id,
      };

      // 2. CONVERSION: UI MINUTES -> API SECONDS
      const intervalInMinutes = parseFloat(
        dataForSubmission.reference_interval
      );

      if (!isNaN(intervalInMinutes)) {
        // Convert to seconds (e.g., "30" * 60 = 1800)
        dataForSubmission.reference_interval = intervalInMinutes * 60;
      } else {
        // Should not happen if validation is correct
        console.error("Invalid reference_interval value for conversion.");
        return;
      }

      //3. Form is valid, proceed with API call
      console.log("Form is valid. Submitting data:", formData);
      //... API call logic here ...
      const isFormValid = validateForm(formData);
      //console.log("SUBMITTED FORM", formData, preCalStatus);
      apiUpdateCalData(dataForSubmission);

      // if(preCalStatus){
      //   console.log('PRE CAL TRUE');
      //   setFormData(preCalDefaults);
      // }
    } else {
      //Form is invalid, errors state is updated, display errors to user
      console.log("Form is invalid.");
      return;
    }

    //If set to default is true reset it back to false
    setPreCalStatus(false);
  };

  const apiUpdateCalData = async (formData) => {
    const calUpdateResponse = await loggersService.updateUserCalibrationData(
      formData
    );
    console.log(calUpdateResponse);
    if (calUpdateResponse[0][0].affectedRows === 1) {
      recordAction('PAR Calibration',formData,selectedLogger[0].logger_uid);
      //fetchSettingsVersion(selectedLogger[0].id);
      //setFetchCalData(!fetchCalData);
      openModal("Succcess", "Your settings have been saved.", "green");
    }
  };

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
              htmlFor="logger_value"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logger Readings Total
            </label>
            <input
              type="text"
              id="logger_value"
              name="logger_value"
              value={formData.logger_value}
              onChange={handleInputChange}
              onBlur={handleInputBlur} // Add onBlur for per-field validation after focus leaves
              // Use ternary operator to apply error styling
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${
                  errors.logger_value
                    ? "border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10" // Error styles
                    : "border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400" // Normal styles
                }`}
              placeholder="Readings Total"
            />
            <div className="text-red-400">
              {errors.logger_value && <p>{errors.logger_value}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="reference_value"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Reference Average
            </label>
            <input
              type="text"
              id="reference_value"
              name="reference_value"
              value={formData.reference_value}
              onChange={handleInputChange}
              onBlur={handleInputBlur} // Add onBlur for per-field validation after focus leaves
              // Use ternary operator to apply error styling
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${
                  errors.reference_value
                    ? "border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10" // Error styles
                    : "border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400" // Normal styles
                }`}
              placeholder="Reference Average"
              //required
            />
            <div className="text-red-400">
              {errors.reference_value && <p>{errors.reference_value}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="x0018"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logging Interval (mins)
            </label>
            <input
              type="text"
              id="x0018"
              name="x0018"
              value={secondsToHoursMinsSecs(formData.x0018).mins}
              readOnly
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300"
              placeholder="Ref 2"
              //required
            />
          </div>
          <div>
            <label
              htmlFor="reference_interval"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Test Duration (mins)
            </label>
            <input
              type="text"
              id="reference_interval"
              name="reference_interval"
              value={formData.reference_interval}
              onChange={handleInputChange}
              onBlur={handleInputBlur} // Add onBlur for per-field validation after focus leaves
              // Use ternary operator to apply error styling
              className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300 
                ${
                  errors.reference_interval
                    ? "border-red-400 focus:ring-red-400 focus:border-red-400 bg-red-900/10" // Error styles
                    : "border-gray-700 bg-gray-700 focus:ring-green-400 focus:border-green-400" // Normal styles
                }`}
              placeholder="Reading 2"
              //required
            />
            <div className="text-red-400">
              {errors.reference_interval && <p>{errors.reference_interval}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="x005F"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Sensitivity
            </label>
            <select
              id="x005F"
              name="x005F"
              value={formData.x005F}
              onChange={handleInputChange}
              className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
            >
              <option value="4">Low</option>
              <option value="1">High</option>
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
              value={formData.units}
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
          <div>
            <div className="text-green-400 p-0.5 mt-2">
              {preCalStatus
                ? "Press Submit then update your logger settings."
                : ""}
            </div>
          </div>
          <div className="flex flex-col lg:col-span-2">
            <span className="block text-sm font-medium text-gray-400">
              Last Updated: {formatISO6801Date(formData.updated_at, "local")}
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
        <ModalHelp title={"PAR Calibration"} modalContent={helpContent} />
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

export default ParCalibrationForm;
