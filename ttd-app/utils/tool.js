import config from "./config.js"

const showToastMessage = (title,icon,callback)=>{
	const duration = 1500;
	uni.showToast({
		title:title,
		icon,
		duration,
	})
	if(callback){
		setTimeout(()=>{
			callback();
		},duration)
	}
}

// 普通提示 title：提示文字   callback：提示消失的时候回调
const showToast = (title,callback)=>{
	showToastMessage(title,'none',callback);
}
// 成功提示 title：提示文字   callback：提示消失的时候回调
const showSuccess = (title,callback)=>{
	showToastMessage(title,'success',callback);
}

const login = (user)=>{
	
	// 本地保存
	uni.setStorage({
		key: config.storageKeys.loginUserKey,
		data: user
	});
	// 内存保存
	getApp().globalData.user = user;
	
	// 跳转用户首页页面
	uni.reLaunch({
		url: '/pages-user/index/index/index'
	}); 
}

const logout = ()=>{
	getApp().globalData.user = {};
	
	uni.removeStorage({
		key:config.storageKeys.loginUserKey,
	})
	uni.reLaunch({
		url:'/pages/login/login'
	})
}

export default {
	showToast,
	showSuccess,
	logout,
	login,
}