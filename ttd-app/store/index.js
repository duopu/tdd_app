import Vue from 'vue'
import Vuex from 'vuex'
import http from '../utils/request.js';
import config from '../utils/config.js';

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: {
		// 用户信息
		user: {},
		// token信息
		token:'',
		// 申请承接方申请信息
		approveDetail: {},
		// 实名认证信息
		authentication: {},
	},
	mutations: {
		setUser(state, user) {
			state.user = user;
		},
		setToken(state,token){
			state.token = token;
		},
		setApproveDetail(state, detail) {
			state.approveDetail = detail
		},
		setAuthentication(state, authentication) {
			state.authentication = authentication;
		}
	},
	actions: {
		// 查询审核信息
		queryApproveDetail({
			commit,
			state
		}) {
			http.post('/b/applyundertaker/queryApproveDetail').then(res => {
				commit('setApproveDetail', res);
			})
		},
		// 查询实名认证信息
		queryAuthenticationInfo({
			commit,
			state
		}) {
			http.post('/b/customerrealauth/query').then(res => {
				commit('setAuthentication', res);
			})
		},
		// 查询用户信息
		queryUserInfo({
			commit,
			state
		}) {
			http.post('/b/customer/query').then(res => {
				const user = { 
					...state.user,
					...res,
					token:state.user.token,
				}
				commit('setUser', user);
				
				// 本地保存
				uni.setStorage({
					key: config.storageKeys.loginUserKey,
					data: user
				});
			})
		}
	}

})

export default store
