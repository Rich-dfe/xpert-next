import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import { waterLevelCalFormStyles } from "../Style-classes";

function ParCalibrationForm() {
  return (
    <>
      <FormCard>
        <FormStrip text="PAR Calibration" />
        <form className="grid space-y-3 grid-cols-1 md:grid-cols-2 md:gap-x-8 md:gap-y-1">
          <div>
            <label
              htmlFor="ref1"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Ref Value #1
            </label>
            <input
              type="text"
              id="ref1"
              name="ref1"
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Ref 1"
              required
            />
          </div>
          <div>
            <label
              htmlFor="logger1"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logger Reading 1
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Reading 1"
              required
            />
          </div>
          <div>
            <label
              htmlFor="ref2"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Ref Value #1
            </label>
            <input
              type="text"
              id="ref2"
              name="ref2"
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Ref 2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="logger2"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Logger Reading 2
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Reading 2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Sensitivity
            </label>
            <select
              id="subject"
              name="subject"
              className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm"
            >
              <option>Low</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="temperature"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Temperature
            </label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              className="mt-1 block w-full px-3 py-2 border border-gray-700 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300"
              placeholder="Temperature"
              required
            />
          </div>
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="py-2 px-6 border border-transparent text-sm font-semibold rounded-md text-gray-700 bg-green-400 hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </FormCard>
    </>
  );
}

export default ParCalibrationForm;
