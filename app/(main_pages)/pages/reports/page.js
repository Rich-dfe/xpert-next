"use client";

import { useState, useEffect } from "react";
import ReportForm from "@/app/components/reports/reports-form";
import ReportsList from "@/app/components/reports/reports-list";
import { useLoggers } from "@/app/store/user-loggers-context";
import reportsService from "@/app/service/reportsService";
import Spinner from "@/app/components/spinner";

export default function WlReports() {
  //Get the loggers context
  const { waterLevelLoggers } = useLoggers();

  const API_LOGGERS = waterLevelLoggers;
  console.log("LOGGERS REPORTS", API_LOGGERS);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reportsList, setReportsList] = useState([
    {
      ETag: "1",
      Key: "Loading...",
      LastModified: null,
    },
  ]);

  /////// THIS IS JUST A BUNCH OF TEST CODE ///////////////////////////////////////
  // The 'handleChildAction' imported here is a Server Action.
  // We can pass it directly to ChildComponent.

  //const handleReportsForm = async (selectLoggerId) => {
  const handleReportsFormData = (reportsFormData) => {
    //SEND REQUEST HERE WITH THE reportsFormData Object
    console.log("PARENT FORM DATA", reportsFormData);

    //Set a setIsProcessing(true) and send as prop to the reports form to display a processing message

    //AWAIT THE RESULT and send the new report entry to the reports list
  };
  ////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    async function reportListData() {
      try {
        setIsLoading(true);
        const listData = await reportsService.fetchReportsList();
        console.log("3. Report Data", listData);
        setReportsList(listData);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    reportListData();
  }, []);

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="min-h-[500px]">
            <ReportForm
              //types={API_LOGGERS} //ONLY REQUIRED IF WE DECIDE TO CATER FOR ALL LOGGER TYPES IN ONE PLACE
              onSubmit={handleReportsFormData}
              loggers={API_LOGGERS}
            />
          </div>
          <div className="min-h-[700px] col-span-2">
              <ReportsList reportsList={reportsList} />
          </div>
          <div className="min-h-[500px]"></div>
        </div>
      </div>
    </>
  );
}
