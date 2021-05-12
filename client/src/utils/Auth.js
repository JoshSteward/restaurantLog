import axios from "axios";

export default {
    getUser: function() {
        return axios.get('authenticate/user');
    },

    logout: function() {
        console.log('logout');
        return axios.post('/api/user/logout');
    },

    login: function(email, password) {
        return axios.post('api/user/login', { email, password });
    },

    signup: function(userData) {
        return axios.post('api/user/authenticate/signup', userData);
    }
};