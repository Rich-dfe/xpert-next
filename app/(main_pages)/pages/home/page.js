"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation"; 
import LoggerConfigForm from "@/app/components/config/Form-logger-config";
import SelectLoggersForm from "@/app/components/loggers/Select-loggers";
import MapBox from "@/app/components/loggers/Map-box";
import { useLoggers } from "@/app/store/user-loggers-context";
import loggersService from "@/app/service/loggersService";
import settingsService from "@/app/service/settingsService";
import { useModal } from "@/app/hooks/useModal";
import { useSettingsVersion } from "@/app/hooks/useSettingsVersion";
import ModalAlert from "@/app/components/Modal-alert";
import useAuditTrail from "@/app/hooks/useAudit";

export default function WlHome() {
  const searchParams = useSearchParams();
  const {isOpen,message,title,type,openModal,closeModal} = useModal();
  const {version,fetchSettingsVersion} = useSettingsVersion();
  
  const recordAction = useAuditTrail();
  const [loggerConfigData, setLoggerConfigData] = useState({
    x0000: null,
    x000E: null,
    x0013: null,
    x0018: null,
    x0060: null,
    timezone: null,
    logger_name: null,
    notes: null,
    site: null,
    group_name: null,
  });

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
    formattedLogDateTime: null,
    logDateTime: null,
  });

  const [isLoading, setIsLoading] = useState(false);

  //Get the loggers context
  const {
    selectedLogger,
    setSelectedLogger,
    isSelectedLogger,
    setIsSelectedLogger,
    selectedLoggerCategory,
    handleSetLoggerCategory,
    allLoggers,
    isLoading: isContextLoading,
  } = useLoggers();

  const API_LOGGERS = selectedLoggerCategory;

  useEffect(() => {
    // 1. Only run this if the context's main data fetching is complete
    if (!isContextLoading) { 
        
      // 2. Check if selectedLoggerCategory is empty (meaning state wasn't set by click)
      if (selectedLoggerCategory.length === 0 && allLoggers.length > 0) {
        
        // 3. Get the category ID from the URL (e.g., loggerType=18)
        const loggerType = searchParams.get('loggerType');
        
        if (loggerType) {
          //console.log(`Fallback: State was empty, setting category from URL: ${loggerType}`);
          // 4. Call the context setter function to load the correct array
          handleSetLoggerCategory(Number(loggerType));
        }
      }
    }
    // Dependencies: Rerun if context loading status or selected category status changes.
  }, [isContextLoading, selectedLoggerCategory.length, searchParams, allLoggers.length, handleSetLoggerCategory]);
  
  const handleSelectedLogger = async (selectLoggerId) => {
    setIsLoading(true);
    const selectedLoggerData = await loggersService.fetchGeneralLoggerInfo(
      selectLoggerId
    );
    //console.log('1 SERVICE DATA ON PAGE.JS',selectedLoggerData);
    //Set the context data
    setSelectedLogger(selectedLoggerData);
    setIsSelectedLogger(true);
    setIsLoading(false);
  };

  const handleLoggerConfigForm = async (configFormData) => {
    //Append the logger id to the settings object for the service request.
    configFormData.id = selectedLogger[0].id;
    const updateConfigSettings = await settingsService.saveLoggerConfigSettings(
      configFormData
    );
    console.log('CONFIG FORM SAVED',updateConfigSettings)
    openModal('Succcess!','Your logger config settings have been saved.','green');
    await fetchSettingsVersion(selectedLogger[0].id);
    //Record the action to the audit log
    recordAction('Logger Config',configFormData,selectedLogger[0].logger_uid);
  };

  useEffect(() => {
    async function diagnosticData() {
      try {
        const dxData = await loggersService.fetchLatestDiagnosticData(
          selectedLogger[0].logger_uid
        );
        //console.log('3. DX Data', dxData);
        setLatestDiagnosticData(dxData[0]);
      } catch (error) {
        console.log(error);
      }
    }
    //Attemp to get the dignostic data only if a logger has been selected.
    if (isSelectedLogger) {
      diagnosticData();
    }
  }, [selectedLogger]);

  useEffect(() => {
    async function configData() {
      const configData = await settingsService.fetchLoggerConfigSettings(
        selectedLogger[0].id
      );
      setLoggerConfigData(configData[0]);
      console.log("CONFIG DATA", configData);
      //This function is supplied by the useSettingsVersion hook.
      await fetchSettingsVersion(selectedLogger[0].id);
    }
    if (isSelectedLogger) {
      configData();
    }
  }, [selectedLogger]);
 
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
              isLoading={isLoading}
              settingsVersion={version}
            />
          </div>
          <div className="min-h-[500px]">
            <MapBox
              coords={[selectedLogger[0].lat, selectedLogger[0].lng]}
              id={selectedLogger[0].id}
              logger_name={selectedLogger[0].logger_name}
            />
          </div>
          <div className="min-h-[500px]">
            <LoggerConfigForm
              onSubmit={handleLoggerConfigForm}
              initialData={loggerConfigData}
            />
          </div>
          <ModalAlert onClose={closeModal} isOpen={isOpen} title={title} text={message} type={type}/>
        </div>
      </div>
      
    </>
  );
}