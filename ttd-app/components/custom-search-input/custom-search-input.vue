<!-- 搜索 -->
<template>
	<view class="flex-center-between search-content">
		<view class="flex-1 flex-center search">
			<uni-icons type="search"></uni-icons>
			<input v-model="searchValue" class="flex-1 input" :placeholder="placeholder" @confirm="search"/>
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
		}
	},
	data() {
		return {
			searchValue:''
		};
	},
	computed:{
		showClear(){
			return this.searchValue.length
		}
	},
	methods:{
		//  清空数据
		clear(){
			this.searchValue = '';
			this.$emit('search',this.searchValue)
		},
		// 搜索内容
		search(){
			this.$emit('search',this.searchValue)
		},
	}
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
