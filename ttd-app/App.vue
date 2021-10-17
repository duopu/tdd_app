<script>
import config from './utils/config.js';

export default {
	// 全局数据对象
	globalData: {
		// 用户信息
		user: {}
	},

	onLaunch: function() {
		uni.getStorage({
			key: config.storageKeys.loginUserKey,
			success: res => {
				getApp().globalData.user = res.data;
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="scss">
/*每个页面公共css */
html,
body {
	overflow: hidden;
}

page {
	height: 100%;
	font-size: 26rpx;
	font-family: system-ui, -apple-system;
	color: #333333;
	background-color: #f6f6f6;
	overflow: hidden;
}

// 滚动
.page-container {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
	overflow: hidden;
}

// flex
.flex {
	display: flex;

	&-center {
		@extend .flex;
		justify-content: center;
		align-items: center;
	}

	&-between {
		@extend .flex;
		justify-content: space-between;
	}
	&-center-start {
		@extend .flex;
		align-items: center;
	}

	&-center-between {
		@extend .flex;
		align-items: center;
		justify-content: space-between;
	}

	&-column-center {
		@extend .flex-center;
		flex-direction: column;
	}
}

.flex-1 {
	flex: 1;
}

.row {
	flex-direction: row;
}

.column{
	flex-direction: column;
}

.align-center{
	align-items: center;
}

.align-end{
	align-items: flex-end;
}

.justify-center{
	justify-content: center;
}

.justify-end{
	justify-content: flex-end;
}

// 文本省略
.text-ellipis {
	width: 100%;
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
}

::-webkit-scrollbar {
	display: none;
}

button {
	font-size: 26rpx;
	height: 85rpx;
	line-height: 85rpx;
	border: 0;
	border-radius: 8rpx;

	&::after {
		content: none;
	}
}
</style>
