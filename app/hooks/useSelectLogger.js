import loggersService from "@/app/service/loggersService";
import { useLoggers } from "@/app/store/user-loggers-context";
import { useState } from "react";

export function useSelectLogger(){

    const [isLoading, setIsLoading] = useState(false);
    //Get the loggers context
      const {
        setSelectedLogger,
        setIsSelectedLogger,
      } = useLoggers();

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
    
    return{handleSelectedLogger, isLoading, setIsLoading};
}