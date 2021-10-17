
const debug = true
export default {
	
	baseUrl:debug ? 'http://139.196.182.247:8080' : 'https://ttuodi.com',
	// 微信id
	appId:'wxed5f92cfcafbc8c1',
	// 本地存储的key值
	storageKeys:{
		// 登录用户的信息
		loginUserKey:'storageLoginUserKey',
		// 历史搜索
		historySearchKey:'storageHistorySearchKey'
	}
}