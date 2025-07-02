import ReportCard from "./report-list-card";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const ReportListItem = ({ loggerName, rangeStart, rangeEnd }) => {
  return (
    <>
      <ReportCard>
        <div className="flex justify-items-start md:gap-30">
          <div className="flex flex-row gap-3">
            <div>
              <DocumentTextIcon className="size-6 text-blue-600 hover:text-blue-800" />
            </div>
            <div className="flex flex-wrap md:flex-none">
              Logger: {loggerName}
              <div className="flex flex-row md:ml-20">
                Range: {rangeStart}{" "}
                <ArrowRightIcon className="size-5 text-blue-800 mx-3 mt-1" />
                {rangeEnd}
              </div>
            </div>
          </div>
        </div>
      </ReportCard>
    </>
  );
};

export default ReportListItem;
