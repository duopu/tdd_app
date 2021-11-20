<template>
  <view>
    <custom-navbar title="发票抬头" />

    <back-container>
      <view class="choose-look-up">

        <invoice-info-card
            v-for="i in 10"
            :key="i"
            :item="{ iconType: i }"
        />
      </view>
    </back-container>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import InvoiceInfoCard from "../myInvoice/card/invoiceInfoCard";

export default {
  name: "chooseLookUp",
  components: { InvoiceInfoCard, BackContainer },
  data() {
    return {};
  }
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
