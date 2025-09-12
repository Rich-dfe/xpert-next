import api from "./axiosInstance";

const settingsService = {

    fetchLoggerConfigSettings: async (loggerId) => {
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

  saveLoggerConfigSettings: async (settingsObj) => {
    try {
        console.log("IN SERVICE", settingsObj);
      const response = await api.patch("/settings/logger/config", {
        params: { settingsObj },
      });
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },

}

export default settingsService;