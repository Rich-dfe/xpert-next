import { useState } from "react";
import helperService from "../service/helperService";

export function useSettingsVersion(){
    
    const [version, setVersion] = useState([{x002F: "-----", settingsVersionInUse:"-----"}]);

    const fetchSettingsVersion = async (loggerId) => {
      const settingsVersion = await helperService.fetchSettingsVersion(loggerId);
      setVersion(settingsVersion);
    };
    
    return{version,setVersion,fetchSettingsVersion};
}

