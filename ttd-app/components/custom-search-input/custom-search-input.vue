<!-- 搜索 -->
<template>
	<view class="flex-center-between search-content">
		<view class="flex-1 flex-center search">
			<uni-icons type="search"></uni-icons>
			<input :value="value" @input="inputAction" class="flex-1 input" :placeholder="placeholder" @confirm="search"/>
			<uni-icons v-if="showClear" class="icon-clear" type="clear" color="#666666" @click="clear"></uni-icons>
		</view>
		<!-- <button type="default" class="btn btn-text" @click="search">确定</button> -->
	</view>
</template>

<script>
export default {
	name: 'custom-search-input',
	props: {
		placeholder: {
			type: String,
			default: '请输入'
		},
		value:{
			type: String,
			default: '请输入'
		}
	},
	data() {
		return {
		};
	},
	computed:{
		showClear(){
			return this.searchText.length
		}
	},
	methods:{
		// 
		inputAction(e){
			this.$emit('input',e.detail.value)
		},
		//  清空数据
		clear(){
			this.$emit('input','');
			this.$emit('search','');
		},
		// 搜索内容
		search(){
			this.$emit('search',this.value)
		},
	}
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
