import axios from '@/axios.js'

var api = {
  getTopicList(params) {
    return axios.post('/api/getTopic.php', params)
  },
  login(params) {
    return axios.post('/api/login.php', params)
  },
  sendSuggests(params) {
    return axios.post('/api/sendSuggest.php', params)
  }
}

export default api
