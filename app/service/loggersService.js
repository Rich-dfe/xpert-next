import api from "./axiosInstance";
import { formatDiagnotsicData } from "@/app/utils.js/formatters/formatDiagnosticData";
import { unixTimestampToHuman } from "../utils.js/formatters/formatDate";

const loggersService = {

  fetchLoggersByTypeByUserId: async (userId, typeId) => {
    try {
      const response = await api.get("/user/loggers/type", {
        params: { userId: userId, typeId: typeId },
      });
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },

  fetchLoggersByUserId: async (uid) => {
    try {
      const response = await api.get("/user/loggers", {
        params: { userId: uid },
      });
      //console.log('SERVICE RESPONSE',response.data);
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },

  fetchLoggersByGroupId: async (groupId, userId) => {
    try {
      const response = await api.get("/group/loggers",{
          params: {
            groupId: groupId,
            userId: userId,
          },
        }
      );
      return response.data;
    } catch (error) {
      //await signOut();
    }
  },

  fetchGeneralLoggerInfo: async (loggerId) => {
    try {
      const response = await api.get("/logger",
        {
          params: {
            loggerId: loggerId,
          },
        }
      );
      console.log('SERVICE LOGGER DATA 🆗', response);
      return response.data;
    } catch (error) {
      throw new Error('Could not fetch logger info - service 63')
    }
  },

  fetchLatestDiagnosticData: async(uid) => {
    try {
      const response = await api.get("/dynamodb/diagnostic", {
        params: { uidDecimal: uid },
      });
      //console.log('SERVICE DIAGNOSTIC DATA 👍', response.data[0]);
      // console.log('2 ',response.data[0].logDateTime);
      // console.log('3 ',unixTimestampToHuman(response.data[0].logDateTime));
      response.data[0].formattedLogDateTime = unixTimestampToHuman(response.data[0].logDateTime);
      const formattedDxData = formatDiagnotsicData(response.data[0].diagnostics);
      response.data[0].diagnostics = formattedDxData;
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },

  fetchUserCalibrationData: async(logger_id,logger_type)=>{
    try{
        const response = await api.get("/settings/user/cal", {
        params: { lid: logger_id, type: logger_type },
      });
      return response.data
    }catch(error){
      throw new Error('Could not fetch user calibration data - service 93', error)
    }
  }
};

export default loggersService;