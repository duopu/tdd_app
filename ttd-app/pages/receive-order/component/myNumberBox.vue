<template>
	<view class="number-box">
		<text class="nb-btn nb-btn-plus">-</text>
		<input class="nb-input" v-model="value1" />
		<text class="nb-btn nb-btn-minus">+</text>
	</view>
</template>
<script>
	export default {
		name: "myNumberBox",
		model: {
			prop: 'value',
			event: 'change'
		},
		// computed:{
		//   newValue() {
		//     return 1
		//   }
		// },
		props: {
			value: {
				type: Number,
				default: ''
			},
		},
		data() {
			return {
				value1: 9
			}
		},
		methods: {
			change() {

			}
		}
	}
</script>
<style scoped lang="scss">
	.number-box {
		display: inline-flex;

		.nb-btn-plus {
			border-radius: 8rpx 0 0 8rpx;
		}

		.nb-btn-minus {
			border-radius: 0 8rpx 8rpx 0;
		}

		.nb-btn {
			@include flexCenter;
			min-width: 56rpx;
			height: 56rpx;
			background: #F2F3F4;
			font-size: 40rpx;
			color: #323233;
		}

		.nb-input {
			width: 64rpx;
			height: 56rpx;
			margin: 0 4rpx;
			background: #F2F3F4;
			text-align: center;
		}
	}
</style>
