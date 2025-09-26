import api from "./axiosInstance";

const licenseService = {

    //Gets a list of licenses with combined dates if the periods are concurrent
    fetchLicensePeriodsCombined: async (loggerUid) => {
    try {
      const response = await api.get("/licenses/logger/picker", {
        params: { loggerUid: loggerUid },
      });
      return response.data;
    } catch (error) {
      console.error("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },
}

export default licenseService;