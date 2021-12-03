<template>
  <view>
    <custom-navbar title="选择人员" />

    <back-container>
      <view>
        <people-item v-for="i in personList" :key="i.userId" :person='i' :checked="getIsSelect(i)" @change="change(i)" />
      </view>
    </back-container>

    <iphonex-bottom>
      <view class="choosed-num">
        已选定
        <corner-mark :num="selectNumber" class-name="choosed-num-mar" color="#FF9500" />
        人
      </view>
      <big-btn @click="comfirmSelect"/>
    </iphonex-bottom>
  </view>
</template>

<script>
import IphonexBottom from "../../mine/addressManage/component/iphonexBottom";
import BigBtn from "../../mine/addressManage/component/bigBtn";
import PeopleItem from "../myTeam/peopleItem";
import BackContainer from "../../mine/addressManage/component/backContainer";
import CornerMark from "../component/cornerMark";

export default {
  name: "selectPerson",
  components: { CornerMark, BackContainer, PeopleItem, BigBtn, IphonexBottom },
	data() {
		return {
			id: '',
			selectList: [],
			selectNumber: 0,
			personList: [],
		}
	},
	onLoad(option) {
		if (option.id) { // 编辑地址
		  this.id = option.id;
		}
		const eventChannel = this.getOpenerEventChannel();
		eventChannel.on('selectPerson', (list) => {
				this.selectList = list;
		})
	},
	onReady() {
		this.queryPersonList();
	},
  methods: {
		queryPersonList() {
			this.$http
				.post('/b/teammember/queryList', { id: this.id }, true)
				.then(res => {
					this.personList = res;
				});
		},
		getIsSelect(p) {
			const index = this.selectList.findIndex((person) => person.userId == p.userId);
			return index != -1;
		},
    change(p) {
      const index = this.selectList.findIndex((person) => person.userId == p.userId);
			if (index == -1) {
				this.selectList.push(p);
			} else {
				this.selectList.splice(index, 1);
			}
			this.selectNumber = this.selectList.length;
    },
		comfirmSelect() {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.emit('onSelect', this.selectList);
			uni.navigateBack({});
		}
  }
}
</script>

<style lang="scss" scoped>
.choosed-num {
  width: 750rpx;
  height: 80rpx;
  background: #FFFBE8;
  padding: 0 32rpx;
  @include flexBetween;
  justify-content: flex-start;
  font-size: 28rpx;
  font-family: PingFang SC-Regular, PingFang SC;
  font-weight: 400;
  color: #323335;
}
</style>

<style lang="scss">
@import "../../mine/addressManage/_pageStyle.scss";

.choosed-num-mar {
  margin: 0 8rpx;
}
</style>
