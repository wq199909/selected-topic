import axios from '@/axios.js'

var api = {
  getTopicList() {
    return axios.get('/api/topicList.json')
  },
  login(params) {
    return axios.post('/api/login.php', params)
  }
}

export default api
