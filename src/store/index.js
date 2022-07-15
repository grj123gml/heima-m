import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 声明token
    user: getToken() || {}
  },
  mutations: {
    setUser (state, payload) {
      // 修改token
      state.user = payload
      setToken(payload)
    }
  }
})
