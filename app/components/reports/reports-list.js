import FormCard from "@/app/components/Form-card";
import FormStrip from "@/app/components/Form-strip";
import ReportListItem from "@/app/components/reports/report-list-item";

const ReportsList = ({ reportsList }) => {
  console.log('REPORTS',reportsList);
  return (
    <>
      <FormCard>
        <FormStrip text="Available Downloads" />
        {reportsList.map((item) => {
          return (
            <ReportListItem
              key={item.Etag}
              fileName={item.Key}
              modified={item.LastModified}
            />
          );
        })};
      </FormCard>
    </>
  );
};

export default ReportsList;
