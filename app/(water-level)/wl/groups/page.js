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
  }, []);

  //Event Handlers
  const handleMoveLoggerToGroup = (groupId, loggerId) => {
    console.log("Moving Logger", loggerId, groupId);
    //set any state that needs to be updated and sent to the child component
    //This may require changing the dependency array on the useEffect function.
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
      console.log("Group can be deleted");
    }
    //const isGroupDeleted = groupsService.deleteGroup(groupId);
    //console.log('Delete Group', isGroupDeleted);
  };

  const handleModalAlertClose = () => {
      setIsModalAlertOpen(false);
    };

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
            <ListGroups groups={groups} />
          </div>
          <div className="min-h-[500px]">
            <ListGroupsLoggers groupLoggers={API_LOGGERS} />
          </div>
        </div>
      </div>
      {isModalAlertOpen && (
          <ModalAlert
            onClose={handleModalAlertClose}
            state={isModalAlertOpen}
            title="Cannot delete group!"
            text="The group is not empty. Please move loggers to another group then try again."
          />
        )}
    </>
  );
}
