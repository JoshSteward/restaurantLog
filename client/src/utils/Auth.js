import axios from "axios";

export default {
    getUser: function() {
        return axios.get('authentication/user');
    },

    logout: function() {
        console.log('logout');
        return axios.post('/authentication/logout');
    },

    login: function(email, password) {
        return axios.post('authentication/login', { email, password });
    },

    singup: function(userData) {
        return axios.post('authentication/signup', userData);
    }
};