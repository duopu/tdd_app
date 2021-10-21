import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/request.js';

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
    state:{
		// 用户信息
		user:{},
		// 申请承接方申请信息
		approveDetail:{},
    },
	mutations:{
		setUser(state, user){
			state.user = user;
		},
		setApproveDetail(state,detail){
			state.approveDetail = detail
		}
	},
	actions:{
		queryApproveDetail({commit, state}){
			http.post('/b/applyundertaker/queryApproveState').then(res=>{
				commit('setApproveDetail',res);
			})
		}
	}
	
})

export default store