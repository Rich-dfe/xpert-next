import { useState } from "react";
import FormCard from "../Form-card";
import FormStrip from "@/app/components/Form-strip";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import ModalConfirm from "../Modal-confirm";

function GroupsForm({ loggers, groups, handleMoveLogger, handleNewGroup, handleDeleteGroup }) {
  const [selectedLogger, setSelectedLogger] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [newGroupName, setNewGroupName] = useState(null);
  const [deleteGroupId, setDeleteGroupId] = useState(null);
  const [isModalConfirmOpen, setIsModalConfirmOpen] = useState(false);

  const [selectedLoggerIsInvalid, setSelectedLoggerIsInvalid] = useState(false);
  const [selectedGroupIsInvalid, setSelectedGroupIsInvalid] = useState(false);
  const [newGroupNameIsInvalid, setNewGroupNameIsInvalid] = useState(false);
  const [deleteGroupIdIsInvalid, setDeleteGroupIdIsInvalid] = useState(false);


  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    //console.log(name, value);

    if (name === "selectLogger") {
      setSelectedLogger(value);
    } else if (name === "selectGroup") {
      setSelectedGroup(value);
    } else if (name === "newGroup") {
      setNewGroupName(value);
    } else if (name === "deleteGroup") {
      setDeleteGroupId(value);
    }
  }

  const handleInputBlur = () => {
    if (newGroupName === null || newGroupName.length < 3) {
      setNewGroupNameIsInvalid(true);
      return;
    } else {
      setNewGroupNameIsInvalid(false);
    }
  };

  const handleMoveLoggerForm = (e) =>{
    e.preventDefault();

    //Sanitize Reference Values
    if (!selectedLogger) {
      setSelectedLoggerIsInvalid(true);
      return;
    } else {
      setSelectedLoggerIsInvalid(false);
    }

    if (!selectedGroup) {
      setSelectedGroupIsInvalid(true);
      return;
    } else {
      setSelectedGroupIsInvalid(false);
    }

    //FUNCTION FROM PARENT
    handleMoveLogger(selectedGroup,selectedLogger);
  }

  const handleNewGroupForm = (e) =>{
    e.preventDefault();

    if (newGroupName === null || newGroupName.length < 3) {
      setNewGroupNameIsInvalid(true);
      return;
    } else {
      setNewGroupNameIsInvalid(false);
    }

    //USE FUNCTION FROM PARENT
    handleNewGroup(newGroupName);
  }

  const handleDeleteGroupForm = (e) =>{
    e.preventDefault();
    console.log("DELETE", deleteGroupId);

    if (!deleteGroupId) {
      setDeleteGroupIdIsInvalid(true);
      return;
    } else {
      setDeleteGroupIdIsInvalid(false);
    }

    setIsModalConfirmOpen(true);
  }

  const handleModalConfirm = () =>{
    //DO STUFF HERE
    //SAVE CHANGES HERE AND TRIGGER RERENDER IF NECESSARY.
    handleDeleteGroup(deleteGroupId);
    setIsModalConfirmOpen(false);
  }

  const handleModalClose = () =>{
    console.log('Modal closed');
    setIsModalConfirmOpen(false);
  }

  

  return (
    <>
      <FormCard>
        <FormStrip text="Organize" />
        <form onSubmit={handleMoveLoggerForm}>
          <div>
            <label
              className="block text-gray-300 text-sm font-medium mb-1"
              htmlFor="group"
            >
            </label>
          </div>
          <div>
            <select 
              id="selectLogger"
              name="selectLogger"
              onChange={handleInputChange} 
              className={`mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm
              ${selectedLoggerIsInvalid 
                  ? 'border-red-400 focus:ring-red-400' // Error styles
                  : 'border-gray-700 bg-gray-700' // Normal styles
                  }`
                }
              >
              <option value="">Select logger</option>
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
          {/* This className ensures spacing is maintained when the error message is shown */}
          <div className={"text-red-400 " + (selectedLoggerIsInvalid && "-mt-3")}>
              {selectedLoggerIsInvalid && <p>Please select a logger!</p>}
            </div>

          <div className="flex flex-row justify-center font-bold mb-3 sm:text-sm text-gray-300">
            <ArrowDownIcon className="size-6 text-blue-400 hover:text-blue-300 mr-3 animate-bounce" />
            <div>Move logger to this group</div>{" "}
            <ArrowDownIcon className="size-6 text-blue-400 hover:text-blue-300 ml-3 animate-bounce" />
          </div>

          <div>
            <select 
              id="selectGroup"
              name="selectGroup"
              onChange={handleInputChange} 
              className={`mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm">
              ${selectedGroupIsInvalid 
                  ? 'border-red-400 focus:ring-red-400' // Error styles
                  : 'border-gray-700 bg-gray-700' // Normal styles
                  }`
                }
              >
              <option value="">Select Group</option>
              {groups.map((group) => {
                return (
                  <option key={group.id} value={group.id}>
                    {group.group_name}
                  </option>
                );
              })}
              ;
            </select>
            <div className={"text-red-400 " + (selectedGroupIsInvalid && "-mt-3")}>
              {selectedGroupIsInvalid && <p>Please select a group!</p>}
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-300 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Move
            </button>
          </div>
        </form>

        <form onSubmit={handleNewGroupForm}>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="group"
              >
                Create New Group
              </label>
              <input
                className={`appearance-none block w-full bg-gray-700 text-gray-300 border border-gray-700 rounded py-2 px-4 leading-tight focus:outline-none focus:ring-green-400 focus:border-green-400"
                ${newGroupNameIsInvalid 
                  ? 'border-red-400 focus:ring-red-400' // Error styles
                  : 'border-gray-700 bg-gray-700' // Normal styles
                  }`
                }
                id="newGroup"
                name="newGroup"
                type="text"
                placeholder="Enter New Group Name"
                onChange={handleInputChange}
                onBlur={handleInputBlur}
              />
              <div className="text-red-400">
              {newGroupNameIsInvalid && <p>Three or more characters are required!</p>}
            </div>
            </div>
            
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-300 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create
            </button>
          </div>
        </form>

        <form onSubmit={handleDeleteGroupForm}>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label
                className="block text-gray-300 text-sm font-medium mb-1"
                htmlFor="group"
              >
                Delete Group
              </label>
              <select 
              id="deleteGroup"
              name="deleteGroup"
              onChange={handleInputChange} 
              className="mt-1 mb-3 block w-full pl-3 pr-10 py-2 text-base border border-gray-700 bg-gray-700 focus:outline-none focus:ring-green-400 focus:border-green-400 sm:text-sm text-gray-300 rounded-md shadow-sm">
              <option value="">Select Group</option>
              {groups.map((group) => {
                return (
                  <option key={group.id} value={group.id}>
                    {group.group_name}
                  </option>
                );
              })}
              ;
            </select>
            <div className={"text-red-400 " + (deleteGroupIdIsInvalid && "-mt-3")}>
              {deleteGroupIdIsInvalid && <p>Please select a group to delete!</p>}
            </div>
            </div>
          </div>

          <div className="flex items-center justify-center mb-4">
            <button
              className="bg-green-400 hover:bg-green-700 text-gray-700 hover:text-gray-300 font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Delete
            </button>
          </div>
        </form>
        {isModalConfirmOpen && (<ModalConfirm 
          onConfirm={handleModalConfirm}
          onClose={handleModalClose}
          state={isModalConfirmOpen}
          title="Delete logger group?"
          text="Are you sure you want to delete this group? This action cannot be undone."
        />)}
      </FormCard>
    </>
  );
}

export default GroupsForm;
