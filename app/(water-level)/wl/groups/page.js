"use client";

import { useState, useEffect } from "react";
import GroupsForm from "@/app/components/groups/Form-groups";
import ListGroups from "@/app/components/groups/List-groups";
import ListGroupsLoggers from "@/app/components/groups/List-groups-loggers";
import { useLoggers } from "@/app/store/user-loggers-context";
import loggersService from "@/app/service/loggersService";
import groupsService from "@/app/service/groupsService";
import Spinner from "@/app/components/spinner";
import { useModal } from "@/app/hooks/useModal";
import ModalAlertHook from "@/app/components/Modal-alert-hook";

export default function WlGroups() {
  //Get the loggers context
  const [isLoading, setIsLoading] = useState();
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

  const {isOpen,message,title,type,openModal,closeModal} = useModal();
  const { waterLevelLoggers } = useLoggers();
  const API_LOGGERS = waterLevelLoggers;

  useEffect(() => {
    async function groupsData() {
      try {
        setIsLoading(true);
        const groupsData = await groupsService.fetchGroupsList(34);
        console.log("Groups Data", groupsData);
        setGroups(groupsData);
        //We need to set the selectedGroupId to a default value when the page is first loaded  
        setSelectedGroupId(groupsData[0].id);
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
          openModal('Succcess!','Your logger has been moved.','green');
        }
        //setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
  };

  const handleNewGroup = async (newGroupName) => {
    //iterate over the groups state variable to see if the name already exists
    for(let i=0; i< groups.length; i++){
      if(newGroupName.trim().toUpperCase() === groups[i].group_name.trim().toUpperCase()){
        openModal('Group Already Exists!','Each account must have a unique name.','red');
        return;
      }
    };

    const userId = groups[0].user_id;
    const customerId = groups[0].customer_id;
    
    const newGroupResponse = await groupsService.createNewGroup(newGroupName, userId, customerId);
    
    if(newGroupResponse.affectedRows === 1){
      const groupsData = await groupsService.fetchGroupsList(34);
      setGroups(groupsData);
    }
  };

  const handleDeleteGroup = async (groupId) => {
    //check for the home group as this cannot tbe deleted.
    for(let i=0; i< groups.length; i++){
      if(groups[i].id == groupId && groups[i].group_name == "Home"){
        openModal('Cannot Delete Home Group','This is the default system group for your account.','red');
        return;
      }
    };
    
    //Check for empty group before deleting.
    const groupContents = await loggersService.fetchLoggersByGroupId(groupId);
    if (groupContents.length > 0) {
      openModal('Cannot Delete Group','The group is not empty. Please move loggers to another group then try again.','red');
    } else {
      const deleteResult = await groupsService.deleteGroup(groupId);
      setIsGroupDelete(!isGroupDeleted);
    }
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
            <ListGroupsLoggers groupLoggers={loggersInGroup}/>
          </div>
        </div>
      </div>

      {/* //// Modal alerts //// */}
      <ModalAlertHook onClose={closeModal} isOpen={isOpen} title={title} text={message} type={type}/>
    </>
  );
}
