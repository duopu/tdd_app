import config from "./config.js"
import store from '../store/index.js';

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
	store.commit('setUser', user)

	// 更新 申请承接方 信息
	store.dispatch('queryApproveDetail');
	// 更新实名认证信息
	store.dispatch('queryAuthenticationInfo');
}

// 登出
const logout = () => {
	store.commit('setUser', {})
	uni.removeStorage({
		key: config.storageKeys.loginUserKey,
	})
}

// 显示弹窗
const showModal = (title, content, callback, confirmText) => {
	uni.showModal({
		title,
		content,
		confirmText: confirmText || '确定',
		success: (res) => {
			if (res.confirm) {
				callback && callback();
			}
		}
	})
}

// 需要登录的操作 在此处过一遍
const actionForLogin = (action) => {
	const user = store.state.user;
	if (user.token) {
		if (action) action();
	} else {
		showModal('提示', '此操作需要先登录', () => {
			uni.navigateTo({
				url: '/pages/main/login/login'
			})
		}, '去登录')
	}
}

// 需要认证的操作 在此处过一遍
const actionForAuth = (action) => {
	actionForLogin(()=>{
		const auth = store.state.authentication;
		if (auth.state == 1) {
			if (action) action();
		} else {
			showModal('提示', '此操作需要实名认证', () => {
				uni.navigateTo({
					url: '/pages/mine/realNameAuth/realNameAuth'
				})
			}, '去认证');
		}
	})
}

// 需要承接方资质，在这里过一下
const masterWorker = (action)=>{
	actionForLogin(()=>{
		const user = store.state.user;
		if (user.masterWorkFlag) {
			if (action) action();
		} else {
			showModal('提示', '此操作需要注册承接方信息', () => {
				uni.navigateTo({
					url: '/pages/main/apply/apply'
				})
			}, '去注册')
		}
	})
}

// 订单
// 订单类型
const orderType = (type) => {
	switch (type) {
		case 1:
			return '实施/维修';
			break;
		case 2:
			return '勘测';
			break;
		case 3:
			return '人员';
			break;
		case 4:
			return '租赁';
			break;
		case 5:
			return '软件';
			break;
		default:
			return '';
	}
}

// 订单状态
const orderState = (state) => {
	switch (state) {
		case 10:
			return '待报价';
			break;
		case 20:
			return '待确认';
			break;
		case 30:
			return '待开始';
			break;
		case 40:
			return '待完工';
			break;
		case 50:
			return '已完工';
			break;
		case 90:
			return '已取消';
			break;
		default:
			return '';
	}
}


export default {
	showToast,
	showSuccess,
	showModal,
	logout,
	login,
	actionForLogin,
	actionForAuth,
	orderType,
	orderState,
	masterWorker
}
