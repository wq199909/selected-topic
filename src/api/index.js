import axios from '@/axios.js'

var api = {
  getTopicList(params) {
    return axios.post('/api/getTopic.php', params)
  },
  getTeamList(params) {
    return axios.post('/api/getTeam.php', params)
  },
  login(params) {
    return axios.post('/api/login.php', params)
  },
  sendSuggests(params) {
    return axios.post('/api/sendSuggest.php', params)
  },
  createTeam(params) {
    return axios.post('/api/createTeam.php', params)
  },
  getGroupMsg(params){
    return axios.post('/api/getTeamMsg.php', params)
  }
}

export default api
