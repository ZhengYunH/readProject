import * as types from './mutation-types'
import api from '../fetch/api.js'

export default {
  [types.LOGIN] (state, user) {
    state.user = user
  },
  [types.LOGOUT] (state) {
    state.user = null
  },
  [types.CHANGE_TEXT](state,textTitle){
  	state.textTitle = textTitle;
  }
}
