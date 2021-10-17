import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{
		user:{}
    },
	mutations:{
		setUser(state, user){
			state.user = user;
		}
	},
	actions:{
		
	}
	
})

export default store