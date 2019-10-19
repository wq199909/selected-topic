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
  getGroupMsg(params) {
    return axios.post('/api/getTeamMsg.php', params)
  },
  isEncryption(params) {
    return axios.post('/api/isEncryption.php', params);
  },
  addTeam(params) {
    return axios.post('/api/addTeam.php', params)
  },
  chooseTopic(params) {
    return axios.post('/api/chooseTopic.php', params)
  },
  getAdvice(params) {
    return axios.post('api/getAdvice.php', params)
  },
  deleteTopic(params) {
    return axios.post('api/deleteTopic.php', params)
  },
  deleteAdvice(params) {
    return axios.post('api/deleteAdvice.php', params)
  },
  deleteTeam(params) {
    return axios.post('api/deleteTeam.php', params)
  },
  destroyTeam(params) {
    return axios.post('api/destroyTeam.php', params)
  },
  quitTeam(params) {
    return axios.post('api/quitTeam.php', params)
  },
  addTopic(params) {
    return axios.post('api/addTopic.php', params)
  },
  cancelTopic(params) {
    return axios.post('api/cancelTopic.php', params)
  },
  sort(params) {
    return axios.post('api/sort.php', params)
  },
  setLuckyNum(params) {
    return axios.post('api/setLuckyNum', params)
  },
  cleanTopic(params) {
    return axios.post('api/cleanTopic.php', params)
  },
  cleanTeam(params) {
    return axios.post('api/cleanTeam.php', params)
  },
  cleanAdvice(params) {
    return axios.post('api/cleanAdvice.php', params)
  },
  setEndTime(params) {
    return axios.post('api/setEndTime.php', params)
  }
}

export default api
