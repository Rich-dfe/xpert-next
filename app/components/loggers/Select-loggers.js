import FormCard from "../Form-card";
import InfoCard from "../Info-card";
import FormStrip from "../Form-strip";

function SelectLoggersForm(props) {

  return (
    <>
      <FormCard>
        <FormStrip text="My Loggers" />
        <div>
          <select className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm">
            <option value="">Select an option</option>
            {props.loggers.map((logger) => {
              return (
                <option key={logger.value} value={logger.value}>
                  {logger.label}
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
                <td>Serial No'</td>
                <td>AD56DE77FFD</td>
              </tr>
              <tr>
                <td>Battery Volts</td>
                <td>2.96V</td>
              </tr>
              <tr>
                <td>Remaing</td>
                <td>2.96V</td>
              </tr>
              <tr>
                <td>RSSI</td>
                <td>-75dB</td>
              </tr>
              <tr>
                <td>Other 1</td>
                <td>2.96V</td>
              </tr>
              <tr>
                <td>Other 2</td>
                <td>2.96V</td>
              </tr>
              <tr>
                <td>Other 1</td>
                <td>2.96V</td>
              </tr>
              <tr>
                <td>Other 2</td>
                <td>2.96V</td>
              </tr>
              <tr>
                <td>Other 1</td>
                <td>2.96V</td>
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
