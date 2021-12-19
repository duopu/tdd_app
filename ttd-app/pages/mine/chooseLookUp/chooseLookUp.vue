<template>
  <view>
    <custom-navbar title="发票抬头" />

    <back-container>
      <view class="choose-look-up">

        <invoice-info-card
            v-for="(item, index) in invoiceList"
            :key="index"
            :item="{ iconType: 0 }"
						:invoice="item"
						@onClick="onInvoiceClick"
        />
				
				<list-empty v-if="!invoiceList.length" />
      </view>
    </back-container>
		
		<iphonex-bottom>
		  <big-btn button-text="新增发票抬头" @click="addInvoice"/>
		</iphonex-bottom>
		
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import InvoiceInfoCard from "../myInvoice/card/invoiceInfoCard";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BigBtn from "../addressManage/component/bigBtn";
import ListEmpty from "../../place-order/orderList/listEmpty";

export default {
  name: "chooseLookUp",
  components: { ListEmpty, InvoiceInfoCard, BackContainer, BigBtn, IphonexBottom },
  data() {
    return {
			invoiceList: [],
		};
  },
	onShow() {
		this.queryInvoiceList();
	},
	methods: {
		queryInvoiceList() {
			this.$http.post('/b/customerinvoiceinfo/queryPageList', { pageSize: 100 }, true)
			.then(res => {
			  this.invoiceList = res.dataList;
			})
		},
		onInvoiceClick(invoice) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('onSelect', invoice);
			
			uni.navigateBack({});
		},
		addInvoice() {
			uni.navigateTo({ url: '/pages/mine/editInvoice/editInvoice' });
		},
	},
}
</script>
<style lang="scss" scoped>
.choose-look-up {
  background-color: #ECEDF9;
}
</style>
<style lang="scss">
@import "../addressManage/_pageStyle.scss";
</style>
