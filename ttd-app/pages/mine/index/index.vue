<!-- 我的 -->
<template>
  <view class="mine">

    <custom-navbar title="我的" :show-left-icon="false" />

    <view class="mine-top">
      <view class="mt-1">
        <image :src="IDcardBack" class="mt-11" />
        <view class="mt-12">
          <text class="mt-14">晚上好，坡先生</text>
          <view class="mt-15" @click="toPage({url: '/pages/mine/myIntegral/myIntegral'})">
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

    <view class="mine-middle">
      <view class="mm-1">
        <view class="mm-11">
          <view class="mm-12">0</view>
          <view class="mm-13">签到</view>
        </view>
        <view class="mm-11" @click="toPage({url: '/pages/mine/myCoupons/myCoupons'})">
          <view class="mm-12">3</view>
          <view class="mm-13">我的优惠券</view>
        </view>
        <view class="mm-11" @click="toPage({url: '/pages/mine/myWallet/myWallet'})">
          <view class="mm-12 mm-14">
            <text>12</text>
            <text class="mm-15">00</text>
          </view>
          <view class="mm-13 mm-131">我的钱包</view>
        </view>
      </view>

      <image class="mm-2" :src="IDcardBack" />

      <view class="mm-3">
        <template v-for="(i, index) in newList">
          <view class="mm-31" @click="toPage(i)" :key="i.url">
            <image class="mm-32" :src="i.img" />
            <view class="mm-33">{{ i.title }}</view>
						<view class="mm-33" v-if="i.title == '实名认证' && realAuth">已认证</view>
            <uni-icons type="arrowright" color="#BDBDBD" size="16" />
          </view>
          <view class="mm-35" v-if="index < (newList.length - 1)" />
        </template>
      </view>


      <view class="mm-3 mm-4">
        <template v-for="(i, index) in newList1">
          <view class="mm-31" @click="toPage(i)" :key="i.url">
            <image class="mm-32" :src="i.img" />
            <view class="mm-33">{{ i.title }}</view>
            <uni-icons type="arrowright" color="#BDBDBD" size="16" />
          </view>
          <view class="mm-35" v-if="index < (newList1.length - 1)" />
        </template>
      </view>

      <!-- todo 此区域为临时入口 联调时可删除  begin -->
      <view class="mm-3 mm-4">
        <template v-for="(i, index) in menuList">
          <view class="mm-31" @click="toPage(i)" :key="i.url">
            <image class="mm-32" :src="i.img" />
            <view class="mm-33">{{ i.title }}</view>
            <uni-icons type="arrowright" color="#BDBDBD" size="16" />
          </view>
          <view class="mm-35" v-if="index < (menuList.length - 1)" />
        </template>
      </view>
      <!-- todo 此区域为临时入口 联调时可删除  end -->

    </view>

    <view class="logout">退出登录</view>

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

export default {
  data() {
    return {
      demo: true,
      mineTopBack: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/mine-top-back.png',
      IDcardBack: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/idcard-back.png',
			realAuth: false,
    };
  },
  onReady() {
    this.$tool.actionForLogin();
		this.queryAuthInfo();
  },
  computed: {
    userName() {
      return this.$store.state.user.name
    },
    newList() {
      return [
        { title: '邀请好友', url: '', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-7.png' },
        { title: '承接方申请', url: '/pages/main/apply/apply', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-8.png' },
        { title: '实名认证', url: '/pages/mine/realNameAuth/realNameAuth', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-2.png' },
        { title: '我的银行账户', url: '/pages/mine/myBankCard/myBankCard', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-3.png' },
        { title: '发票信息', url: '/pages/mine/myInvoice/myInvoice', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-4.png' },
        { title: '我的投诉', url: '/pages/mine/myComplain/myComplain', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-5.png' },
        { title: '我的服务地址', url: '/pages/mine/addressManage/addressManage', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-6.png' },
      ]
    },
    newList1() {
      return [
        { title: '帮助中心', url: '/pages/mine/helpCenter/helpCenter', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png' },
        { title: '关于我们', url: '', img: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-1.png' },
      ]
    },

    // todo 此区域为临时入口 联调时可删除
    menuList() {
      return [
        { title: '积分商城', url: '' },
        { title: '我的服务地址', url: '/pages/mine/addressManage/addressManage' },//
        { title: '实名认证', url: '/pages/mine/realNameAuth/realNameAuth' },
        { title: '我的银行卡', url: '/pages/mine/myBankCard/myBankCard' },//
        { title: '发票信息', url: '/pages/mine/myInvoice/myInvoice' },
        { title: '我的投诉-临时', url: '/pages/mine/myComplain/myComplain' }, //
        { title: '发票发票-临时', url: '/pages/mine/myInvoice/myInvoice' },//
        { title: '发票抬头-临时', url: '/pages/mine/chooseLookUp/chooseLookUp' },
        { title: '发票信息添加-临时', url: '/pages/mine/editInvoice/editInvoice' },
        { title: '我的优惠券-临时', url: '/pages/mine/myCoupons/myCoupons' },
        { title: '实名认证-临时', url: '/pages/mine/realNameAuth/realNameAuth' },//
        { title: '帮助中心-临时', url: '/pages/mine/helpCenter/helpCenter' }, //
        { title: '报价-临时', url: '/pages/receive-order/offer/offer' },
        { title: '收益分配-临时', url: '/pages/receive-order/incomeDistribute/incomeDistribute' },
        { title: '报价详情-临时', url: '/pages/receive-order/offerDetail/offerDetail' },
        { title: '申请开始工作-临时', url: '/pages/receive-order/applyBeginWork/applyBeginWork' },
        { title: '投诉-临时', url: '/pages/receive-order/complaint/complaint' },
        { title: '我的团队-临时', url: '/pages/receive-order/myTeam/myTeam' },
        { title: '我的团队-详情-临时', url: '/pages/receive-order/viewMyTeam/viewMyTeam' },
        { title: '团队详情-临时', url: '/pages/receive-order/teamDetail/teamDetail' },
        { title: '接单设置-临时', url: '/pages/receive-order/orderToSet/orderToSet' },
        { title: '选择人员-临时', url: '/pages/receive-order/selectPerson/selectPerson' },
        { title: '人员详情-临时', url: '/pages/receive-order/peopleDetail/peopleDetail' },
        { title: '人员变更-临时', url: '/pages/receive-order/personChange/personChange' },
        { title: '变更记录-临时', url: '/pages/receive-order/changeRecord/changeRecord' },
        { title: '发单子页-临时', url: '/pages/place-order/receiptOrderZy/receiptOrderZy' },
        { title: '添加实施工作-临时', url: '/pages/place-order/addImplementation/addImplementation' },
        { title: '添加勘设工作-临时', url: '/pages/place-order/addCanBeSetWork/addCanBeSetWork' },
        { title: '添加人员工作-临时', url: '/pages/place-order/addPersonWork/addPersonWork' },
        { title: '添加租赁工作-临时', url: '/pages/place-order/addLeaseWork/addLeaseWork' },
        { title: '添加软件开发-临时', url: '/pages/place-order/addSoftwareDevelop/addSoftwareDevelop' },

        { title: '发单主页-临时', url: '/pages/place-order/placeOrder/placeOrder' },
        { title: '发单列表-临时', url: '/pages/place-order/placeOrderList/placeOrderList' },
        { title: '选价-临时', url: '/pages/place-order/choosePrice/choosePrice' },
        { title: '发单-订单详情-临时', url: '/pages/place-order/orderDetail/orderDetail' },
        { title: '发单-订单详情(完成订单)-临时', url: '/pages/place-order/orderDetailFinish/orderDetailFinish' },
        { title: '评价订单-临时', url: '/pages/place-order/evaluationOrder/evaluationOrder' },
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
    },
		// 查询是否实名认证
		queryAuthInfo() {
			this.$http.post('/b/customerrealauth/query', { }, true)
			.then(res => {
				this.realAuth = res.state == 1;
			})
		},
  }
};
</script>

<style src="./style.scss" lang="scss" scoped></style>

<style>
page {
  max-height: 100vh;
  overflow-y: scroll;
}
</style>
