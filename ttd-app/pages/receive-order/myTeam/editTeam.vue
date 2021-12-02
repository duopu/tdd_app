<template>
  <view class="edit-team" v-if="visible">

<!--    <uni-icons size="26" class="" type="close" color="#FFFFFF" />-->
    <image src="/static/mine/iconClose.svg"  @click="hide" class="edit-team-close" />

    <view class="edit-team-box">

      <view class="edit-team-title">团队信息</view>

      <view class="edit-team-add" @click="chooseImage()">
				<image v-if="image" :src="image" class="edit-team-add-imag" />
        <image v-else src="/static/mine/uploadAdd.svg" class="edit-team-add-imag" />
      </view>

      <view class="edit-team-name">
        <input class="edit-team-input" :value="name" @input="(e) => onInput(e, 'name')" placeholder="请输入团队名称" placeholder-class="input-placeholder" />
      </view>

      <view class="edit-team-intro">
        <textarea class="edit-team-intro-dt" :value="desc" @input="(e) => onInput(e, 'desc')" placeholder="请输入团队介绍" />
      </view>

      <view class="edit-team-btn" @click="hide">{{ btnText }}</view>

    </view>
  </view>
</template>
<script>
export default {
  name: "editTeam",
	props: {
	  btnText: {
	    type: String,
	    default: '保存',
	  },
		logo: '',
		title: '',
		intro: '',
	},
  data() {
    return {
      visible: false,
			image: this.logo,
			name: this.title,
			desc: this.intro,
    }
  },
  methods: {
    show() {
      this.visible = true;
    },
    hide() {
      this.visible = false;
			this.$emit('onSave', this.image, this.name, this.desc);
    },
		onInput(e, type) {
			const text = e.target.value;
			if (type == 'name') {
				this.name = text;
			} else if (type == 'desc') {
				this.desc = text;
			} 
		},
		chooseImage() {
			uni.chooseImage({
				  sourceType: ['camera'],
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    success: (res) => {
							const path = res.tempFilePaths[0];
							this.uploadImage(path);
			    }
			});
		},
		uploadImage(path) {
			const param = {
				file: path,
			};
			this.$http.upload({ path }, true)
			.then(res=>{
				this.image = res;
			});
		},
  }
}
</script>
<style scoped lang="scss">
.edit-team {
  position: fixed;
  left: 0;
  top: 0;
  width: 750rpx;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 10000;
  @include flexCenter;
  flex-direction: column;

  .edit-team-close {
    margin: 0 64rpx 32rpx 64rpx;
    align-self: flex-end;
    width: 48rpx;
    height: 48rpx;
  }

  .edit-team-box {
    width: 622rpx;
    height: 772rpx;
    background: #FFFFFF;
    border-radius: 32rpx;
    padding: 48rpx;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;

    .edit-team-title {
      font-size: 36rpx;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 500;
      color: #323335;
      line-height: 44rpx;
    }

    .edit-team-add {
      width: 200rpx;
      height: 200rpx;
      background: #F3F4F5;
      border-radius: 200rpx;
      @include flexCenter;
      margin: 32rpx;

      .edit-team-add-imag {
        width: 100rpx;
        height: 100rpx;
      }
    }

    .edit-team-name {
      box-sizing: border-box;
      padding: 26rpx 32rpx;
      width: 462rpx;
      height: 88rpx;
      background: #F3F4F5;
      border-radius: 8rpx;
      margin: 0 auto;

      .edit-team-input {

      }
    }

    .edit-team-intro {
      width: 462rpx;
      box-sizing: border-box;
      padding: 32rpx;
      height: 128rpx;
      background: #F3F4F5;
      border-radius: 8rpx;
      margin: 32rpx auto 48rpx auto;

      .edit-team-intro-dt {
        width: 398rpx;
        height: 72rpx;
      }
    }

    .edit-team-btn {
      width: 526rpx;
      height: 72rpx;
      background: linear-gradient(181deg, #3340A0 0%, #2C3580 94%);
      border-radius: 50rpx;
      @include flexCenter;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #FFFFFF;
    }
  }

  /deep/ .input-placeholder, /deep/ .textarea-placeholder {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
  }
}
</style>
