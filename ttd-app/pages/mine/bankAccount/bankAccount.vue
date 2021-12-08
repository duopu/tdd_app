<template>
  <view class="bank-account">
    <custom-navbar title="银行账户" />
    <back-container>
      <view class="bank-addr">
				<view class="bank-ac-item">
				  <view class="bank-ac-lable">卡号</view>
				  <input class="bank-ac-midle" :value="bankCardNo" @input="(e) => onInput(e, 'number')" placeholder="请输入卡号" placeholder-class="input-placeholder" />
				</view>
				
        <view class="bank-ac-item">
          <view class="bank-ac-lable">开户行</view>
          <view class="bank-ac-midle">{{ bankName || '请输入卡号' }}</view>
          <!-- <uni-icons class="bank-ac-right" type="arrowright" size="18" color="#969799" /> -->
        </view>

        <view class="bank-ac-item">
          <view class="bank-ac-lable">开户网点</view>
          <input class="bank-ac-midle" placeholder="可选输入" placeholder-class="input-placeholder" />
        </view>

        <view class="bank-ac-item">
          <view class="bank-ac-lable">户名</view>
          <input class="bank-ac-midle" :value="householderName" @input="(e) => onInput(e, 'name')" placeholder="请输入" placeholder-class="input-placeholder" />
        </view>

      </view>
    </back-container>

    <iphonex-bottom>
      <bottom-operate @operateDel="operateDel" @operateSave="operateSave" />
    </iphonex-bottom>
  </view>
</template>

<script>
import BackContainer from "../addressManage/component/backContainer";
import IphonexBottom from "../addressManage/component/iphonexBottom";
import BottomOperate from "../addressManage/component/bottomOperate";

export default {
  name: 'bankAccount',
  components: { BottomOperate, IphonexBottom, BackContainer },
	data() {
		return {
			id: 0,
			bankName: '',
			bankCardNo: '',
			householderName: '',
			bankList: [],
		}
	},
	onLoad(option) {
		if (option.id) { // 编辑地址
		  this.id = Number(option.id);
			this.queryCardInfo(this.id);
		}
	},
	onReady() {
		this.queryBankList();
	},
  methods: {
		queryBankList() {
			this.$http
				.post('/core/bankCard/getBankNameList', { }, true)
				.then(res => {
					this.bankList = res;
				})
		},
		queryCardInfo(id) {
			this.$http
				.post('/b/customerbank/query', { id }, true)
				.then(res => {
					this.bankName = res.bankName;
					this.bankCardNo = res.bankCardNo;
					this.householderName = res.householderName;
				})
		},
		queryBankCardInfo(cardNumber) {
			this.$http
				.post('/core/bankCard/getBankCardInfo', { cardNumber }, false)
				.then(res => {
					this.bankName = res.bankName;
				}).catch((e) => {
					console.log('识别失败 ', e);
				});
		},
		onInput(event, type) {
			const text = event.target.value;
			if (type == 'name') {
				this.householderName = text;		
			} else if (type == 'number') {
				this.bankCardNo = text;	
				if (text.length >= 16) {
					this.queryBankCardInfo(text);
				}
			}
		},
		checkParams() {
			if (!this.bankName) {
				uni.showToast({ title:  '请选择开户行', icon:  'none' });
				return false;
			}
			if (!this.householderName) {
				uni.showToast({ title:  '请输入户名', icon:  'none' });
				return false;
			}
			if (!this.bankCardNo) {
				uni.showToast({ title:  '请输入卡号', icon:  'none' });
				return false;
			}
			return true;
		},
		// 新增/编辑地址
		operateSave() {
			
			if (!this.checkParams()) return;
			
			const params  = {
				id: this.id,
				bankName: this.bankName,
				bankCardNo: this.bankCardNo,
				householderName: this.householderName,
			};
			
			const url = `/b/customerbank/${this.id ? 'update' : 'add'}`; 
			
			this.$http
				.post(url, params, true)
				.then(res => {
					uni.showToast({
						title: '编辑成功',
					  success: () => {
						uni.navigateBack({});
					  },
					});
				})
		},
		// 删除地址
		operateDel() {
			
			uni.showModal({
				content: '是否删除该银行卡?',
				success: (res) => {
					if (res.confirm) {
					  this.deleleCard();
					}
				}
			})
		},
		deleleCard() {
			this.$http
				.post('/b/customerbank/delete', { id: this.id }, true)
				.then(res => {
					uni.showToast({
						title: '删除成功',
					  success: () => {
						uni.navigateBack({});
					  },
					});
				})
		},
  }
}
</script>
<style lang="scss" scoped>
.bank-account {
  .bank-addr {
    box-sizing: border-box;
    padding: 15rpx 0 0 32rpx;

    .bank-ac-item {
      display: flex;
      align-items: center;
      height: 88rpx;
      padding-right: 32rpx;

      &:not(:nth-last-child(1)) {
        border-bottom: 1rpx solid #EBEDF0;
      }

      .bank-ac-lable {
        flex-shrink: 0;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #323335;
      }

      .bank-ac-midle {
        margin-left: auto;
        font-size: 28rpx;
        font-family: PingFang SC-Regular, PingFang SC;
        font-weight: 400;
        color: #BDBDBD;
        text-align: right;
      }

      .bank-ac-right {
        padding-left: 18rpx;
      }
    }
  }

  /deep/.input-placeholder {
    font-size: 28rpx;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #BDBDBD;
  }
}
</style>
<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";
</style>
