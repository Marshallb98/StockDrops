import axios from "axios";

export default {

  getItems: function() {
    return axios.get("/api/items");
  },

  regUser: function(regUserData) {
    return axios.post("/api/user/register", regUserData, { withCredentials: false })
  },
  
  loginUser: function(loginUserData) {
    return axios.post("/api/user/login", loginUserData, { withCredentials: true })
  }
};
