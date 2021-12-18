import config from './config.js'
import store from '../store/index.js';
import tool from './tool.js';

export default {

	request(url, data, method, loading) {

		let header = {
			Accept: 'application/json',
			'Content-Type': method == 'POST' ? 'application/json; charset=utf-8' : 'application/x-www-form-urlencoded',
			'x-uid':1,
			// Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDMTAwMDgzNzUwNjgxNDA4MCIsInVzZXJUeXBlIjoxLCJleHAiOjE2Mzk4NDQ2NzN9.wg4EkfwT6ulR7mfajwnnMEhseEQWr6NXrcxo8VxWcwA'
			// Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJDMTAwMDgyNzcwNDE1MjE5MiIsInVzZXJUeXBlIjoxLCJleHAiOjE2NDAzMjg0NDV9.lLD9jAbL8akmB5u9DKg-d-CwcMuH5K0uHE-Zq7BDzBE'
		}
		const user = store.state.user
		if (user.token) {
			console.log('注入token',user.token);
			header.Authorization = user.token
		}
		let options = {}
		options.header = header;
		options.method = method || 'POST';
		options.url = config.baseUrl + url;
		options.data = data

		if (loading) {
			uni.showLoading({
				title: '奋力加载中...',
				mask: true,
			})
		}

		return uni.request(options).then(response => {
			console.log('响应原始信息',response);
			const res = response[1].data

			const rescode = res.rescode;
			const msg = res.msg;
			const data = res.data;

			console.log('============接口响应============');
			console.log('请求地址', url);
			console.log('请求参数', options);
			console.log('全部响应', res);

			if (loading) {
				uni.hideLoading()
			}
			if (rescode == 200) {
				return data;
			} else if(rescode == 202){
				// token 失效 移除登录信息
				tool.logout();
				throw {
					message: msg
				};
			} else {
				console.error(`
					【【 字符串表示 ，方便给后端发报错信息 】】
					请求地址：${url}
					请求信息：${JSON.stringify(options)}
					响应信息：${JSON.stringify(res)}
				`);

				if (loading) {
					uni.showToast({
						title: msg,
						icon: 'none'
					})
				}
				throw {
					message: msg
				};
			}
		}).catch(err => {

			const message = err.message || '请求失败,请检查网络'
			if (loading) {
				uni.showToast({
					title: message,
					icon: 'none'
				})
			}
			throw {
				message: message
			};
		})
	},

	// get 方法 url:请求路由   data:携带参数   loading：是否显示loading效果
	get(url = '', data = {}, loading = false) {
		return this.request(url, data, 'GET', loading);
	},
	// post 方法 url:请求路由   data:携带参数   loading：是否显示loading效果
	post(url = '', data = {}, loading = false) {
		return this.request(url, data, 'POST', loading);
	},
	// delete 方法 url:请求路由   data:携带参数   loading：是否显示loading效果
	delete(url = '', data = {}, loading = false) {
		return this.request(url, data, 'DELETE', loading);
	},

	/**
	 * 上传单个文件
	 * @param {Object} data 参数  {path:"",file:{}}  path是文件路径  file是文件对象
	 * @param {Object} loading 是否显示loading效果
	 */
	upload( data = {}, loading = false) {

		return new Promise((resolve, reject) => {

			if (loading) {
				uni.showLoading({
					title: '努力上传中...',
					mask: true,
				})
			}

			let header = {
				'x-uid':1,
			}
			const user = store.state.user
			if (user.token) {
				console.log('注入token',user.token);
				header.Authorization = user.token
			}

			uni.uploadFile({
				url: config.baseUrl + '/core/upload/uploadPic',
				filePath: data.path,
				name: 'file',
				formData: {
					file:data.file
				},
				header,
				success: (uploadFileRes) => {

					const res = JSON.parse(uploadFileRes.data);
					console.log('上传结束',res);

					const rescode = res.rescode;
					const msg = res.msg;
					const data = res.data;


					if (loading) {
						uni.hideLoading()
					}
					if (rescode == 200) {
						resolve(data)
					} else {
						if (loading) {
							uni.showToast({
								title: msg,
								icon: 'none'
							})
						}
						reject({message: msg})
					}

				},
				fail: (err) => {
					const message = err.message || '请求失败,请检查网络'
					if (loading) {
						uni.showToast({
							title: message,
							icon: 'none'
						})
					}
					reject({message})
				}
			});

		})

	}

}
