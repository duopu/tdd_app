<template>
  <view class="receipt">
    <custom-navbar title="发单" />

    <back-container>
      <template #headerSlot>
        <offer-head :title="typeArray[orderType - 1].title" :text="typeArray[orderType - 1].intro" />
      </template>

      <view class="receipt-addr">
        <view class="receipt-ac-item">
          <view class="receipt-ac-lable">下单模式</view>
					<picker class="receipt-ac-midle" @change="orderModeChange" :value="orderModeText" :range="modeArray" range-key="title">
						<view >{{ orderModeText || '请选择' }}</view>
					</picker>

          <uni-icons class="receipt-ac-right" type="arrowright" size="18" color="#969799" />
        </view>

        <view v-if="orderMode == 0" class="receipt-ac-item">
          <view class="receipt-ac-lable">承接人手机号</view>
          <input class="receipt-ac-midle" :value="appointPhone" @input="(e) => onInput(e, 'phone')" placeholder="可选输入" placeholder-class="input-placeholder" />
        </view>

        <my-choose-time v-model="quoteTime" title="报价周期" @change="(time) => onTimeChange(time, 1)" />

        <my-choose-time v-model="workTime" title="工作周期" @change="(time) => onTimeChange(time, 2)" />

        <checkd-item :value="invoiceType" @change="change" />

      </view>
    </back-container>

    <view class="address-box">
      <member-title title="工作地址：" :show-right="false" />
      <view class="address-bi" @click="selectAddress">
        <image src='https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png' class="address-img" />
        <view class="address-right">
          <view class="address-rt">
            <text class="address-rt1">{{ orderAddress.name || ''}}</text>
            <text class="address-rt2">{{ orderAddress.phone || ''}}</text>
            <uni-icons type="arrowright" size="18" color="#969799" />
          </view>
          <view class="address-rb">
					  {{ orderAddress.province
						 ? `${orderAddress.province} ${orderAddress.city} ${orderAddress.district} ${orderAddress.address}`
						 : '' }}
					</view>
        </view>
      </view>
    </view>

    <view class="require-box">
      <member-title title="工作需求：" right-text="添加工作" @add="toAddWorkPage" />
      <view class="require-white">
        <offer-content-card
				v-for="(i, index) in orderItemList"
				:key="index"
				right-type="0"
				:title="getItemTitle(i)"
				:specItem="getSpecList(i)"
        :show-last-border-bottom="index < (orderItemList.length -1)"
				@onClick="toEditWorkPage(index, i)"
			  />
      </view>
    </view>

    <view class="require-bbl">
      <add-remark :value="remark" @input="remarkChange" />

      <view class="top-aline111" />

      <view class="require-order-set21">
        <view class="require-order-set21-title">接单范围</view>
        <input placeholder="请输入" class="require-input-so" :value="distance" @input="(e) => onInput(e, 'distance')" placeholder-class="placeholder-class" />
        <text class="require-order-set2-unit">公里</text>
      </view>
    </view>

    <iphonex-bottom :z-index="99">
      <big-btn @click="submitOrder"/>
    </iphonex-bottom>
  </view>
</template>

<script>

import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../../receive-order/component/offerHead";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";
import CheckdItem from "./checkdItem";
import MemberTitle from "../../receive-order/myTeam/memberTitle";
import OfferContentCard from "../../receive-order/component/offerContentCard";
import MyChooseTime from "./myChooseTime";
import AddRemark from "../../receive-order/component/addRemark";

export default {
  name: 'placeOrder',
  components: { AddRemark, MyChooseTime, OfferContentCard, MemberTitle, CheckdItem, BigBtn, IphonexBottom, OfferHead, BackContainer },
  data() {
    return {
			orderType: 1,
			typeArray: [
				{ orderType: 1, title: '实施与维修', intro: '电子产品的实施与维修工作', url: '/pages/place-order/addImplementation/addImplementation' },
				{ orderType: 2, title: '勘察设计', intro: '为工程项目进行测量、勘探、试验和鉴定、评价的工作', url: '/pages/place-order/addCanBeSetWork/addCanBeSetWork' },
				{ orderType: 3, title: '各类专业人员', intro: '各类形形式式的专业人员', url: '/pages/place-order/addPersonWork/addPersonWork' },
				{ orderType: 4, title: '租赁工作', intro: '租赁各种大小型机动车或专业特种用车', url: '/pages/place-order/addLeaseWork/addLeaseWork' },
				{ orderType: 5, title: '软件开发', intro: '寻找各类型程序猿、设计湿等，为改变世界而奋斗', url: '/pages/place-order/addSoftwareDevelop/addSoftwareDevelop' },
			],
			modeArray: [{ title: '指定承接人', id: 0 }, { title: '匹配承接人', id: 1 }],
			orderMode: 1, // 下单模式 0指定承接人 1匹配承接人
			orderModeText: '匹配承接人',
			appointPhone: '', // 指定承接人手机
			distance: 0, // 期望接单距离
			invoiceType: 1, // 发票类型 1专票 2普票
			orderAddress: {
				name: '',
				phone: '',
				province: '',
				city: '',
				district: '',
				address: '',
			}, // 地址
			orderItemList: [], // 工作列表
			quoteTime: [], // 报价周期
			workTime: [], // 工作周期
			remark: '', // 备注
    }
  },
	onLoad(option) {
		if (option.orderType) {
			this.orderType = Number(option.orderType);
		}
	},
	onReady() {
		this.queryDefaultAddress();
	},
  methods: {
		queryDefaultAddress() {
			this.$http.post('/b/customeraddress/queryPageList', { defaultFlag: 1 }, true)
			.then(res => {
				if (res.totalCount == 1) {
					this.orderAddress = res.dataList[0];
				}
			})
		},
		orderModeChange(e) {
			const index = e.target.value;
			this.orderMode = this.modeArray[index].id;
			this.orderModeText = this.modeArray[index].title;
		},
    change(data) {
      this.invoiceType = data
    },
		onInput(e, type) {
			const text = e.target.value;
			if (type == 'phone') {
				this.appointPhone = text;
			} else if (type == 'distance') {
				this.distance = text;
			}
		},
		onTimeChange(time, id) {
			console.log('time ', time, id);
		},
		remarkChange(value) {
			this.remark = value;
		},
		selectAddress() {
			uni.navigateTo({
				url: `/pages/mine/addressManage/addressManage?isSelect=1`,
				events: {
					onSelect: (address) => {
						this.orderAddress = address;
					}
				}
			})
		},
		getItemTitle(work) {
			if (this.orderType == 1) {
				return work.type == 1 ? '实施' : '维修';
			} else if (this.orderType == 2) {
				return '勘测';
			} else if (this.orderType == 3) {
				return work.cateName;
			} else if (this.orderType == 4) {
				return work.cateName;
			} else if (this.orderType == 5) {
				return work.cateName;
			}
			return '';
		},
		getSpecList(work) {
			if (this.orderType == 1) {
				// 实施
				return [
					{ label: '技能：', value: work.cateName },
					{ label: '品牌/型号：', value: `${work.brand}/${work.model ? work.model : '-'}` },
					{ label: '数量：', value: work.number },
				];
			} else if (this.orderType == 2) {
				// 勘测
				return [
					{ label: '面积：', value: work.number },
				];
			} else if (this.orderType == 3) {
				// 人员岗位
				return [
					{ label: '数量：', value: work.number },
				];
			} else if (this.orderType == 4) {
				// 设备
				return [
					{ label: '数量：', value: work.number },
					{ label: '使用路程：', value: work.distance },
				];
			}
			return [];
		},
		toAddWorkPage() {
			uni.navigateTo({
				url: this.typeArray[this.orderType - 1].url,
				events: {
					onEdit: (work) => {
						this.orderItemList.push(work);
					}
				}
			})
		},
		toEditWorkPage(index, work) {
			uni.navigateTo({
				url: this.typeArray[this.orderType - 1].url,
				events: {
					onEdit: (work) => {
						this.orderItemList.splice(index, 1, work);
					}
				},
				success: (res) => {
				    // 通过eventChannel向被打开页面传送数据
				    res.eventChannel.emit('editWork', work);
				  }
			})
		},
    submitOrder() {
			const params = {
				appointPhone: this.appointPhone ? this.appointPhone : undefined,
				distance: this.distance ? this.distance : undefined,
				invoiceType: this.invoiceType,
				orderAddress: this.orderAddress,
				orderItemList: this.orderItemList,
				orderMode: this.orderMode,
				orderType: this.orderType,
				quotationEnd: this.quoteTime[1],
				quotationStart: this.quoteTime[0],
				remark: this.remark,
				workEnd: this.workTime[1],
				workStart: this.workTime[0],
			}
			this.$http
				.post('/b/ordermaster/add', params, true)
				.then(res => {
					uni.showToast({
						title: '发布成功',
						success: () => {
							uni.navigateBack({});
						}
					})
				});
    },
  }
}
</script>

<style lang="scss" scoped>
.receipt {
  .receipt-addr {
    box-sizing: border-box;
    padding: 15rpx 0 0 32rpx;

    .receipt-ac-item {
      display: flex;
      align-items: center;
      height: 88rpx;
      padding-right: 32rpx;

      &:not(:nth-last-child(1)) {
        border-bottom: 1rpx solid #EBEDF0;
      }

      .receipt-ac-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .receipt-ac-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }

      .receipt-ac-right {
        padding-left: 18rpx;
      }
    }
  }

  /deep/ .input-placeholder {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
  }

  .address-box {
    margin-top: 16rpx;

    .address-bi {
      padding: 32rpx;
      background-color: white;
      display: flex;

      .address-img {
        flex-shrink: 0;
        width: 96rpx;
        height: 96rpx;
        background: #F3F4F5;
        border-radius: 8rpx;
        margin-right: 16rpx;
      }

      .address-right {
        flex: 1;

        .address-rt {
          display: flex;
          align-items: center;

          .address-rt1 {
            flex: 1;
            font-size: 28rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #323232;
            line-height: 40rpx;
          }

          .address-rt2 {
            flex-shrink: 0;
            font-size: 28rpx;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #969799;
            line-height: 36rpx;
          }
        }

        .address-rb {
          width: 414rpx;
          margin-top: 16rpx;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #969799;
          line-height: 36rpx;
        }
      }
    }
  }

  .require-box {
    margin: 16rpx 0 32rpx 0;

    .require-white {
      background-color: white;
      padding-left: 32rpx;
    }
  }

  .require-bbl {
    margin: 0 0 200rpx 0;
    background-color: white;

    .top-aline111 {
      margin: 30rpx 0 0 32rpx;
      height: 1rpx;
      background-color: #EAECEF;
    }

    .require-order-set21 {
      height: 88rpx;
      @include flexBetween;
      padding: 0 32rpx;

      .require-order-set21-title {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
        line-height: 36rpx;
      }

      .require-input-so {
        flex: 1;
        text-align: right;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
      }

      .require-order-set2-unit {
        padding-left: 8rpx;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
      }
    }
  }
}
</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
