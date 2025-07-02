import { useState } from "react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

const ViewLicensesCell = ({getValue, row, column, table}) => {
const items = getValue();
 const [isVisible, setIsVisible] = useState(false);

  const toggleVisibilty = () => {
    setIsVisible(!isVisible);
  };

    return(
        <>
        <div
        className="flex flex-row h-full w-full cursor-pointer hover:bg-gray-700 mr-3"
        onClick={toggleVisibilty}
      >
        {isVisible ? 'Hide' : 'Show'}
        <div className="mt-1">
        {isVisible ? <ChevronUpIcon className="size-4 text-gray-200"/> : <ChevronDownIcon className="size-4 text-gray-200"/>}
        </div>
      </div>
      {isVisible && (
        <ul>
            {items.map((item, index) =>(
                <li key={index}>{item[0]} to {item[1]}</li>
            ))}
            
        </ul>
      )}
        </>
    )
}

export default ViewLicensesCell;