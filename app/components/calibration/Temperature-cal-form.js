import { useState, useEffect } from "react";
import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import loggersService from "@/app/service/loggersService";
import ModalAlert from "../Modal-alert";
import { useModal } from "@/app/hooks/useModal";
import useAuditTrail from "@/app/hooks/useAudit";
import { formatISO6801Date } from "@/app/utils.js/formatters/formatDate";

function TemperatureCalibrationForm({
  isSelectedLogger,
  helpContent,
  selectedLogger,
}) {
  //console.log('ELECTED PAR', selectedLogger);
  const [formData, setFormData] = useState({ units: 1 });
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
          4181
        );
        console.log("TEMP CAL DATA", calData);
        setFormData(calData[0]);
      } catch (error) {
        console.log(error);
      }
    }
    if (isSelectedLogger) {
      initialCalibrationData();
    }
  }, [isSaved]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCalibrationForm = async (e) => {
    e.preventDefault();
    console.log("HANDLE FORM", formData.units);
    const dataForSubmission = {
      ...formData,
      loggerType: 4181,
      loggerId: selectedLogger[0]?.id,
    };

    apiUpdateCalData(dataForSubmission);
  };

  const apiUpdateCalData = async (formData) => {
    const calUpdateResponse = await loggersService.updateUserCalibrationData(
      formData
    );
    console.log(calUpdateResponse);
    if (calUpdateResponse.affectedRows === 1) {
      recordAction(
        "Temperature Sensor Config",
        formData,
        selectedLogger[0].logger_uid
      );
      setIsSaved(!isSaved);
      openModal("Succcess", "Your settings have been saved.", "green");
    }
  };

  return (
    <>
      <FormCard>
        <FormStrip text="Temperature Sensor Configuration" />
        <form
          className="grid space-y-3 grid-cols-1"
          onSubmit={handleCalibrationForm}
        >
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
            >
              <option value="0">°C - Celcius</option>
              <option value="1">°F - Fahrenheit</option>
              <option value="2">K - Kelvin</option>
              <option value="3">°R - Rankine</option>
            </select>
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

export default TemperatureCalibrationForm;
