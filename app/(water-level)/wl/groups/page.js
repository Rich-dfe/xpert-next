import GroupsForm from "@/app/components/groups/Form-groups";
import ListGroups from "@/app/components/groups/List-groups";
import ListGroupsLoggers from "@/app/components/groups/List-groups-loggers";

const API_LOGGERS = [
    { value: '1', label: 'Water Level 1' },
    { value: '2', label: 'Water Level 2' },
    { value: '3', label: 'Water Level 3' },
  ];

  const API_GROUPS = [
    { value: '1', label: 'Group 1' },
    { value: '2', label: 'Group 2' },
    { value: '3', label: 'Group 3' },
  ];



export default function WlGroups() {
  return (
    <>
      <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="min-h-[500px]"><GroupsForm loggers={API_LOGGERS} groups={API_GROUPS}/></div>
        <div className="min-h-[500px]"><ListGroups groups={API_GROUPS}/></div>
        <div className="min-h-[500px]"><ListGroupsLoggers groupLoggers={API_LOGGERS} /></div>
        </div>
    </div>
    </>
    </>
  );
}