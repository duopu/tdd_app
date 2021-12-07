<template>
  <view>
    <custom-navbar title="评价订单" />

    <back-container>

      <view class="eva-o">
        <view class="eva-oi" v-for="i in 3" :key="i">
          <view class="eva-oit">
            <text class="eva-oit-text">
              给
              <text class="eva-oit-name" :class="i === 1 ? 'eva-oit-name-orange' : ''">黑涩会</text>
              打分
            </text>
            <uni-icons type="arrowup" size="18" color="#969799" />
          </view>

          <view class="eva-ostar-box">
            <view class="eva-ostar">
              <uni-rate :value="4" size="32" :margin="5" allow-half @change="(e) => starChange(e, i)"/>
            </view>
            <view class="eva-ostart-text">2.5分 一般般，需要再努力</view>
          </view>

          <add-remark label="评价内容：" :value="i.content" @change="(text) => contentChange(text, i)" />

          <view class="upload-list-obox">
            <upload-list upload-text="添加照片" :img-list="i.imgUrlList" @upload="chooseImage(i)" />
          </view>
        </view>
      </view>
    </back-container>

    <view class="eva-oline-line" />

    <iphonex-bottom>
      <big-btn @click="commitComment"/>
    </iphonex-bottom>

  </view>
</template>

<script>
import BackContainer from "../../mine/addressManage/component/backContainer";
import AddRemark from "../../receive-order/component/addRemark";
import MyStar from "../../receive-order/myTeam/myStar";
import UploadList from "../../receive-order/component/uploadList";
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";

export default {
  name: "evaluationOrder",
  components: { BigBtn, IphonexBottom, UploadList, MyStar, AddRemark, BackContainer },
  data() {
    return {
			id: '',
			memberList: [],
    };
  },
	onLoad(option) {
		if (option.id) {
			this.id = option.id;
			this.queryMemberList();
		}
	},
  methods: {
		queryMemberList() {
			this.$http.post('/b/ordermaster/queryPageList', { id: this.id }, true)
			.then(res => {
				this.memberList = res.dataList.map((p) => {
					return {
						content: '',
						imgUrlList: [],
						score: 0,
						userId: p.userId,
						userType: p.userType,
					}
				})
			})
		},
		starChange(e, person) {
			person.score = e.value;
		},
    contentChange(text, person) {
      person.content = text;
    },
		chooseImage(person) {
			uni.chooseImage({
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    success: (res) => {
							const path = res.tempFilePaths[0];
							this.uploadImage(path, person);
			    }
			});
		},
		uploadImage(path, person) {
			const param = {
				file: path,
			};
			this.$http.upload({ path }, true)
			.then(res=>{
				person.imgUrlList.push(res);
			});
		},
		commitComment() {
			const params = {
				orderCommentList: this.memberList,
				receiveOrderId: this.id,
			};
			this.$http.post('/b/ordercomment/add', params, true)
			.then(res => {
			  uni.showToast({
			  	title: '评价已提交',
					success: () => {
					uni.navigateBack({});
					},
			  });
			})
		}
  }
}
</script>

<style lang="scss" scoped>
.eva-o {
  background-color: #ECEDF9;

  .eva-oi {
    background-color: white;
    margin-bottom: 32rpx;
    padding-top: 24rpx;

    .eva-oit {
      padding: 0 32rpx;
      @include flexBetween;

      .eva-oit-text {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323233;
        line-height: 40rpx;

        .eva-oit-name {
          height: 40rpx;
          padding: 0 12rpx;
          background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
          border-radius: 8rpx;
          margin: 0 16rpx;
          font-size: 24rpx;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #FFFFFF;
        }

        .eva-oit-name-orange {
          background: #FF9500;
        }
      }
    }

    .eva-ostar-box {
      margin-left: 32rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40rpx 0 32rpx 0;
      border-bottom: 1rpx solid #EAECEF;

      .eva-ostar {
        margin: 32rpx;
      }

      .eva-ostart-text {
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #828282;
        line-height: 36rpx;
      }
    }

    .upload-list-obox {
      padding: 32rpx 32rpx 16rpx 32rpx;
    }
  }
}

.eva-oline-line {
  height: 200rpx;
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
