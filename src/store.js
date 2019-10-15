import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function getCookie(cookieName) {
  var cookieStr = unescape(document.cookie);
  var arr = cookieStr.split("; ")
  var cookieValue = "";
  for (var i = 0; i < arr.length; i++) {
    var temp = arr[i].split("=");
    if (temp[0] == cookieName) {
      cookieValue = temp[1];
      break;
    }
  }
  return cookieValue;
}

const state = {
  userName: getCookie('userName') || '',
  userId: getCookie('userId') || '',
  // userId: 'U201714626',
  passWord: getCookie('passWord') || '',
  topicList: [],
  user: {},
  log: true,
  init: null,
  isShow: false,
  myTopicList: [],
  teamMembers: []
}

const mutations = {
  changeName(state, name) {
    state.userName = name
  },
  changeLog(state) {
    state.log = !state.log
  }
}

const actions = {

}

const getters = {
  log: state => {
    return state.log
  },
  userId: state => {
    return state.userId
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
