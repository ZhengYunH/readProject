import * as types from './mutation-types'
import api from '../fetch/api.js'

export const login = ({ commit }, {user}) => {
	api.post('users/login', user)
	    .then(res => {
	    	if(res.success)
	    	{
	    		let user = res.data.user
	    		commit(types.LOGIN, {user})
	    	}
	    })
}