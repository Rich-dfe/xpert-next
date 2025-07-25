import FormCard from "../Form-card";
import InfoCard from "../Info-card";
import FormStrip from "../Form-strip";
import { decimalToHex } from "@/app/utils.js/formatters/formatSerialNumber";
import { useState } from "react";
import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import Spinner from "../spinner";


function SelectLoggersForm({loggers, onSelectChange, latestDiagnosticData, model, isSelectedLogger, selectedLogger, isLoading}) {
  const [firmwareUpdate, setFirmwareUpdate] = useState(false);

  const handleChange = (e)=>{
    const { name, value } = e.target;

    if(name === "loggerSelect"){
      onSelectChange(value);
    }else if(name === "firmwareUpdateToggle"){
      setFirmwareUpdate(!firmwareUpdate);
    } 
  }

  const noDataPlaceHolder = "-----";

  return (
    <>
      <FormCard>
        {(isLoading) ? <Spinner /> : null}
        <FormStrip text="My Loggers" />
        <div>
          <select name="loggerSelect" onChange={handleChange} value={selectedLogger[0].id} className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm">
            <option>Select an option</option>
            {loggers.map((logger) => {
              return (
                <option key={logger.id} value={logger.id}>
                  {logger.logger_name}
                </option>
              );
            })}
            ;
          </select>
        </div>
        <InfoCard>
          <table className="table-auto">
            <tbody>
              <tr>
                <th>Parameter</th>
                <th>Value</th>
              </tr>
              <tr>
                <td>Date</td>
                <td>{(latestDiagnosticData.formattedLogDateTime === null) ? noDataPlaceHolder : latestDiagnosticData.formattedLogDateTime[0]}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{model}</td>
              </tr>
              <tr>
                <td>Serial No'</td>
                <td>{(latestDiagnosticData.loggerUid > 0) ? decimalToHex(latestDiagnosticData.loggerUid) : noDataPlaceHolder}</td>
              </tr>
              <tr>
                <td>Battery Volts</td>
                <td>{(latestDiagnosticData.diagnostics[0].batteryVoltage === null) ? noDataPlaceHolder : latestDiagnosticData.diagnostics[0].batteryVoltage}</td>
              </tr>
              <tr>
                <td>Days Remaing</td>
                <td>{(latestDiagnosticData.diagnostics[0].daysRemaining === null) ? noDataPlaceHolder : latestDiagnosticData.diagnostics[0].daysRemaining}</td>
              </tr>
              <tr>
                <td>RSSI</td>
                <td>{(latestDiagnosticData.diagnostics[0].rssi === null) ? noDataPlaceHolder : latestDiagnosticData.diagnostics[0].rssi}</td>
              </tr>
              <tr>
                <td>Settings Version</td>
                <td>{(latestDiagnosticData.diagnostics[0].settingsVersion === null) ? noDataPlaceHolder : latestDiagnosticData.diagnostics[0].settingsVersion}</td>
              </tr>
              <tr>
                <td>Status Flags</td>
                <td>{(latestDiagnosticData.diagnostics[0].statusFlags === null) ? noDataPlaceHolder : latestDiagnosticData.diagnostics[0].statusFlags}</td>
              </tr>
              <tr>
                <td>Firmware Version</td>
                <td>{noDataPlaceHolder}</td>
              </tr>
              <tr>
                <td>Other 2</td>
                <td>{noDataPlaceHolder}</td>
              </tr>
            </tbody>
          </table>
        </InfoCard>
        <div className="block text-gray-300 text-sm font-medium mb-1 mt-3">
          Firmware auto update?
        </div>
        {/* APPLY TO GROUP SWITCH */}
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value="1"
              className="sr-only peer"
              onChange={handleChange}
              name="firmwareUpdateToggle"
              // checked={applyToGroup}
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-300 dark:peer-checked:bg-blue-500"></div>
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
              {firmwareUpdate ? <CheckIcon className="size-6 text-green-300"/> : <XMarkIcon className="size-6 text-red-400"/>}
            </span>
          </label>
      </FormCard>
    </>
  );
}

export default SelectLoggersForm;
