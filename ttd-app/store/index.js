import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/request.js';

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		// 用户信息
		user: {},
		// 申请承接方申请信息
		approveDetail: {},
		// 实名认证信息
		authentication: {},
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setApproveDetail(state, detail) {
			state.approveDetail = detail
		},
		setAuthentication(state, authentication) {
			state.authentication = authentication;
		}
	},
	actions: {
		queryApproveDetail({
			commit,
			state
		}) {
			http.post('/b/applyundertaker/queryApproveDetail').then(res => {
				commit('setApproveDetail', res);
			})
		},
		queryAuthenticationInfo({
			commit,
			state
		}) {
			http.post('/b/customerrealauth/query').then(res => {
				commit('setAuthentication', res);
			})
		}
	}

})

export default store
