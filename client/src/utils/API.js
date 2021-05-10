import axios from "axios";

//need to link to db 

export default {

    //get all logs from userslog 
    getUserLogs: function(email) {
        return axios.get("/api/logs/username/${username}")
    },

    // Deletes the log with the given id
    deleteLog: function (id) {
        return axios.delete("/api/logs/" + id).then(result => result.data);
    },


    // Saves the new log to the database
    saveLog: function (logData) {
        return axios.post("/api/logs", logData).then(result => result.data);
    },

    
    // Get the saved a logs from the database
    savedLogs: function () {
        return axios.get("/api/logs").then(result => result.data);
    }
};