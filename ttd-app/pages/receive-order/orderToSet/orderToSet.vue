<template>
  <view>
    <custom-navbar title="接单设置" />

    <back-container>
      <view>
        <title-with-switch show-switch :switch-value="setting.onOffReceivingFlag" title="开启接单" @changeSwitch="changeSwitch(false)" />
        <view class="order-set1">
          <view class="order-set11">
            <view class="order-set11-title">接单位置</view>
            <view class="order-set11-addr">{{ setting.province }} {{ setting.city }} {{ setting.district }} {{ setting.address }}</view>
          </view>
          <text class="order-set12" @click="changeAddress">修改</text>
          <uni-icons size="20" type="arrowright" color="#969799" />
        </view>
      </view>
    </back-container>

    <view class="order-set2">
      <title-with-switch show-switch :switch-value="setting.onOffLimitFlag" title="开启无范围限制接单" @changeSwitch="changeSwitch(true)" />

      <view class="order-set21">
        <view class="order-set21-title">接单范围</view>
        <input placeholder="请输入" class="input-so" :value="setting.receivingDistance" @input="onInput" placeholder-class="placeholder-class" />
        <text class="order-set2-unit">公里</text>
      </view>
    </view>

    <iphonex-bottom>
      <big-btn @click="updateSetting"/>
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import TitleWithSwitch from "../myTeam/titleWithSwitch";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "orderToSet",
  components: { BigBtn, IphonexBottom, TitleWithSwitch, BackContainer },
  data() {
    return {
      setting: {
				address: '',
				city: '',
				cityId: 0,
				customerType: 1, // 客户类型 1：团队，2：个人
				district: '',
				districtId: 0,
				latitude: 0,
				longitude: 0,
				onOffLimitFlag: 0,
				onOffReceivingFlag: 0,
				province: '',
				provinceId: 0,
				receivingDistance: 0
			}
    };
  },
	onLoad(option) {
		if (option.id) { // 编辑地址
		  this.id = option.id;
			this.querySettingInfo(this.id);
		}
	},
  methods: {
		querySettingInfo(id) {
			this.$http
				.post('/b/systemconfig/queryReceivingConf', { id }, true)
				.then(res => {
					this.setting = {
						...res,
						customerType: 1,
					};
				});
		},
		changeSwitch(isLimit) {
			if (isLimit) {
				this.setting.onOffLimitFlag = this.setting.onOffLimitFlag == 0 ? 1 : 0;
			} else {
				this.setting.onOffReceivingFlag = this.setting.onOffReceivingFlag == 0 ? 1 : 0;
			}
		},
		changeAddress() {
			uni.navigateTo({
				url: `/pages/mine/addressManage/addressManage?isSelect=1`,
				events: {
					onSelect: (address) => {
						this.setting = {
							...this.setting,
							...address,
						};
					}
				}
			})
		},
		onInput(e, type) {
			this.setting.receivingDistance = e.target.value;
		},
		updateSetting() {
			this.$http
				.post('/b/systemconfig/updateReceivingConf', this.setting, true)
				.then(res => {
					uni.showToast({
						title: '设置成功',
						success: () => {
							uni.navigateBack({});
						},
					})
				});
		}
  }
}
</script>

<style lang="scss" scoped>
.order-set1 {
  padding: 28rpx 32rpx 28rpx 32rpx;
  display: flex;
  align-items: center;

  .order-set11 {
    flex: 1;

    .order-set11-title {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }

    .order-set11-addr {
      margin-top: 18rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 32rpx;
    }
  }

  .order-set12 {
    padding: 0 18rpx 0 100rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
    line-height: 40rpx;
  }

}

.order-set2 {
  margin-top: 32rpx;
  background-color: white;

  .order-set21 {
    height: 88rpx;
    @include flexBetween;
    padding: 0 32rpx;

    .order-set21-title {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
    }

    .input-so {
      flex: 1;
      text-align: right;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #BDBDBD;
    }

    .order-set2-unit {
      padding-left: 8rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
    }
  }
}

/deep/ .input-placeholder {
  font-size: 28rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #BDBDBD;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

</style>
