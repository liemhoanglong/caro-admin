import axios from "axios"
// const URL_API = "http://localhost:3000/";
const URL_API = "https://admin-carogame-backend.herokuapp.com/";

const callAPI = async (method, pathUrl, body) => {
    const token = await JSON.parse(localStorage.getItem('admin'));
    return axios({
        method: method,
        url: URL_API + pathUrl,
        data: body,
        headers: {"Authorization" : `Bearer ${token? token.accessToken: "null"}`}
    });

}

export default callAPI;