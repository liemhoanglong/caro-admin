import callAPI from "./callAPI";

const userAPI = {
    profile: async() =>{
        return callAPI("GET", "admin/profile",null)
    },
    getAll: async () =>{
        return callAPI("GET", 'admin/get-all', null);
    },
    
    getProfile: async(id) =>{
        return callAPI("GET", `admin/get-profile?id=${id}`, null);
    },

    editProfile: async(data) =>{
        return callAPI("POST", `admin/edit-profile?id=${data.id}`, data);
    },
    
    blockUser: async(id) =>{
        return callAPI("GET", `admin/block?id=${id}`, null);
    },
}

export default userAPI;
