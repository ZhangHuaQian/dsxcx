import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getID, setID, removeID } from '@/utils/auth'
import { resetRouter } from '@/router'
import logo from '@/assets/logo.png'

const state = {
  token: getToken(),
  id: getID(),
  name: '',
  avatar: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { loginname, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ loginname: loginname.trim(), password: password }).then(response => {
        if (response.data.status === '0') {
          reject(response.data.msg)
        }
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        if (!data || data.status !== '1') {
          reject('登录信息失去时效,请重新登录!')
        }
        data.user.roles = []
        data.user.roles.push(data.user.usertype)
        const { roles, name } = data.user
        const avatar = logo
        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('角色权限为空，请联系管理员!')
        }
        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        resolve(data.user)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
