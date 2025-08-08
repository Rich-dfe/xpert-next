'use client'

import FormCard from "../Form-card";
import FormStrip from "../Form-strip";

const handleItemClick = (clickedItem) =>{
    alert(JSON.stringify(clickedItem));
}

function ListGroups({groups}) {
  console.log('LIST GROUPS',groups);
  return (
    <>
      <FormCard>
        <FormStrip text="My Groups" />
          <ul>
            {groups.map((group) => {
              return <li key={group.id} className="flex items-center justify-center p-2 my-2
                rounded-md cursor-pointer bg-gray-400 hover:bg-green-300 active:bg-green-300 active:scale-98 transition duration-300 font-semibold" onClick={() => handleItemClick(group)}>{group.group_name}</li>;
            })}
          </ul>
      </FormCard>
    </>
  );
}

export default ListGroups;
