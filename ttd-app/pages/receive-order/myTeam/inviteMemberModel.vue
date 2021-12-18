<template>
  <modal-box title="邀请成员" ref="modelBox" @confirm="confirm">
    <template #slot1>
      <view class="invite-mem">
        <view class="invite-member">
          <view class="invite-member1">手机号：</view>
          <view class="invite-member2">
            <input class="invite-member4" :value="phone" @input="onInput" placeholder-class="input-placeholder" />
          </view>
          <view class="invite-member3" @click="search">查找</view>
        </view>

        <view class="i-member-list" v-if="list">
          <view class="i-member-item" v-for="(p, index) in list" :key="index">
            <image class="i-member-item1"
                   src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png" />
            <view class="i-member-item2">
              <view class="i-member-item3">
                <text class="i-member-item4">{{ p.name }}</text>
                <text class="i-member-item5">{{ p.phone }}</text>
              </view>
              <view class="i-member-item6">
                <view class="i-member-item7" v-for="i in 3" :key="i">技能{{ i }}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </template>
  </modal-box>
</template>
<script>
import ModalBox from "../../place-order/choosePrice/modalBox";

export default {
  name: "inviteMemberModel",
  components: { ModalBox },
	props: {
		list: [],
	},
  data() {
    return {
			phone: '',
    }
  },
  methods: {
    show() {
      this.$refs.modelBox.show();
    },
    hide() {
      this.$refs.modelBox.hide();
    },
		onInput(e) {
			this.phone = e.target.value;
		},
		search() {
			this.$emit('onSearch', this.phone);
		},
		confirm() {
			const p = this.list[0];
			this.$emit('onConfirm', p ? p.id : '');
		},
  }
}
</script>
<style scoped lang="scss">
@import "../../mine/addressManage/_commonPlaceholder.scss";

.invite-mem {
  .invite-member {
    margin: 0 48rpx 0 48rpx;
    display: flex;
    align-items: center;

    .invite-member1 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }

    .invite-member2 {
      padding: 0 16rpx;
      width: 226rpx;
      height: 48rpx;
      background: #F3F4F5;
      border-radius: 8rpx;
      margin: 0 16rpx;

      .invite-member4 {
        font-size: 30rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
      }
    }

    .invite-member3 {
      width: 80rpx;
      height: 48rpx;
      border-radius: 8rpx;
      border: 2rpx solid #EDEDED;
      @include flexCenter;
    }
  }

  .i-member-list {
    margin-bottom: 48rpx;

    .i-member-item {
      margin-top: 16rpx;
      background-color: #F3F4F5;
      display: flex;
      padding: 32rpx;

      .i-member-item1 {
        flex-shrink: 0;
        margin-right: 20rpx;
        width: 96rpx;
        height: 96rpx;
        border-radius: 8rpx;
      }

      .i-member-item2 {
        flex: 1;

        .i-member-item3 {
          .i-member-item4 {
            display: inline-block;
            font-size: 28rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #323335;
            line-height: 36rpx;
            margin-right: 16rpx;
          }

          .i-member-item5 {
            display: inline-block;
            font-size: 24rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #828282;
            line-height: 36rpx;
          }
        }

        .i-member-item6 {
          display: flex;
          flex-flow: row wrap;
          margin-top: 16rpx;

          .i-member-item7 {
            margin-right: 8rpx;
            height: 32rpx;
            background: #EDEDED;
            padding: 0 8rpx;
            border-radius: 8rpx;
            font-size: 24rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #4F4F4F;
            @include flexCenter;
          }
        }
      }
    }
  }
}

</style>
