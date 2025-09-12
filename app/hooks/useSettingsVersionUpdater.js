import { useState, useEffect } from "react";

const useSettingsVersionUpdater = (num) => {
    
    const [version, setVersion] = useState(num);

    useEffect(() => {
    setVersion(num+1);
  }, []);
    
    return version;

}

export default useSettingsVersionUpdater;