import api from "./axiosInstance";

const helperService = {

    updateServerSettingsVersion: async (loggerId) => {
    try {
      const response = await api.get("/settings/logger/config", {
        params: { loggerId: loggerId },
      });
      console.log("Service response", response);
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },

  updateAuditTrail: async(dataObj) =>{
    //update dynamodb audit trail table
    //Append new object to the currently saved object
  }

}

export default helperService;