import callAPI from "./callAPI";

const gameAPI = {
    getAll: async () =>{
        return callAPI("GET", 'get-list-room', null);
    },
    
    getOne: async(id) =>{
        return callAPI("GET", `get-room?id=${id}`, null);
    },
}

export default gameAPI;
