"use client";
import { useState, useEffect } from "react";
import LoggerConfigForm from "@/app/components/config/Form-logger-config";
import SelectLoggersForm from "@/app/components/loggers/Select-loggers";
import MapBox from "@/app/components/loggers/Map-box";
import { useLoggers } from "@/app/store/user-loggers-context";
import loggersService from "@/app/service/loggersService";

export default function WlHome() {
  const [latestDiagnosticData, setLatestDiagnosticData] = useState({
    createdAt: null,
    ttlDate: null,
    loggerUid: 0,
    diagnostics: [
      {
        batteryVoltage: null,
        daysRemaining: null,
        rssi: null,
        resets: null,
        statusFlags: null,
        settingsVersion: null,
      },
    ],
    formattedLogDateTime:null,
    logDateTime: null,
  });
  
  //Get the loggers context
  const { waterLevelLoggers, selectedLogger, setSelectedLogger, isSelectedLogger, setIsSelectedLogger } = useLoggers();

  const API_LOGGERS = waterLevelLoggers;
 
  const handleSelectedLogger = async (selectLoggerId) => {
    const selectedLoggerData = await loggersService.fetchGeneralLoggerInfo(selectLoggerId);
    //console.log('1 SERVICE DATA ON PAGE.JS',selectedLoggerData);
    //Set the context data
    setSelectedLogger(selectedLoggerData);
    setIsSelectedLogger(true);
  };

  const handleLoggerConfigForm = (configFormData) =>{
    console.log('HANDLING CONFIG FORM', configFormData);
  }

    useEffect(() => {
      async function diagnosticData(){
        try{
          const dxData = await loggersService.fetchLatestDiagnosticData(selectedLogger[0].logger_uid);
          //console.log('3. DX Data', dxData);
          setLatestDiagnosticData(dxData[0]);
        }catch(error){
          console.log(error);
        }
      }
      //Attemp to get the dignostic data only if a logger has been selected.
      if(isSelectedLogger){
      diagnosticData();
      }
    },[selectedLogger])

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <div className="min-h-[500px]">
            <SelectLoggersForm
              loggers={API_LOGGERS}
              onSelectChange={handleSelectedLogger}
              latestDiagnosticData={latestDiagnosticData}
              model={selectedLogger[0].model}
              isSelectedLogger={isSelectedLogger}
              selectedLogger={selectedLogger}
            />
          </div>
          <div className="min-h-[500px]">
            <MapBox coords={[selectedLogger[0].lat, selectedLogger[0].lng]} id={selectedLogger[0].id} logger_name={selectedLogger[0].logger_name}/>
          </div>
          <div className="min-h-[500px]">
            <LoggerConfigForm onSubmit={handleLoggerConfigForm} initialData={selectedLogger[0]}/>
          </div>
        </div>
      </div>
    </>
  );
}
