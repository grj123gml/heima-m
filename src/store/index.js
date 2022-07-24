import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, setToken } from '@/utils/auth'
import { getArtId, setArtId } from '@/utils/article'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 声明token
    user: getToken() || {},
    // 声明id
    ArtId: getArtId() || ''
  },
  mutations: {
    setUser (state, payload) {
      // 修改token
      state.user = payload
      setToken(payload)
    },
    // 修改文章id
    setId (state, id) {
      state.ArtId = id
      setArtId(id)
    }
  }
})
