import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";

const ChartDatePickerBar = ({
  handleDates,
  currentStartDate,
  currentEndDate,
  onChangeStartDate,
  onChangeEndDate,
  onChangeChartType,
  currentChartType,
}) => {
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center gap-3 mt-4">
        <div>
          <label
            className="block text-gray-300 text-sm font-medium mb-1"
            htmlFor="chartStartDate"
          >
            Start Date
          </label>
          <DatePicker
            showIcon
            className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
            selected={currentStartDate}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyyy h:mm aa"
            onChange={(startDate) => onChangeStartDate(startDate)}
            icon={<CalendarIcon className="text-blue-400" />}
            id="chartStartDate"
            name="chartStartDate"
          />
        </div>
        <div className="mx-5">
          <label
            className="block text-gray-300 text-sm font-medium mb-1"
            htmlFor="chartStartDate"
          >
            End Date
          </label>
          <DatePicker
            showIcon
            className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
            selected={currentEndDate}
            showTimeSelect
            timeInputLabel="Time:"
            dateFormat="dd/MM/yyyy h:mm aa"
            onChange={(endDate) => onChangeEndDate(endDate)}
            icon={<CalendarIcon className="text-blue-400" />}
          />
        </div>
        <div>
          <select
            className="mt-6 mb-3 block w-full pl-3 pr-7 py-2 text-base border border-gray-700 bg-gray-700 rounded focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
            id="type"
            name="Type"
            onChange={onChangeChartType}
          >
            <option value="0">Primary</option>
            <option value="1">Diagnostic</option>
          </select>
        </div>
        <div>
          <button
            className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-100 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-6 ml-4"
            type="submit"
            onClick={handleDates}
          >
            Submit
          </button>
        </div>
        <div></div>
      </div>
      <div className="flex flex-row justify-center gap-4">
        <button
          className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-100 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleDates}
        >
          Last Day
        </button>
        <button
          className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-100 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleDates}
        >
          7 Days
        </button>
        <button
          className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-100 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleDates}
        >
          30 Days
        </button>
      </div>
    </>
  );
};

export default ChartDatePickerBar;
