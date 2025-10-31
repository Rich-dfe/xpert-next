import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";

function FormTemplate() {
  return (
    <FormCard>
    <FormStrip text="Water Level Calibration" />
    <form className="space-y-3 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-1">
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
          className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-300"
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
          className="mt-1 block w-full px-3 py-2 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-300"
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
          className="mt-1 block w-full px-3 py-2 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-300"
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
          className="mt-1 block w-full px-3 py-2 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-300"
          placeholder="Reading 2"
          required
        />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-1">Subject</label>
        <select id="subject" nameName="subject"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-300 rounded-md shadow-sm">
            <option>General Inquiry</option>
            <option>Support Request</option>
            <option>Partnership</option>
            <option>Other</option>
        </select>
    </div>
    <div>
        <label
          htmlFor="temperature"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Logger °C
        </label>
        <input
          type="text"
          id="temperature"
          name="temperature"
          className="mt-1 block w-full px-3 py-2 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-300"
          placeholder="Reading 2"
          required
        />
      </div>
      <div className="md:col-span-2 flex justify-center">
        <button type="submit"
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Submit
        </button>
    </div>
    </form>
    </FormCard>
  );
}

export default FormTemplate;
