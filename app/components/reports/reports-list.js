import FormCard from "@/app/components/Form-card";
import FormStrip from "@/app/components/Form-strip";
import ReportListItem from "@/app/components/reports/report-list-item";

const ReportsList = ({ reports }) => {
  return (
    <>
      <FormCard>
        <FormStrip text="Available Downloads" />
        {reports.map((item) => {
          return (
            <ReportListItem
              key={item.id}
              loggerName={item.loggerName}
              rangeStart={item.rangeStart}
              rangeEnd={item.rangeEnd}
            />
          );
        })};
      </FormCard>
    </>
  );
};

export default ReportsList;
