
const debug = true;
export default {
	baseUrl:debug ? 'http://150.158.41.165:8080' : 'https://ttuodi.com',
	// 微信id
	appId: debug ? 'wxa191a75756adc164': 'wxed5f92cfcafbc8c1' ,
	// 本地存储的key值
	storageKeys:{
		// 登录用户的信息
		loginUserKey: debug ? 'storageLoginUserKey_test' : 'storageLoginUserKey',
		// 保存申请信息
		applyInfoStorage:'applyInfoStorage',
		// 保存邀请信息
		inviteInfoStorage:'inviteInfoStorage',
		// 当前协议版本号保存
		agreementVersionStorage:'agreementVersionStorage'
	}
}