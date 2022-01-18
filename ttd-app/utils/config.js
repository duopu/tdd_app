
const debug = true;
export default {
	baseUrl:debug ? 'http://150.158.41.165:8080' : 'https://api.ttuodi.com',
	// 微信id
	appId: 'wxed5f92cfcafbc8c1' ,
	// 本地存储的key值
	storageKeys:{
		// 登录用户的信息
		loginUserKey: debug ? 'storageLoginUserKey_test' : 'storageLoginUserKey',
		// 保存申请信息
		applyInfoStorage:'applyInfoStorage',
		// 保存邀请信息
		inviteInfoStorage:'inviteInfoStorage',
		// 当前协议版本号保存
		agreementVersionStorage:'agreementVersionStorage',
	},
	// 非对称加密公钥
	rsaPublicKey:'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcwCya/V+LzWLaiYlb2ld5dorjlSOsCvY2kWXbJzzFyPH+R8D+aFvDzR98XOGc3R5wTtkwcR9ZqLSwRmM5MfSoDE3YRrZvA3HaGFaxsi1BR4qALd5BFfHL5k00aZ2a27PHe7TgPFlc+taSVDL8G5PaKP8/2xqyf++X6SxPnus+SQIDAQAB'
}