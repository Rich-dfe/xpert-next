import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import { ArrowDownIcon } from "@heroicons/react/24/solid";

function GroupsForm(props) {
  return (
    <>
      <FormCard>
        <FormStrip text="Organize" />
        <form>
          <div>
            <label
              className="block text-gray-300 text-sm font-medium mb-1"
              htmlFor="group"
            >
              Select Logger
            </label>
          </div>
          <div>
            <select className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm">
              <option value="">Select logger</option>
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

          <div className="flex flex-row justify-center font-bold mb-3 sm:text-sm text-gray-300">
            <ArrowDownIcon className="size-6 text-blue-400 hover:text-blue-300 mr-3 animate-pulse" />
            <div>Move logger to this group</div>{" "}
            <ArrowDownIcon className="size-6 text-blue-400 hover:text-blue-300 ml-3 animate-pulse" />
          </div>

          <div>
            <select className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm">
              <option value="">Select Group</option>
              {props.groups.map((group) => {
                return (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                );
              })}
              ;
            </select>
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-300 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Move
            </button>
          </div>
        </form>

        <form>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="group"
              >
                Create New Group
              </label>
              <input
                className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                id="group"
                name="group"
                type="text"
                placeholder="Enter New Group Name"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-300 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>

        <form>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="group"
              >
                Delete Group
              </label>
              <input
                className="appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                id="group"
                name="group"
                type="text"
                placeholder="Enter New Group Name"
              />
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-300 font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Delete
            </button>
          </div>
        </form>
      </FormCard>
    </>
  );
}

export default GroupsForm;
