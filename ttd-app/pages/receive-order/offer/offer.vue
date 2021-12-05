<template>
  <view>
    <custom-navbar title="报价" />

    <back-container>
      <template #headerSlot>
        <offer-head />
      </template>

      <view class="offer">

        <view class="offer-1">
          <view class="offer-11">待报价</view>
        </view>

        <quoted-iten />

        <add-remark @input="input" :value="remark1" />
      </view>

    </back-container>

    <view class="offer-5">
      <view class="offer-51">工作内容</view>
      <view class="offer-52">
        <offer-content-card v-for="(i, index) in 5" :key="i" :right-type="i"
                            :show-last-border-bottom="index < (5 -1)" />
      </view>
      <view class="offer-53">
        <text class="offer-531">展开更多</text>
        <uni-icons class="oc-arrow" type="arrowright" size="20" color="#BDBDBD" />
      </view>
    </view>

    <view class="offer-7">
      <add-remark @input="input" :value="remark1" />
    </view>

    <view style="height: 300rpx" />

    <iphonex-bottom>
      <bottom-price-and-btn :price="122.01" @onCancel="cancelQuote" @onConfirm="submitQuote">
        <view class="offer-8">
          <text class="offer-81">已报价</text>
          <corner-mark num="3" />
          <text class="offer-81">未报价</text>
          <corner-mark num="4" color="#828282" />
        </view>
      </bottom-price-and-btn>
    </iphonex-bottom>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../component/offerHead";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
import OfferContentCard from "../component/offerContentCard";
import AddRemark from "../component/addRemark";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import CornerMark from "../component/cornerMark";
import MyPrice from "../component/myPrice";
import QuotedIten from "../component/quotedIten";
import BottomPriceAndBtn from "../component/bottomPriceAndBtn";

export default {
  name: "offer",
  components: {
    BottomPriceAndBtn,
    QuotedIten,
    MyPrice,
    CornerMark,
    IphonexBottom,
    AddRemark,
    OfferContentCard,
    UniIcons,
    OfferHead,
    BackContainer
  },
  data() {
    return {
			id: '',
      remark1: ''
    };
  },
	onLoad(option) {
		if (option.id) {
		  this.id = option.id;
			this.queryOrderInfo();
		}
	},
  methods: {
		queryOrderInfo(id) {
			this.$http.post('/b/ordermaster/query', { id: this.id }, true)
			.then(res => {
			  this.order = res;
			})
		},
    input(value) {
      this.remark1 = value;
    },
		cancelQuote() {
			uni.navigateBack({});
		},
		submitQuote() {
			const params = {
				id: this.id
			};
			this.$http.post('/b/orderquote/createQuote', params, true)
			.then(res => {
			  uni.showToast({
			  	title: '报价成功',
					success: () => {
						uni.navigateBack({});
					}
			  })
			})
		}
  }
}
</script>
<style lang="scss">
.offer {
  padding-bottom: 34rpx;

  .offer-1 {
    width: 750rpx;
    height: 96rpx;
    background-color: white;
    padding: 24rpx 32rpx;
    box-sizing: border-box;

    .offer-11 {
      margin-left: auto;
      width: 116rpx;
      height: 48rpx;
      background: #5AC8FA;
      border-radius: 8rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      @include flexCenter;
    }
  }

}

.offer-5 {
  background-color: white;
  margin: 30rpx 0 32rpx 0;

  .offer-51 {
    width: 750rpx;
    height: 88rpx;
    padding: 24rpx 32rpx;
    box-sizing: border-box;
  }

  .offer-52 {
    margin-left: 32rpx;
    border-top: 1rpx solid #EAECEF;
    border-bottom: 1rpx solid #EAECEF;
  }

  .offer-53 {
    height: 80rpx;
    padding: 0 32rpx;
    @include flexBetween;
    background: #FFFFFF;

    .offer-531 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #1889F9;
    }
  }
}

.offer-7 {
  background-color: white;
  padding-bottom: 32rpx;
}

.offer-8 {
  display: flex;
  align-items: center;
  height: 80rpx;
  background: #FFFBE8;

  .offer-81 {
    margin: 0 12rpx 0 32rpx;
  }
}

</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

.placeholder-class {
  font-size: 28rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #828282;
  line-height: 36rpx;
}
</style>
