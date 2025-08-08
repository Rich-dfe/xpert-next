import reports_api from "./axiosReportsInstance";

const reportsService = {

    fetchReportsList: async (uid) => {

      const body = {
        emailAddress: "geoff@xpert.nz"
      }

    try {
      const response = await reports_api.post("/list", body);
      //console.log('SERVICE RESPONSE',response.data);
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },

};

export default reportsService;