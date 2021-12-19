<template>
	<view class="my-invoice">
		<custom-navbar title="我的发票" />
		<back-container>
			<template v-slot:headerSlot>
				<blue-tab :active-key="activeKey" :list="tabList" @change="change" />
			</template>

			<view class="invoice-list">
				<!-- 已开票  开票中-->
				<invoice-card v-if="['1', '2'].includes(activeKey)" v-for="(i, index) in invoiceList" :key="index"
					:invoice="i" />

				<!-- 发票 信息  -->
				<invoice-info-card v-if="['3'].includes(activeKey)" v-for="(item, i) in myInvoiceList" :key="i"
					:invoice="item" :item="{ iconType: i }" @onClick="toMyInvoice()" />

				<list-empty
					v-if="(!invoiceList.length && ['1', '2'].includes(activeKey)) || (!myInvoiceList.length && ['3'].includes(activeKey))" />

			</view>
		</back-container>
		
		<iphonex-bottom v-if="activeKey == '3'">
		  <big-btn button-text="新增发票抬头" @click="toAdd"/>
		</iphonex-bottom>
	</view>
</template>
<script>
	import BackContainer from "../addressManage/component/backContainer";
	import BlueTab from "../addressManage/component/blueTab";
	import InvoiceCard from "./card/invoiceCard";
	import InvoiceInfoCard from "./card/invoiceInfoCard";
	import ListEmpty from "../../place-order/orderList/listEmpty";
	import IphonexBottom from "../addressManage/component/iphonexBottom";
	import BigBtn from "../addressManage/component/bigBtn";

	export default {
		name: "myInvoice",
		components: {
			ListEmpty,
			InvoiceInfoCard,
			InvoiceCard,
			BlueTab,
			BackContainer,
			BigBtn, 
			IphonexBottom,
		},
		data() {
			return {
				activeKey: '2',
				tabList: [{
						text: '已开票',
						key: '2'
					},
					{
						text: '开票中',
						key: '1'
					},
					{
						text: '发票信息',
						key: '3'
					},
				],
				invoiceList: [],
				myInvoiceList: [],
			};
		},
		onShow() {
			this.queryInvoiceList();
			this.queryMyInvoiceInfo();
		},
		methods: {
			change(data) {
				this.activeKey = data;
				this.queryInvoiceList();
			},
			queryInvoiceList() {
				this.$http.post('/b/orderinvoice/queryPageList', {
						invoiceState: this.activeKey,
						pageSize: 100,
						sortInfos: [{
							field: 'addTime',
							sort: 'desc',
						}]
					}, true)
					.then(res => {
						this.invoiceList = res.dataList;
					})
			},
			queryMyInvoiceInfo() {
				this.$http.post('/b/customerinvoiceinfo/queryPageList', { pageSize: 100 }, true)
					.then(res => {
						this.myInvoiceList = res.dataList;
					})
			},
			toMyInvoice(invoice) {
				uni.navigateTo({
					url: `/pages/mine/editInvoice/editInvoice?id=${invoice.id}`
				});
			},
			toAdd() {
				uni.navigateTo({
					url: `/pages/mine/editInvoice/editInvoice`
				});
			},
		}
	}
</script>
<style lang="scss" scoped>
	.my-invoice {

		.invoice-list {
			background-color: #ECEDF9;
		}
	}
</style>
<style lang="scss">
	page {
		background-color: #ECEDF9;
		max-height: 100vh;
		overflow-y: scroll;
	}
</style>
