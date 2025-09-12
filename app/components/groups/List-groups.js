"use client";

import { useState } from "react";
import FormCard from "../Form-card";
import FormStrip from "../Form-strip";

function ListGroups({ groups, onClick }) {
  const [activeListElement, setActiveListElement] = useState(null);

  const handleClick = (group) => {
    onClick(group);
    setActiveListElement(group.id);
  };
  return (
    <>
      <FormCard>
        <FormStrip text="My Groups" />
        <ul>
          {groups.map((group) => {
            return (
              <li
                key={group.id}
                className={`flex items-center justify-center px-4 py-2 my-1 font-semibold rounded ${
                  activeListElement === group.id
                    ? "bg-green-300 scale-98 transition duration-300"
                    : "bg-gray-400 hover:bg-green-300"
                }`}
                onClick={() => handleClick(group)}
              >
                {group.group_name}
              </li>
            );
          })}
        </ul>
      </FormCard>
    </>
  );
}

export default ListGroups;
