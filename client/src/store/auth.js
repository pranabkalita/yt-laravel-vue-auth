import axios from 'axios'

export default {
  namespaced: true,

  state: {
    authenticated: false,
    user: null,
  },

  getters: {
    authenticated(state) {
      return state.authenticated
    },

    user(state) {
      return state.user
    },
  },

  mutations: {
    SET_AUTHENTICATED(state, value) {
      state.authenticated = value
    },

    SET_USER(state, value) {
      state.user = value
    },
  },

  actions: {
    async signOut({ dispatch }) {
      await axios.post('/logout')

      dispatch('me')
    },

    async signIn({ dispatch }, credentials) {
      await axios.get('/sanctum/csrf-cookie')

      await axios.post('/login', credentials)

      dispatch('me')
    },

    async signUp({ dispatch }, user) {
      await axios.get('/sanctum/csrf-cookie')

      await axios.post('/register', user)

      dispatch('me')
    },

    async me({ commit }) {
      try {
        const user = await axios.get('/api/user')

        commit('SET_AUTHENTICATED', true)
        commit('SET_USER', user.data)
      } catch (error) {
        commit('SET_AUTHENTICATED', false)
        commit('SET_USER', null)
      }
    },
  },
}
