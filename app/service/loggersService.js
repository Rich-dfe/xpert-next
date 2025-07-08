import api from "./axiosInstance";

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

  fetchLoggersByGroupId: async (groupId) => {
    try {
      const response = await api.get(
        import.meta.env.VITE_GROUP_LOGGERS_BASE,
        {
          params: {
            groupId: groupInfo.value.id,
            userId: groupInfo.value.user_id,
          },
        }
      );
      loggers.value = response.data;
    } catch (error) {
      //await signOut();
    }
  },
};

export default loggersService;