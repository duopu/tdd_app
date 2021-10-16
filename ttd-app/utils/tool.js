import config from "./config.js"

const showToastMessage = (title, icon, callback) => {
	const duration = 1500;
	uni.showToast({
		title: title,
		icon,
		duration,
	})
	if (callback) {
		setTimeout(() => {
			callback();
		}, duration)
	}
}

// 普通提示 title：提示文字   callback：提示消失的时候回调
const showToast = (title, callback) => {
	showToastMessage(title, 'none', callback);
}
// 成功提示 title：提示文字   callback：提示消失的时候回调
const showSuccess = (title, callback) => {
	showToastMessage(title, 'success', callback);
}

// 登录 保存数据
const login = (user) => {

	// 本地保存
	uni.setStorage({
		key: config.storageKeys.loginUserKey,
		data: user
	});
	// 内存保存
	getApp().globalData.user = user;
}

// 登出
const logout = () => {
	getApp().globalData.user = {};

	uni.removeStorage({
		key: config.storageKeys.loginUserKey,
	})
}

// 显示弹窗
const showModal = (title,content,callback)=>{
	uni.showModal({
		title,
		content,
		success: (res) => {
			if (res.confirm) {
				callback && callback();
			}
		}
	})
}

// 需要登录的操作 在此处过一遍
const actionForLogin = (action) => {
	const user = getApp().globalData.user;
	if (user.token) {
		if (action) action();
	} else {
		showModal('提示','此操作需要先登录',()=>{
			uni.navigateTo({
				url: '/pages/main/login/login'
			})
		})
	}
}



export default {
	showToast,
	showSuccess,
	showModal,
	logout,
	login,
	actionForLogin,
}
