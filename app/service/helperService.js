import api from "./axiosInstance";

const helperService = {

    fetchSettingsVersion: async (loggerId) => {
    try {
      const response = await api.get("/settings/version", {
        params: { loggerId: loggerId },
      });
      return response.data;
    } catch (error) {
      console.error("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },

  updateSettingsVersion: async (loggerId) => {
    try{
      const response = await api.patch("settings/version",{
        loggerId: loggerId
      });
      //console.log("UPDATE RESULT",response);
      return response;
      
    }catch(error){
      console.error('Cannot update settings version');
    }
  },

  updateAuditTrail: async (action,auditData) =>{
    console.log('Updating Audit with',action,auditData)
    try{
      const response = await api.post("audit",{
        auditData: auditData
      });
      console.log("AUDIT RESULT",response);
      return response;
      
    }catch(error){
      console.error('Cannot update settings version');
    }
  }

}

export default helperService;