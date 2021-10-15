import App from './App'
import request from './utils/request.js';
import tool from './utils/tool.js';
import store from './store/index.js';



// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

// 注入http
Vue.prototype.$http = request;
// 注入store
Vue.prototype.$store = store
// 注入tool
Vue.prototype.$tool = tool

const app = new Vue({
	...App
})
app.$mount()

// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
