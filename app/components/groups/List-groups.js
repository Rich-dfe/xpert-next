'use client'

import FormCard from "../Form-card";
import FormStrip from "../Form-strip";

const handleItemClick = (clickedItem) =>{
    alert(JSON.stringify(clickedItem));
}

function ListGroups(props) {
  return (
    <>
      <FormCard>
        <FormStrip text="My Groups" />
          <ul>
            {props.groups.map((group) => {
              return <li key={group.value} className="flex items-center justify-center p-2 my-2
                rounded-md cursor-pointer bg-gray-400 hover:bg-green-300" onClick={() => handleItemClick(group)}>{group.label}</li>;
            })}
          </ul>
      </FormCard>
    </>
  );
}

export default ListGroups;
