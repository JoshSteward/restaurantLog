import axios from "axios";
const url = "http://localhost:3000";

const authenticateAPI = {
  authenticated: function() {
    return axios.get(url + "/api/user/authenticate", {withCredentials: true});
  },
};

export default authenticateAPI;