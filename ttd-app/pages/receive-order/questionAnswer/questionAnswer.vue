<template>
  <view>
    <custom-navbar title="问答" />

    <back-container>
      <view class="qus-detail">
        <view class="qus-it" v-for="(question, index) in questionList" :key="index">
          <view class="qus-1">
            <image :src="MDicon" class="qus-1image" />
            <view class="qus-1right">
              <view class="qus-1right-top">
                <text class="qus-1tag">{{ question.questionJob }}</text>
                <text class="qus-1time">{{ question.addTime }}</text>
              </view>
              <view class="qus-1content">{{ question.content }}</view>
              <view class="qus-1img-list">
                <image :src="p" class="qus-1img-item" v-for="p in question.pictureList" :key="p" />
              </view>
            </view>
          </view>

          <view class="qus-1 qus-2">
            <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/reply.svg" class="qus-1image" />
            <view class="qus-1right">
              <view class="qus-1right-top">
                <text class="qus-1tag qus-2tag">发单者回复</text>
                <text class="qus-1time">{{ question.answerList[0].addTime || '' }}</text>
              </view>
              <view v-if="question.answerList.length > 0" class="qus-2text">{{ question.answerList[0].content || '' }}</view>
              <view class="qus-1img-list">
								<template v-if="question.answerList.length > 0 && question.answerList[0].pictureList.length > 0">
                  <image :src="p" class="qus-1img-item" v-for="p in question.answerList[0].pictureList" :key="p" />
								</template>
                <view class="qus-1img-empty" v-if="question.answerList.length == 0" >
                  <image src="https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/empty-icon-11.svg" class="qus-1img-empty-img" />
                  <view class="qus-1img-empty-text">目前没有回答</view>
									<view class="qus-1img-empty-btn" @click="answerQuestion(question.id)">回答</view>
                </view>
              </view>
            </view>
          </view>
        </view>
				<list-empty v-if="!questionList.length" />
      </view>
    </back-container>

    <iphonex-bottom v-if="!isPlaceOrder" z-index="99">
      <big-btn button-text="我要提问" @click="$refs.askQuestionsModel.show()" />
    </iphonex-bottom>

    <ask-questions-model
		  ref="askQuestionsModel"
			:showType="!isPlaceOrder"
			:cateList="cateList"
			@onConfirm="confirmQuestion"
		/>

  </view>
</template>
<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import OfferHead from "../component/offerHead";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";
import AskQuestionsModel from "./askQuestionsModel";
import ListEmpty from "../../place-order/orderList/listEmpty";

export default {
  name: "questionAnswer",
  components: { ListEmpty, AskQuestionsModel, BigBtn, IphonexBottom, OfferHead, BackContainer },
  data() {
    return {
      MDicon: 'https://ttd-public.obs.cn-east-3.myhuaweicloud.com/app-img/mine/MDicon.png',
      id: '',
			isPlaceOrder: false,
			questionId: '',
      questionList: [],
			cateList: [],
    };
  },
	onLoad(option) {
		if (option.isPlaceOrder) {
			this.isPlaceOrder = option.isPlaceOrder ==  '1';
		}
		if (option.id) {
			this.id = option.id;
			this.queryQuestionList();
			this.queryWorkList();
		}
	},
	onReady() {},
	methods: {
		queryQuestionList() {
			this.$http.post('/b/orderquestionanswer/queryList', { receiveOrderId: this.id }, true)
			.then(res => {
				this.questionList = res;
			})
		},
		queryWorkList() {
			this.$http.post('/b/orderquote/receiveQuoteDetail', { id: this.id }, true)
			.then(res => {
			  this.cateList = (res.orderItemList || []).map((item) => item.cateName);
			})
		},
		answerQuestion(id) {
			this.questionId = id;
			this.$refs.askQuestionsModel.show();
		},
		confirmQuestion(p) {
			let url = `/b/orderquestionanswer/${this.isPlaceOrder ? 'answer' : 'put'}Question`;
			const params = {
				...p,
				questionId: this.questionId,
				receiveOrderId: this.id,
			};
			this.$http.post(url, params, true)
			.then(res => {
				uni.showToast({
					title: `${this.isPlaceOrder ? '回复' : '咨询'}已提交`,
					success: () => {
            this.$refs.askQuestionsModel.hide();
						this.queryQuestionList();
					}
				});
			})
		},
	}
}
</script>
<style lang="scss">
.qus-detail {
  padding-bottom: 200rpx;
  background-color: #ECEDF9;

  .qus-it {
    margin-bottom: 32rpx;
    padding-left: 32rpx;
    background-color: white;

    .qus-1 {
      padding-top: 32rpx;
      display: flex;

      .qus-1right {
        margin-left: 20rpx;
        border-bottom: 1rpx solid #EBEDF0;

        .qus-1content {
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #323335;
          line-height: 36rpx;
          margin: 32rpx 0 16rpx 0;
        }
      }
    }

    .qus-1image {
      flex-shrink: 0;
      margin-top: 5rpx;
      width: 32rpx;
      height: 32rpx;
    }

    .qus-1right-top {
      @include flexBetween;
      padding-right: 32rpx;

      .qus-1tag {
        height: 40rpx;
        border-radius: 8rpx;
        border: 2rpx solid #EDEDED;
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #4F4F4F;
        padding: 0 12rpx;
        @include flexCenter;
      }

      .qus-1time {
        font-size: 24rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 32rpx;
      }

      .qus-2tag {
        background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
        color: #FFFFFF;
      }
    }

    .qus-2text {
      padding: 32rpx;
      box-sizing: border-box;
      margin: 36rpx 32rpx 16rpx 0;
      background: #F3F4F5;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      line-height: 36rpx;
    }

    .qus-1img-list {
      display: flex;
      flex-flow: row wrap;
      padding-bottom: 32rpx;

      .qus-1img-item {
        width: 128rpx;
        height: 128rpx;
        border-radius: 8rpx;
        margin: 0 20rpx 20rpx 0;
      }

      .qus-1img-empty {
        flex: 1;
        display: flex;
        align-items: center;
        padding: 32rpx;

        .qus-1img-empty-img {
          width: 64rpx;
          height: 64rpx;
        }
        .qus-1img-empty-text {
          flex: 1;
          padding-left: 24rpx;
          font-size: 28rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #828282;
        }
				.qus-1img-empty-btn {
				  width: 80rpx;
				  height: 48rpx;
				  border-radius: 32rpx;
				  border: 2rpx solid #EDEDED;
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
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
