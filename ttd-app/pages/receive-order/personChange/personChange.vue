<template>
  <view>
    <custom-navbar title="人员变更" />

    <back-container>
      <member-title :show-right="false" title="目前成员" />
      <view class="pc-01">
        <view class="pc-01-item" v-for="i in memberList" :key="i">
          <image class="pc-01-img" src='https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png' />
          <view class="pc-01-name">孙慧</view>
        </view>
      </view>
    </back-container>

    <view class="pc-02">
      <member-title title="变更人员" :showRight="!isPlaceOrder" right-text="选择人员" @add="selectPerson" />
      <team-list-item v-for="i in changeList" :key="i.userId" :member="i" />
    </view>

    <iphonex-bottom>
			<view v-if="isPlaceOrder">
        <big-btn buttonText="确认变更" @click="approveChange(1)"/>
        <big-btn buttonText="拒绝变更" @click="approveChange(2)"/>
			</view>
			<view v-else>
				<big-btn buttonText="提交申请" @click="submitChange"/>
			</view>
    </iphonex-bottom>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import MemberTitle from "../myTeam/memberTitle";
import TeamListItem from "../myTeam/teamListItem";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "personChange",
  components: { BigBtn, IphonexBottom, TeamListItem, MemberTitle, BackContainer },
  data() {
    return {
			id: '',
			isPlaceOrder: false, // 是否是发单方
			memberList: [], // 当前参与人员
			changeList: [], // 申请变更人员
    }
  },
	onLoad(option) {
		if (option.isPlaceOrder) {
			this.isPlaceOrder = option.isPlaceOrder ==  '1';
		}
		if (option.id) {
			this.id = option.id;
			this.queryMemberList();
		}
	},
	onReady() {
		this.queryMemberList();
	},
  methods: {
		queryMemberList() {
			this.$http.post('/b/ordermember/queryMemberListAndApplyInfo', { id: this.id }, true)
			.then(res => {
				this.memberList = res.curtOrderMemberList;
				this.changeList = res.applyMemberList;
			})
		},
		selectPerson() {
			uni.navigateTo({
				url: '/pages/receive-order/selectPerson/selectPerson',
				events: {
					onSelect: (list) => {
						this.changeList = list;
					}
				},
				success: (res) => {
				    // 通过eventChannel向被打开页面传送数据
				    res.eventChannel.emit('selectPerson', this.changeList);
				  }
			})
		},
		approveChange(state) {
			const params = {
				id: this.id,
				approveState: state,
			}
			this.$http.post('/b/ordermember/approve', params, true)
			.then(res => {
				uni.showToast({
					title: `变更申请已${state == 1 ? '通过' : '拒绝'}`,
					success: () => {
						uni.navigateBack({});
					}
				})
			})
		},
		submitChange() {
			const params = {
				memberIdList: this.changeList.map((p) => p.userId),
				receiveOrderId: this.id,
			}
			this.$http.post('/b/ordermember/apply', params, true)
			.then(res => {
				uni.showToast({
					title: '变更申请已提交',
					success: () => {
						uni.navigateBack({});
					}
				})
			})
		},
	}
}
</script>
<style lang="scss" scoped>
.pc-01 {
  padding: 32rpx;
  display: flex;
  flex-flow: wrap row;

  .pc-01-item {
    margin-right: 58rpx;
    width: 127rpx;

    &:nth-of-type(4n + 4) {
      margin: 0;
    }

    .pc-01-img {
      width: 127rpx;
      height: 127rpx;
      border-radius: 8rpx;
    }

    .pc-01-name {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      text-align: center;
      margin-top: 16rpx;
      color: #323232;
      line-height: 36rpx;
    }
  }
}

.pc-02 {
  background-color: white;
  margin: 32rpx 0 200rpx 0;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
