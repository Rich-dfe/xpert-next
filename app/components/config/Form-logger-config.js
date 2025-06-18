import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";

function LoggerConfigForm() {
  return (
    <>
      <FormCard>
        <FormStrip text="Logger Configuration" />
        <form className="w-full max-w-lg mx-auto">
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
              />
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
              <input
                className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                id="grid-first-name"
                type="text"
                placeholder="HH:MM:SS"
              />
            </div>

            <div className="w-full md:w-1/2 px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="grid-last-name"
              >
                Timezone
              </label>
              <select
                className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
                id="grid-last-name"
                type="text"
                placeholder="e.g., Doe"
              >
                <option value="-12:00">GMT -12:00</option>
                <option value="-11:00">GMT -11:00</option>
                <option value="-10:00">GMT -10:00</option>
                <option value="-09:50">GMT -9:30</option>
                <option value="-09:00">GMT -9:00</option>
                <option value="-08:00">GMT -8:00</option>
                <option value="-07:00">GMT -7:00</option>
                <option value="-06:00">GMT -6:00</option>
                <option value="-05:00">GMT -5:00</option>
                <option value="-04:50">GMT -4:30</option>
                <option value="-04:00">GMT -4:00</option>
                <option value="-03:50">GMT -3:30</option>
                <option value="-03:00">GMT -3:00</option>
                <option value="-02:00">GMT -2:00</option>
                <option value="-01:00">GMT -1:00</option>
                <option value="+00:00">GMT 0:00</option>
                <option value="+01:00">GMT +1:00</option>
                <option value="+02:00">GMT +2:00</option>
                <option value="+03:00">GMT +3:00</option>
                <option value="+03:50">GMT +3:30</option>
                <option value="+04:00">GMT +4:00</option>
                <option value="+04:50">GMT +4:30</option>
                <option value="+05:00">GMT +5:00</option>
                <option value="+05:50">GMT +5:30</option>
                <option value="+05:75">GMT +5:45</option>
                <option value="+06:00">GMT +6:00</option>
                <option value="+06:50">GMT +6:30</option>
                <option value="+07:00">GMT +7:00</option>
                <option value="+08:00">GMT +8:00</option>
                <option value="+08:75">GMT +8:45</option>
                <option value="+09:00">GMT +9:00</option>
                <option value="+09:50">GMT +9:30</option>
                <option value="+10:00">GMT +10:00</option>
                <option value="+10:50">GMT +10:30</option>
                <option value="+11:00">GMT +11:00</option>
                <option value="+11:50">GMT +11:30</option>
                <option value="+12:00">GMT +12:00</option>
                <option value="+12:75">GMT +12:45</option>
                <option value="+13:00">GMT +13:00</option>
                <option value="+14:00">GMT +14:00</option>
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
                id="grid-email"
                type="email"
                placeholder="e.g., john.doe@example.com"
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
                placeholder="Group"
              />
            </div>
          </div>

          <div className="block text-gray-300 text-sm font-medium mb-1 mt-3">
            Apply to group?
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
             
            <input
              type="radio"
              id="applyGroup"
              name="applyGroup"
              value="0"
            />
          </div>

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
