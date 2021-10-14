<!-- 申请承接方 -->
<template>
	<view class="page-container apply">
		<!-- 内容 -->
		<scroll-view scroll-y="true" class="scroll-content">
			<!-- 基本信息 -->
			<view class="title flex-center-start">基本信息</view>
			<view class="white">
				<custom-input-row label-text="姓名" required="true">
					<input class="input" placeholder-class="input-placeholder" type="text" placeholder="请输入姓名" />
				</custom-input-row>
				<custom-input-row label-text="手机号码" required="true">
					<input class="input" placeholder-class="input-placeholder" type="text" placeholder="请输入手机号码" />
				</custom-input-row>
				<custom-input-row label-text="身份证" required="true">
					<input class="input" placeholder-class="input-placeholder" type="text" placeholder="请输入身份证号" />
				</custom-input-row>
			</view>
			<!-- 简介 -->
			<view class="title flex-center-start m-top-16">简介</view>
			<view class="white">
				<textarea class="profile-text" maxlength="200" placeholder="请输入简介" placeholder-class="input-placeholder" />
			</view>
			<!-- 从业信息 -->
			<view class="title flex-center-start m-top-16">从业信息</view>
			<!-- 技能 -->
			<view class="white list m-top-16">
				<custom-input-row required="true" label-text="技能"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item,index) in ['','']" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">实施/存储/MAS存储</view>
						<view class="describe">华为、新锐</view>
					</view>
					<image src="../../../static/delete.png" mode="aspectFill" class="image-delete"></image>
				</view>
				<button class="btn btn-add">新增技能</button>
			</view>
			<!-- 人员 -->
			<view class="white list m-top-16">
				<custom-input-row required="true" label-text="人员"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item,index) in ['','']" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">人员/八大员/技术员</view>
						<view class="describe">CAD、PS</view>
					</view>
					<image src="../../../static/delete.png" mode="aspectFill" class="image-delete"></image>
				</view>
				<button class="btn btn-add">新增人员</button>
			</view>
			<!-- 项目 -->
			<view class="white list m-top-16">
				<custom-input-row required="true" label-text="项目"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item,index) in ['','']" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">行业名称：展览项目</view>
						<view class="describe">履历：承建***展览馆</view>
					</view>
					<image src="../../../static/delete.png" mode="aspectFill" class="image-delete"></image>
				</view>
				<button class="btn btn-add">新增项目</button>
			</view>
			<!-- 工具 -->
			<view class="white list m-top-16">
				<custom-input-row required="true" label-text="工具"></custom-input-row>
				<view class="list-item flex-center-between" v-for="(item,index) in ['','']" :key="index">
					<view class="flex-1">
						<view class="text text-ellipis">起重机</view>
						<view class="describe">是否租赁</view>
					</view>
					<image src="../../../static/delete.png" mode="aspectFill" class="image-delete"></image>
				</view>
				<button class="btn btn-add">新增工具</button>
			</view>
		</scroll-view>
		<!-- 底部保存 -->
		<button class="btn primary btn-save">保存</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	}
};
</script>

<style src="./style.scss" scoped lang="scss"></style>
