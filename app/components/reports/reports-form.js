import FormCard from "@/app/components/Form-card";
import FormStrip from "@/app/components/Form-strip";
import DatePicker from "react-datepicker";
import { CalendarIcon } from "@heroicons/react/24/solid";
import "react-datepicker/dist/react-datepicker.css";

const ReportsForm = ({ types, onChildAction, loggers }) => {
  ///THIS IS JUST SOME DEV TEST CODE
  const handleClick = async (e) => {
    const dataToSend = e.target.value;
    // Call the prop which is a Server Action (or wraps one)
    await onChildAction(dataToSend);
  };
  ////////////////////////////////////

  return (
    <>
      <FormCard>
        <FormStrip text="Request Report"></FormStrip>
        <form>
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
                id="loggerName"
                name="loggerName"
                className="w-full mt-1 mb-3 pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
              >
                <option value="">Select a logger</option>
                {loggers.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
                ;
              </select>
            </div>

            <div>
              <label
                className="text-gray-300 text-sm font-medium mb-1"
                htmlFor="chartStartDate"
              >
                Start Date
              </label>
            </div>
            <div>
              <DatePicker
                showIcon
                className="w-full appearance-none bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400 mb-3"
                //selected={currentStartDate}
                wrapperClassName="w-full"
                showTimeSelect
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                //onChange={(startDate) => onChangeStartDate(startDate)}
                icon={<CalendarIcon className="text-blue-400" />}
                id="chartStartDate"
                name="chartStartDate"
              />
            </div>

            <div>
              <label
                className="text-gray-300 text-sm font-medium"
                htmlFor="chartStartDate"
              >
                End Date
              </label>
            </div>
            <div>
              <DatePicker
                showIcon
                className="w-full appearance-none bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                //selected={currentStartDate}
                wrapperClassName="w-full"
                showTimeSelect
                timeInputLabel="Time:"
                dateFormat="dd/MM/yyyy h:mm aa"
                //onChange={(startDate) => onChangeStartDate(startDate)}
                icon={<CalendarIcon className="text-blue-400" />}
                id="chartStartDate"
                name="chartStartDate"
              />
            </div>
           </div>     
            <div className="flex items-center justify-center mt-6">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-300 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </FormCard>
    </>
  );
};

export default ReportsForm;
