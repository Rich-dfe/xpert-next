import api from "./axiosInstance";

const chartDataService = {
    
    fetchChartData: async (loggerUid,from,to,loggerType,calData) => {
    var  apiEndpoint = "";

    if (loggerType <= 7) {
      apiEndpoint = "/dynamodb/waterlevel";
    }else if(loggerType == 18){
      apiEndpoint = "/dynamodb/par";
    }

    const fromSeconds = Math.floor(from/1000);
    const toSeconds = Math.floor(to/1000);
    
    //console.log('START',fromSeconds);
    // console.log('END',toSeconds);
    // console.log('UID',loggerUid);
    try {
      const response = await api.post(apiEndpoint,calData, {
        params: { 
            uid: loggerUid, 
            from: fromSeconds,
            to: toSeconds
        },
      });

      console.log("Service response", response);
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
      
    }
  },

  fetchChartDiagnosticData: async (loggerUid,from,to) => {

    const fromSeconds = Math.floor(from/1000);
    const toSeconds = Math.floor(to/1000);

    try {
      const response = await api.get("dynamodb/diagnostic", {
        params: { 
            uid: loggerUid, 
            from: fromSeconds,
            to: toSeconds
        },
      });

      console.log("Diagnostic Service response", response);
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
    }

  }

    //Water level primary data
  //   fetchWaterLevelChartData: async (loggerUid,from,to) => {
  //   const fromSeconds = Math.floor(from/1000);
  //   const toSeconds = Math.floor(to/1000);
  //   try {
  //     const response = await api.get("/dynamodb/waterlevel", {
  //       params: { 
  //           uid: loggerUid, 
  //           from: fromSeconds,
  //           to: toSeconds
  //       },
  //     });
  //     console.log("Service response", response);
  //     return response.data;
  //   } catch (error) {
  //     console.log("Server response error", error);
  //   }
  // }

}

export default chartDataService;