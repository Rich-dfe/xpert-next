import FormCard from "../Form-card";
import FormStrip from "../Form-strip";
import InfoCard from "../Info-card";

function ListGroupsLoggers(props) {
  return (
    <>
      <FormCard>
        <FormStrip text="Loggers belonging to group" />
        <InfoCard>
          <ul>
            {/* {props.groupLoggers.map((groupLogger) => {
              return (
                <li key={groupLogger.value} className="justify-content-center">
                  {groupLogger.label}
                </li>
              );
            })} */}
            {"A logger"}
          </ul>
        </InfoCard>
      </FormCard>
    </>
  );
}

export default ListGroupsLoggers;
