import { useState, useEffect } from "react";
import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import loggersService from "@/app/service/loggersService";
import ModalAlert from "../Modal-alert";
import { useModal } from "@/app/hooks/useModal";
import useAuditTrail from "@/app/hooks/useAudit";
import { formatISO6801Date } from "@/app/utils.js/formatters/formatDate";
import { isNumber, isInputEmpty } from "@/app/utils.js/validation";

const initialErrors = {
  scaling_factor: null,
};

function RainGaugeCalibrationForm({
  isSelectedLogger,
  helpContent,
  selectedLogger,
}) {
  //console.log('ELECTED PAR', selectedLogger);
  const [formData, setFormData] = useState({ scaling_factor: "", units: "mm"});
  const [errors, setErrors] = useState(initialErrors);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, message, title, type, openModal, closeModal } = useModal();
  const recordAction = useAuditTrail();

  useEffect(() => {
    async function initialCalibrationData() {
      try {
        setIsLoading(true);
        const calData = await loggersService.fetchUserCalibrationData(
          selectedLogger[0].id,
          4137
        );
        console.log("RainGauge DATA", calData);
        setFormData(calData[0]);
      } catch (error) {
        console.log(error);
      }
    }
    if (isSelectedLogger) {
      initialCalibrationData();
    }
  }, [isSaved]);

  const validateForm = (data) => {
    let newErrors = {};
    console.log("ERRORS", data);
    if (isInputEmpty(data.scaling_factor)) {
      newErrors.scaling_factor = "Value is required.";
    } else if (isNumber(data.scaling_factor)) {
      newErrors.scaling_factor = "Must be a valid number";
    }

    setErrors(newErrors);
    // Returns true if there are NO errors
    return Object.keys(newErrors).length === 0;
  };

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
    console.log("HANDLE FORM", formData);
    const dataForSubmission = {
      ...formData,
      loggerType: 4137,
      loggerId: selectedLogger[0]?.id,
    };
    const isFormValid = validateForm(dataForSubmission);

    if (isFormValid) {
      console.log("Form is valid. Submitting data:", dataForSubmission);
      apiUpdateCalData(dataForSubmission);
    } else {
      console.log("GET LOST LOSER");
    }
  };

  const apiUpdateCalData = async (formData) => {
    try {
      const calUpdateResponse = await loggersService.updateUserCalibrationData(
        formData
      );
      console.log(calUpdateResponse);
      if (calUpdateResponse.affectedRows === 1) {
        recordAction(
          "RainGauge Sensor Config",
          formData,
          selectedLogger[0].logger_uid
        );
        openModal("Succcess", "Your settings have been saved.", "green");
        setIsSaved(!isSaved);
      }
    } catch (error) {
        console.log('Save Error', error);
      //openModal("Error:", error, "red");
    }
  };

  return (
    <>
      <FormCard>
        <FormStrip text="Rain Gauge Sensor Configuration" />
        <form
          className="grid space-y-3 grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-1"
          onSubmit={handleCalibrationForm}
        >
          <div>
            <label
              htmlFor="capacity"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Bucket Capacity
            </label>
            <input
              type="text"
              id="scaling_factor"
              name="scaling_factor"
              value={formData.scaling_factor}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none sm:text-sm text-gray-300"
            ></input>
            <div className="text-red-400">
              {errors.scaling_factor && <p>{errors.scaling_factor}</p>}
            </div>
          </div>
          <div>
            <label
              htmlFor="units"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Units
            </label>
            <select
              id="units"
              name="units"
              onChange={handleInputChange}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
              value={formData.units}
              disabled
            >
              <option value="0">mm</option>
              <option value="1">Inches</option>
              <option value="2">Metres</option>
            </select>
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 border border-transparent text-sm font-semibold rounded-md text-gray-700 bg-green-400 hover:bg-green-600"
            >
              Submit
            </button>
          </div>
          <div className="flex flex-col lg:col-span-2">
            <span className="block text-sm font-medium text-gray-400">
              Last Updated: {formatISO6801Date(formData.updated_at, "local")}
            </span>
          </div>
        </form>
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

export default RainGaugeCalibrationForm;
