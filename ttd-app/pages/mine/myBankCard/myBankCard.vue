<template>
  <view class="my-bank-card">
    <custom-navbar title="我的银行卡" />

    <back-container>
      <view class="bc-center">
<!--        <view class="bc-item" v-for="(item, i) in cardList" :key="i" @click="editCard(item)">
          <image src="http://jycrm.bm001.com/favicon.png" class="bc-left"></image>
          <view class="bc-midle">
            <view class="bc-midle-name">{{ item.householderName }}</view>
            <view class="bc-midle-bank-name">开户行：{{ item.bankName }}</view>
            <view class="bc-midle-bank-name">银行卡号：{{ item.bankCardNo }}</view>
          </view>
          <uni-icons v-if="i === 1" type="circle-filled" size="22" color="#FF3B30" />
          <uni-icons v-else-if="i === 2" type="arrowright" size="22" color="#969799" />
          <uni-icons v-else type="circle" size="22" color="#969799" />
        </view>-->
        <bank-card-item v-for="(item, i) in cardList" :key="i" :i="isSelect ? (selectCard == item.bankCardNo ? 1 : 3) : 2 " :item="item"@click="editCard(item)" />
        <list-empty v-if="!cardList.length" />
      </view>
    </back-container>

		<iphonex-bottom>
		  <big-btn button-text="新增银行卡" @click="addCard"/>
		</iphonex-bottom>

  </view>
</template>
<script>
import BackContainer from "../addressManage/component/backContainer";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BigBtn from "../addressManage/component/bigBtn";
import BankCardItem from "./bankCardItem";
import ListEmpty from "../../place-order/orderList/listEmpty";

export default {
  name: 'myBankCard',
  components: { ListEmpty, BankCardItem, BackContainer, BigBtn, IphonexBottom },
	data() {
		return {
			isSelect: false,
			selectCard: '',
			cardList: [],
		}
	},
	onLoad(option) {
	  if (option.isSelect) {
	    this.isSelect = option.isSelect == '1';
	  }
		if (option.selectCard) {
		  this.selectCard = option.selectCard;
		}
	},
	onReady() {},
	onShow() {
		this.queryCardList();
	},
  methods: {
		queryCardList() {
			this.$http.post('/b/customerbank/queryPageList', { pageSize: 1000 }, true)
			.then(res => {
			  this.cardList = res.dataList;
			})
		},
		editCard(card) {
			if (this.isSelect) {
			  const eventChannel = this.getOpenerEventChannel();
			  eventChannel.emit('onSelect', card);

			  uni.navigateBack({});
			} else {
		    uni.navigateTo({ url: `/pages/mine/bankAccount/bankAccount?id=${card.id}` })
			}
		},
		addCard() {
			this.$tool.actionForAuth(() => {
				uni.navigateTo({ url: `/pages/mine/bankAccount/bankAccount` })
			});
		}
  }
}
</script>
<style lang="scss">
.my-bank-card {
  .bc-center {
    background-color: #ECEDF9;
  }
}
</style>
<style lang="scss">
page {
  background-color: #ECEDF9;
}
</style>
