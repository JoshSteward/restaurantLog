import axios from "axios";


  
//need to link to db 

export default {

    //get all logs from userslog 
    getUserLogs: function(email) {
        return axios.get("/api/logs/userId/${userId}")
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
        return axios.post("/api/logs/add_log", userLog);
    },

    
    // Get the saved a logs from the database
    //savedLogs: function () {
        //return axios.get("/api/logs").then(result => result.data);
    //}
};