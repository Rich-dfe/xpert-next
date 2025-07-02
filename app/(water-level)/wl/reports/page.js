'use client'

import { useState } from "react";
import ReportForm from "@/app/components/reports/reports-form";
import ReportsList from "@/app/components/reports/reports-list";
import { handleChildAction } from "@/app/service/reports/get-reports";
import { loggerTypeItems } from "@/app/config/select-menu-items.js";

const API_LOGGERS = loggerTypeItems();

const API_LOGGER_NAMES = [
    { value: '1', label: 'Water Level - 1234' },
    { value: '2', label: 'Water Level - 4567' },
    { value: '3', label: 'Water Level - 5678' },
  ];

const API_REPORTS = [
    { id: '1', loggerName: 'Water Level - 1234', rangeStart: "23-06-25", rangeEnd:"23-06-25" },
    { id: '2', loggerName: 'Water Level - 4567', rangeStart: "23-06-25", rangeEnd:"23-06-25" },
    { id: '3', loggerName: 'Water Level - 5678', rangeStart: "23-06-25", rangeEnd:"23-06-25" },
]

export default function WlReports() {

    const [parentMessage, setParentMessage] = useState('Parent initial message');

  /////// THIS IS JUST A BUNCH OF TEST CODE ///////////////////////////////////////
  // The 'handleChildAction' imported here is a Server Action.
  // We can pass it directly to ChildComponent.

  const handleActionFromChild = async (dataFromChild) => {
    setParentMessage('Processing action...');
    try {
      // Call the server action directly from the client component
      const result = await handleChildAction(dataFromChild);
      setParentMessage(`Server response: ${result.message}`);
      console.log('Server action successful:', result);
    } catch (error) {
      setParentMessage(`Error from server: ${error.message}`);
      console.error('Error calling server action:', error);
    }
  };
  ////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
    <p>{parentMessage}</p>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="min-h-[500px]">
            <ReportForm 
              //types={API_LOGGERS} //ONLY REQUIRED IF WE DECIDE TO CATER FOR ALL LOGGER TYPES IN ONE PLACE
              onChildAction={handleActionFromChild}
              loggers = {API_LOGGER_NAMES}
              />
          </div>
          <div className="min-h-[700px] col-span-2">
            <ReportsList reports={API_REPORTS} />
          </div>
          <div className="min-h-[500px]"></div>
        </div>
      </div>
    </>
  );
}
