<template>
	<view class="auto-component">
		<scroll-view class="scroll-view" :scroll-y="true" >
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name:"auto-scroll-view",
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.auto-component{
	flex: 1;
	.scroll-view{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
}
</style>
