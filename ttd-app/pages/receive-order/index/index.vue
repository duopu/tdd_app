<!-- 接单 -->
<template>
  <view>
    <!--  <coming-soon></coming-soon> -->

    <custom-navbar title="接单" :show-left-icon="false" />

    <back-container>

      <template v-slot:headerSlot>
        <view class="receive-order">
          <view class="ro-1" v-for="i in list" :key="i.title" @click="toOrderList(i.state)">
            <view class="ro-11">{{ i.num }}</view>
            <view class="ro-12">{{ i.title }}</view>
          </view>

          <view class="ro-2" />

          <view class="ro-1 ro-16" @click="toOrderList(10)">
            <view class="ro-11">
              <image class="email-filled" src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/teamView.svg" />
            </view>
            <view class="ro-12 ro-13">所有订单</view>
          </view>
        </view>
      </template>

      <view class="ro-3">
        <view class="ro-31" v-for="(i, index) in earningList" :key="i.num">
          <view class="ro-32">
            <text class="ro-33" :class="index == 1 ? 'ro-33-active' : ''">{{ i.num }}</text>
            <text v-if="index != 0" class="ro-34">k</text>
          </view>
          <view class="ro-35">{{ i.title }}</view>
        </view>
      </view>

    </back-container>

    <view class="ro-4">
      <view class="ro-41">我的团队：</view>
      <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/iconCircleAdd.svg" class="add-img" />
      <text v-if="showCreateBtn" class="ro-43" @click="showCreateTeam()">创建团队</text>
    </view>

    <view class="ro-5">
      <view class="ro-51" v-for="(item, i) in teamList" :key="i" @click="toTeamDetail(item)">
        <image :src="item.teamLogo || 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon-4.png'" class="ro-52" />
        <view class="ro-53">{{ item.teamName }}</view>
      </view>
    </view>

		<edit-team ref="editTeam" btnText="创建" @onSave="createTeam" />

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import UniIcons from "../../../uni_modules/uni-icons/components/uni-icons/uni-icons";
import EditTeam from "../myTeam/editTeam";

export default {
  components: { UniIcons, BackContainer, EditTeam },
  data() {
    return {
      list: [
        { num: 0, title: '待报价', state: 10 },
        { num: 0, title: '待确认', state: 20 },
        { num: 0, title: '待开始', state: 30 },
        { num: 0, title: '待完工', state: 40 },
      ],
      earningList: [
        { num: 0, title: '完成订单' },
        { num: 0, title: '总收益' },
        { num: 0, title: '月平均收益' },
      ],
			teamList: [],
			showCreateBtn: false,
    };
  },
  onReady() {},
	onShow() {
		this.$tool.actionForLogin();
		this.refresh();
	},
	onPullDownRefresh() {
		this.refresh();
	},
	methods: {
		refresh() {
			this.queryMyTeamList();
			this.queryOrderCount();
			this.queryProfitStatistics();
		},
		queryOrderCount() {
			this.$http.post('/b/orderreceive/orderNumStatistics', {}, true)
			.then(res => {
				uni.stopPullDownRefresh();
				this.list[0].num = res.unQuoteNum;
				this.list[1].num = res.unConfirmNum;
				this.list[2].num = res.unStartNum;
				this.list[3].num = res.unCompleteNum;
			}).catch((e) => {
				uni.stopPullDownRefresh();
			})
		},
		queryProfitStatistics() {
			this.$http.post('/b/orderreceive/profitStatistics', {}, true)
			.then(res => {
				this.earningList[0].num = res.completeNum;
				this.earningList[1].num = res.totalProfit / 1000;
				this.earningList[2].num = res.monthAvgProfit / 1000;
			})
		},
		queryMyTeamList() {
			this.$http.post('/b/teaminfo/teamList', {}, true)
			.then(res => {
				this.teamList = res || [];
				let hasTeam = false;
				(res || []).forEach((t) => {
					if (t.leaderFlag) {
						hasTeam = true
					}
				});
				this.showCreateBtn = !hasTeam;
			})
		},
		toOrderList(state) {
			uni.navigateTo({
				url: `/pages/place-order/orderList/orderList?isPlaceOrder=0&state=${state}`,
			})
		},
		showCreateTeam() {
			this.$refs.editTeam.show();
		},
		createTeam(teamLogo, teamName, teamIntroduce) {
			if (!teamName) {
				uni.showToast({ title:  '请输入团队名称', icon:  'none' });
				return;
			}
			if (!teamIntroduce) {
				uni.showToast({ title:  '请输入团队介绍', icon:  'none' });
				return;
			}
			const params = {
				teamLogo: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com:443/public%2F2021%2F12%2F08%2F01%2F39%2FBN6YVGX89ULVUL388987718092178.jpeg',
				teamName,
				teamIntroduce,
			}
			this.$http.post('/b/teaminfo/add', params, true)
			.then(res => {
				uni.showToast({ title:  '创建成功' });
				this.queryMyTeamList();
			})
		},
		toTeamDetail(team) {
      console.log('ssssssssssss');
      uni.navigateTo({
				url: `/pages/receive-order/myTeam/myTeam?id=${team.id}`
			})
		}
	}
}
</script>
<style lang="scss" src="./style.scss" scoped>

</style>
<style lang="scss" scoped>
.receive-order {
  display: flex;
  padding: 48rpx 36rpx 64rpx 46rpx;

  .ro-1 {
    min-width: 116rpx;
    height: 116rpx;
    margin-right: 12rpx;

    .ro-11 {
      font-size: 52rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
      line-height: 64rpx;
      text-align: center;
    }

    .email-filled {
      width: 50rpx;
      height: 50rpx;
    }

    .ro-12 {
      margin-top: 16rpx;
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 0.6);
      line-height: 36rpx;
    }

    .ro-13 {
      margin-top: 17rpx;
    }
  }

  .ro-16 {
    margin: 0 0 0 22rpx;
  }

  .ro-2 {
    width: 2rpx;
    height: 104rpx;
    background: #FFFFFF;
    opacity: 0.15;
  }
}

.ro-3 {
  height: 195rpx;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 78rpx;

  .ro-31 {
    .ro-32 {
      text-align: center;

      .ro-33 {
        font-size: 36rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #5AC8FA;
        line-height: 44rpx;
      }

      .ro-34 {
        font-size: 20rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 44rpx;
        color: #2C3580;
        padding-left: 8rpx;
      }

      .ro-33-active {
        font-size: 52rpx;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        line-height: 64rpx;
      }
    }

    .ro-35 {
      text-align: center;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 36rpx;
      color: #2C3580;
    }
  }
}

.ro-4 {
  display: flex;
  height: 104rpx;
  padding: 48rpx 32rpx 16rpx 32rpx;
  box-sizing: border-box;

  .ro-41 {
    flex: 1;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #4F4F4F;
  }

  .add-img {
    width: 32rpx;
    margin-top: 5rpx;
    height: 32rpx;
  }

  .ro-43 {
    padding-left: 12rpx;
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #1059FA;
  }
}

.ro-5 {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  width: 748rpx;
  height: 244rpx;
  background: #FFFFFF;
  box-sizing: border-box;
  padding: 32rpx 0 32rpx 32rpx;

  .ro-51 {
    margin-right: 32rpx;
    width: 128rpx;
    flex-shrink: 0;

    .ro-52 {
      width: 128rpx;
      height: 128rpx;
      border-radius: 8rpx;
    }

    .ro-53 {
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 36rpx;
      text-align: center;
      color: #323232;
    }
  }
}
</style>
<style lang="scss">
  @import "../../mine/addressManage/_pageStyle.scss";
</style>
