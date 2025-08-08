import ReportCard from "./report-list-card";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

const ReportListItem = ({ fileName, modified }) => {
  const baseUrl = "https://clientreportsprocessed.s3.ap-southeast-2.amazonaws.com/"
  const slug = fileName;
  const fullUrl = `${baseUrl}${slug}`;

  return (
    <>
      <ReportCard>
      <a href={fullUrl}>
        <div className="flex justify-items-start md:gap-30">
          <div className="flex flex-row gap-3">
            <div>
              <DocumentTextIcon className="size-6 text-blue-600 hover:text-blue-800" />
            </div>
            <div className="flex flex-wrap md:flex-none">
              Logger: {fileName}
              <div className="flex flex-row md:ml-20">
                Created: {modified}
              </div>
            </div>
          </div>
        </div>
        </a>
        {/* return '<a href="https://clientreportsprocessed.s3.ap-southeast-2.amazonaws.com/'+data+'">'+data+'</a>'; */}
      </ReportCard>
    </>
  );
};

export default ReportListItem;
