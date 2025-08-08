import FormCard from "@/app/components/Form-card";
import FormStrip from "@/app/components/Form-strip";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { endOfDay } from "date-fns";

const ReportsForm = ({ types, onSubmit, loggers }) => {
  const [selectedLogger, setSelectedLogger] = useState(null);
  const [startDateTime, setStartDateTime] = useState(null);
  const [endDateTime, setEndDateTime] = useState(null);
  const [startUnixTimestamp, setStartUnixTimeStamp] = useState(null);
  const [endUnixTimestamp, setEndUnixTimeStamp] = useState(null);
  const [selectLoggerIsInvalid, setSelectLoggerIsInvalid] = useState(false);
  const [startDateIsInvalid, setStartDateIsInvalid] = useState(false);
  const [endDateIsInvalid, setEndDateIsInvalid] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);


  const handleReportFormSubmit = (e) => {
    e.preventDefault();

    setSelectLoggerIsInvalid(false);
    setStartDateIsInvalid(false);
    setEndDateIsInvalid(false);

    if(selectedLogger === null || selectedLogger === "0"){
      setSelectLoggerIsInvalid(true);
      return;
    } else if(startUnixTimestamp === null){
      setStartDateIsInvalid(true);
      return;
    } else if(endUnixTimestamp === null){
      setEndDateIsInvalid(true);
      return;
    }

    const formInputs = {
      logger_id: selectedLogger,
      start_date: startUnixTimestamp,
      end_date: endUnixTimestamp,
    };

    onSubmit(formInputs);
    setIsButtonDisabled(true);

    //Disable the button for a few seconds to avoid multiple requests. 
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 5000);
  };

  const onChangeLoggerSelect = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSelectedLogger(value);
  };

  const onChangeStartDate = (startDate) => {
    setStartDateIsInvalid(false);
    if(startDate != null){
    setStartDateTime(startDate);

    const startDateUnix = startDate.getTime()/1000;
    setStartUnixTimeStamp(startDateUnix);
    } else{
      setStartDateIsInvalid(true);
    }
  };

  const onChangeEndDate = (endDate) => {
    setEndDateIsInvalid(false)
    if(endDate != null){
    setEndDateTime(endDate);

    const endDateUnix = endDate.getTime()/1000;
    setEndUnixTimeStamp(endDateUnix);
    } else{
      setEndDateIsInvalid(true);
    }
  };

  return (
    <>
      <FormCard>
        <FormStrip text="Request Report"></FormStrip>
        <form onSubmit={handleReportFormSubmit}>
          <div>
            {/* <div>
              <label
                className="text-gray-300 text-sm font-medium mb-1"
                htmlFor="loggerType"
              >
                Logger Type
              </label>
            </div> */}
            {/* <div>
              <select
                id="loggerType"
                name="loggerType"
                className="w-full mt-1 mb-3 pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
                onChange={handleClick}
              >
                <option value="">Select a type</option>
                {types.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
                ;
              </select>
            </div> */}

            <div>
              <label
                className="text-gray-300 text-sm font-medium mb-1"
                htmlFor="loggerName"
              >
                Logger Name
              </label>
            </div>
            <div>
              <select
                name="loggerSelect"
                onChange={onChangeLoggerSelect}
                className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
              >
                <option value={"0"}>Select Logger</option>
                {loggers.map((logger) => {
                  return (
                    <option key={logger.id} value={logger.id}>
                      {logger.logger_name}
                    </option>
                  );
                })}
                ;
              </select>
              <div className="text-red-600">
              {selectLoggerIsInvalid && <p>Please select a logger</p>}
            </div>
            </div>

            <div>
              <label
                className="text-gray-300 text-sm font-medium mb-1"
                htmlFor="reportStartDate"
              >
                Start Date
              </label>
            </div>
            <div>
              <DatePicker
                showIcon
                className="w-full appearance-none bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400 mb-3"
                selected={startDateTime}
                wrapperClassName="w-full"
                // showTimeSelect
                // timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy"
                onChange={(startDate) => onChangeStartDate(startDate)}
                icon={<CalendarIcon className="text-blue-400" />}
                id="reportStartDate"
                name="reportStartDate"
              />
              <div className="text-red-600">
              {startDateIsInvalid && <p>Please select a start date!</p>}
            </div>
            </div>
            

            <div>
              <label
                className="text-gray-300 text-sm font-medium"
                htmlFor="reportEndDate"
              >
                End Date
              </label>
            </div>
            <div>
              <DatePicker
                showIcon
                className="w-full appearance-none bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                selected={endDateTime}
                wrapperClassName="w-full"
                // showTimeSelect
                //timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy"
                onChange={(endDate) => onChangeEndDate(endDate)}
                icon={<CalendarIcon className="text-blue-400" />}
                id="reportEndDate"
                name="reportEndDate"
              />
              <div className="text-red-600">
              {endDateIsInvalid && <p>Please select an end date!</p>}
            </div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-6">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-300 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? "Processing..." : "Submit"}
            </button>
          </div>
        </form>
      </FormCard>
    </>
  );
};

export default ReportsForm;
