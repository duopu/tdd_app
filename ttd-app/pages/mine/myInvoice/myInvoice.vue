<template>
  <view class="my-invoice">
    <custom-navbar title="我的发票" />
    <back-container>
      <template v-slot:headerSlot>
        <blue-tab :active-key="activeKey" :list="tabList" @change="change" />
      </template>

      <view class="invoice-list">
        <!-- 已开票  开票中-->
        <invoice-card v-if="['1', '2'].includes(activeKey)" v-for="i in 10" :key="i" />

        <!-- 发票 信息  -->
        <invoice-info-card
            v-if="['3'].includes(activeKey)"
            v-for="(item, i) in invoiceList"
            :key="i"
						:invoice="item"
            :item="{ iconType: i }"
        />
      </view>
    </back-container>
  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import BlueTab from "../addressManage/component/blueTab";
import InvoiceCard from "./card/invoiceCard";
import InvoiceInfoCard from "./card/invoiceInfoCard";

export default {
  name: "myInvoice",
  components: { InvoiceInfoCard, InvoiceCard, BlueTab, BackContainer },
  data() {
    return {
      activeKey: '1',
      tabList: [
        { text: '已开票', key: '1' },
        { text: '开票中', key: '2' },
        { text: '发票信息', key: '3' },
      ],
			invoiceList: [],
    };
  },
	onReady() {
		this.queryInvoiceList();
		this.queryMyInvoiceInfo();
	},
  methods: {
    change(data) {
      this.activeKey = data;
    },
		queryInvoiceList() {
			this.$http.post('/b/orderinvoice/queryPageList', { invoiceState: this.activeKey }, true)
			.then(res => {
			  this.invoiceList = res.dataList;
			})
		},
		queryMyInvoiceInfo() {
			this.$http.post('/b/customerinvoiceinfo/queryPageList', { }, true)
			.then(res => {
			  this.invoiceList = res.dataList;
			})
		}
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
