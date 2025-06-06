import FormCard from "../Form-card";
import FormStrip from "@/app/Form-strip";

function WaterLevelCalibrationForm() {
const inputClass = "text-md rounded-md block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white mb-3";
const labelClass = "block uppercase tracking-wide text-gray-300 text-xs font-bold mb-1"
  return (
    <>
      <FormCard>
        <FormStrip text="Water Level Calibration" />
        <form>
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="px-2">
              <label className={labelClass}>
                Reference Value #1
              </label>
              <input
                className={inputClass}
                id="first-ref"
                type="text"
              ></input>
            </div>
            <div className="px-2">
              <label className={labelClass}>
                Logger Reading #1
              </label>
              <input
                className={inputClass}
                id="first-reading"
                type="text"
              ></input>
            </div>
            <div className="px-2">
              <label className={labelClass}>
                Reference Value #2
              </label>
              <input
                className={inputClass}
                id="first-ref"
                type="text"
              ></input>
            </div>
            <div className="px-2">
              <label className={labelClass}>
                Logger Reading #2
              </label>
              <input
                className={inputClass}
                id="first-reading"
                type="text"
              ></input>
            </div>
            <div className="px-2">
              <label className={labelClass}>
                Sensor Length
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                id="first-value"
                <option>0.5m</option>
                <option>1.0m</option>
                <option>1.5m</option>
                <option>2.0m</option>
                <option>3.0m</option>
                <option>4.0m</option>
                <option>5.0m</option>
              </select>
            </div>
            <div className="px-2">
              <label className={labelClass}>
                Temperature
              </label>
              <input
                className={inputClass}
                id="first-reading"
                type="text"
              ></input>
            </div>
            <div className="px-2">
              <button
                className="shadow bg-green-400 hover:bg-green-500 focus:shadow-outline focus:outline-none text-gray-800 font-semibold py-1 px-2 rounded"
                type="button"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </FormCard>
    </>
  );
}

export default WaterLevelCalibrationForm;
