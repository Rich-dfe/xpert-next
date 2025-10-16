import React, { useState,useEffect,useRef } from "react";
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
  licensePeriods,
  onChangeChartSelect,
}) => {

  
 const filterNonConcurrentDates = (date) => {
  //console.log('PERIODS',licensePeriods.current);
    //If there are no license periods do not restrict any dates
    if(licensePeriods.current.length === 0 || licensePeriods.current[0] === null){
      return true;
    }else{
    // Convert the Date object to a timestamp for comparison
    const dateTimestamp = date.getTime();

    // Check if the date falls within any of the defined ranges
    return licensePeriods.current.some(period => {
      const startDate = period.startsunix * 1000;
      const stopDate = period.endsunix * 1000;

      // The date is valid if its timestamp is between the start and stop timestamps
      return dateTimestamp >= startDate && dateTimestamp <= stopDate;
    });
  }
  };

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
            filterDate={filterNonConcurrentDates}
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
            id="chartEndDate"
            name="chartEndDate"
            filterDate={filterNonConcurrentDates}
          />
        </div>
        <div>
          <label
            className="block text-gray-300 text-sm font-medium"
            htmlFor="dataType"
          >
            View Data
          </label>
          <select
            className="mt-1 mb-3 block w-full pl-3 pr-7 py-2 text-base border border-gray-700 bg-gray-700 rounded focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
            id="dataType"
            name="dataType"
            onChange={onChangeChartType}
          >
            <option value="0">Primary</option>
            <option value="1">Diagnostic</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-300 text-sm font-medium mb-1"
            htmlFor=" chartSelect"
          >
            Plot to:
          </label>
          <select
            className="mt-1 mb-3 block w-full pl-3 pr-7 py-2 text-base border border-gray-700 bg-gray-700 rounded focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
            id="chartSelect"
            name="chartSelect"
            onChange={onChangeChartSelect}
          >
            <option value="0">Top</option>
            <option value="1">Bottom</option>
          </select>
        </div>
        <div>
          <button
            className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-100 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-6 ml-4"
            type="submit"
            onClick={handleDates}
            id="selected"
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
          id="1day"
        >
          Last Day
        </button>
        <button
          className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-100 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleDates}
          id="7days"
        >
          7 Days
        </button>
        <button
          className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-100 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          onClick={handleDates}
          id="30days"
        >
          30 Days
        </button>
      </div>
    </>
  );
};

export default ChartDatePickerBar;
