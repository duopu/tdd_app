<!-- 我的 -->
<template>
  <view class="mine">

    <custom-navbar title="我的" :show-left-icon="false" />

    <view class="mine-top">
      <view class="mt-1">
        <image :src="mineTopBack" class="mt-11"></image>
        <view class="mt-12">
          <text class="mt-14">晚上好，坡先生</text>
          <view class="mt-15">
            <text class="mt-16">我的积分：2890</text>
            <uni-icons type="arrowright" class="mt-17" color="rgba(256, 256, 256, 0.2)" size="14" />
          </view>
        </view>
        <view class="mt-13">
          <text class="mt-18">剩余抽奖次数</text>
          <text class="mt-19">0</text>
        </view>
      </view>
    </view>


<!--
    <view class="page-container">
      <scroll-view class="scroll-content" scroll-y="true">
        &lt;!&ndash; 头部 &ndash;&gt;
        <view class="top">
          <image class="image-bg" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine.png"
                 mode="aspectFill"></image>
          <view class="content flex-1 flex-center-between">
            <image class="avatar-image"
                   src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/default/index-demo.png"
                   mode="aspectFill"></image>
            <view class="right flex-1">
              <text class="name text-ellipis">{{ userName }}</text>
              <navigator url="/pages/mine/myIntegral/myIntegral" class="flex describe">
                我的积分
                <text class="color-yellow">0</text>
              </navigator>
            </view>
            <view class="flex-column-center turntable">
              <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/turntable.png" mode="aspectFill"
                     class="image-turntable"></image>
              <view class="text">
                剩余抽奖次数
                <text class="color-red">0</text>
                次
              </view>
            </view>
          </view>
        </view>
        <view class="white padding">
          &lt;!&ndash; tab &ndash;&gt;
          <view class="flex-center menu">
            <view class="item first flex-1 flex-column-center">
              <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/my_icon_sgin.png"
                     class="image-item"></image>
              <text class="text text-ellipis">签到打卡</text>
            </view>
            <view class="item second flex-1 flex-column-center">
              <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/my_icon_tick.png"
                     class="image-item"></image>
              <text class="text text-ellipis">我的优惠券</text>
            </view>
            <view class="item three flex-1 flex-column-center" @click="toWallet">
              <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/my_icon_wallet.png"
                     class="image-item"></image>
              <text class="text text-ellipis">我的钱包</text>
            </view>
          </view>
          &lt;!&ndash; 邀请 &ndash;&gt;
          <image class="advertise-image" @click="navInvite"
                 src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/advertise.png"
                 mode="aspectFill"></image>
        </view>
        &lt;!&ndash; 承接方 &ndash;&gt;
        <view class="white">
          <view class="lists-item flex-center-between" v-for="i in menuList" :key="i.title" @click="toPage(i)">
            <image src="" mode="aspectFill" class="icon-image"></image>
            <text class="flex-1">{{ i.title }}</text>
            <uni-icons type="forward" class="icon-arrow" color="#9D9D9D"></uni-icons>
          </view>
          &lt;!&ndash;        <view class="lists-item flex-center-between">
                    <image src="" mode="aspectFill" class="icon-image"></image>
                    <text class="flex-1">我的服务地址</text>
                    <uni-icons type="forward" class="icon-arrow" color="#9D9D9D"></uni-icons>
                  </view>
                  <view class="lists-item flex-center-between">
                    <image src="" mode="aspectFill" class="icon-image"></image>
                    <text class="flex-1">实名认证</text>
                    <uni-icons type="forward" color="#9D9D9D"></uni-icons>
                  </view>
                  <view class="lists-item flex-center-between">
                    <image src="" mode="aspectFill" class="icon-image"></image>
                    <text class="flex-1">我的银行卡</text>
                    <uni-icons type="forward" color="#9D9D9D"></uni-icons>
                  </view>
                  <view class="lists-item flex-center-between">
                    <image src="" mode="aspectFill" class="icon-image"></image>
                    <text class="flex-1">发票信息</text>
                    <uni-icons type="forward" color="#9D9D9D"></uni-icons>
                  </view>&ndash;&gt;
        </view>
        &lt;!&ndash; 帮助中心 &ndash;&gt;
        <view class="white">
          <view class="lists-item flex-center-between">
            <text class="flex-1">帮助中心</text>
            <uni-icons type="forward" color="#9D9D9D"></uni-icons>
          </view>
          <view class="lists-item flex-center-between">
            <text class="flex-1">联系我们</text>
            <uni-icons type="forward" color="#9D9D9D"></uni-icons>
          </view>
          <view class="lists-item flex-center-between">
            <text class="flex-1">关于</text>
            <uni-icons type="forward" color="#9D9D9D"></uni-icons>
          </view>
        </view>
      </scroll-view>

      <view>
        所有页面入口
      </view>
    </view>-->

  </view>
</template>

<script>
import mineTopBack from '../../../static/mine/mine-top-back.png';

export default {
  data() {
    return {
      demo: true,
      mineTopBack,
    };
  },
  onReady() {
    // this.$tool.actionForLogin();
  },
  computed: {
    userName() {
      return this.$store.state.user.name
    },
    menuList() {
      return [
        { title: '积分商城', url: '' },
        { title: '我的服务地址', url: '/pages/mine/addressManage/addressManage' },
        { title: '实名认证', url: '' },
        { title: '我的银行卡', url: '/pages/mine/myBankCard/myBankCard' },
        { title: '发票信息', url: '' },
        { title: '发票投诉-临时', url: '/pages/mine/myComplain/myComplain' },
        { title: '发票发票-临时', url: '/pages/mine/myInvoice/myInvoice' },
        { title: '发票抬头-临时', url: '/pages/mine/chooseLookUp/chooseLookUp' },
        { title: '发票信息添加-临时', url: '/pages/mine/editInvoice/editInvoice' },
        { title: '我的优惠券-临时', url: '/pages/mine/myCoupons/myCoupons' },
        { title: '实名认证-临时', url: '/pages/mine/realNameAuth/realNameAuth' },
        { title: '帮助中心-临时', url: '/pages/mine/helpCenter/helpCenter' },
      ]
    }
  },
  methods: {
    navInvite() {
      uni.navigateTo({
        url: '/pages/mine/invite/invite'
      })
    },
    toPage(row) {
      uni.navigateTo({ url: row.url })
    },
    toWallet() {
      uni.navigateTo({ url: `/pages/mine/myWallet/myWallet` })
    }
  }
};
</script>

<style src="./style.scss" lang="scss" scoped></style>
