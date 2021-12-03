<template>
  <view>
    <custom-navbar title="人员变更" />

    <back-container>
      <member-title :show-right="false" title="目前成员" />
      <view class="pc-01">
        <view class="pc-01-item" v-for="i in memberList" :key="i">
          <image class="pc-01-img" :src="MDicon" />
          <view class="pc-01-name">孙慧</view>
        </view>
      </view>
    </back-container>

    <view class="pc-02">
      <member-title title="变更人员" right-text="选择人员" @add="selectPerson" />
      <team-list-item v-for="i in changeList" :key="i.userId" :member="i" />
    </view>
		
		<big-btn buttonText="变更记录" @click="toChangeRecord"/>

    <iphonex-bottom>
      <big-btn @click="submitChange"/>
    </iphonex-bottom>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import MemberTitle from "../myTeam/memberTitle";
import MDicon from '../../../static/mine/MDicon.png';
import TeamListItem from "../myTeam/teamListItem";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "personChange",
  components: { BigBtn, IphonexBottom, TeamListItem, MemberTitle, BackContainer },
  data() {
    return {
      MDicon,
			id: 'M995083043754112',
			memberList: [], // 当前参与人员
			changeList: [], // 申请变更人员
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
		submitChange() {
			const params = {
				memberIdList: this.changeList.map((p) => p.userId),
				receiveOrderId: this.id,
			}
			this.$http.post('/b/ordermember/apply', params, true)
			.then(res => {
				this.$tool.showToast('变更申请已提交');
			})
		},
		toChangeRecord() {
			uni.navigateTo({
				url: `/pages/receive-order/changeRecord/changeRecord?id=${this.id}`,
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
