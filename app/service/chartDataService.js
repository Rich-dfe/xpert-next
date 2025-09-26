import api from "./axiosInstance";

const chartDataService = {

    //Water level primary data
    fetchWaterLevelChartData: async (loggerUid,from,to) => {
    const fromSeconds = Math.floor(from/1000);
    const toSeconds = Math.floor(to/1000);
    
    // console.log('START',fromSeconds);
    // console.log('END',toSeconds);
    // console.log('UID',loggerUid);


    try {
      const response = await api.get("/dynamodb/waterlevel", {
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
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  }

}

export default chartDataService;