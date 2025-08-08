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
      const response = await api.delete("/group");
      return response.data;
    }catch(error){
      console.log("Server response error", error);
    }
  }

};

export default groupsService;