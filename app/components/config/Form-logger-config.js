import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import { useState, useEffect } from "react";
import {
  isNotEmpty,
  hasMinLength,
  isLessThanOrEqual,
} from "@/app/utils.js/validation";
import {
  intervalToSeconds,
  secondsToHoursMinsSecs,
} from "@/app/utils.js/helpers";
import {
  XMarkIcon,
  CheckIcon,
  Bars3Icon,
  CalendarIcon,
} from "@heroicons/react/24/solid";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function LoggerConfigForm({ onSubmit, initialData }) {
  //console.log('INITAL DATA',initialData);
  const [loggerName, setLoggerName] = useState("");
  const [startDateUnix, setStartDateUnix] = useState(new Date().getTime());
  const [isTimedStart, setIsTimedStart] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [loggingIntervalHour, setLoggingIntervalHour] = useState("01");
  const [loggingIntervalMin, setLoggingIntervalMin] = useState("0");
  const [loggingIntervalSec, setLoggingIntervalSec] = useState("0");
  const [totalLoggingIntervalSeconds, setTotalLoggingIntervalSeconds] =
    useState(3600);
  const [timezone, setTimezone] = useState("0");
  const [notes, setNotes] = useState("");
  const [applyToGroup, setApplyToGroup] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [loggerNameIsInvalid, setLoggerNameIsInvalid] = useState(false);
  const [intervalIsInvalid, setIntervalIsInvalid] = useState(false);

  useEffect(() => {
    setLoggerName(initialData.logger_name || "");
    setTimezone(initialData.timezone_offset || "");
    initialData.notes ? setNotes(initialData.notes) : setNotes("");
    setGroupName(initialData.group_name || "");
    const initialLoggingInterval = secondsToHoursMinsSecs(initialData.x0018);
    setLoggingIntervalHour(initialLoggingInterval.hrs);
    setLoggingIntervalMin(initialLoggingInterval.mins);
    setLoggingIntervalSec(initialLoggingInterval.secs);

    if(initialData.x000E === 0 || initialData.x000E === null){
      setIsTimedStart(false);
    } else{
      setIsTimedStart(true);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "loggerName") {
      setLoggerName(value);
    } else if (name === "timedStart") {
      setIsTimedStart(!isTimedStart);
    } else if (name === "intervalHour") {
      setLoggingIntervalHour(value);
    } else if (name === "intervalMin") {
      setLoggingIntervalMin(value);
    } else if (name === "intervalSec") {
      setLoggingIntervalSec(value);
    } else if (name === "timezone") {
      setTimezone(value);
    } else if (name === "notes") {
      setNotes(value);
    } else if (name === "groupToggle") {
      setApplyToGroup(!applyToGroup);
      console.log("HELLO TOGGLE 👍", applyToGroup);
      //const updatedData = {...formData, group_apply:applyToGroup};
      //setFormData(updatedData);
    }
  };

  //The date picker needs a separate handler due the way the library works
  const updateStartDate = (sd) => {
    //const unixStart = Math.floor(new Date(sd).getTime()/1000);
    //const ustart = Math.floor(unixStart/1000)
    //console.log("UN SATRT", unixStart);
    setStartDateUnix(Math.floor(new Date(sd).getTime()/1000));
    setStartDate(sd);
  };

  useEffect(() => {
    // This will log the CURRENT value of inputValue
    if(isTimedStart === false){
      setStartDateUnix(0);
    } else{
      setStartDateUnix(Math.floor(Date.now() / 1000));
    }
  }, [isTimedStart]); // Dependency array

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default browser form submission

    if (!hasMinLength(loggerName, 3)) {
      setLoggerNameIsInvalid(true);
      return;
    } else {
      setLoggerNameIsInvalid(false);
    }

    if (isLessThanOrEqual(totalLoggingIntervalSeconds, 0)) {
      setIntervalIsInvalid(true);
      return;
    } else {
      setIntervalIsInvalid(false);
    }

    onSubmit({
      loggerName,
      loggingIntervalHour,
      loggingIntervalMin,
      loggingIntervalSec,
      timezone,
      notes,
      applyToGroup,
      totalLoggingIntervalSeconds,
      startDateUnix,
    }); // Call the function passed from the parent
  };

  // Function to generate options (e.g., 00, 01, ..., 23)
  const generateOptions = (lowerLimit, upperLimit, stepSize) => {
    const options = [];
    for (let i = lowerLimit; i <= upperLimit; i += stepSize) {
      const value = String(i).padStart(2, "0");
      options.push(
        <option key={value} value={value}>
          {value}
        </option>
      );
    }
    return options;
  };

  useEffect(() => {
    const intervalSeconds = intervalToSeconds(
      loggingIntervalHour,
      loggingIntervalMin,
      loggingIntervalSec
    );
    setTotalLoggingIntervalSeconds(intervalSeconds);
  }, [loggingIntervalHour, loggingIntervalMin, loggingIntervalSec]);

  return (
    <>
      <FormCard>
        <FormStrip text="Logger Configuration" />
        <form className="w-full max-w-lg mx-auto" onSubmit={handleFormSubmit}>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="loggerName"
              >
                Logger Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                id="loggerName"
                name="loggerName"
                type="text"
                placeholder="Logger Name"
                value={loggerName}
                onChange={handleInputChange}
              />
              <div className="text-red-600">
                {loggerNameIsInvalid && <p>Invalid logger name!</p>}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-2"
                htmlFor="grid-last-name"
              >
                Set Start Time
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value="1"
                  className="sr-only peer"
                  onChange={handleInputChange}
                  name="timedStart"
                  id="timedstart"
                  checked={isTimedStart}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300 dark:peer-checked:bg-blue-500"></div>
                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                  {isTimedStart ? (
                    <CheckIcon className="size-6 text-green-300" />
                  ) : (
                    <XMarkIcon className="size-6 text-red-400" />
                  )}
                </span>
              </label>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="grid-first-name"
              >
                {isTimedStart ? "Start Time" : null}
              </label>

              <div className="flex items-center">
                {/* <span className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"> */}
                {/* Hours Select */}
                <div className="flex flex-col items-center">
                  {isTimedStart ?<DatePicker
                    showIcon
                    className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                    selected={startDate}
                    showTimeSelect
                    timeInputLabel="Time:"
                    dateFormat="dd/MM/yyyy h:mm aa"
                    onChange={(startDate) => updateStartDate(startDate)}
                    icon={<CalendarIcon className="text-blue-400" />}
                    id="configStartDate"
                    name="configStartDate"
                  /> : <div className="text-gray-900 bg-green-400 py-1.5 px-4.5 mt-3.5 rounded-md">Immediate Start</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="grid-first-name"
              >
                Logging Interval
              </label>

              <div className="flex items-center">
                {/* <span className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"> */}
                {/* Hours Select */}
                <div className="flex flex-col items-center">
                  <select
                    name="intervalHour"
                    id="intervalHour"
                    value={loggingIntervalHour}
                    onChange={handleInputChange}
                    selected={loggingIntervalHour}
                    className="w-14 p-2 text-center border border-gray-700 rounded-md focus:outline-none transition focus:ring-green-400 focus:border-green-400 text-md font-medium bg-gray-700 text-gray-300 rounded-md"
                  >
                    {generateOptions(0, 23, 1)}
                  </select>
                </div>

                <span className="mx-1 text-gray-200">:</span>
                <div className="flex flex-col items-center">
                  <select
                    name="intervalMin"
                    id="intervalMin"
                    value={loggingIntervalMin}
                    onChange={handleInputChange}
                    selected={loggingIntervalMin}
                    className="w-14 p-2 text-center border border-gray-700 rounded-md focus:outline-none focus:ring-green-400 focus:border-green-400 transition text-md font-medium bg-gray-700 text-gray-300"
                  >
                    {generateOptions(0, 59, 1)}
                  </select>
                </div>

                <span className="mx-1 text-gray-200">:</span>

                <div className="flex flex-col items-center">
                  <select
                    name="intervalSec"
                    id="intervalSec"
                    value={loggingIntervalSec}
                    onChange={handleInputChange}
                    selected={loggingIntervalSec}
                    className="w-14 p-2 text-center border border-gray-700 rounded-md focus:outline-none focus:ring-green-400 focus:border-green-400 transition text-md font-medium bg-gray-700 text-gray-300"
                  >
                    {generateOptions(0, 59, 10)}
                  </select>
                </div>
              </div>
              <div className="text-red-600">
                {intervalIsInvalid && <p>Must be greater than 0!</p>}
              </div>
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="grid-last-name"
              >
                Timezone
              </label>
              <select
                className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 transition sm:text-sm text-gray-300 rounded-md shadow-sm"
                id="timezone"
                name="timezone"
                type="text"
                placeholder="Timezone"
                value={timezone}
                onChange={handleInputChange}
              >
                <option value="-12.00">GMT -12:00</option>
                <option value="-11.00">GMT -11:00</option>
                <option value="-10.00">GMT -10:00</option>
                <option value="-9.30">GMT -9:30</option>
                <option value="-9.00">GMT -9:00</option>
                <option value="-8.00">GMT -8:00</option>
                <option value="-7.00">GMT -7:00</option>
                <option value="-6.00">GMT -6:00</option>
                <option value="-5.00">GMT -5:00</option>
                <option value="-4.30">GMT -4:30</option>
                <option value="-4.00">GMT -4:00</option>
                <option value="-3.30">GMT -3:30</option>
                <option value="-3.00">GMT -3:00</option>
                <option value="-2.00">GMT -2:00</option>
                <option value="-1.00">GMT -1:00</option>
                <option value="0.00">GMT 0:00</option>
                <option value="1.00">GMT +1:00</option>
                <option value="2.00">GMT +2:00</option>
                <option value="3.00">GMT +3:00</option>
                <option value="3.30">GMT +3:30</option>
                <option value="4.00">GMT +4:00</option>
                <option value="4.30">GMT +4:30</option>
                <option value="5.00">GMT +5:00</option>
                <option value="5.30">GMT +5:30</option>
                <option value="5.45">GMT +5:45</option>
                <option value="6.00">GMT +6:00</option>
                <option value="6.30">GMT +6:30</option>
                <option value="7.00">GMT +7:00</option>
                <option value="8.00">GMT +8:00</option>
                <option value="8.45">GMT +8:45</option>
                <option value="9.00">GMT +9:00</option>
                <option value="9.30">GMT +9:30</option>
                <option value="10.00">GMT +10:00</option>
                <option value="10.30">GMT +10:30</option>
                <option value="11.00">GMT +11:00</option>
                <option value="11.30">GMT +11:30</option>
                <option value="12.00">GMT +12:00</option>
                <option value="12.45">GMT +12:45</option>
                <option value="13.00">GMT +13:00</option>
                <option value="14.00">GMT +14:00</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="grid-email"
              >
                Notes
              </label>
              <textarea
                rows="4"
                className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                id="notes"
                name="notes"
                type="email"
                value={notes}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="group"
              >
                Group
              </label>
              <input
                className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                id="group"
                name="group"
                type="text"
                value={groupName}
                disabled
              />
            </div>
          </div>

          {/* APPLY TO GROUP SWITCH */}
          <div className="block text-gray-300 text-sm font-medium mb-2 mt-3">
            Apply to group?
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value="1"
              className="sr-only peer"
              onChange={handleInputChange}
              name="groupToggle"
              id="groupToggle"
              checked={applyToGroup}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300 dark:peer-checked:bg-blue-500"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {applyToGroup ? (
                <CheckIcon className="size-6 text-green-300" />
              ) : (
                <XMarkIcon className="size-6 text-red-400" />
              )}
            </span>
          </label>

          <div className="flex items-center justify-center">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-100 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </FormCard>
    </>
  );
}

export default LoggerConfigForm;
