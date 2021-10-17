<!-- 接单 -->
<template>
	<view class="order-tips">
		<view class="describe">您还没有成为承接方，不能承接订单哦。快去成为承接方吧！</view>
		<view class="flex-center btn-group">
			<navigator url="../../main/apply/apply" class="btn primary" @click="onRegister">注册承接方</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" src="./style.scss" scoped>

</style>
