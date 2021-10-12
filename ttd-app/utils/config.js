
const debug = true
export default {
	
	baseUrl:debug ? '/api' : 'http://education.sinfinite.cn',
	
	// 本地存储的key值
	storageKeys:{
		// 登录用户的信息
		loginUserKey:'storageLoginUserKey',
		// 历史搜索
		historySearchKey:'storageHistorySearchKey'
	}
}