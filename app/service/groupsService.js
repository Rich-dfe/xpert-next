import api from "./axiosInstance";

const groupsService = {

    fetchGroupsList: async (uid) => {
    try {
      const response = await api.get("/user/groups", {
        params: { userId: uid }
      });
      //console.log('SERVICE RESPONSE',response.data);
      return response.data;
    } catch (error) {
      console.log("Server response error", error);
      //alert('fetchLoggersByUserId: '+error);
      //await signOut();
    }
  },

  deleteGroup: async (gid) =>{
    try{
      const response = await api.delete("/group",{
        params:{ groupId: gid }
      });
      return response.data;
    }catch(error){
      console.log("Server response error", error);
    }
  },

  updateLoggerGroup: async (gid, lid) => {
    try{
      const response = await api.patch("/group",
        { groupId: gid, loggerId: lid }
      );
      return response.data;
    }catch(error){
      console.log("Server response error", error);
    }
  },

  createNewGroup: async (newName, userId, customerId) =>{
    try{
      const response = await api.post("/group",
        { name: newName, userId: userId, customerId: customerId }
      );
      return response.data;
    }catch(error){
      console.log("Server response error", error);
    }
  }

};

export default groupsService;