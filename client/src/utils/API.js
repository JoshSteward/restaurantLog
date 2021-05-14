import axios from "axios";

const axiosInstance = axios.create({
    baseURL: window.location.host.includes('localhost') ? 'http://localhost:3001' : '',
    withCredentials: true
  })
  
  
//need to link to db 

export default {

    //get all logs from userslog 
    getUserLogs: function(email) {
        return axios.get("/api/logs/email/${email}")
    },

    //get single log
    singleLog: function(id) {
        return axios.get("/api/logs/"+id);
    },

    // Deletes the log with the given id
    deleteLog: function (id) {
        return axios.delete("/api/logs/" + id).then(result => result.data);
    },


    // Saves the new log to the database
    saveLog: function (userLog) {
        return axios.post("/api/logs", userLog);
    },

      // Check if user is logged in
    userLoggedIn: function() {
    return axiosInstance({
      method: 'get',
      url: "/api/user/logged-in",
    })
  },

    
    // Get the saved a logs from the database
    //savedLogs: function () {
        //return axios.get("/api/logs").then(result => result.data);
    //}
};