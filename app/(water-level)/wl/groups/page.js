"use client";

import { useState, useEffect } from "react";
import GroupsForm from "@/app/components/groups/Form-groups";
import ListGroups from "@/app/components/groups/List-groups";
import ListGroupsLoggers from "@/app/components/groups/List-groups-loggers";
import { useLoggers } from "@/app/store/user-loggers-context";
import loggersService from "@/app/service/loggersService";
import groupsService from "@/app/service/groupsService";
import Spinner from "@/app/components/spinner";
import ModalAlert from "@/app/components/Modal-alert";

export default function WlGroups() {
  //Get the loggers context
  const [isLoading, setIsLoading] = useState();
  const [isModalAlertOpen, setIsModalAlertOpen] = useState(false);
  const [isMovedLoggerModalOpen, setIsMovedLoggerModalOpen] = useState(false);
  const [isGroupDeleted, setIsGroupDelete] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [loggersInGroup, setLoggersInGroup] = useState([
    {
      id:-1,
      logger_name:"Please select a group...",
      logger_uid: null,
      product_id:null
    }]);
  const [groups, setGroups] = useState([
    {
      id: 1,
      user_id: 1,
      group_name: "Loading...",
    },
  ]);

  const { waterLevelLoggers } = useLoggers();
  const API_LOGGERS = waterLevelLoggers;

  useEffect(() => {
    async function groupsData() {
      try {
        setIsLoading(true);
        const groupsData = await groupsService.fetchGroupsList(34);
        //console.log("Groups Data", groupsData);
        setGroups(groupsData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    groupsData();
  }, [isGroupDeleted]);

  //Event Handlers
  const handleMoveLoggerToGroup = async (groupId, loggerId) => {
    try {
        //setIsLoading(true);
        const updateLoggerResponse = await groupsService.updateLoggerGroup(groupId, loggerId);
        const groupLoggers = await loggersService.fetchLoggersByGroupId(selectedGroupId);
        setLoggersInGroup(groupLoggers);
        if(updateLoggerResponse.changedRows > 0){
          setIsMovedLoggerModalOpen(true);
        }
        //setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
  };

  const handleNewGroup = (newGroupName) => {
    console.log("Handling new group", newGroupName);
  };

  const handleDeleteGroup = async (groupId) => {
    //Check for empty group before deleting.
    const groupContents = await loggersService.fetchLoggersByGroupId(groupId);
    if (groupContents.length > 0) {
      setIsModalAlertOpen(true);
      console.log("Group Not Empty", groupContents);
    } else {
      setIsModalAlertOpen(false);
      const deleteResult = await groupsService.deleteGroup(groupId);
      setIsGroupDelete(!isGroupDeleted);
      //console.log("Group deleted", deleteResult);
    }
  };

  const handleModalAlertClose = () => {
      setIsModalAlertOpen(false);
    };

  const handleMoveLoggerModalClose = () => {
      setIsMovedLoggerModalOpen(false);
    };

  const handleGroupListSelect = async (groupData) =>{
    try {
        //This is used to update logger lists in the handleMoveLoggerToGroup function
        setSelectedGroupId(groupData.id);
        //setIsLoading(true);
        const groupLoggers = await loggersService.fetchLoggersByGroupId(groupData.id);
        setLoggersInGroup(groupLoggers);
        //setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="min-h-[500px]">
            <GroupsForm
              loggers={API_LOGGERS}
              groups={groups}
              handleMoveLogger={handleMoveLoggerToGroup}
              handleNewGroup={handleNewGroup}
              handleDeleteGroup={handleDeleteGroup}
            />
          </div>
          <div className="min-h-[500px]">
            <ListGroups groups={groups} onClick={handleGroupListSelect} />
          </div>
          <div className="min-h-[500px]">
            <ListGroupsLoggers groupLoggers={loggersInGroup} />
          </div>
        </div>
      </div>
      {isModalAlertOpen && (
          <ModalAlert
            onClose={handleModalAlertClose}
            state={isModalAlertOpen}
            title="Cannot delete group!"
            text="The group is not empty. Please move loggers to another group then try again."
            type="red"
          />
        )};
        {isMovedLoggerModalOpen && (
          <ModalAlert
            onClose={handleMoveLoggerModalClose}
            state={isMovedLoggerModalOpen}
            title="Success"
            text="Your logger has been moved."
            type="green"
          />
        )};
    </>
  );
}
