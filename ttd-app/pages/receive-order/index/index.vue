<!-- 接单 -->
<template>
	<view >
		<coming-soon></coming-soon>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onReady() {
			this.$tool.actionForLogin()
		}
	}
</script>

<style lang="scss" src="./style.scss" scoped>

</style>
