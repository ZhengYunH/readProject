import * as types from './mutation-types'

export default {
  [types.LOGIN] (state, {user}) {
    localStorage.setItem('user', JSON.stringify(user))
    state.user = user
  },
  [types.LOGOUT] (state) {
    state.user = null
    localStorage.removeItem('user')
  },
}
