<template>
  <view>

    <custom-navbar title="我的分销" />
    <view class="my-dis">
      <view class="my-dis-view">
        <view class="my-dis-view-btn" @click="toDtl">查看详情</view>
      </view>

      <image class="dis-img"
             src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/my-distribute-back.png" />

      <view class="my-dis-join">
        已有
        <text class="my-dis-join-num">50000+</text>
        用户参与活动
      </view>

      <view class="my-dis-qr">
        <uqrcode ref="uqrcode" />
      </view>

      <view class="my-dis-rule">
        <view class="my-dis-rule-title">活动规则：</view>
        <view class="my-dis-rule-desc">
          邀请新人扫码注册妥妥弟，将获得1000积分。并且邀请新用户将成为你的分销下级，您将享受他5%的收益。
        </view>
      </view>

      <view class="my-dis-down">
        <view class="my-dis-down1">
          <image class="my-dis-down2"
                 src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/dis-weixin.png" />
          <view class="my-dis-down3">分享到微信</view>
        </view>
        <view class="my-dis-down1">
          <image class="my-dis-down2"
                 src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/dis-circle.png" />
          <view class="my-dis-down3">分享到朋友圈</view>
        </view>
        <view class="my-dis-down1">
          <image class="my-dis-down2"
                 src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/dis-down.png" />
          <view class="my-dis-down3">下载至相册</view>
        </view>
      </view>

    </view>
  </view>
</template>
<script>
export default {
  name: "myDistribution",
  data() {
    return {};
  },
  onReady() {
    /**
     *
     *
     *
     *
     *
     *
     *
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     * todo demo 地址 https://ext.dcloud.net.cn/plugin?id=1287
     *
     *
     *
     *
     *
     *
     *
     *
     *
     */
    this.$refs
        .uqrcode
        .make({
          mode: 'canvas', // 默认为view
          size: 114,
          text: 'https://www.baidu.com/'
        })
        .then(res => {
          // 返回的res与uni.canvasToTempFilePath返回一致
          console.log(res)
        })
  },
  methods: {
    toDtl() {
      console.log('111');
      uni.navigateTo({ url: '/pages/mine/distributionDetail/distributionDetail' })
    }
  }
}
</script>
<style lang="scss" scoped>
$top: 50rpx;

.my-dis {
  background: linear-gradient(180deg, #F84666 0%, #FD934B 100%);
  position: relative;

  .my-dis-view {
    display: flex;
    justify-content: flex-end;
    padding-top: 38rpx;
    position: relative;
    z-index: 2;

    .my-dis-view-btn {
      width: 120rpx;
      height: 40rpx;
      background: linear-gradient(90deg, #FED8B0 0%, #FEC58D 100%);
      box-shadow: 0 4rpx 2rpx 2rpx rgba(120.9423802793026, 24.316430389881134, 26.011616326868534, 0.05000000074505806);
      border-radius: 24rpx 0 0 24rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #DE6C26;
      @include flexCenter;
    }
  }

  .dis-img {
    width: 750rpx;
    height: 1388rpx;
    position: absolute;
    left: 0;
    top: $top;
    z-index: 1;
  }

  .my-dis-join {
    position: relative;
    z-index: 2;
    @include flexCenter;
    width: 486rpx;
    height: 56rpx;
    background: #FFFFFF;
    box-shadow: 0 8px 4px 2px rgba(120.9423802793026, 24.316430389881134, 26.011616326868534, 0.15000000596046448);
    border-radius: 32rpx;
    margin: 272rpx auto 0 auto;
    font-size: 32rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #F95063;
    line-height: 40rpx;

    .my-dis-join-num {
      display: inline-block;
      padding: 0 8rpx;
    }
  }

  .my-dis-qr {
    position: relative;
    z-index: 2;
    width: 228rpx;
    height: 228rpx;
    margin: 128rpx auto 0 auto;
    background: white;
  }

  .my-dis-rule {
    position: relative;
    z-index: 2;
    width: 502rpx;
    height: 160rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Semibold, PingFang SC;
    color: #8C4C31;
    line-height: 40rpx;
    margin: 38rpx auto 0 auto;

    .my-dis-rule-title {
      font-weight: 600;
    }

    .my-dis-rule-desc {
      font-weight: 400;
    }
  }

  .my-dis-down {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    padding: 216rpx 78rpx 100rpx 78rpx;

    .my-dis-down1 {
      width: 176rpx;
      height: 160rpx;
      display: flex;
      flex-direction: column;
      align-items: center;

      .my-dis-down2 {
        width: 112rpx;
        height: 112rpx;
      }

      .my-dis-down3 {
        margin-top: 18rpx;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFBE8;
        line-height: 32rpx;
      }
    }
  }
}
</style>
<style>
page {
  height: 100vh;
  overflow-y: scroll;
}
</style>
