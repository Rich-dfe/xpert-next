import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import { waterLevelCalFormStyles } from "../Style-classes";

function WaterLevelCalibrationForm() {
  return (
    <>
      <FormCard>
        <FormStrip text="Water Level Calibration" />
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
              className={waterLevelCalFormStyles.textInput}
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
              className={waterLevelCalFormStyles.textInput}
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
              className={waterLevelCalFormStyles.textInput}
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
              className={waterLevelCalFormStyles.textInput}
              placeholder="Reading 2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Sensor Length
            </label>
            <select
              id="subject"
              name="subject"
              className={waterLevelCalFormStyles.selectMenu}
            >
              <option>0.5m</option>
              <option>1.5m</option>
              <option>2.0m</option>
              <option>3.0m</option>
              <option>4.0m</option>
              <option>5.0m</option>
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
              className={waterLevelCalFormStyles.textInput}
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

export default WaterLevelCalibrationForm;
