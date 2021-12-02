<template>
  <view>
    <custom-navbar title="人员详情" />

    <view class="pd-top">
      <view v-if="idCard" class="pd-top1">
        <image class="pd-top1-img" src="/static/mine/trophy-icon.svg" />
        <text class="pd-top1-text">已实名认证</text>
      </view>
    </view>

    <view class="pd-header">
      <image v-if="headImgUrl" :src="headImgUrl" class="pd-header-img" />
      <image v-else :src="MDicon" class="pd-header-img" />
      <view class="pd-header-text">
        <image class="pd-header-edit-image" src="/static/mine/iconEditBlack.svg" />
        <text class="pd-header-edtext">编辑信息</text>
      </view>
      <view class="pd-header-name">{{ name }}</view>

      <view class="pd-header-phone pd-header-phone1">
        <image src="/static/mine/linkPhoneIcon.svg" class="pd-header-edit-icon" />
        <text class="pd-header-phonenum">手机号：{{ phone.slice(0, 3) }} {{ phone.slice(3, 7) }} {{ phone.slice(7, 11) }}</text>
      </view>

      <view class="pd-header-phone">
        <image src="/static/mine/linkPeopleIcon.svg" class="pd-header-edit-icon" />
        <text class="pd-header-phonenum">
					身份证：{{ idCard ? `${ idCard.slice(0, 6) } ${ idCard.slice(6, 14) } ${ idCard.slice(14, 18) }` : '-' }}
				</text>
      </view>

      <view class="pd-header-info">意大利民事保护部门24日发布的数据显示，意大利当天新增新冠死亡病例420例，是3月18日以来最低日增幅，累计死亡病例25969例。</view>
    </view>

    <view class="pd-skill" v-for="i in ['技能', '岗位', '项目', '工具']" :key="i">
      <member-title :show-right="false" :title="i" />
      <view class="pd-skill-item" v-for="i in 3" :key="i">
        <view class="pd-skill-it1">金鱼{{ i }}</view>
        <view class="pd-skill-it2">
          <text class="pd-skill-it3" v-for="i in ['技能', '技能1', '技能2']" :key="i">{{ i }}</text>
        </view>
      </view>
    </view>

    <view class="pd-comment">
      <member-title :show-right="false" title="评价" />
      <evaluate-card v-for="i in commentList" :key="i.id" :comment="i"/>
    </view>

  </view>
</template>
<script>
import MDicon from '../../../static/mine/MDicon.png';
import MemberTitle from "../myTeam/memberTitle";
import EvaluateCard from "../myTeam/evaluateCard";

export default {
  name: "peopleDetail",
  components: { EvaluateCard, MemberTitle },
  data() {
    return {
      MDicon, // TODO 更换图片后可删掉
			id: '',
			idCard: '',
			headImgUrl: '',
			name: '',
			phone: '',
			projectSet: [], // 项目列表
			skillSet: [], // 技能
			toolSet: [], // 工具
			userRoleSet: [], // 岗位
			commentList: [], // 评论列表
    };
  },
	onLoad(option) {
		if (option.id) { // 编辑地址
		  this.id = option.id;
			this.queryPersonInfo(this.id);
			this.queryComments(this.id);
		}
	},
	methods: {
		queryPersonInfo(id) {
			this.$http
				.post('/b/customer/queryDetailInfo', { id }, true)
				.then(res => {
					this.idCard = res.idCard;
					this.headImgUrl = res.headImgUrl;
					this.name = res.name;
					this.phone = res.phone;
					this.projectSet = res.projectSet;
					this.skillSet = res.skillSet;
					this.toolSet = res.toolSet;
					this.userRoleSet = res.userRoleSet;
				});
		},
		queryComments(userId) {
			this.$http
				.post('/b/ordercomment/queryPageList', { 
					userId,
					userType: 1,
				}, true)
				.then(res => {
					this.commentList = res.dataList;
				});
		},
	},
}
</script>
<style lang="scss" scoped>
.pd-top {
  background: linear-gradient(90deg, #323E99 0%, #303C94, #2C3682);
  height: 148rpx;
  box-sizing: border-box;
  padding-top: 16rpx;

  .pd-top1 {
    @include flexCenter;
    box-sizing: border-box;
    margin: 0 32rpx 0 auto;
    height: 48rpx;
    width: 200rpx;
    border-radius: 8rpx;
    border: 2rpx solid #828282;

    .pd-top1-img {
      width: 32rpx;
      height: 32rpx;
    }

    .pd-top1-text {
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
      line-height: 32rpx;
      margin-left: 16rpx;
    }
  }
}

.pd-header {
  padding: 24rpx 32rpx 32rpx 32rpx;
  background-color: white;
  position: relative;

  .pd-header-img {
    background-color: #F3F4F5;
    width: 200rpx;
    height: 200rpx;
    position: absolute;
    left: 48rpx;
    top: -103rpx;
    border-radius: 100%;
  }

  .pd-header-text {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: auto;
    width: 176rpx;
    height: 48rpx;

    .pd-header-edit-image {
      width: 36rpx;
      height: 36rpx;
    }

    .pd-header-edtext {
      padding: 0 16rpx;
      font-size: 24rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 32rpx;
    }
  }

  .pd-header-name {
    font-size: 52rpx;
    margin-top: 60rpx;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 500;
    color: #2C3580;
    line-height: 64rpx;
  }

  .pd-header-phone {
    display: flex;
    align-items: center;

    .pd-header-phonenum {
      padding-left: 16rpx;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
    }

    .pd-header-edit-icon {
      flex-shrink: 0;
      width: 32rpx;
      height: 32rpx;
    }
  }

  .pd-header-phone1 {
    margin: 48rpx 0 16rpx 0;
  }

  .pd-header-info {
    width: 686rpx;
    background: #F3F4F5;
    box-sizing: border-box;
    padding: 32rpx;
    border-radius: 8rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #828282;
    line-height: 48rpx;
    margin-top: 32rpx;
  }
}

.pd-skill {
  background-color: white;
  margin-top: 32rpx;
  .pd-skill-item {
    margin-left: 32rpx;
    border-bottom: 1rpx solid #EBEDF0;
    padding-bottom: 24rpx;
    &:nth-last-child(1){
      border: none;
    }

    .pd-skill-it1 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
      line-height: 36rpx;
      margin: 28rpx 0 20rpx 0;
    }
    .pd-skill-it2 {
      display: inline-flex;
      flex-flow: row wrap;
      .pd-skill-it3 {
        margin-right: 16rpx;
        min-width: 72rpx;
        height: 40rpx;
        border-radius: 8rpx;
        @include flexCenter;
        border: 2rpx solid #EDEDED;
      }
    }
  }
}

.pd-comment {
  background-color: white;
  margin: 32rpx 0;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
