import FormCard from "../Form-card";
import FormStrip from "../Form-strip";
import InfoCard from "../Info-card";
import { useState } from "react";

function ListGroupsLoggers({groupLoggers}) {
  //console.log("groupLoggersList",groupLoggers);
  return (
    <>
      <FormCard>
        <FormStrip text="Loggers belonging to group" />
        <InfoCard>
          <div> 
          <p className="underline decoration-solid font-semibold">
            {/* Renders a number when the page is either first loaded, the groupLoggers array is empty or the array contains elements */}
            Total {groupLoggers.length === 0 ? 0 : groupLoggers[0].id === -1 ? 0 : groupLoggers.length} loggers
          </p>
          </div>
          <ul>
            {groupLoggers.map((groupLogger) => {
              return (
                <li key={groupLogger.id} className="justify-content-center">
                  {groupLogger.logger_name}
                </li>
              );
            })}
          </ul>
        </InfoCard>
      </FormCard>
    </>
  );
}

export default ListGroupsLoggers;
