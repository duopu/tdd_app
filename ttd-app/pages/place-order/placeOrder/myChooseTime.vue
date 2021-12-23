<template>
  <view class="my-choose-time" :style="{ borderBottom: showBorderBottom ? '1rpx solid #EBEDF0' : 'none' }">
    <view class="choose-label">{{ title }}</view>

    <view class="choose-body">
      <view :class="['choose-middle', time ? '' : 'middle-placeholder']"
            @click="$refs.dateRangePicker.show()"
      >
        {{ time || placeholder }}
      </view>

      <uni-icons v-if="clearable && time" @click.prevent="clear" class="receipt-close" type="close" size="18"
                 color="#969799" />

      <uni-icons class="choose-right" type="arrowright" size="18" color="#969799" />

    </view>

    <uni-datetime-picker
        ref="dateRangePicker"
        class="choose-picker"
        v-model="innerTime"
        :type="timeType"
				:start="startTime"
        @change="changeTime"
    />
  </view>
</template>
<script>
import dayjs from 'dayjs'
import BigBtn from "../../mine/addressManage/component/bigBtn";

const _formatArr = {
  'YYYY-MM-DD HH:mm:ss': 'datetimerange',
  'YYYY-MM-DD': 'daterange',
}

export default {
  name: "myChooseTime",
  components: { BigBtn },
  props: {
    // 格式 ['YYYY-MM-DD', 'YYYY-MM-DD']
    value: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: '请选择'
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    // 时间格式 注意大小写
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: false
    },
    // 是否展示 底部边框 默认展示
    showBorderBottom: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerTime: []
    }
  },
  computed: {
    time() {
      if (!(this.value?.[0] && this.value?.[1])) return '';
      if (!(this.value?.[0] || this.value?.[1])) return this.value?.[0] || this.value?.[1];
      return this.value?.join('/') || ''
    },
    timeType() {
      let _type = this.format.toLowerCase();
      let obj = {};
      for (let i in _formatArr) if (_formatArr.hasOwnProperty(i)) obj[i.toLowerCase()] = _formatArr[i];
      return obj?.[_type] || 'daterange'
    },
		startTime() {
			return dayjs().format('YYYY-MM-DD');
		},
  },
  watch: {
    value: {
      handler(val) {
        this.innerTime = val
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    resolveTime(_time) {
      if (!_time) return '';
      return dayjs(new Date(_time)).format(this.format);
    },
    changeTime(time) {
      let _time = [this.resolveTime(time?.[0]), this.resolveTime(time?.[1])]
      this.$emit('change', _time)
      this.$emit('input', _time)
      this.$emit('update:value', _time)
    },
    clear() {
      this.changeTime();
    }
  }
}
</script>
<style scoped lang="scss">
.my-choose-time {
  display: flex;
  align-items: center;
  padding-right: 32rpx;
  position: relative;

  .choose-body {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    .choose-label {
      flex-shrink: 0;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #323335;
    }

    .choose-middle {
      height: 88rpx;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 28rpx;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #828282;
      padding-right: 13rpx;
    }

    .middle-placeholder {
      color: #BDBDBD;
    }

    .choose-right {
      padding-left: 5rpx;
    }
  }

  // 把picker 藏的远远的  用 ref的方式调用
  .choose-picker {
    position: absolute;
    left: -1000rpx;
    top: 0;
  }
}
</style>
