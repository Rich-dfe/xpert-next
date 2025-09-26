import { useRef } from "react";
import licenseService from "@/app/service/licenseService";

export function useLicenseChecker() {

  const licensePeriods = useRef([]);

  //Get the licenses periods to check whether the date picker dates are valid
  const getLicensePeriods = async (loggerUid) => {
    try {
      const licenseData = await licenseService.fetchLicensePeriodsCombined(
        loggerUid
      );
      licensePeriods.current = licenseData.data;
      //console.log(licensePeriods);
    } catch (error) {
      console.log(error);
    }
  };

  const checkLicenseValid = (dateRange) => {
    //If there are no license periods allow all dates to be viewed
    if(licensePeriods.current.length === 0 || licensePeriods.current[0] == null){
        return true;
    }
    // Return the boolean value that .some() produces
    return licensePeriods.current.some((period) => {
      const licenseStartDate = period.startsunix * 1000;
      const licenseStopDate = period.endsunix * 1000;

      // This callback function returns true or false to the .some() method
      if (dateRange[0] >= licenseStartDate && dateRange[1] <= licenseStopDate) {
        return true; // Tells .some() to stop and return true
      }
      return false; // Tells .some() to continue checking the next period
    });
  };

  return { licensePeriods, getLicensePeriods, checkLicenseValid };
}

