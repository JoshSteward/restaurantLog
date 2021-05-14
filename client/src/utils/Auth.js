import axios from "axios";

const axiosInstance = axios.create({
    baseURL: window.location.host.includes('localhost') ? 'http://localhost:3001' : '',
    withCredentials: true
  });
  
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
        return axios.post('api/user/signup', userData);
    },

    // Check if user is logged in
    userLoggedIn: function() {
    return axiosInstance({
      method: 'get',
      url: "/api/user/logged-in",
    })
  },
    
};