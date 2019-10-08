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
  userName: getCookie('userName') || ''
}

const mutations = {
  changeName(state, name) {
    state.userName = name
  }
}

const actions = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
