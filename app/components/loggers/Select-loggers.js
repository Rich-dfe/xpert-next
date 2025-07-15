import FormCard from "../Form-card";
import InfoCard from "../Info-card";
import FormStrip from "../Form-strip";
import { decimalToHex } from "@/app/utils.js/formatters/formatSerialNumber";


function SelectLoggersForm({loggers, onSelectChange, latestDiagnosticData, model}) {
  console.log('SELECT LOGGERS DX DATA', latestDiagnosticData);

  const handleChange = (event)=>{
    onSelectChange(event.target.value);
  }

  const noDataPlaceHolder = "-----";

  return (
    <>
      <FormCard>
        <FormStrip text="My Loggers" />
        <div>
          <select onChange={handleChange} className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm">
            <option value="">Select an option</option>
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
                <td>Remaing Days</td>
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
        <div className="flex flex-row mb-3">
          <label
            htmlFor="html"
            className="block text-gray-300 text-sm font-medium mb-1 mr-2"
          >
            Yes
          </label>
          <input
            type="radio"
            className="mr-4"
            id="applyGroup"
            name="applyGroup"
            value="1"
          />
          <label
            htmlFor="css"
            className="block text-gray-300 text-sm font-medium mb-1 mr-2"
          >
            No
          </label>
           
          <input type="radio" id="applyGroup" name="applyGroup" value="0" />
        </div>
      </FormCard>
    </>
  );
}

export default SelectLoggersForm;
