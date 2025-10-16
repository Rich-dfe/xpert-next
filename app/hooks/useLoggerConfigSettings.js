import settingsService from "@/app/service/settingsService";
import { useLoggers } from "@/app/store/user-loggers-context";
import { useModal } from "@/app/hooks/useModal";
import { useState,useEffect } from "react";
import { useSettingsVersion } from "@/app/hooks/useSettingsVersion";

export function useLoggerConfigSettings() {
  const { selectedLogger, isSelectedLogger } = useLoggers();
  const {isOpen,message,title,type,openModal,closeModal} = useModal();
  const {version,fetchSettingsVersion} = useSettingsVersion();

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

  const handleLoggerConfigForm = async (configFormData) => {
    //Append the logger id to the settings object for the service request.
    configFormData.id = selectedLogger[0].id;
    const updateConfigSettings = await settingsService.saveLoggerConfigSettings(
      configFormData
    );
    console.log("CONFIG FORM SAVED", updateConfigSettings);
    openModal(
      "Succcess!",
      "Your logger config settings have been saved.",
      "green"
    );
    await fetchSettingsVersion(selectedLogger[0].id);
    //Record the action to the audit log
    recordAction("Logger Config", configFormData, selectedLogger[0].logger_uid);
  };

  useEffect(() => {
    async function fetchConfigData() {
      const configData = await settingsService.fetchLoggerConfigSettings(
        selectedLogger[0].id
      );
      setLoggerConfigData(configData[0]);
      console.log("CONFIG DATA", configData);
      //This function is supplied by the useSettingsVersion hook.
      await fetchSettingsVersion(selectedLogger[0].id);
    }
    if (isSelectedLogger) {
      fetchConfigData();
    }
  }, [selectedLogger]);

  return { handleLoggerConfigForm, isOpen, message, title, type, closeModal, loggerConfigData, version };
}
