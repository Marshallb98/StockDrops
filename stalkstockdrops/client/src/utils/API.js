import axios from "axios";

export default {

  getItems: function() {
    return  axios.get("/api/items");
  },

  regUser: function(regUserData) {
    return axios.post("/api/users/register", regUserData, { withCredentials: true })
  },
  
  loginUser: function(loginUserData) {
    return axios.post("/api/users/login", loginUserData)
  },
}
